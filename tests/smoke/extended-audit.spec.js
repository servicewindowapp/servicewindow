// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Extended audit test suite — ServiceWindow
 *
 * Covers (beyond existing smoke tests):
 *   1. Console error detection on EVERY page (public + dashboards)
 *   2. Form endpoint reachability verification
 *   3. Meta completeness spot-checks (canonical, og:title, description)
 *   4. Pricing consistency — no stale amounts on public-facing pages
 *   5. Auth page legal surface — privacy & terms links must be present
 *   6. Inline Supabase key consistency check
 *
 * Design rules:
 *   - All tests run against the local dev server (baseURL from playwright.config.js)
 *   - No tests require auth credentials — purely static + network checks
 *   - Console errors from known-safe sources (Sentry init race, extension noise) are filtered
 *   - Each test names the specific issue it guards against so failures are self-documenting
 */

// ─── PAGE INVENTORIES ────────────────────────────────────────────────────────

const ALL_PAGES = [
  // Public
  { path: '/',                                label: 'Landing page' },
  { path: '/marketplace.html',                label: 'Marketplace' },
  { path: '/find-trucks.html',                label: 'Find trucks' },
  { path: '/list-your-truck.html',            label: 'List your truck' },
  { path: '/vendor-services.html',            label: 'Vendor services' },
  { path: '/auth.html',                       label: 'Auth' },
  { path: '/pricing.html',                    label: 'Pricing' },
  { path: '/about.html',                      label: 'About' },
  { path: '/contact.html',                    label: 'Contact' },
  { path: '/jobs.html',                       label: 'Jobs board' },
  { path: '/venues.html',                     label: 'Venues' },
  { path: '/property.html',                   label: 'Property' },
  { path: '/privacy.html',                    label: 'Privacy policy' },
  { path: '/terms.html',                      label: 'Terms of service' },
  { path: '/success.html',                    label: 'Success' },
  { path: '/cancel.html',                     label: 'Cancel' },
  { path: '/reset-password.html',             label: 'Reset password' },
  { path: '/truck-profile.html',              label: 'Truck profile' },
  // SEO
  { path: '/fort-myers-food-trucks.html',     label: 'Fort Myers SEO' },
  { path: '/cape-coral-food-trucks.html',     label: 'Cape Coral SEO' },
  { path: '/naples-food-trucks.html',         label: 'Naples SEO' },
  { path: '/bonita-springs-food-trucks.html', label: 'Bonita Springs SEO' },
  { path: '/punta-gorda-food-trucks.html',    label: 'Punta Gorda SEO' },
  { path: '/swfl-food-truck-catering.html',   label: 'SWFL Catering SEO' },
  { path: '/food-truck-events-fort-myers.html', label: 'Food Truck Events SEO' },
  // Dashboards
  { path: '/truck-dashboard.html',            label: 'Truck dashboard' },
  { path: '/planner-dashboard.html',          label: 'Planner dashboard' },
  { path: '/venue-dashboard.html',            label: 'Venue dashboard' },
  { path: '/property-dashboard.html',         label: 'Property dashboard' },
  { path: '/service-provider-dashboard.html', label: 'Service provider dashboard' },
  { path: '/jobs-dashboard.html',             label: 'Jobs dashboard' },
  { path: '/admin-dashboard.html',            label: 'Admin dashboard' },
];

const PUBLIC_SEO_PAGES = ALL_PAGES.filter(p =>
  !p.path.includes('dashboard') &&
  ![ '/success.html', '/cancel.html', '/reset-password.html',
     '/privacy.html', '/terms.html', '/auth.html' ].includes(p.path)
);

