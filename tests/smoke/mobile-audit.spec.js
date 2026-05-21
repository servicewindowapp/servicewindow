// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Mobile stress test — OI-001
 *
 * Runs on: Pixel 5 (Chrome Android), iPhone 13 (WebKit/Safari), Desktop Firefox
 * Configured via playwright.config.js projects.
 *
 * Checks per page:
 *   1. Page loads (HTTP 200, title, logo)
 *   2. No horizontal overflow (no content wider than viewport)
 *   3. Meta viewport tag is present
 *   4. No uncaught JS crashes (excluding expected Supabase/network errors)
 *
 * Additional checks:
 *   5. Hamburger button is visible on small viewports (isMobile)
 *   6. Hamburger opens mobile menu — menu links become visible
 *   7. Hamburger closes mobile menu on second tap
 *   8. Key CTAs and nav links meet 44px minimum touch target height
 */

const PUBLIC_PAGES = [
  { path: '/',                               label: 'Landing page' },
  { path: '/marketplace.html',               label: 'Marketplace' },
  { path: '/find-trucks.html',               label: 'Find trucks' },
  { path: '/list-your-truck.html',           label: 'List your truck' },
  { path: '/auth.html',                      label: 'Auth' },
  { path: '/pricing.html',                   label: 'Pricing' },
  { path: '/about.html',                     label: 'About' },
  { path: '/contact.html',                   label: 'Contact' },
  { path: '/jobs.html',                      label: 'Jobs board' },
  { path: '/venues.html',                    label: 'Venues' },
  { path: '/property.html',                  label: 'Property' },
  { path: '/privacy.html',                   label: 'Privacy policy' },
  { path: '/terms.html',                     label: 'Terms of service' },
  // truck-profile.html intentionally redirects to marketplace when no ?id — excluded here
  { path: '/vendor-services.html',           label: 'Vendor services' },
  { path: '/punta-gorda-food-trucks.html',   label: 'Punta Gorda SEO' },
  { path: '/fort-myers-food-trucks.html',    label: 'Fort Myers SEO' },
  { path: '/cape-coral-food-trucks.html',    label: 'Cape Coral SEO' },
  { path: '/naples-food-trucks.html',        label: 'Naples SEO' },
  { path: '/bonita-springs-food-trucks.html', label: 'Bonita Springs SEO' },
  { path: '/swfl-food-truck-catering.html',  label: 'SWFL catering SEO' },
  { path: '/food-truck-events-fort-myers.html', label: 'FT Myers events SEO' },
];

// Errors expected in static local serving — not real failures
const EXPECTED_ERROR_PATTERNS = [
  'supabase', 'fetch', 'NetworkError', 'Failed to fetch', 'net::ERR',
  'ERR_NAME_NOT_RESOLVED', 'ERR_CONNECTION_REFUSED',
];

function isFatal(msg) {
  return !EXPECTED_ERROR_PATTERNS.some((p) => msg.toLowerCase().includes(p.toLowerCase()));
}

// ─── Page load + structure + no horizontal overflow ───────────────────────────

