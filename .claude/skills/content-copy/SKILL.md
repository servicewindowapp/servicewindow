# Content & Copy Skill
> Auto-apply to all written content in this project. No exceptions.

---

## Voice — Non-Negotiable Rules

**DO:**
- Direct, first or second person ("Get started" / "You'll receive")
- Active voice ("The system sends a confirmation" → "You'll get a confirmation")
- Outcome-focused ("Save 3 hours a week on scheduling")
- Specific and concrete ("500+ food truck operators" not "many operators")
- Conversational but professional — no corporate jargon

**DO NOT:**
- Passive voice ("An error was encountered" → "Something went wrong — try again")
- Filler phrases: "In order to", "Please note that", "It is important to", "Feel free to"
- Vague hedging: "might", "could potentially", "in some cases" (unless genuinely uncertain)
- Tech jargon aimed at non-technical users unless the audience is technical
- Exclamation marks in body copy (one per page maximum, in hero or celebration moments only)
- Ellipsis (`...`) — says nothing, adds nothing

---

## CTAs — Specific and Action-Oriented

**Pattern:** `[Action verb] + [what they get] + [optional: timeframe or qualifier]`

| Bad | Good |
|-----|------|
| Learn more | See how it works |
| Submit | Send my request |
| Click here | View available trucks |
| Get started | Start your free trial |
| Sign up | Join as a food truck |
| Continue | Save and continue |

Rules:
- CTA text must tell the user exactly what happens next when they click
- No two CTAs on the same page should be identical if they lead to different destinations
- Primary CTA: one per page/section
- Destructive actions: include the specific action in the label ("Delete listing" not "Confirm")

---

## Headlines — Formula-Driven

Two approved formulas:

**Formula 1 — Outcome + Differentiator:**
`[What you get] + [why here / what makes it different]`
> "Verified food trucks for your next event — no cold calls, no surprises"
> "Book recurring truck slots in minutes — built for HOA event managers"

**Formula 2 — Problem + Solution:**
`[Pain the user has] + [how this solves it]`
> "Tired of tracking down trucks on Facebook? Browse verified operators in one place."
> "Last-minute cancellations cost you clients. Build a backup bench before you need it."

Rules:
- H1: One per page, uses Formula 1 or 2, no more than 12 words preferred
- H2: Section-level, summarizes what follows, not a label ("How It Works" is weak; "Three steps from search to booked" is strong)
- Avoid questions as headlines unless the answer is immediately provided
- No "Welcome to..." headlines

---

## No Lorem Ipsum — Ever

When placeholder copy is needed, generate realistic content relevant to the project context. For this project (ServiceWindow — food truck marketplace, SWFL):
- Company names: "Coastal Eats LLC", "Fuego Street Kitchen", "The Nacho Truck"
- Event names: "Cape Coral HOA Monthly Night Market", "Estero Community Block Party"
- Cuisine types: "Tacos, BBQ, Mediterranean, Asian Fusion, Desserts"
- Planner names: "Marcus T.", "Sandra R.", "Cape Coral Community Association"
- Prices: "$49/mo", "$29 founding rate", "$450 event booking"

For non-ServiceWindow projects, generate realistic copy in the project's domain.

---

## Error Messages — Human-Readable, Actionable

**Pattern:** `[What happened] + [What to do next]`

| Bad | Good |
|-----|------|
| Error 422 | We couldn't save your changes — check that all required fields are filled in. |
| Invalid input | That email address doesn't look right — try "name@example.com". |
| Request failed | We couldn't connect to the server. Check your internet connection and try again. |
| Unauthorized | You don't have permission to do that. Contact your account admin. |
| Not found | That page doesn't exist. [Go to homepage] |

Rules:
- Never show raw error codes to users (log them, don't display them)
- Never blame the user ("You entered an invalid..." → "That doesn't look right...")
- Always include the next step — never leave the user at a dead end
- For recoverable errors: include a retry action
- For unrecoverable errors: include a contact or fallback path

---

## Form Labels — Explicit and Persistent

- Labels must be visible at all times — never placeholder-only
- Placeholder text is supplementary hint text only — it disappears on focus
- Label text: noun or short phrase describing what to enter ("Business name", "Email address")
- Placeholder text (when used): example value or format hint ("e.g., Fuego Street Kitchen", "you@example.com")
- Helper text: appears below the input, explains constraints ("Must be at least 8 characters")
- Required fields: marked explicitly — asterisk with a legend, or "(required)" in label

```
✓ [Label: "Email address"] [Input: placeholder "you@example.com"]
✗ [Input: placeholder "Email address" — label disappears on focus]
```

---

## Meta Descriptions

**Formula:** `[Primary keyword phrase] + [value proposition] + [optional CTA]`

Constraints:
- 150–160 characters exactly (flag if outside this range)
- Include the page's primary keyword in the first 60 characters
- No keyword stuffing — one to two keyword variations, naturally written
- Present tense, active voice

Examples:
```
"Browse verified food trucks in Southwest Florida. Find cuisine, check availability, 
and book directly — no middlemen. 21 cities covered." (152 chars)

"List your food truck on ServiceWindow and reach event planners, HOAs, and venues 
across SWFL. Free 30-day trial, no credit card needed." (137 chars)
```

---

## Scannable Copy Rules

Body content:
- Maximum 3 sentences per paragraph
- One idea per paragraph
- Subheadings every 200–300 words in long-form content
- Subheadings describe what follows — not clever wordplay that obscures meaning
- Bullet lists for 3+ parallel items
- Bold for key terms on first use only — not for decoration
- No walls of text — if a section exceeds 4 paragraphs, restructure with a subheading

UI copy:
- Tooltip: 1 sentence max, ends without a period
- Empty states: 2 lines max — what's empty + what to do about it
- Confirmation messages: past tense ("Booking sent" not "Your booking has been sent successfully and will be processed")
- Success messages: specific ("Truck profile saved" not "Success!")

---

## Applying This Skill

Before submitting any copy:
1. Read every sentence — rewrite any passive voice
2. Check every CTA — does it say exactly what happens next?
3. Verify no lorem ipsum anywhere
4. Check every error message — does it tell the user what to do?
5. Check every form label — is it visible and persistent?
6. Check any meta description — is it 150–160 characters with the keyword in first 60?
7. Count paragraph sentences — flag any over 3

If a design asks for copy that violates these rules, write compliant copy and note what was changed.