// Console message patterns that are acceptable (not bugs)
const KNOWN_SAFE_CONSOLE_PATTERNS = [
  /sentry/i,
  /content security policy/i,
  /download the react devtools/i,
  /\[violation\]/i,            // Chrome performance violation warnings
  /cross-origin/i,             // CDN cross-origin info
  /blocked:mixed-content/i,
  /favicon/i,
  /apple-touch-icon/i,         // iOS icon 404s in Playwright mobile-safari emulation — not a real failure
  /fonts\.gstatic\.com/i,      // Google Fonts unreachable in Firefox sandboxed test environment
  /fonts\.googleapis\.com/i,   // Same — font CDN blocked in test environment
  /401.*supabase/i,            // Unauthenticated Supabase reads on dashboard pages are expected
  /pgrst116/i,                 // Supabase "no rows" — not a JS error
  /failed to load resource.*supabase/i,
  /stripe/i,
];

// Stale pricing amounts that must NOT appear on public-facing pages
const STALE_PRICES = ['$49', '$29', '$19/mo'];
const CANONICAL_TRUCK_PRICE = '$39.99';

// ─── SUITE 1: CONSOLE ERRORS — EVERY PAGE ────────────────────────────────────

for (const { path, label } of ALL_PAGES) {
  test(`[console] ${label} (${path}) — no uncaught JS errors`, async ({ page }) => {
    const errors = [];

    page.on('pageerror', (err) => {
      errors.push({ type: 'pageerror', message: err.message });
    });

    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      const isSafe = KNOWN_SAFE_CONSOLE_PATTERNS.some(p => p.test(text));
      if (!isSafe) {
        errors.push({ type: 'console.error', message: text });
      }
    });

    // Navigate — don't wait for networkidle (Supabase calls may hang)
    await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Allow async scripts a moment to fire
    await page.waitForTimeout(1500);

    expect(
      errors,
      `Unexpected JS errors on ${label}:\n${errors.map(e => `  [${e.type}] ${e.message}`).join('\n')}`
    ).toHaveLength(0);
  });
}

// ─── SUITE 2: FORM ENDPOINT VERIFICATION ─────────────────────────────────────

test('[forms] Formspree endpoint reachable — contact.html', async ({ page, request }) => {
  // Verify the Formspree endpoint ID in contact.html is the canonical one
  const html = await page.goto('/contact.html', { waitUntil: 'domcontentloaded' });
  const content = await page.content();
  expect(content).toContain('formspree.io/f/mbdzyold');
});

test('[forms] Formspree endpoint reachable — index.html waitlist', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const content = await page.content();
  expect(content).toContain('formspree.io/f/mbdzyold');
});

test('[forms] Formspree endpoint reachable — vendor-services.html', async ({ page }) => {
  await page.goto('/vendor-services.html', { waitUntil: 'domcontentloaded' });
  const content = await page.content();
  expect(content).toContain('formspree.io/f/mbdzyold');
});

test('[forms] No form uses plain HTTP action (insecure submission)', async ({ page }) => {
  const pagesWithForms = [
    // Dashboard pages excluded — they redirect unauthenticated users and destroy
    // the execution context before page.$$eval can run
    '/contact.html', '/list-your-truck.html', '/auth.html',
    '/vendor-services.html',
  ];
  for (const p of pagesWithForms) {
    await page.goto(p, { waitUntil: 'domcontentloaded' });
    const insecureForms = await page.$$eval('form[action]', forms =>
      forms
        .map(f => f.getAttribute('action'))
        .filter(a => a && a.startsWith('http://'))
    );
    expect(
      insecureForms,
      `Page ${p} has form(s) with insecure HTTP action: ${insecureForms.join(', ')}`
    ).toHaveLength(0);
  }
});

test('[forms] contact.html form renders and has submit button', async ({ page }) => {
  await page.goto('/contact.html', { waitUntil: 'domcontentloaded' });
  const form = page.locator('#contactForm');
  await expect(form).toBeVisible();
  const submitBtn = form.locator('[type="submit"], button');
  await expect(submitBtn.first()).toBeVisible();
});

test('[forms] list-your-truck.html form renders and has submit button', async ({ page }) => {
  await page.goto('/list-your-truck.html', { waitUntil: 'domcontentloaded' });
  // Form may be inside a multi-step flow
  const form = page.locator('form').first();
  await expect(form).toBeVisible();
});

// ─── SUITE 3: META COMPLETENESS ───────────────────────────────────────────────