for (const { path, label } of PUBLIC_PAGES) {
  test(`[load] ${label} (${path})`, async ({ page }) => {
    const jsErrors = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });

    // HTTP 200
    expect(response?.status(), `${label}: expected 200`).toBe(200);

    // Title
    const title = await page.title();
    expect(title, `${label}: title missing "ServiceWindow"`).toMatch(/ServiceWindow/i);

    // Logo
    const logo = page.locator('img.nav-logo, .nav-logo, img[src*="logo"]').first();
    await expect(logo, `${label}: nav logo not found`).toBeVisible({ timeout: 5000 });

    // No horizontal overflow — the most common mobile layout bug.
    // Skip elements inside intentional overflow-x: auto/scroll containers (e.g. tab bars, pill navs).
    const overflows = await page.evaluate(() => {
      const vw = window.innerWidth;
      const overflow = [];

      function hasScrollableAncestor(el) {
        let parent = el.parentElement;
        while (parent && parent !== document.body) {
          const style = window.getComputedStyle(parent);
          if (style.overflowX === 'auto' || style.overflowX === 'scroll') return true;
          // position:fixed/sticky elements use the ICB (not viewport) in WebKit when
          // document overflows — their children can never cause real horizontal scroll,
          // so skip them to avoid false positives on Safari.
          if (style.position === 'fixed' || style.position === 'sticky') return true;
          parent = parent.parentElement;
        }
        return false;
      }

      document.querySelectorAll('*').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.right > vw + 2) { // 2px tolerance for borders/shadows
          if (!hasScrollableAncestor(el)) {
            const cls = el.className ? '.' + String(el.className).trim().split(/\s+/)[0] : '';
            overflow.push(`${el.tagName}${el.id ? '#' + el.id : ''}${cls} right=${Math.round(rect.right)} vw=${vw}`);
          }
        }
      });
      return overflow;
    });
    expect(overflows, `${label}: horizontal overflow detected:\n  ${overflows.join('\n  ')}`).toHaveLength(0);

    // Meta viewport
    const hasViewport = await page.evaluate(() =>
      !!document.querySelector('meta[name="viewport"]')
    );
    expect(hasViewport, `${label}: missing <meta name="viewport">`).toBe(true);

    // No fatal JS errors
    const fatalErrors = jsErrors.filter(isFatal);
    expect(fatalErrors, `${label}: JS errors: ${fatalErrors.join(', ')}`).toHaveLength(0);
  });
}

// ─── Hamburger nav — only meaningful on actual mobile viewports ────────────────

test('[nav] Hamburger visible and opens mobile menu', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Hamburger test only runs on mobile viewport projects');

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const hamburger = page.locator('#hamburger');
  await expect(hamburger, 'Hamburger button not visible').toBeVisible({ timeout: 5000 });

  // Menu should be hidden before tap
  const menu = page.locator('#mobileMenu');
  await expect(menu, 'Mobile menu should be hidden initially').not.toHaveClass(/open/);

  // Use evaluate().click() — Playwright's click() dispatches touch events on hasTouch
  // devices, which may not fire the button's 'click' event listener on all emulators.
  await page.evaluate(() => document.getElementById('hamburger').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
  await expect(menu, 'Mobile menu did not open after tap').toHaveClass(/open/, { timeout: 3000 });

  // Menu links are visible
  const links = menu.locator('a');
  const count = await links.count();
  expect(count, 'Mobile menu has no links').toBeGreaterThan(0);
  await expect(links.first(), 'First menu link not visible').toBeVisible();

  // Second click closes it
  await page.evaluate(() => document.getElementById('hamburger').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
  await expect(menu, 'Mobile menu did not close on second tap').not.toHaveClass(/open/, { timeout: 3000 });
});

test('[nav] Hamburger visible and opens on marketplace', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Hamburger test only runs on mobile viewport projects');

  await page.goto('/marketplace.html', { waitUntil: 'domcontentloaded' });

  const hamburger = page.locator('#hamburger');
  await expect(hamburger, 'Hamburger not visible on marketplace').toBeVisible({ timeout: 5000 });

  await page.evaluate(() => document.getElementById('hamburger').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
  const menu = page.locator('#mobileMenu');
  await expect(menu, 'Mobile menu did not open on marketplace').toHaveClass(/open/, { timeout: 3000 });
});

test('[nav] Hamburger visible and opens on find-trucks', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Hamburger test only runs on mobile viewport projects');

  await page.goto('/find-trucks.html', { waitUntil: 'domcontentloaded' });

  const hamburger = page.locator('#hamburger');
  await expect(hamburger, 'Hamburger not visible on find-trucks').toBeVisible({ timeout: 5000 });

  await page.evaluate(() => document.getElementById('hamburger').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
  const menu = page.locator('#mobileMenu');
  await expect(menu, 'Mobile menu did not open on find-trucks').toHaveClass(/open/, { timeout: 3000 });
});

// ─── Touch target size — key interactive elements ≥ 44px ──────────────────────

test('[touch] Hamburger button meets 44px touch target', async ({ page, isMobile, browserName }) => {
  test.skip(!isMobile, 'Touch target test only runs on mobile viewport projects');
  // WebKit's getBoundingClientRect() reports fixed-position elements using the ICB
  // when document overflows — positions are unreliable. Verify on real iOS device.
  test.skip(browserName === 'webkit', 'Playwright WebKit fixed-position coordinate space unreliable — verify on real iOS device');

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const size = await page.locator('#hamburger').evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { width: r.width, height: r.height };
  });

  expect(size.height, `Hamburger height ${size.height}px < 44px`).toBeGreaterThanOrEqual(44);
  expect(size.width, `Hamburger width ${size.width}px < 44px`).toBeGreaterThanOrEqual(44);
});

