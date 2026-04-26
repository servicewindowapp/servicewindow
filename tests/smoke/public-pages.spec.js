// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Smoke tests — public pages
 *
 * Verifies every public page:
 *   1. Loads without a network error
 *   2. Has a <title> containing "ServiceWindow"
 *   3. Renders a nav logo (structural integrity check)
 *   4. Does not throw an uncaught JS error that crashes the page
 *
 * These tests do NOT assert live data or Supabase responses.
 * They are structure/load gates — if a page crashes or goes blank, we catch it here.
 */

const PUBLIC_PAGES = [
  { path: '/',                 label: 'Landing page' },
  { path: '/marketplace.html', label: 'Marketplace' },
  { path: '/find-trucks.html', label: 'Find trucks' },
  { path: '/auth.html',        label: 'Auth' },
  { path: '/pricing.html',     label: 'Pricing' },
  { path: '/about.html',       label: 'About' },
  { path: '/contact.html',     label: 'Contact' },
  { path: '/jobs.html',        label: 'Jobs board' },
  { path: '/venues.html',      label: 'Venues' },
  { path: '/property.html',    label: 'Property' },
  { path: '/privacy.html',     label: 'Privacy policy' },
  { path: '/terms.html',       label: 'Terms of service' },
];

for (const { path, label } of PUBLIC_PAGES) {
  test(`${label} (${path}) — loads and has correct structure`, async ({ page }) => {
    const jsErrors = [];
    page.on('pageerror', (err) => jsErrors.push(err.message));

    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });

    // Page must respond
    expect(response?.status(), `${label}: expected HTTP 200`).toBe(200);

    // Title must contain the brand name
    const title = await page.title();
    expect(title, `${label}: title should contain "ServiceWindow"`).toMatch(/ServiceWindow/i);

    // Logo must be present — structural integrity check
    const logo = page.locator('img.nav-logo, .nav-logo, img[src*="logo"]').first();
    await expect(logo, `${label}: nav logo not found`).toBeVisible({ timeout: 5000 });

    // No uncaught JS errors (Supabase/network errors are expected in local static serving)
    const fatalErrors = jsErrors.filter(
      (msg) =>
        !msg.includes('supabase') &&
        !msg.includes('fetch') &&
        !msg.includes('NetworkError') &&
        !msg.includes('Failed to fetch') &&
        !msg.includes('net::ERR')
    );
    expect(fatalErrors, `${label}: unexpected JS errors: ${fatalErrors.join(', ')}`).toHaveLength(0);
  });
}

// Auth page — login mode: email + password inputs must be visible
test('Auth page — login form accessible via ?mode=login', async ({ page }) => {
  // Navigate directly to login mode — default is signup, loginView is display:none
  await page.goto('/auth.html?mode=login', { waitUntil: 'domcontentloaded' });

  await expect(
    page.locator('#loginEmail'),
    'Auth login: #loginEmail not visible'
  ).toBeVisible({ timeout: 5000 });

  await expect(
    page.locator('#loginPassword'),
    'Auth login: #loginPassword not visible'
  ).toBeVisible({ timeout: 5000 });
});

// Auth page — signup mode: step 1 must be active and visible
test('Auth page — signup form step 1 visible by default', async ({ page }) => {
  await page.goto('/auth.html', { waitUntil: 'domcontentloaded' });

  await expect(
    page.locator('#step1'),
    'Auth signup: #step1 not visible'
  ).toBeVisible({ timeout: 5000 });
});

// Pricing page: should show at least one price mention
test('Pricing page — pricing content visible', async ({ page }) => {
  await page.goto('/pricing.html', { waitUntil: 'domcontentloaded' });

  const body = await page.textContent('body');
  expect(body, 'Pricing page: no price content found').toMatch(/\$\d+|free|founding/i);
});
