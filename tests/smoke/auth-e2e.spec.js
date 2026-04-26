// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * End-to-end auth tests — login flow against live Supabase
 *
 * Prerequisites (one-time setup in Supabase — run in SQL editor):
 *
 *   INSERT INTO profiles (id, role, business_name, contact_name, email, city, is_verified, subscription_status)
 *   SELECT id, 'truck', 'Test Truck Co', 'Test Truck', email, 'Fort Myers', true, 'trialing'
 *   FROM auth.users WHERE email = 'test-truck@servicewindow.app';
 *
 *   INSERT INTO profiles (id, role, business_name, contact_name, email, city, is_verified, subscription_status)
 *   SELECT id, 'organizer', 'Test Events Co', 'Test Requester', email, 'Fort Myers', true, 'active'
 *   FROM auth.users WHERE email = 'test-requester@servicewindow.app';
 *
 * Credentials go in tests/.env.test (gitignored). See .env.test.example.
 * All tests skip cleanly if credentials are not set.
 */

// Load .env.test if present
try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.test') });
} catch (e) {
  // dotenv not installed — rely on process.env directly
}

const TRUCK_EMAIL        = process.env.TRUCK_EMAIL;
const TRUCK_PASSWORD     = process.env.TRUCK_PASSWORD;
const REQUESTER_EMAIL    = process.env.REQUESTER_EMAIL;
const REQUESTER_PASSWORD = process.env.REQUESTER_PASSWORD;

/** Clicks login and waits for URL to match pattern. Throws with full page context on failure. */
async function loginAndExpectRedirect(page, email, password, urlPattern) {
  await page.fill('#loginEmail', email);
  await page.fill('#loginPassword', password);
  await page.click('#loginBtn');

  try {
    await page.waitForURL(urlPattern, { timeout: 20000 });
  } catch {
    const errorText = await page.locator('#loginError').textContent().catch(() => '(not found)');
    const errorVis  = await page.locator('#loginError').isVisible().catch(() => false);
    throw new Error(
      `Login did not redirect to ${urlPattern}.\n` +
      `  Current URL : ${page.url()}\n` +
      `  Error shown : ${errorVis ? `"${errorText}"` : 'none'}`
    );
  }
}

// ─── TRUCK: VERIFIED LOGIN → DASHBOARD REDIRECT ─────────────────────────────

test('Truck login → redirects to truck-dashboard', { timeout: 30000 }, async ({ page }) => {

  if (!TRUCK_EMAIL || !TRUCK_PASSWORD) {
    test.skip(true, 'TRUCK_EMAIL / TRUCK_PASSWORD not set — skipping');
    return;
  }

  await page.goto('/auth.html?mode=login', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#loginEmail')).toBeVisible({ timeout: 5000 });

  await loginAndExpectRedirect(page, TRUCK_EMAIL, TRUCK_PASSWORD, /truck-dashboard\.html/);
  expect(page.url()).toMatch(/truck-dashboard\.html/);
});

// ─── REQUESTER: VERIFIED LOGIN → DASHBOARD REDIRECT ─────────────────────────

test('Requester (organizer) login → redirects to planner-dashboard', { timeout: 30000 }, async ({ page }) => {

  if (!REQUESTER_EMAIL || !REQUESTER_PASSWORD) {
    test.skip(true, 'REQUESTER_EMAIL / REQUESTER_PASSWORD not set — skipping');
    return;
  }

  await page.goto('/auth.html?mode=login', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#loginEmail')).toBeVisible({ timeout: 5000 });

  await loginAndExpectRedirect(page, REQUESTER_EMAIL, REQUESTER_PASSWORD, /planner-dashboard\.html/);
  expect(page.url()).toMatch(/planner-dashboard\.html/);
});

// ─── WRONG PASSWORD → ERROR MESSAGE, NO REDIRECT ────────────────────────────

test('Login with wrong password → shows error, stays on auth.html', { timeout: 20000 }, async ({ page }) => {

  const email = TRUCK_EMAIL || REQUESTER_EMAIL;
  if (!email) {
    test.skip(true, 'No test email configured — skipping');
    return;
  }

  await page.goto('/auth.html?mode=login', { waitUntil: 'domcontentloaded' });
  await page.fill('#loginEmail', email);
  await page.fill('#loginPassword', 'definitely-wrong-password-xyz999');
  await page.click('#loginBtn');

  const errorEl = page.locator('#loginError');
  await expect(errorEl, 'Expected login error to be visible').toBeVisible({ timeout: 10000 });
  expect(page.url()).toMatch(/auth\.html/);
});

// ─── ALREADY LOGGED IN → AUTH PAGE AUTO-REDIRECTS ───────────────────────────

test('Already-authenticated truck visiting auth.html → auto-redirects to dashboard', { timeout: 45000 }, async ({ page }) => {

  if (!TRUCK_EMAIL || !TRUCK_PASSWORD) {
    test.skip(true, 'TRUCK_EMAIL / TRUCK_PASSWORD not set — skipping');
    return;
  }

  // Establish session
  await page.goto('/auth.html?mode=login', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#loginEmail')).toBeVisible({ timeout: 5000 });
  await loginAndExpectRedirect(page, TRUCK_EMAIL, TRUCK_PASSWORD, /truck-dashboard\.html/);

  // Revisit auth.html — should redirect away automatically
  await page.goto('/auth.html', { waitUntil: 'domcontentloaded' });
  try {
    await page.waitForURL(/truck-dashboard\.html/, { timeout: 10000 });
  } catch {
    throw new Error(
      `Auth page did not auto-redirect for authenticated user.\n` +
      `  Current URL: ${page.url()}`
    );
  }
  expect(page.url()).toMatch(/truck-dashboard\.html/);
});
