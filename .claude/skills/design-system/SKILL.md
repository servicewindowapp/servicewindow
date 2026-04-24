# Design System Skill
> Auto-apply to all UI work in this project. No exceptions.

---

## Typography Scale — 1.25 Modular Scale, rem units

| Token | rem | px equiv | Usage |
|-------|-----|----------|-------|
| `--text-h1` | 2.441rem | ~39px | Page titles, hero headings |
| `--text-h2` | 1.953rem | ~31px | Section headings |
| `--text-h3` | 1.563rem | ~25px | Subsection headings |
| `--text-h4` | 1.25rem | ~20px | Card titles, labels as headings |
| `--text-body` | 1rem | 16px | Default body text |
| `--text-label` | 0.8rem | ~13px | Form labels, captions, metadata |
| `--text-caption` | 0.64rem | ~10px | Fine print, legal, timestamps |

Line heights:
- Headings: `--leading-tight: 1.2`
- Body: `--leading-body: 1.6`
- Labels/captions: `--leading-snug: 1.4`

Font weights: 400 (body), 500 (label/medium), 600 (subheading), 700 (heading)

**Rule:** Never use arbitrary font sizes. Every size references a `--text-*` token.

---

## Spacing Scale — 4px base unit

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

In Tailwind, map these to: `p-1`(4px), `p-2`(8px), `p-3`(12px), `p-4`(16px), `p-6`(24px), `p-8`(32px), `p-12`(48px), `p-16`(64px), `p-24`(96px) — Tailwind's default 4px base aligns exactly.

**Rule:** No arbitrary spacing values (`p-[13px]`, `mt-[7px]`). If a design calls for an off-scale value, flag it and negotiate to the nearest token.

---

## Color Tokens — CSS Custom Properties

### Light Mode (define in `:root`)

```css
:root {
  /* Primary — main brand color */
  --color-primary-50:  /* lightest tint */;
  --color-primary-100: ;
  --color-primary-200: ;
  --color-primary-300: ;
  --color-primary-400: ;
  --color-primary-500: /* base */;
  --color-primary-600: ;
  --color-primary-700: ;
  --color-primary-800: ;
  --color-primary-900: /* darkest shade */;

  /* Secondary */
  --color-secondary-50 through --color-secondary-900: (same pattern);

  /* Accent */
  --color-accent-50 through --color-accent-900: (same pattern);

  /* Neutral — grays */
  --color-neutral-0:   #ffffff;
  --color-neutral-50:  ;
  --color-neutral-100: ;
  --color-neutral-200: ;
  --color-neutral-300: ;
  --color-neutral-400: ;
  --color-neutral-500: ;
  --color-neutral-600: ;
  --color-neutral-700: ;
  --color-neutral-800: ;
  --color-neutral-900: #000000;

  /* Semantic */
  --color-success:      /* green-600 equiv */;
  --color-success-bg:   /* green-50 equiv */;
  --color-warning:      /* amber-500 equiv */;
  --color-warning-bg:   /* amber-50 equiv */;
  --color-error:        /* red-600 equiv */;
  --color-error-bg:     /* red-50 equiv */;
  --color-info:         /* blue-600 equiv */;
  --color-info-bg:      /* blue-50 equiv */;

  /* Surface / background aliases */
  --color-bg:           var(--color-neutral-0);
  --color-bg-subtle:    var(--color-neutral-50);
  --color-bg-muted:     var(--color-neutral-100);
  --color-border:       var(--color-neutral-200);
  --color-border-strong:var(--color-neutral-300);
  --color-text:         var(--color-neutral-900);
  --color-text-muted:   var(--color-neutral-600);
  --color-text-subtle:  var(--color-neutral-400);
}
```

### Dark Mode (define in `.dark` or `@media (prefers-color-scheme: dark)`)

```css
.dark {
  --color-bg:            var(--color-neutral-900);
  --color-bg-subtle:     var(--color-neutral-800);
  --color-bg-muted:      var(--color-neutral-700);
  --color-border:        var(--color-neutral-700);
  --color-border-strong: var(--color-neutral-600);
  --color-text:          var(--color-neutral-50);
  --color-text-muted:    var(--color-neutral-400);
  --color-text-subtle:   var(--color-neutral-600);

  /* Every semantic color must have a dark counterpart */
  --color-success:       /* lighter green for dark bg */;
  --color-success-bg:    /* dark green bg */;
  --color-warning:       /* lighter amber */;
  --color-warning-bg:    /* dark amber bg */;
  --color-error:         /* lighter red */;
  --color-error-bg:      /* dark red bg */;
  --color-info:          /* lighter blue */;
  --color-info-bg:       /* dark blue bg */;
}
```

