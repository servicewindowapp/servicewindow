# /dependency-check — Pre-Install Package Audit

Before installing any npm package, run this check. Prevents bad dependencies from entering the project.

## Invocation
```
/dependency-check [package-name]
/dependency-check [package-name]@[version]
/dependency-check lodash date-fns react-hook-form  ← multiple at once
```

---

## What This Command Does

For each package, answer all seven questions before giving an install recommendation. Never recommend installing a package until all seven are answered.

---

## The Seven Questions

### 1. What does it do — and is there a native/existing alternative?

Before checking anything external:
- Is there a **Web API** that covers this need? (`IntersectionObserver`, `ResizeObserver`, `Intl`, `URL`, `fetch`, etc.)
- Is there a **React built-in** that covers this? (`useTransition`, `useDeferredValue`, `Suspense`, etc.)
- Is there a **Next.js built-in** that covers this? (`next/image`, `next/font`, `next/link`, `next/script`)
- Is there an **already-installed package** that partially covers this? (If `date-fns` is installed, don't add `moment`)
- Is the functionality small enough to implement directly? (A 5-line utility vs. a 50kb library)

If a native or existing solution covers 80%+ of the need:
```
⚠️ NATIVE ALTERNATIVE EXISTS
Package: [name]
You need: [the functionality]
Already available: [Web API or existing package]
Recommendation: Use [alternative] — no new dependency needed
Implementation: [code snippet showing how to do it natively]
```

### 2. Bundle Size

Check: https://bundlephobia.com/package/[name]

Report:
- Minified size
- Gzipped size
- Whether it's tree-shakeable (can you import just the piece you need?)
- Size comparison to alternatives

```
📦 BUNDLE SIZE
[package]: [X]kb minified / [Y]kb gzipped
Tree-shakeable: [yes/no/partial]
Route budget impact: [adds X% to the 150kb gzipped limit]
```

Flag if gzipped size > 50kb without clear justification.

### 3. Last Publish Date

Check npmjs.com or the package's GitHub.

```
📅 MAINTENANCE STATUS
Last published: [date]
GitHub activity: [last commit date, open issues count]
```

Flag if:
- No update in 12+ months AND has open security issues
- No update in 24+ months (possible abandonment)
- No GitHub repository or source available

### 4. Weekly Downloads

Check npmjs.com download stats.

```
📊 ADOPTION
Weekly downloads: [number]
Trend: [growing/stable/declining]
```

Flag if:
- < 10,000 weekly downloads (limited community, slower security response)
- Sharp declining trend over last 6 months

### 5. Security — CVE Check

Check: https://snyk.io/vuln/?q=[package-name] or `npm audit` would reveal after install.

```
🔒 SECURITY
Known CVEs: [none / list critical+high ones]
Snyk score: [if available]
```

**Hard stop** if any unpatched critical or high CVEs exist:
```
🔴 SECURITY STOP — Do not install
Package: [name]
CVE: [CVE ID and description]
Status: Unpatched as of [date]
Action: Find an alternative or wait for a patched version
```

### 6. License

Confirm the license is compatible with the project's use:

```
📄 LICENSE
License: [MIT/Apache/BSD/GPL/etc.]
Commercial use: [permitted/restricted]
```

Flag any GPL or AGPL license — these can create licensing obligations for commercial projects.

### 7. TypeScript Support

```
🔷 TYPESCRIPT
Types: [bundled / @types/[name] / none]
DefinitelyTyped quality: [maintained/outdated/missing]
```

Flag if no types are available — adds `any` risk unless custom declarations are written.

---

## Output Format

```
DEPENDENCY CHECK: [package-name]@[version]

PURPOSE: [one-line description]

1. NATIVE ALTERNATIVE: [Yes — use X / No — no alternative]
2. BUNDLE SIZE: [X]kb gzipped — [acceptable/flag]
3. MAINTENANCE: Last published [date] — [active/stale/flag]
4. ADOPTION: [N]k weekly downloads — [strong/adequate/flag]
5. SECURITY: [Clean / N CVEs — [severity]]
6. LICENSE: [MIT/etc.] — [compatible/flag]
7. TYPESCRIPT: [bundled/via @types/name/none]

RECOMMENDATION: [INSTALL / DO NOT INSTALL / INSTALL WITH CAUTION]

[If INSTALL]
Install command: npm install [package-name]
[If dev-only]: npm install --save-dev [package-name]
Usage note: [any specific import pattern for tree-shaking or security]

[If DO NOT INSTALL]
Reason: [specific blocker]
Alternative: [what to use instead]

[If INSTALL WITH CAUTION]
Proceed only if: [specific condition — user acknowledges X, alternative considered]
```

---

## Auto-Flag Rules

These patterns always produce a hard stop regardless of other factors:

- Known unpatched critical/high CVE → 🔴 STOP
- GPL/AGPL license in a commercial project → 🔴 STOP (flag for legal review)
- Package is a known malware or typosquat → 🔴 STOP
- Package explicitly deprecated with a named successor → 🟡 FLAG (use successor instead)
- No TypeScript types and no `@types/` available → 🟡 FLAG (custom declarations needed)
- Gzipped bundle > 50kb for single-purpose utility → 🟡 FLAG (consider native)
