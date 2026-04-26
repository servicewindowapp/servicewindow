# ServiceWindow — Next Session Plan
> Updated: 2026-04-25

## Session start checklist
1. Read `CLAUDE.md` (constitution + test workflow)
2. Run `.\run-tests.ps1` from project root — confirm all 21 tests green before touching anything

---

## Priority 1 — End-to-end auth test
Walk the full signup → approval → login flow with a fresh test account.

Steps:
1. Sign up as truck operator using a new throwaway email (e.g. wesfitz72+swtest1@gmail.com)
2. Confirm profile row created in Supabase with subscription_status='pending'
3. Approve via admin-dashboard — confirm subscription_status flips to 'trialing', trial_ends_at set to now+30days
4. Sign in with the approved account — confirm redirect lands on truck-dashboard
5. Previous attempt failed: existing test account had wrong password — use fresh account

## Priority 2 — Supabase: reviews table UNIQUE constraint
One SQL statement, 30 seconds. Run in Supabase SQL editor:
```sql
ALTER TABLE reviews ADD CONSTRAINT reviews_unique_reviewer_booking UNIQUE (booking_id, reviewer_id);
```

## Priority 3 — Pre-launch: re-enable email confirmation
- In Supabase → Authentication → Sign In / Providers: turn "Confirm email" ON
- Update auth.html signup success screen copy: "Check your email to confirm your address before logging in"
- Login error handler already detects "email not confirmed" Supabase error — no code change needed there
- Test the full confirm-email flow after re-enabling

## Priority 4 — Outreach follow-up
Check wesfitz72@gmail.com for replies from:
- Brittany Axelson (outreach sent 2026-04-19)
- Tiffany Allard (outreach sent 2026-04-19)

## Priority 5 — mcp.so submission (~5 min, low priority)
Secondary MCP community directory listing.
Search GitHub for `mcp-so/registry` to find current submission process.

---

## Standing rules (Project Development Constitution)
- `.\run-tests.ps1` before every push — all 21 must be green
- Read relevant files before editing
- No features beyond what's explicitly asked
- State assumptions before implementing
- Use `engineering:code-review` skill before merging any non-trivial change