**Rule:** Never hardcode a hex color in a component. Every color is a CSS variable or a Tailwind class that maps to one. When asked to add a color, assign it to the closest token or flag that a new token is needed.

---

## Motion Tokens

```css
:root {
  --duration-fast:     150ms;
  --duration-standard: 250ms;
  --duration-slow:     400ms;

  --ease-default:      cubic-bezier(0.4, 0, 0.2, 1);   /* material standard */
  --ease-in:           cubic-bezier(0.4, 0, 1, 1);
  --ease-out:          cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1); /* slight overshoot */
}
```

**Rule:** No arbitrary transition durations or easing curves. Every animation uses `var(--duration-*)` and `var(--ease-*)`.

Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Iconography — Lucide React

- Default: `lucide-react` exclusively unless project spec says otherwise
- Consistent sizing: `size={16}` (inline/label), `size={20}` (default UI), `size={24}` (feature/hero)
- Always pass `aria-hidden={true}` on decorative icons; add `aria-label` on standalone interactive icons
- Never use emoji as icons in UI components

```tsx
import { ChevronRight } from 'lucide-react'

// Decorative (inside a labeled button)
<ChevronRight size={16} aria-hidden={true} />

// Standalone interactive
<ChevronRight size={20} aria-label="Next page" role="img" />
```

---

## Component Patterns

### Buttons

All buttons: `transition-colors var(--duration-fast) var(--ease-default)`, minimum 44×44px touch target, visible focus ring.

| Variant | Use case | Background | Text | Border |
|---------|----------|-----------|------|--------|
| Primary | Main CTA | `--color-primary-500` | white | none |
| Secondary | Supporting action | transparent | `--color-primary-500` | `--color-primary-500` |
| Ghost | Low-emphasis | transparent | `--color-text-muted` | none |
| Destructive | Delete / irreversible | `--color-error` | white | none |

States for all variants:
- `:hover` — darken background 1 shade
- `:focus-visible` — 2px outline, `--color-primary-500`, 2px offset
- `:disabled` — 50% opacity, `cursor-not-allowed`, no hover effect
- Loading — spinner replaces or precedes label, button remains disabled

### Form Inputs

- Height: 40px (default), 32px (compact)
- Padding: `--space-3` horizontal, `--space-2` vertical
- Border: 1px `--color-border`, radius `--radius-md`
- Focus: border color `--color-primary-500`, ring `2px --color-primary-200`
- Error: border color `--color-error`, helper text in `--color-error`
- Disabled: background `--color-bg-muted`, `cursor-not-allowed`
- Label: always above the input, never placeholder-only
- Helper text: below input in `--text-label`, `--color-text-muted`

### Cards

- Background: `--color-bg`
- Border: 1px `--color-border`
- Radius: `--radius-lg` (8px)
- Padding: `--space-6` default, `--space-4` compact
- Shadow: subtle `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
- Interactive cards: `:hover` elevates shadow, `transition var(--duration-fast)`

### Modals

- Overlay: `rgba(0,0,0,0.5)`, fade in `var(--duration-standard)`
- Panel: centered, max-width `640px` default, `--radius-xl`, `--space-8` padding
- Focus trap: required — first focusable element receives focus on open, returns to trigger on close
- Close button: top-right corner, `aria-label="Close dialog"`
- Dismiss: `Escape` key closes, clicking overlay closes (unless `modal` role requires explicit action)

### Navigation

- Active state: `--color-primary-500` text or left border indicator
- Hover: `--color-bg-subtle` background
- Height: 64px (topnav), 48px (secondary nav)
- Mobile: hamburger at `md:` breakpoint, drawer pattern preferred over dropdown

---

## Border Radius Tokens

```css
:root {
  --radius-sm:  4px;
  --radius-md:  6px;
  --radius-lg:  8px;
  --radius-xl:  12px;
  --radius-2xl: 16px;
  --radius-full: 9999px; /* pills, avatars */
}
```

---

## Applying This Skill

When generating any UI code, before writing a single class or style:
1. Identify the component pattern (button, input, card, etc.) — apply the pattern above
2. Check every color — is it a token? If not, map it to one
3. Check every spacing value — is it on the 4px scale?
4. Check every animation — is it using duration and easing tokens?
5. Check every font size — is it a `--text-*` token?

If a design spec violates any of these, flag it before implementing.
