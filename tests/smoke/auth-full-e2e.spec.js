// @ts-check
const { test, expect } = require('@playwright/test');
const https = require('https');
const path  = require('path');

/*
 * Full end-to-end auth tests: signup UI -> admin API approval -> dashboard access
 *
 * Coverage:
 *   1. UI  : 3-step signup (role select -> account details -> verification submit)
 *   2. API : email confirm + is_verified=true via Supabase service role (simulates admin)
 *   3. UI  : login as approved user -> verify correct dashboard redirect
 *   4. API : cleanup (delete test user)
 *
 * Requires in tests/.env.test:
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...  (Supabase Dashboard -> Project Settings -> API -> service_role)
 *
 * All three tests skip cleanly when the key is absent.
 */

try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.test') });
} catch (_e) {}

var SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
var SUPABASE_URL     = 'https://krmfxedkxoyzkeqnijcd.supabase.co';

// ---------------------------------------------------------------------------
// HTTP helper (Node built-in https -- no extra packages needed)
// ---------------------------------------------------------------------------

function apiRequest(urlStr, opts, body) {
  opts = opts || {};
  body = body || null;
  return new Promise(function(resolve, reject) {
    var parsed  = new URL(urlStr);
    var payload = body ? JSON.stringify(body) : null;
    var headers = { 'Content-Type': 'application/json' };
    if (payload) { headers['Content-Length'] = Buffer.byteLength(payload); }
    Object.assign(headers, opts.headers || {});

    var req = https.request({
      hostname: parsed.hostname,
      path:     parsed.pathname + parsed.search,
      method:   opts.method || 'GET',
      headers:  headers,
    }, function(res) {
      var data = '';
      res.on('data', function(c) { data += c; });
      res.on('end', function() {
        var b;
        try { b = data ? JSON.parse(data) : null; } catch (_e) { b = data; }
        resolve({ status: res.statusCode, body: b });
      });
    });
    req.on('error', reject);
    if (payload) { req.write(payload); }
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Supabase admin helpers
// ---------------------------------------------------------------------------

function svcHeaders() {
  return {
    'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
    'apikey': SERVICE_ROLE_KEY,
  };
}

async function findProfileId(email) {
  var res = await apiRequest(
    SUPABASE_URL + '/rest/v1/profiles?email=eq.' + encodeURIComponent(email) + '&select=id',
    { headers: svcHeaders() }
  );
  return (res.body && res.body[0]) ? res.body[0].id : null;
}

async function approveUser(userId) {
  var r1 = await apiRequest(
    SUPABASE_URL + '/auth/v1/admin/users/' + userId,
    { method: 'PUT', headers: svcHeaders() },
    { email_confirm: true }
  );
  if (r1.status >= 400) {
    throw new Error('Email confirm failed (' + r1.status + '): ' + JSON.stringify(r1.body));
  }
  var r2 = await apiRequest(
    SUPABASE_URL + '/rest/v1/profiles?id=eq.' + userId,
    { method: 'PATCH', headers: Object.assign({}, svcHeaders(), { 'Prefer': 'return=minimal' }) },
    { is_verified: true }
  );
  if (r2.status >= 400) {
    throw new Error('Profile approval failed (' + r2.status + '): ' + JSON.stringify(r2.body));
  }
}

async function deleteUser(userId) {
  await apiRequest(
    SUPABASE_URL + '/auth/v1/admin/users/' + userId,
    { method: 'DELETE', headers: svcHeaders() }
  );
}

// ---------------------------------------------------------------------------
// UI helper
// ---------------------------------------------------------------------------

async function loginAndExpectRedirect(page, email, password, urlPattern) {
  await page.fill('#loginEmail', email);
  await page.fill('#loginPassword', password);
  await page.locator('#loginBtn').click();
  try {
    await page.waitForURL(urlPattern, { timeout: 20000 });
  } catch (_e) {
    var txt = await page.locator('#loginError').textContent().catch(function() { return '(none)'; });
    var vis = await page.locator('#loginError').isVisible().catch(function() { return false; });
    throw new Error(
      'Login did not redirect to expected URL.\n' +
      '  Current: ' + page.url() + '\n' +
      '  Error shown: ' + (vis ? '"' + txt + '"' : 'none')
    );
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Full signup -> admin approval -> dashboard', function() {

  // ---- ORGANIZER -----------------------------------------------------------

  test.describe('Organizer (event planner)', function() {
    var OEMAIL = 'test-e2e-org-' + Date.now() + '@servicewindow.app';
    var OPASS  = 'TestPass1234!';
    var oId    = null;

    test.afterAll(async function() {
      if (oId && SERVICE_ROLE_KEY) {
        await deleteUser(oId).catch(function(e) {
          console.error('[cleanup] organizer user delete failed:', e.message);
        });
      }
    });

    test('Organizer: signup UI -> approval -> login -> planner-dashboard', {
      timeout: 90000,
    }, async function({ page }) {
      

      if (!SERVICE_ROLE_KEY) {
        test.skip(true, 'SUPABASE_SERVICE_ROLE_KEY not set');
        return;
      }

      // Step 1: role selection
      await page.goto('/auth.html', { waitUntil: 'domcontentloaded' });
      var card = page.locator('[data-role="organizer"]');
      await expect(card).toBeVisible({ timeout: 5000 });
      await card.click();
      await expect(card).toHaveClass(/selected/);
      var btn1 = page.locator('#step1Next');
      await expect(btn1).toBeEnabled({ timeout: 3000 });
      await btn1.click();

      // Step 2: account details
      await expect(page.locator('#step2')).toHaveClass(/active/, { timeout: 5000 });
      await page.fill('#businessName', 'E2E Test Events LLC');
      await page.fill('#firstName', 'E2E');
      await page.fill('#lastName', 'Tester');
      await page.fill('#signupEmail', OEMAIL);
      await page.fill('#signupPhone', '(239) 555-0199');
      await page.selectOption('#signupCity', 'Fort Myers');
      await page.fill('#signupPassword', OPASS);
      await page.locator('#step2Next').click();

      // Step 3: verification submit
      await expect(page.locator('#step3')).toHaveClass(/active/, { timeout: 5000 });
      await page.fill('#verifyBio', 'Automated E2E test account -- safe to delete.');
      await page.locator('#step3Submit').click();

      // Success state
      var success = page.locator('#stepSuccess');
      await expect(success, 'stepSuccess should become active').toHaveClass(/active/, { timeout: 20000 });
      await expect(success.locator('h2')).toContainText("You're in the queue");

      // Find user in DB
      await page.waitForTimeout(2000);
      oId = await findProfileId(OEMAIL);
      expect(oId, 'No profile found for ' + OEMAIL).toBeTruthy();

      // Admin approval via service role
      await approveUser(oId);

      // Login -> planner-dashboard
      await page.goto('/auth.html?mode=login', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#loginEmail')).toBeVisible({ timeout: 5000 });
      await loginAndExpectRedirect(page, OEMAIL, OPASS, /planner-dashboard\.html/);
      expect(page.url()).toMatch(/planner-dashboard\.html/);
    });
  });

  // ---- TRUCK ---------------------------------------------------------------

  test.describe('Food truck operator', function() {
    var TEMAIL = 'test-e2e-truck-' + Date.now() + '@servicewindow.app';
    var TPASS  = 'TestPass1234!';
    var tId    = null;

    test.afterAll(async function() {
      if (tId && SERVICE_ROLE_KEY) {
        await deleteUser(tId).catch(function(e) {
          console.error('[cleanup] truck user delete failed:', e.message);
        });
      }
    });

    test('Truck: signup UI -> approval -> login -> truck-dashboard', {
      timeout: 90000,
    }, async function({ page }) {
      

      if (!SERVICE_ROLE_KEY) {
        test.skip(true, 'SUPABASE_SERVICE_ROLE_KEY not set');
        return;
      }

      // Step 1: role selection
      await page.goto('/auth.html', { waitUntil: 'domcontentloaded' });
      var card = page.locator('[data-role="truck"]');
      await expect(card).toBeVisible({ timeout: 5000 });
      await card.click();
      await expect(card).toHaveClass(/selected/);
      // Note: #trialNotice is inside #step2 (hidden on step 1) -- verify
      // truck role via #cuisineGroup visibility after navigating to step 2.
      var btn1 = page.locator('#step1Next');
      await expect(btn1).toBeEnabled({ timeout: 3000 });
      await btn1.click();

      // Step 2: account details (cuisine field confirms truck role is active)
      await expect(page.locator('#step2')).toHaveClass(/active/, { timeout: 5000 });
      await expect(page.locator('#cuisineGroup')).toBeVisible({ timeout: 3000 });
      await page.fill('#businessName', 'E2E Taco Truck');
      await page.fill('#firstName', 'E2E');
      await page.fill('#lastName', 'Trucker');
      await page.fill('#signupEmail', TEMAIL);
      await page.fill('#signupPhone', '(239) 555-0188');
      await page.selectOption('#signupCity', 'Cape Coral');
      await page.selectOption('#cuisineType', 'Latin / Mexican');
      await page.fill('#signupPassword', TPASS);
      await page.locator('#step2Next').click();

      // Step 3: verification submit
      await expect(page.locator('#step3')).toHaveClass(/active/, { timeout: 5000 });
      await page.fill('#verifyBio', 'Automated E2E test truck -- safe to delete.');
      await page.locator('#step3Submit').click();

      // Success state
      var success = page.locator('#stepSuccess');
      await expect(success, 'stepSuccess should become active').toHaveClass(/active/, { timeout: 20000 });
      await expect(success.locator('h2')).toContainText("You're in the queue");

      // Find user in DB
      await page.waitForTimeout(2000);
      tId = await findProfileId(TEMAIL);
      expect(tId, 'No profile found for ' + TEMAIL).toBeTruthy();

      // Admin approval
      await approveUser(tId);

      // Login -> truck-dashboard
      await page.goto('/auth.html?mode=login', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#loginEmail')).toBeVisible({ timeout: 5000 });
      await loginAndExpectRedirect(page, TEMAIL, TPASS, /truck-dashboard\.html/);
      expect(page.url()).toMatch(/truck-dashboard\.html/);
    });
  });

  // ---- PENDING USER BLOCKED ------------------------------------------------

  test.describe('Pending (unverified) user', function() {
    var PEMAIL = 'test-e2e-pending-' + Date.now() + '@servicewindow.app';
    var PPASS  = 'TestPass1234!';
    var pId    = null;

    test.afterAll(async function() {
      if (pId && SERVICE_ROLE_KEY) {
        await deleteUser(pId).catch(function(e) {
          console.error('[cleanup] pending user delete failed:', e.message);
        });
      }
    });

    test('Pending: is_verified=false -> login blocked by gate', {
      timeout: 60000,
    }, async function({ page }) {
      test.setTimeout(60000);

      if (!SERVICE_ROLE_KEY) {
        test.skip(true, 'SUPABASE_SERVICE_ROLE_KEY not set');
        return;
      }

      // Create user directly via admin API (avoids rate-limiting from a third
      // rapid signUp call after the organizer and truck tests)
      var createRes = await apiRequest(
        SUPABASE_URL + '/auth/v1/admin/users',
        { method: 'POST', headers: svcHeaders() },
        { email: PEMAIL, password: PPASS, email_confirm: true }
      );
      expect(
        createRes.status,
        'Admin user create failed (' + createRes.status + '): ' + JSON.stringify(createRes.body)
      ).toBeLessThan(400);
      pId = createRes.body.id;
      expect(pId, 'Admin API returned no user ID').toBeTruthy();

      // Insert profile with is_verified=false (the pending state)
      await apiRequest(
        SUPABASE_URL + '/rest/v1/profiles',
        { method: 'POST', headers: Object.assign({}, svcHeaders(), { 'Prefer': 'resolution=merge-duplicates,return=minimal' }) },
        { id: pId, email: PEMAIL, role: 'organizer', business_name: 'E2E Pending LLC',
          contact_name: 'E2E Pending', city: 'Naples', is_verified: false,
          subscription_plan: 'free', subscription_status: 'active' }
      );

      // Attempt login -- the is_verified gate should block this user
      await page.goto('/auth.html?mode=login', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#loginEmail')).toBeVisible({ timeout: 5000 });
      await page.fill('#loginEmail', PEMAIL);
      await page.fill('#loginPassword', PPASS);
      await page.locator('#loginBtn').click();

      // If gate is broken, user is redirected to a dashboard -- detect that first
      var redirected = await page.waitForURL(
        new RegExp('dashboard'),
        { timeout: 8000 }
      ).then(function() { return true; }).catch(function() { return false; });

      if (redirected) {
        throw new Error('Pending user was incorrectly admitted. URL: ' + page.url());
      }

      // Gate held -- expect the pending verification error message
      var errorEl = page.locator('#loginError');
      await expect(errorEl, 'Expected pending verification error').toBeVisible({ timeout: 20000 });
      await expect(errorEl).toContainText('pending verification', { ignoreCase: true });
      expect(page.url()).toMatch(/auth\.html/);
    });
  });

});
