# Mobile Sidebar — Canonical Pattern & Bug History
> Last updated: 2026-04-24

---

## STATUS: RESOLVED ✅

Sign Out button now visible on Android Chrome and Android Brave (both with and without Brave's bottom nav bar).

---

## Final Working Solution (applied 2026-04-24)

### CSS — mobile @media block
```css
@media (max-width: 768px) {
  .sidebar {
    position: fixed; top: 0; left: 0;
    height: 100vh; height: -webkit-fill-available; height: 100dvh;
    width: 260px;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 160;
  }
  .sidebar.mobile-open { transform: translateX(0); }
  .sidebar-footer {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: #07111a;
    padding: 16px 20px;
    border-top: 1px solid var(--dark-border);
    z-index: 5;
  }
  .sidebar-nav { padding-bottom: 120px; }
}
```

### JS — visualViewport height on open
```javascript
function updateSidebarHeight() {
  if (window.visualViewport) sidebar.style.height = window.visualViewport.height + 'px'
}
function openSidebar() {
  sidebar.classList.add('mobile-open')
  sidebarOverlay.classList.add('show')
  mobileHamburger.classList.add('open')
  updateSidebarHeight()
  window.visualViewport?.addEventListener('resize', updateSidebarHeight)
}
function closeSidebar() {
  sidebar.classList.remove('mobile-open')
  sidebarOverlay.classList.remove('show')
  mobileHamburger.classList.remove('open')
  sidebar.style.height = ''
  window.visualViewport?.removeEventListener('resize', updateSidebarHeight)
}
```

### Why it works
- `position: absolute; bottom: 0` on footer pins it to the literal bottom pixel of the sidebar container — no viewport calculation can push it out
- `padding-bottom: 120px` on nav prevents items from hiding behind the absolute footer
- `visualViewport.height` handles Chrome's address bar reducing visible height
- Combination covers Chrome + Brave + iOS Safari

---

## What NOT to do (all failed)
1. `env(safe-area-inset-bottom)` — iOS only, does nothing on Android
2. `height: 100dvh` alone — doesn't account for Android browser chrome overlays
3. `position: sticky; bottom: 0` — only works if sidebar is scroll container AND overflows; fragile
4. `overflow-y: auto` on `.sidebar` in mobile — makes sidebar scroll, footer scrolls away
5. `padding-bottom` on footer — moves space below button, not button itself

---

## Sidebar HTML Structure (do not change)
```html
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">...</div>
  <nav class="sidebar-nav">
    <button class="nav-item">...</button>
  </nav>
  <div class="sidebar-footer">
    <div id="user-name">...</div>
    <div class="role-badge">...</div>
    <button class="btn-signout" id="btn-signout">Sign Out</button>
  </div>
</aside>
```