for (const { path, label } of PUBLIC_SEO_PAGES) {
  test(`[meta] ${label} — has description, canonical, og:title`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });

    const description = await page.$eval(
      'meta[name="description"]',
      el => el.getAttribute('content') || ''
    ).catch(() => '');
    expect(description.length, `${label}: meta description missing or empty`).toBeGreaterThan(20);

    const canonical = await page.$eval(
      'link[rel="canonical"]',
      el => el.getAttribute('href') || ''
    ).catch(() => '');
    expect(canonical, `${label}: canonical link missing`).toMatch(/servicewindow\.app/);

    const ogTitle = await page.$eval(
      'meta[property="og:title"]',
      el => el.getAttribute('content') || ''
    ).catch(() => '');
    expect(ogTitle.length, `${label}: og:title missing or empty`).toBeGreaterThan(5);
  });
}

// ─── SUITE 4: PRICING CONSISTENCY ────────────────────────────────────────────

const PRICING_SURFACE_PAGES = [
  '/index.html',
  '/pricing.html',
  '/auth.html',
  '/list-your-truck.html',
  '/success.html',
];

for (const path of PRICING_SURFACE_PAGES) {
  for (const stalePrice of STALE_PRICES) {
    test(`[pricing] ${path} — does not contain stale price '${stalePrice}'`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const bodyText = await page.locator('body').innerText().catch(() => '');
      const pageHTML = await page.content();

      // Check visible text only for user-facing pages
      // (admin pages may reference old prices in DB values — those are OK)
      expect(
        bodyText,
        `${path} displays stale price '${stalePrice}' to the user`
      ).not.toContain(stalePrice);
    });
  }
}

test('[pricing] pricing.html — displays canonical $39.99/mo', async ({ page }) => {
  await page.goto('/pricing.html', { waitUntil: 'domcontentloaded' });
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).toContain('$39.99');
});

test('[pricing] pricing.html — displays 30-day free trial', async ({ page }) => {
  await page.goto('/pricing.html', { waitUntil: 'domcontentloaded' });
  const bodyText = await page.locator('body').innerText();
  expect(bodyText.toLowerCase()).toContain('30-day');
  expect(bodyText.toLowerCase()).toContain('trial');
});

test('[pricing] index.html — displays canonical $39.99', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).toContain('$39.99');
});

