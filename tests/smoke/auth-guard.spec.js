// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Smoke tests — auth guard (dashboard access control)
 *
 * Two behaviors exist for unauthenticated users:
 *
 *   REDIRECT pages — getSession() fires and sends to auth.html
 *     truck, planner, venue, property, service-provider
 *
 *   ERROR-BAR pages — getSession() fires, page stays but shows auth-error-bar
 *     admin-dashboard (shows error bar, content locked)
 *
 *   HYBRID pages (NOT tested here — public content + locked CTAs)
 *     jobs-dashboard (intentionally public-facing, no redirect)
 */

const REDIRECT_DASHBOARDS = [
  { path: '/truck-dashboard.html',             label: 'Truck dashboard' },
  { path: '/planner-dashboard.html',           label: 'Planner dashboard' },
  { path: '/venue-dashboard.html',             label: 'Venue dashboard' },
  { path: '/property-dashboard.html',          label: 'Property dashboard' },
  { path: '/service-provider-dashboard.html',  label: 'Service provider dashboard' },
];

for (const { path, label } of REDIRECT_DASHBOARDS) {
  test(`${label} (${path}) — redirects unauthenticated users to auth`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });

    // Wait for client-side redirect (Supabase getSession is async)
    await page.waitForURL(/auth\.html/, { timeout: 8000 }).catch(() => {});

    expect(
      page.url(),
      `${label}: expected redirect to auth.html but stayed on ${page.url()}`
    ).toMatch(/auth\.html/);
  });
}

// Admin shows an error bar rather than redirecting — content must be gated
test('Admin dashboard — shows auth error bar when unauthenticated', async ({ page }) => {
  await page.goto('/admin-dashboard.html', { waitUntil: 'domcontentloaded' });

  // Wait for JS to run and either redirect or show error bar
  await page.waitForTimeout(3000);

  const currentUrl = page.url();
  const redirectedToAuth = /auth\.html/.test(currentUrl);

  if (!redirectedToAuth) {
    // Should show the auth error bar
    const errorBar = page.locator('#auth-error-bar');
    await expect(errorBar, 'Admin: expected auth-error-bar to be visible').toBeVisible({ timeout: 3000 });
  }
  // Either redirect OR error bar is acceptable — both gate the content
});
