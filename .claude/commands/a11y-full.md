# /a11y-full — Deep Accessibility Audit

Full WCAG 2.1 AA accessibility audit of a component, page, or user flow. Goes deeper than the render-time axe check in test files — covers interaction patterns, dynamic content, and screen reader behavior.

## Invocation
```
/a11y-full [file path or paste component code]
/a11y-full src/components/Modal/Modal.tsx
/a11y-full src/app/checkout/page.tsx
```

---

## Audit Checklist — Run Every Item

### 1. Keyboard Navigation Order

- [ ] Every interactive element is reachable via `Tab`
- [ ] Tab order follows a logical visual reading order (top-left to bottom-right, or intentionally managed with `tabindex`)
- [ ] No positive `tabindex` values (e.g., `tabindex="2"`) — these break natural order and are almost always wrong
- [ ] `tabindex="0"` used only on elements that genuinely need to be focusable but aren't natively (custom widgets)
- [ ] `tabindex="-1"` used to manage programmatic focus (modal focus, skip links targets) — not to remove elements from tab order arbitrarily

For every violation:
```
⌨️ KEYBOARD NAV ISSUE
Element: [description]
Problem: [what's wrong]
Fix: [specific change required]
```

### 2. ARIA Roles and Labels

- [ ] Semantic HTML is used wherever possible — ARIA only supplements where native semantics are insufficient
- [ ] No ARIA roles that conflict with the element's native role (e.g., `role="button"` on an `<a>`)
- [ ] Every `role` that requires an accessible name has one (`aria-label` or `aria-labelledby`)
- [ ] Interactive custom widgets (combobox, slider, tab panel) implement the full ARIA pattern from WAI-ARIA Authoring Practices
- [ ] No orphaned ARIA attributes (`aria-controls="id"` where `id` doesn't exist)
- [ ] No redundant ARIA (`<button aria-role="button">` is redundant and noise)
- [ ] `aria-hidden="true"` is never applied to focusable elements (hides from screen reader but not keyboard)

```
🏷️ ARIA ISSUE
Element: [code snippet]
Problem: [specific issue]
Fix: [exact corrected markup]
```

### 3. Color Contrast Ratios

Check all text against its background:

| Text type | Minimum ratio |
|-----------|--------------|
| Normal text (< 18pt / < 14pt bold) | 4.5:1 |
| Large text (≥ 18pt / ≥ 14pt bold) | 3:1 |
| UI components and graphical objects | 3:1 |
| Decorative text | No requirement |
| Disabled controls | No requirement |

- [ ] All body text meets 4.5:1 against its background
- [ ] All heading text meets 4.5:1 (or 3:1 if genuinely large)
- [ ] Placeholder text in inputs meets 3:1 (WCAG 1.4.3 applies)
- [ ] Button text against button background meets 4.5:1
- [ ] Error text meets 4.5:1 against its background
- [ ] Link text distinguishable from surrounding text (not color alone)
- [ ] Dark mode: verify all color tokens meet the same ratios

For any failure:
```
🎨 CONTRAST FAILURE
Element: [description]
Foreground: [color value]
Background: [color value]
Current ratio: [X:1]
Required: [4.5:1 or 3:1]
Fix: [adjusted color or token that meets the requirement]
```

### 4. Focus Trap in Modals and Overlays

Any modal, drawer, dialog, or overlay must:
- [ ] Trap focus within the overlay when open — `Tab` and `Shift+Tab` cycle only within
- [ ] Move focus to the first focusable element inside on open (or to the dialog itself if no focusable children)
- [ ] Return focus to the element that triggered the overlay on close
- [ ] Be closeable with `Escape` key
- [ ] Use `role="dialog"` with `aria-modal="true"` and an accessible name via `aria-labelledby`

```tsx
// Required pattern for modals
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  // Focus trap managed by: React FocusLock, Radix UI Dialog, or custom implementation
>
  <h2 id="modal-title">Modal Title</h2>
  {/* content */}
</div>
```

For every focus trap failure:
```
🎯 FOCUS TRAP ISSUE
Component: [name]
Problem: [specific failure]
Fix: [implementation required — library recommendation or pattern]
```

### 5. Screen Reader Announcements for Dynamic Content

- [ ] Content that changes after user action uses `aria-live` regions
- [ ] Status messages (form success, errors, loading state changes) use `role="status"` (polite) or `role="alert"` (assertive)
- [ ] Loading states announce when they complete ("Loading..." → "Content loaded" or content replace)
- [ ] Pagination and infinite scroll announce new content
- [ ] Toast/notification components use `role="alert"` for errors and `role="status"` for success
- [ ] `aria-busy="true"` set on containers during loading

```tsx
// Error announcement
<div role="alert" aria-live="assertive">
  {error && <p>{error}</p>}
</div>

// Status/success announcement
<div role="status" aria-live="polite">
  {successMessage}
</div>
```

```
📢 MISSING ANNOUNCEMENT
Dynamic element: [what changes]
Trigger: [what causes the change]
Missing: [aria-live region or role]
Fix: [exact implementation]
```

### 6. Touch Target Sizes

- [ ] All interactive elements are minimum 44×44px
- [ ] This includes: buttons, links, checkbox/radio hit areas, toggle switches, icon buttons
- [ ] Small visual elements (16px icons) can meet 44px via padding — the visual size doesn't need to be 44px, the interactive area does
- [ ] No two interactive elements are closer than 8px to each other (prevents mis-taps)

```tsx
// Icon button — visual 20px, touch target 44px
<button
  className="p-[12px]" // 20px icon + 24px padding = 44px total
  aria-label="Close"
>
  <X size={20} aria-hidden={true} />
</button>
```

```
👆 TOUCH TARGET TOO SMALL
Element: [description]
Current size: [dimensions]
Fix: Add padding so the interactive area reaches 44×44px
```

### 7. Images and Media

- [ ] All `<img>` and `<Image>` have `alt` attributes
- [ ] Decorative images use `alt=""`
- [ ] Complex images (charts, diagrams) have extended descriptions via `aria-describedby` or a visible caption
- [ ] SVGs used as icons have `aria-hidden="true"` or meaningful titles
- [ ] Video content has captions (flag for manual addition)
- [ ] Audio content has a transcript (flag for manual addition)

### 8. Forms

- [ ] Every input has an associated `<label>` via `htmlFor` or wrapping
- [ ] Required fields are indicated with `aria-required="true"` (and visually)
- [ ] Error messages are associated with inputs via `aria-describedby`
- [ ] Error state communicated with `aria-invalid="true"` on the input

```tsx
// Accessible form field with error
<div>
  <label htmlFor="email">Email address</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={!!error}
    aria-describedby={error ? 'email-error' : undefined}
  />
  {error && (
    <p id="email-error" role="alert">
      {error}
    </p>
  )}
</div>
```

---

## Output Format

**CRITICAL** — Prevents users with disabilities from completing the task. Fix before shipping.
**HIGH** — Significant barrier. Fix before PR merges.
**MEDIUM** — Degrades experience. Fix in current sprint.
**LOW** — Best practice gap. Fix when touching the file again.

End with:
```
A11Y SCORE: [X] issues — [C] critical, [H] high, [M] medium, [L] low
WCAG 2.1 AA status: [PASS / FAIL — X criteria not met]
```

If zero violations: `✓ A11Y CLEAR — no violations found at this audit level`
Note: This audit supplements automated testing — it does not replace running axe in test suite.