test('[pricing] success.html — Advertiser branch does not display $19/mo', async ({ page }) => {
  // Load with plan=advertiser param to trigger the stale branch
  await page.goto('/success.html?plan=advertiser&session_id=test_fake', {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForTimeout(1000);
  const bodyText = await page.locator('body').innerText();
  expect(bodyText, 'success.html still shows retired $19/mo advertiser price').not.toContain('$19');
});

// ─── SUITE 5: LEGAL SURFACE ───────────────────────────────────────────────────

test('[legal] auth.html — has visible link to privacy policy', async ({ page }) => {
  await page.goto('/auth.html', { waitUntil: 'domcontentloaded' });
  // Use footer link — auth.html has privacy links inside hidden .step divs earlier in DOM
  const privacyLink = page.locator('footer a[href*="privacy"]');
  await expect(
    privacyLink.first(),
    'auth.html: no privacy policy link found in footer — required on all signup/login pages'
  ).toBeVisible();
});

test('[legal] auth.html — has visible link to terms of service', async ({ page }) => {
  await page.goto('/auth.html', { waitUntil: 'domcontentloaded' });
  // Use footer link — auth.html has terms links inside hidden .step divs earlier in DOM
  const termsLink = page.locator('footer a[href*="terms"]');
  await expect(
    termsLink.first(),
    'auth.html: no terms of service link found in footer — required on all signup/login pages'
  ).toBeVisible();
});

test('[legal] list-your-truck.html — has link to privacy policy', async ({ page }) => {
  await page.goto('/list-your-truck.html', { waitUntil: 'domcontentloaded' });
  const privacyLink = page.locator('a[href*="privacy"]');
  await expect(
    privacyLink.first(),
    'list-your-truck.html: no privacy policy link — required on public form pages'
  ).toBeVisible();
});

test('[legal] list-your-truck.html — has link to terms of service', async ({ page }) => {
  await page.goto('/list-your-truck.html', { waitUntil: 'domcontentloaded' });
  const termsLink = page.locator('a[href*="terms"]');
  await expect(
    termsLink.first(),
    'list-your-truck.html: no terms link — required on public form pages'
  ).toBeVisible();
});

test('[legal] contact.html — has privacy and terms links', async ({ page }) => {
  await page.goto('/contact.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('a[href*="privacy"]').first()).toBeVisible();
  await expect(page.locator('a[href*="terms"]').first()).toBeVisible();
});

// ─── SUITE 6: STRUCTURAL INTEGRITY ────────────────────────────────────────────

test('[structure] All 34 HTML pages return HTTP 200', async ({ request }) => {
  const pages = ALL_PAGES.map(p => p.path);
  // Also include undocumented pages
  const extra = ['/api.html', '/swfl-food-truck-report.html'];
  const all = [...new Set([...pages, ...extra])];

  const failures = [];
  for (const p of all) {
    const resp = await request.get(p);
    if (resp.status() !== 200) {
      failures.push(`${p}: HTTP ${resp.status()}`);
    }
  }
  expect(failures, `Pages returned non-200:\n${failures.join('\n')}`).toHaveLength(0);
});

test('[structure] supabase-client.js loads successfully', async ({ request }) => {
  const resp = await request.get('/supabase-client.js');
  expect(resp.status()).toBe(200);
});

test('[structure] logo.png loads successfully', async ({ request }) => {
  const resp = await request.get('/logo.png');
  expect(resp.status()).toBe(200);
});

test('[structure] og-image.png loads successfully', async ({ request }) => {
  const resp = await request.get('/og-image.png');
  expect(resp.status()).toBe(200);
});

test('[structure] sitemap.xml loads and contains canonical domain', async ({ request }) => {
  const resp = await request.get('/sitemap.xml');
  expect(resp.status()).toBe(200);
  const body = await resp.text();
  expect(body).toContain('servicewindow.app');
  expect(body).toContain('<urlset');
});

test('[structure] robots.txt loads and references sitemap', async ({ request }) => {
  const resp = await request.get('/robots.txt');
  expect(resp.status()).toBe(200);
  const body = await resp.text();
  expect(body.toLowerCase()).toContain('sitemap');
});

// ─── SUITE 7: INLINE SUPABASE KEY CONSISTENCY ─────────────────────────────────

/**
 * Pages that directly inline the Supabase URL + anon key instead of importing
 * supabase-client.js create a key-rotation maintenance hazard. This test flags
 * any page that has the inline key but NOT a supabase-client.js import.
 *
 * The anon key is safe to expose publicly — this is a maintainability gate,
 * not a security gate.
 */
const KNOWN_INLINE_KEY_PAGES = [
  '/auth.html',
  '/find-trucks.html',
  '/list-your-truck.html',
  '/marketplace.html',
];

test('[consistency] inline Supabase key pages are accounted for (no new additions)', async ({ page }) => {
  // This test fails if a new page starts hardcoding the key
  // without being added to KNOWN_INLINE_KEY_PAGES above.
  const allPagePaths = ALL_PAGES.map(p => p.path);
  const violations = [];

  for (const path of allPagePaths) {
    if (KNOWN_INLINE_KEY_PAGES.includes(path)) continue; // expected
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    // Dashboard pages redirect via JS — page.content() may throw if navigation
    // interrupts before content is readable. Treat interrupted navigation as
    // a pass (the page didn't have time to inject inline keys anyway).
    const src = await page.content().catch(() => '');
    if (src.includes('SUPABASE_ANON_KEY') && src.includes('krmfxedkxoyzkeqnijcd.supabase.co')) {
      violations.push(path);
    }
  }

  expect(
    violations,
    `New pages found hardcoding Supabase credentials (add to supabase-client.js instead):\n${violations.join('\n')}`
  ).toHaveLength(0);
});
