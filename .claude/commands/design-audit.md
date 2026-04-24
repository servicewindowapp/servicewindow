# /design-audit — Design System Compliance Review

Review a component or page against the project's design system. Produces specific, line-level findings — not general suggestions.

## Invocation
```
/design-audit [file path or paste component code]
/design-audit src/components/Card/Card.tsx
```

---

## Audit Checklist — Run Every Item

### 1. Hardcoded Colors — Zero Tolerance

Scan for any color value that is not a CSS custom property or Tailwind class:

- [ ] No hex colors in JSX (`style={{ color: '#FF0000' }}`, `className="text-[#FF0000]"`)
- [ ] No rgb/hsl values in JSX or CSS modules
- [ ] No Tailwind colors that aren't mapped to design tokens (e.g., `bg-blue-500` instead of `bg-primary-500`)
- [ ] Dark mode: does every color have a `.dark:` counterpart or use a token that does?
- [ ] Semantic colors used appropriately: errors use `--color-error`, success uses `--color-success`, etc.

For every violation, output:
```
🎨 HARDCODED COLOR
Line: [line number or code snippet]
Found: [the hardcoded value]
Replace with: [the correct token or class]
```

### 2. Arbitrary Spacing Values

- [ ] No arbitrary Tailwind spacing (`p-[13px]`, `mt-[7px]`, `gap-[11px]`)
- [ ] No inline style spacing (`style={{ marginTop: '13px' }}`)
- [ ] All spacing values are on the 4px scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- [ ] Padding and margin are consistent with the component pattern (cards: `p-6`, inputs: `px-3 py-2`, etc.)

For every violation:
```
📐 ARBITRARY SPACING
Line: [code snippet]
Found: [the value]
Nearest token: [correct Tailwind class or CSS variable]
```

### 3. Dark Mode Gaps

- [ ] Every background color has a `dark:` counterpart
- [ ] Every text color has a `dark:` counterpart
- [ ] Every border color has a `dark:` counterpart
- [ ] No component relies solely on a static color without dark mode consideration
- [ ] Semantic colors (error, success, warning, info) have dark variants

For every gap:
```
🌙 MISSING DARK MODE
Element: [what it is]
Light mode class: [current class]
Missing: [the dark: class that should be added]
```

### 4. Non-Tokenized Animation Values

- [ ] No arbitrary transition durations (`transition-[300ms]`, `duration-[333ms]`)
- [ ] No arbitrary easing curves (`ease-[cubic-bezier(0.1,0.5,0.9,0.1)]`)
- [ ] All animations use: `duration-[var(--duration-fast/standard/slow)]` or the token values (150ms, 250ms, 400ms)
- [ ] `prefers-reduced-motion` is respected — no animation without the media query handling

For every violation:
```
⚡ NON-TOKENIZED ANIMATION
Line: [code snippet]
Found: [the value]
Replace with: [the token — duration-150, duration-250, or duration-400]
```

### 5. Inconsistent Component States

Check against the design system patterns for the component type:

**Buttons:**
- [ ] Has `:hover` state (Tailwind `hover:`)
- [ ] Has `:focus-visible` ring (not `:focus` — that fires on click too)
- [ ] Has `:disabled` state with `cursor-not-allowed` and reduced opacity
- [ ] Loading state handled if applicable (spinner + disabled)

**Inputs:**
- [ ] Has focus ring using primary color
- [ ] Has error state (border color change + error text)
- [ ] Has disabled state

**Interactive cards:**
- [ ] Has hover shadow elevation
- [ ] Has focus-visible outline if keyboard navigable

For every missing state:
```
🔘 MISSING COMPONENT STATE
Component: [name]
Missing state: [hover/focus/disabled/loading]
Add: [the Tailwind classes required]
```

### 6. Typography Violations

- [ ] No arbitrary font sizes (`text-[17px]`, `text-[1.1rem]`)
- [ ] All sizes are from the scale: `text-xs`(caption), `text-sm`(label), `text-base`(body), `text-xl`(h4), `text-2xl`(h3), `text-3xl`(h2), `text-4xl`(h1)
- [ ] Font weights are one of: 400, 500, 600, 700

### 7. Icon Usage

- [ ] All icons are from `lucide-react` (unless project explicitly specifies otherwise)
- [ ] Icons are one of three sizes: 16px (inline), 20px (default), 24px (feature)
- [ ] Decorative icons have `aria-hidden={true}`
- [ ] Standalone interactive icons have `aria-label`

---

## Output Format

**VIOLATIONS** — list each with type, location, found value, and exact replacement
**COMPLIANT** — list categories that passed (brief)

End with: `[N] violations found — [X] color, [Y] spacing, [Z] other`

If zero violations: `✓ DESIGN SYSTEM COMPLIANT — no violations found`
