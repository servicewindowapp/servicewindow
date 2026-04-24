# Security & Environment Skill
> Security flags are non-negotiable stops. Do not proceed past a flagged issue without explicit user instruction.

---

## Secrets and Environment Variables — Hard Stop

**Rule:** No secret, API key, token, connection string, or credential ever appears in source code.

Any time code contains or is about to contain:
- An API key (any format: `sk-`, `pk_`, `Bearer `, base64 encoded, etc.)
- A database connection string
- A private key or certificate
- An OAuth client secret
- A webhook secret
- A third-party service credential

**Stop immediately. Do not write the code.** Instead, output:

```
🔴 SECURITY STOP — Secret detected
Pattern: [what was about to be written]
Action required:
1. Add to .env.local: [VARIABLE_NAME]="your-value-here"
2. Add to .env.example: [VARIABLE_NAME]="" (no value — just the key)
3. Verify .env.local is in .gitignore
4. In code: process.env.VARIABLE_NAME or import from a config module
5. In Vercel/deployment: add to environment variables in dashboard
```

Never suggest that secrets are acceptable "temporarily" or "for development."

---

## `dangerouslySetInnerHTML` — Mandatory Justification Gate

Any use of `dangerouslySetInnerHTML` requires:

1. **Explicit user instruction** — never suggest or generate it proactively
2. **A documented reason** as a comment in the code explaining why it's necessary
3. **Sanitization** — DOMPurify or equivalent must wrap every input before injection

```tsx
// ❌ NEVER
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✓ Only after explicit instruction + sanitization
import DOMPurify from 'dompurify'

const sanitized = DOMPurify.sanitize(userContent, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
  ALLOWED_ATTR: []
})
<div dangerouslySetInnerHTML={{ __html: sanitized }} />
// Reason: [must be documented here]
```

Flag `DOMPurify` as a new dependency before adding it — user must approve.

---

## External API Calls — Required Patterns

Every external API call must include:

```typescript
// ✓ Required pattern
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 10_000) // 10s timeout

try {
  const response = await fetch(url, {
    signal: controller.signal,
    headers: { /* explicit headers */ }
  })
  clearTimeout(timeoutId)

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return await response.json()
} catch (error) {
  if (error instanceof Error && error.name === 'AbortError') {
    throw new Error('Request timed out — please try again')
  }
  throw error
} finally {
  clearTimeout(timeoutId)
}
```

Rules:
- Timeout on every external call — default 10s, flag if longer is justified
- Never swallow errors silently (`catch (e) {}` is a bug)
- HTTP error status codes (4xx, 5xx) must be caught — `response.ok` check required
- Error boundaries must wrap components that depend on external data

---

## Authentication Routes — No Silent Failures

Every protected route must:

```typescript
// Next.js App Router — server component
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function ProtectedPage() {
  const session = await getSession()

  if (!session) {
    redirect('/login?next=/protected-path')
    // Never: return null, return <div />, or silently render nothing
  }

  return <PageContent session={session} />
}
```

Rules:
- Unauthenticated access must redirect — never render a partial or empty page
- Redirect must preserve the intended destination via query param
- Session expiry during a session must redirect with an explanatory message
- Never expose user IDs, session tokens, or auth state in URL parameters
- API routes that require auth must return `401` (not `404`) for unauthenticated requests — `404` can leak route existence to attackers

---

## Database Input Validation — Both Sides Required

When any input connects to a database:

```
🟡 SECURITY FLAG — Server-side validation required
Client-side validation detected on [field name].
Client-side validation can be bypassed.
Before this code is complete, add server-side validation:
- Next.js API route / Server Action: validate with Zod or equivalent before any DB call
- Supabase: verify RLS policies cover this operation
- Return 400 with descriptive error if validation fails — never insert unvalidated data
```

Required pattern for any data mutation:

```typescript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100).trim(),
  // ... all fields explicitly typed and constrained
})

export async function POST(request: Request) {
  const body = await request.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return Response.json(
      { error: 'Invalid input', details: result.error.flatten() },
      { status: 400 }
    )
  }

  // Only reach the DB with validated data
  await db.insert(result.data)
}
```

---

## CORS Configuration

```
🔴 SECURITY STOP — Wildcard CORS in production
origin: '*' is unacceptable in production API routes.
```

Required:
```typescript
const allowedOrigins = [
  process.env.NEXT_PUBLIC_APP_URL,
  // additional origins explicitly listed
].filter(Boolean)

const origin = request.headers.get('origin')
const isAllowed = allowedOrigins.includes(origin ?? '')

// Only set CORS headers for allowed origins
if (isAllowed) {
  headers.set('Access-Control-Allow-Origin', origin!)
}
```

Never suggest `Access-Control-Allow-Origin: *` for routes that handle user data or authentication.

---

## Dependency CVE Check

Before any `npm install` recommendation:

```
📦 DEPENDENCY CHECK — [package-name]
Before installing, verify:
1. CVEs: https://snyk.io/vuln/?q=[package-name] or `npm audit` after install
2. Last published: check npmjs.com — flag if > 12 months with no updates
3. Weekly downloads: flag if < 10,000/week (limited community, slower CVE response)
4. Bundle size: bundlephobia.com/package/[package-name] — flag if > 50kb gzipped
5. Native alternative: confirm no Web API, React built-in, or existing dependency covers this need

If any of the above are red flags, do not proceed — present findings to user first.
```

Flag any package with:
- Known critical or high CVEs that are unpatched
- No updates in 12+ months with open security issues
- A gzipped bundle > 50kb without clear justification

---

## Rate Limiting — Public API Routes

Any public-facing API route (no authentication required) must be flagged:

```
🟡 SECURITY FLAG — Public API route without rate limiting
Route: [path]
This route is accessible without authentication.
Before production, add rate limiting to prevent abuse:
- Recommended: Upstash Rate Limit (Redis-based, Vercel-compatible)
- Alternative: Vercel Edge Middleware with IP-based limiting
- At minimum: limit to 100 requests/minute per IP
```

Routes with authentication can have higher limits, but still should not be unlimited.

---

## HTTPS — No HTTP in Production Code

```
🔴 SECURITY STOP — HTTP URL in production-bound code
Found: http://[url]
Replace with: https://[url]
If this is localhost/development only, wrap it:
const apiUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://api.example.com'
```

Flag every hardcoded `http://` URL that isn't explicitly scoped to development.

---

## Summary — Stop vs. Flag vs. Warn

| Level | Trigger | Action |
|-------|---------|--------|
| 🔴 STOP | Secret in code, wildcard CORS, HTTP in production, `dangerouslySetInnerHTML` without sanitization | Do not write code. Present the issue and required fix. Wait for instruction. |
| 🟡 FLAG | No server-side validation, missing rate limiting, missing timeout, unverified dependency | Write a comment block flagging the issue in the code. Note it clearly in the response. Continue only if the flag is addressed. |
| 🔵 NOTE | Suboptimal but not dangerous pattern | Note it, suggest the better approach, proceed with what was asked. |
