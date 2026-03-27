---
name: sw-design-system
description: "ServiceWindow design system, CSS variables, dark theme rules, component patterns, and UI conventions. Use for ANY styling, layout, or visual change to ServiceWindow HTML files. Prevents design drift and ensures consistency across all pages."
---

# ServiceWindow Design System

Reference this skill before touching any CSS or HTML styling in the ServiceWindow project.

## Core Identity
- Product: ServiceWindow (servicewindow.app)
- Tagline: "Where Events Find Their Truck"
- Visual language: Professional dark SaaS with warm orange energy — NOT a startup toy, NOT a generic food app

---

## Typography (LOCKED — never substitute)
- **Headings**: Sora (Google Fonts)
- **Body / accent**: Lora (Google Fonts)
- **Labels / data / mono**: DM Mono (Google Fonts)

---

## CSS Variables (LOCKED — always use these, never hardcode colors)
```css
--fire: #FF6B35        /* Primary CTA, active states, badges, accents */
--navy: #0D1B2A        /* Dark backgrounds, nav bar, hero */
--smoke: #F5F0EB       /* Light section backgrounds (legacy — being phased to dark) */
--charcoal: #2C3E50    /* Dark text on light backgrounds */
--white: #FFFFFF
```

### Dark Theme Extensions (use these for dark sections)
```css
--dark-hero: linear-gradient(135deg, #0D1B2A 0%, #0d1f2d 100%)
--dark-section: #0d1f2d
--dark-alt: #111f2e          /* Alternate sections for subtle variation */
--dark-card: rgba(255,255,255,0.06)
--dark-border: rgba(255,255,255,0.1)
--text-primary: #ffffff
--text-secondary: rgba(255,255,255,0.85)
--text-muted: rgba(255,255,255,0.6)
```

---

## Logo Rules
- Logo is a base64-embedded SVG (trailer silhouette + wordmark)
- The SVG is **dark-colored by default** — it disappears on dark backgrounds
- **ONLY apply filter to the `<img>` tag itself, never to a parent container**
- To make logo white on dark nav: `img.nav-logo { filter: brightness(0) invert(1); }`
- NEVER apply `filter: brightness()` or `filter: invert()` to any element that contains text — causes pixelation
- Nav logo size: `height: 40px; width: auto;`
- Never constrain logo container below 160px width

---

## Navigation Bar
```css
/* Correct dark nav */
nav {
  background: var(--navy);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
nav a { color: rgba(255,255,255,0.85); }
nav a:hover, nav a.active { color: #ffffff; }
nav .cta-btn { background: var(--fire); color: white; }
```
- Logo left-aligned
- Nav links centered
- CTA button right-aligned (--fire background)
- On scroll: nav stays dark — NO white nav on scroll
- Mobile: hamburger bars must be white on dark nav (`background: white`)

---

## Page-Wide Dark Theme
All sections use dark backgrounds. Apply top to bottom:

```css
/* Hero */
.hero { background: linear-gradient(135deg, var(--navy) 0%, #0d1f2d 100%); }

/* Standard sections */
section { background: #0d1f2d; }

/* Alternating sections */
section:nth-child(even) { background: #111f2e; }

/* All headings in dark sections */
section h1, section h2, section h3 { color: #ffffff; }

/* Body text */
section p, section li { color: rgba(255,255,255,0.85); }

/* Cards / feature boxes */
.card, .feature-box, .stat-tile {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
}

/* Footer */
footer { background: #07111a; color: rgba(255,255,255,0.7); }
```

---

## Buttons
```css
/* Primary CTA */
.btn-primary {
  background: var(--fire);
  color: white;
  border-radius: 8px;
  font-family: Sora, sans-serif;
  font-weight: 600;
}
.btn-primary:hover { background: #e55a2b; }

/* Secondary / outline */
.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
}
```
- NEVER change button colors when applying dark theme
- --fire stays orange on all backgrounds

---

## Badge / Pill Components
```css
/* Fundraiser Friendly badge */
.badge-fundraiser {
  background: var(--fire);
  color: white;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 11px;
  font-family: DM Mono, monospace;
  font-weight: 600;
}

/* Veteran Owned badge */
.badge-veteran {
  background: var(--navy);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 11px;
  font-family: DM Mono, monospace;
}

/* Verified badge */
.badge-verified {
  background: rgba(255,107,53,0.15);
  color: var(--fire);
  border: 1px solid rgba(255,107,53,0.3);
}
```
- Always use CSS variables, not hardcoded hex for badge colors
- If a legacy badge uses hardcoded hex (#E8F5E9, #1565C0 etc.), replace with CSS variables on next touch

---

## Disclaimer / Info Blocks
```css
.disclaimer {
  background: rgba(255,255,255,0.04);
  border-left: 3px solid var(--navy);
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  font-family: DM Mono, monospace;
}
/* On light sections use: */
.disclaimer-light {
  background: #f5f0eb;
  border-left: 3px solid var(--navy);
  color: var(--charcoal);
}
```

---

## Formspree
- Endpoint: `mbdzyold`
- All contact forms, waitlist forms, and request forms submit to:
  `https://formspree.io/f/mbdzyold`

---

## File Conventions
- All files are flat in repo root — no subdirectories for HTML
- Naming: `[role]-dashboard.html`, e.g. `truck-dashboard.html`, `planner-dashboard.html`
- CSS is embedded in `<style>` tags within each HTML file — no external stylesheets
- JS is embedded in `<script>` tags at bottom of each HTML file — no external JS files
- Images: base64 embedded or external CDN only — no local image files

---

## Anti-Patterns (never do these)
- Never apply CSS `filter` to any container that wraps text
- Never use white nav bar background
- Never hardcode `#1565C0` or `#E8F5E9` — use CSS variables
- Never use Bootstrap, Tailwind, or any CSS framework
- Never add `<link>` to external CSS files
- Never create separate `.css` files
- Never change font families — Sora/Lora/DM Mono only
- Never use emojis in production UI text (only in demo/placeholder content)
