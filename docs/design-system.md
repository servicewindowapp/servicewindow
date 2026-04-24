# ServiceWindow — Design System
> Canonical reference. Match this exactly in all HTML files.

---

## Brand Identity
- **Product**: ServiceWindow (servicewindow.app)
- **Tagline**: "Where Events Find Their Truck"
- **Visual language**: Professional dark SaaS with warm orange energy — NOT a startup toy, NOT a generic food delivery app

---

## Typography (LOCKED — never substitute)

| Role | Font | Import |
|------|------|--------|
| Headings | Sora | Google Fonts |
| Body / accent text | Lora | Google Fonts |
| Labels / data / mono | DM Mono | Google Fonts |

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body { font-family: 'Lora', Georgia, serif; }
h1, h2, h3, .nav-link, .btn { font-family: 'Sora', sans-serif; }
.label, .tag, .stat, code { font-family: 'DM Mono', monospace; }
```

---

## Color System (LOCKED — always use CSS variables, never hardcode)

```css
:root {
  /* Brand */
  --fire: #FF6B35;        /* Primary CTA, active states, badges, accents */
  --navy: #0D1B2A;        /* Dark backgrounds, nav, hero */
  --smoke: #F5F0EB;       /* Light section backgrounds (legacy — phasing to dark) */
  --charcoal: #2C3E50;    /* Dark text on light backgrounds */
  --white: #FFFFFF;

  /* Dark Theme Extensions */
  --dark-hero: linear-gradient(135deg, #0D1B2A 0%, #0d1f2d 100%);
  --dark-section: #0d1f2d;
  --dark-alt: #111f2e;              /* Alternate sections for subtle visual rhythm */
  --dark-card: rgba(255,255,255,0.06);
  --dark-border: rgba(255,255,255,0.1);

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.85);
  --text-muted: rgba(255,255,255,0.6);
}
```

---

## Theme Rule
**All pages are dark.** Navy backgrounds throughout. No white pages. Light sections (`--smoke`) are legacy — new pages use dark alternatives.

---

## Logo Rules
- File: `logo.png` in repo root
- Logo is dark-colored by default — invisible on dark backgrounds without the filter below
- **Apply filter to the `<img>` tag only, never to a parent container**
- White on dark nav: `filter: brightness(0) invert(1);`
- Never apply `filter: brightness()` to any element containing text — causes pixelation
- Nav logo size: `height: 40px; width: auto;`
- Never constrain logo container below 160px width

---

## Navigation Bar

```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: var(--navy);
  border-bottom: 1px solid var(--dark-border);
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Layout: logo left | links center | CTA right */
.nav-logo { height: 40px; width: auto; filter: brightness(0) invert(1); }
.nav-links { display: flex; gap: 24px; }
.nav-links a { color: var(--text-secondary); font-family: 'Sora', sans-serif; font-size: 0.9rem; }
.nav-links a:hover, .nav-links a.active { color: var(--text-primary); }
.nav-cta { background: var(--fire); color: white; padding: 8px 20px; border-radius: 6px; }
```

Rules:
- Nav stays dark on scroll — NO white nav
- Mobile: hamburger bars must be white (`background: white`) on dark nav
- Nav height: 64px. Content area below nav starts with `padding-top: 64px`

---

## Buttons

```css
/* Primary CTA */
.btn-primary {
  background: var(--fire);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}
.btn-primary:hover { background: #e55a28; transform: translateY(-1px); }

/* Secondary / outline */
.btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid var(--dark-border);
  padding: 14px 28px;
  border-radius: 8px;
  font-family: 'Sora', sans-serif;
  font-weight: 600;
}
.btn-secondary:hover { border-color: white; background: rgba(255,255,255,0.06); }
```

---

## Cards (Dark)

```css
.card {
  background: var(--dark-card);
  border: 1px solid var(--dark-border);
  border-radius: 12px;
  padding: 24px;
}
.card:hover {
  border-color: var(--fire);
  background: rgba(255,107,53,0.06);
}
```

---

## Badge / Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 20px;
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-verified { background: rgba(255,107,53,0.15); color: var(--fire); border: 1px solid rgba(255,107,53,0.3); }
.badge-pending  { background: rgba(255,193,7,0.15); color: #ffc107; border: 1px solid rgba(255,193,7,0.3); }
.badge-free     { background: rgba(255,255,255,0.08); color: var(--text-muted); border: 1px solid var(--dark-border); }
```

---

## Form Inputs (Dark)

```css
input, select, textarea {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--dark-border);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--text-primary);
  font-family: 'Lora', serif;
  width: 100%;
}
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--fire);
  background: rgba(255,107,53,0.06);
}
input::placeholder { color: var(--text-muted); }
```

---

## Section Spacing

```css
section {
  padding: 80px 20px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 768px) {
  section { padding: 48px 16px; }
}
```

---

## Mobile Rules (Primary target: mobile phones)
- All layouts use CSS Grid or Flexbox with `flex-wrap: wrap`
- Grid: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- Touch targets minimum 44px height
- No hover-only interactions — all interactive elements tap-accessible
- Font sizes: body min 16px, labels min 14px
- Fixed nav: always 64px, never collapses awkwardly

---

## Footer

```css
footer {
  background: var(--navy);
  border-top: 1px solid var(--dark-border);
  padding: 40px 20px;
  color: var(--text-muted);
  font-family: 'DM Mono', monospace;
  font-size: 0.85rem;
}
```

Footer copy: `"Fort Myers · Cape Coral · Naples · Sarasota and beyond."`

---

## Do Not
- No Bootstrap, no Tailwind, no external CSS frameworks
- No white or light nav bars
- No hardcoded color hex values outside of `:root`
- No light mode variations
- No CSS files — all styles embedded in `<style>` tags per page
- No hover-only states on mobile-critical actions
