# Mobile Sidebar — Canonical Pattern & Bug History
> Last updated: 2026-04-24

---

## BUG STATUS: Sign Out button not visible on Android — OPEN

**Symptom**: On Android (Brave + Chrome), sidebar opens but Sign Out button at bottom is either completely hidden (Brave) or footer partially visible but button clipped (Chrome shows email + role pill, no Sign Out).

**All 7 dashboards affected**: admin, truck, planner, venue, property, service-provider, jobs.

### What was tried (FAILED — do not repeat)
1. `env(safe-area-inset-bottom)` padding on sidebar-footer — iOS only, does nothing on Android
2. `height: 100dvh` on sidebar — doesn't account for browser chrome on Android when sidebar first opens
3. `position: sticky; bottom: 0` + `overflow-y: auto` on `.sidebar` — code in place across all 7 files but still not resolving on device

### Root Cause
The sidebar overflows the visible viewport. Android browser chrome (address bar + bottom nav bar) consumes real screen space. When the sidebar first opens, its height equals the full `dvh` value, but the browser chrome reduces the _visible_ area below that. Footer sits below the fold. Nav items don't overflow enough to trigger scroll, so sticky never engages visually.

---

## Correct Fix

The sidebar must use flex-column layout where **only the nav scrolls internally**, not the sidebar itself. This guarantees the footer is always pinned at the visible bottom edge.

### CSS to apply (all 7 dashboards)

**Base rules (outside any media query):**
```css
.sidebar {
  display: flex;
  flex-direction: column;
  /* confirm this is already present — if not, add it */
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 12px 0;
}

.sidebar-footer {
  flex-shrink: 0;
  padding: 16px 20px;
  border-top: 1px solid var(--dark-border);
  /* NO position:sticky here */
}
```

**Mobile @media block — replace current broken rules with:**
```css
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;                   /* fallback */
    height: -webkit-fill-available;  /* Safari iOS — actual visible viewport */
    height: 100dvh;                  /* Chrome/Android/Firefox — last wins */
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 200;
  }
  .sidebar.mobile-open {
    transform: translateX(0);
  }
  /* REMOVE: overflow-y: auto from .sidebar */
  /* REMOVE: position: sticky; bottom: 0 from .sidebar-footer */
}
```

### Why the triple height declaration works
| Declaration | Which browser uses it |
|---|---|
| `100vh` | All browsers (fallback) — includes browser chrome height on Android |
| `-webkit-fill-available` | Safari iOS — actual visible viewport minus Safari chrome |
| `100dvh` | Chrome, Firefox, Android — dynamic viewport height, accounts for browser chrome |

Browser applies the **last declaration it understands**. Chrome/Android gets `100dvh`. Safari iOS gets `-webkit-fill-available`. Old browsers fall back to `100vh`.

### Implementation steps
1. Grep each dashboard for `.sidebar {` and `.sidebar-footer {` to confirm base `flex-direction: column` exists
2. Write a Python script to patch all 7 files — replace the mobile media block rules
3. Specifically: REMOVE `overflow-y: auto` from `.sidebar` in mobile, REMOVE `position: sticky; bottom: 0` from `.sidebar-footer` in mobile
4. Verify with grep that all 7 files are patched
5. Push: `cd "C:\Developer\New ServicwWindow Website"; git add -A; git commit -m "fix: mobile sidebar footer always visible — triple height declaration"; git push origin main`
6. Have Wes hard-refresh on Android Chrome AND Android Brave — Sign Out must be visible without scrolling

---

## Sidebar HTML Structure (reference — do not change)
```html
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <img src="logo.png" class="nav-logo" alt="ServiceWindow">
    <button class="mobile-close" onclick="closeSidebar()">✕</button>
  </div>
  <nav class="sidebar-nav">
    <button class="nav-item active" onclick="showSection('...')">...</button>
    <!-- more nav items -->
  </nav>
  <div class="sidebar-footer">
    <div id="user-name">...</div>
    <div class="role-badge">...</div>
    <button class="btn-signout" id="btn-signout">Sign Out</button>
  </div>
</aside>
```

---

## Anti-Patterns (do not use)
- `position: sticky; bottom: 0` on sidebar-footer — only works if sidebar is scroll container AND content overflows. Fragile, browser-inconsistent.
- `overflow-y: auto` on `.sidebar` in mobile — makes entire sidebar scroll, footer scrolls away
- `env(safe-area-inset-bottom)` as the primary fix — iOS only
- `min-height: 100dvh` instead of `height` — doesn't constrain the sidebar to viewport height
