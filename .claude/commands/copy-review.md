# /copy-review — Content & Copy Audit

Audit all visible text in a component or page against the project's content and copy standards. Returns specific rewrite suggestions — not editorial opinions.

## Invocation
```
/copy-review [file path, component, or paste text]
/copy-review src/app/landing/page.tsx
/copy-review [paste the copy block]
```

---

## Audit Checklist — Run Every Item

### 1. Passive Voice

Scan all user-facing text for passive voice constructions:

**Patterns to flag:**
- "[noun] was [verb]ed" → "An error was encountered"
- "will be [verb]ed" → "Your request will be processed"
- "has been [verb]ed" → "Your account has been created"
- "is being [verb]ed" → "Payment is being processed"
- "can be [verb]ed" → "Files can be uploaded here"

For every instance:
```
✏️ PASSIVE VOICE
Found: "[the passive phrase]"
Rewrite: "[active version]"
```

### 2. Vague CTAs

Flag any CTA that does not tell the user exactly what happens when they click:

**Always flag these:**
- "Learn more"
- "Click here"
- "Submit"
- "Continue" (acceptable as a stepper label, flag in other contexts)
- "Get started" (acceptable only if paired with specifics in surrounding context)
- "See more"
- "View details" (flag — view what details?)
- Any CTA where removing the button would leave the user unsure what they'd be missing

For every vague CTA:
```
🔘 VAGUE CTA
Found: "[cta text]"
Context: [where it appears]
Rewrite options:
  1. "[specific option 1]"
  2. "[specific option 2]"
```

### 3. Filler Words and Phrases

Flag and remove:
- "In order to" → "To"
- "Please note that" → remove entirely or restructure
- "It is important to" → state the thing directly
- "Feel free to" → remove
- "Simply" / "Just" / "Easy" / "Easily" — these condescend and often lie
- "World-class" / "Best-in-class" / "Industry-leading" — unsubstantiated superlatives
- "Innovative" / "Cutting-edge" / "Revolutionary" — overused to the point of meaningless
- "Leveraging" / "Utilizing" → "Using"
- "Synergy" / "Ecosystem" / "Paradigm" — flag for clarity

```
🚫 FILLER LANGUAGE
Found: "[the phrase]"
Replace with: "[direct version]" or DELETE
```

### 4. Placeholder Text

- [ ] No "Lorem ipsum" or any Latin placeholder
- [ ] No "[Your headline here]" or "[Company name]" type placeholders
- [ ] No "TODO" or "TBD" in visible UI text
- [ ] No "Test" or "Example" in production-facing copy
- [ ] No generic placeholder names ("John Doe", "user@example.com" in visible UI — acceptable in form hints only)

```
🚫 PLACEHOLDER TEXT
Found: "[the placeholder]"
Required: Replace with realistic copy relevant to the project context
Suggested: "[realistic replacement based on project domain]"
```

### 5. Form Labels That Disappear

- [ ] Every form input has a visible, persistent label element
- [ ] Placeholder text is supplementary only — used for format hints, not as the label
- [ ] Input hint text (below the field) is present for fields with format requirements

```
📋 MISSING PERSISTENT LABEL
Input: [field description]
Problem: Placeholder "[text]" is the only label — disappears on focus
Fix: Add <label> element above or beside the input
Label text suggestion: "[suggested label]"
```

### 6. Headline Formula Check

For every H1, H2, and hero headline:

- [ ] H1 uses Formula 1 (Outcome + Differentiator) or Formula 2 (Problem + Solution)
- [ ] H1 is under 12 words (flag if over)
- [ ] No H1 starts with "Welcome to"
- [ ] No H1 is just a category label (e.g., "Our Services" — that's a nav item, not a headline)
- [ ] H2s summarize what follows (not just label the section)

```
📰 WEAK HEADLINE
Found: "[the headline]"
Type: H[level]
Issue: [what's wrong — no outcome, no differentiator, label not headline, etc.]
Rewrite using Formula [1 or 2]:
  Option 1: "[rewrite]"
  Option 2: "[rewrite]"
```

### 7. Meta Description Check

For any page file that exports `metadata`:
- [ ] `description` is present
- [ ] Length: 150–160 characters (flag if outside this range)
- [ ] Primary keyword appears in first 60 characters
- [ ] Includes a value proposition
- [ ] Active voice, present tense

```
🔍 META DESCRIPTION ISSUE
Found: "[current description]"
Length: [X characters] — [too short/too long/correct]
Issue: [what's wrong]
Rewrite: "[suggested replacement]" ([character count] chars)
```

### 8. Error Messages

- [ ] No raw error codes visible to users ("Error 422", "500 Internal Server Error")
- [ ] Every error message tells the user what to do next
- [ ] No blame language ("You entered an invalid...")
- [ ] Recovery path provided (retry button, contact link, or next step instruction)

```
⚠️ POOR ERROR MESSAGE
Found: "[current message]"
Issues: [no next step / blame language / raw code / etc.]
Rewrite: "[human-readable version with next step]"
```

### 9. Scannable Copy

For any body content blocks:
- [ ] No paragraph exceeds 3 sentences
- [ ] Long-form sections (200+ words) have subheadings
- [ ] Subheadings describe content — not just label the section
- [ ] Lists used for 3+ parallel items instead of run-on sentences

---

## Output Format

**VIOLATIONS** — each with type, the exact text found, and a specific rewrite
**PASSED** — categories with no violations (list only)

End with: `[N] copy issues — [X] critical (CTAs, errors, placeholders), [Y] style (passive, filler, headlines)`

If zero violations: `✓ COPY COMPLIANT — no violations found`