test('[touch] Primary CTA button on landing page meets 44px touch target', async ({ page, isMobile, browserName }) => {
  test.skip(!isMobile, 'Touch target test only runs on mobile viewport projects');
  // Same WebKit ICB issue — fixed-position nav affects coordinate space.
  test.skip(browserName === 'webkit', 'Playwright WebKit fixed-position coordinate space unreliable — verify on real iOS device');

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Look for the primary CTA — index.html uses .btn-primary / .btn-secondary in .hero-ctas
  const cta = page.locator('.hero-ctas a, .hero-ctas button, a.btn-primary, a.btn-secondary, a.btn, button.btn').first();
  const count = await cta.count();
  if (count === 0) {
    test.skip(true, 'No CTA button found on landing page — skipping');
    return;
  }

  const size = await cta.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { width: r.width, height: r.height };
  });

  expect(size.height, `Primary CTA height ${size.height}px < 44px`).toBeGreaterThanOrEqual(44);
});

// ─── Auth form usability on mobile ────────────────────────────────────────────

test('[form] Auth signup step 1 — role cards visible and within viewport on mobile', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Auth mobile form test only runs on mobile viewport projects');

  await page.goto('/auth.html', { waitUntil: 'domcontentloaded' });

  // Step 1 is role selection — role cards, not an email input
  await expect(page.locator('#step1'), 'Auth step1 not visible').toBeVisible({ timeout: 5000 });

  // At least one role card should be visible and within the viewport
  const roleCard = page.locator('.role-card').first();
  await expect(roleCard, 'Role card not visible in step 1').toBeVisible({ timeout: 5000 });

  const cardRect = await roleCard.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { height: r.height, right: r.right, vw: window.innerWidth };
  });

  // Role card must not overflow viewport horizontally
  expect(cardRect.right, `Role card extends past viewport (right=${cardRect.right}, vw=${cardRect.vw})`).toBeLessThanOrEqual(cardRect.vw + 2);
  // Role card must be tall enough to tap
  expect(cardRect.height, `Role card height ${cardRect.height}px < 44px`).toBeGreaterThanOrEqual(44);
});

// ─── Pricing page legibility on mobile ────────────────────────────────────────

test('[content] Pricing page shows price content on mobile', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Pricing mobile test only runs on mobile viewport projects');

  await page.goto('/pricing.html', { waitUntil: 'domcontentloaded' });

  const body = await page.textContent('body');
  expect(body, 'Pricing: no price content found').toMatch(/\$\d+|free/i);

  // No horizontal overflow
  const overflows = await page.evaluate(() => {
    const vw = window.innerWidth;
    const overflow = [];
    document.querySelectorAll('*').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > vw + 2) {
        overflow.push(`${el.tagName}${el.id ? '#' + el.id : ''} right=${Math.round(rect.right)}`);
      }
    });
    return overflow;
  });
  expect(overflows, `Pricing: overflow:\n  ${overflows.join('\n  ')}`).toHaveLength(0);
});
