# ServiceWindow — Monetization Strategy
> Based on market research and platform architecture analysis

---

## Current Model (Phase 1)

### Revenue Streams
| Stream | Rate | Who | Status |
|--------|------|-----|--------|
| Truck Standard | $29/mo (founding) / $49/mo | Food truck operators | Primary |
| Truck Pro | $49/mo (founding) / $79/mo | Food truck operators | Primary |
| Service Provider Listing | $39/mo | Commissaries, suppliers, repair | Secondary |
| Property/Storage Advertising | TBD small monthly fee | Property owners who want truck visibility | Secondary |

### Free-Forever Users
- Event planners / HOA managers: Free forever (demand-side flywheel)
- Venues: Free forever
- Job seekers: Free to browse

### Founding Member Program
- Rate: $29/mo locked forever (never goes to $49/mo)
- Scarcity: Limited slots — creates urgency
- is_founding_member = true in profiles table
- Tracked via Stripe price ID for $29/mo plan

---

## Phase 2 Revenue Opportunities (Recommended)

### 1. Featured Listing Upgrades (High Priority)
**What**: Truck profiles pay to be featured at the top of marketplace results in their city/cuisine category.
**Price point**: $15-25/mo add-on
**Why it works**: Trucks are already competing in Facebook comments — paying for top placement is intuitive.

### 2. "Verified" Badge Tiers
**What**: Base verification is free with subscription. "Premier Verified" includes background check partner (e.g., Checkr), deeper food handler cert review.
**Price point**: One-time $49 setup fee
**Why it works**: Venues and HOAs will filter for Premier Verified when stakes are high (large events, weddings).

### 3. Last-Minute Slot Boost (Future)
**What**: Truck pays $5-10 to push an urgent available-slot notification to all demand-side users in their service area.
**Why it works**: Earth Day scenario — truck pays $5, gets booked for a 5-hour event worth $500+. ROI is obvious.
**Requires**: SMS/push notification infrastructure (Phase 2).

### 4. Annual Subscription Discount
**What**: Pay annually, save 2 months.
**Founding truck annual**: $290/yr (vs. $348 monthly) — saves $58
**Standard truck annual**: $490/yr (vs. $588 monthly)
**Why it works**: Reduces churn, locks in revenue, improves LTV.

### 5. Sponsorship — Event Listings
**What**: Large event organizers (Battle Bros, festivals) pay to promote their event at the top of the Event Calendar.
**Price point**: $50-150 per event
**Why it works**: Events need trucks. Promoted events get filled faster. Organizers see the ROI immediately.

### 6. White-Label for HOA Management Companies
**What**: Property management companies (managing 20+ communities) get a co-branded dashboard and bulk-post capabilities.
**Price point**: $199-399/mo per management company
**Why it works**: Tiffany Allard is one HOA manager. There are property management companies managing 50+ communities who would pay for a professional tool.

---

## Unit Economics (Conservative)

### Year 1 Targets (SWFL only)
- 50 paying truck subscriptions @ $29/mo average = $1,450/mo = $17,400/yr
- 10 service provider listings @ $39/mo = $390/mo = $4,680/yr
- 5 property advertisers @ $25/mo = $125/mo = $1,500/yr
- **Total Year 1 ARR (conservative)**: ~$23,580

### Break-even estimate
- Supabase Pro: $25/mo
- Resend email: ~$0-20/mo (free tier covers early volume)
- Stripe fees: 2.9% + $0.30 per transaction
- Cloudflare/GitHub Pages: $0
- **Fixed costs**: ~$50-100/mo initially
- **Break-even**: ~4 paying truck subscriptions

### If founding rate fills (100 trucks @ $29/mo):
- $2,900/mo recurring = $34,800/yr from trucks alone
- This is achievable within 6 months given SWFL market size

---

## Anti-Patterns to Avoid
- Commission per booking: Creates accounting complexity, undermines trust, trucks will work around it
- Freemium with feature paywalls for trucks: Complicates the value prop. Simple subscription only.
- Ads from third parties: Undermines trust and brand. Never in Phase 1.
- Charging event planners or HOAs: Kills the demand-side flywheel. Free forever for requesters.

---

## Pricing Psychology Notes
- "$29/mo" anchors against "$49/mo" standard — the founding framing creates urgency without a hard deadline
- "No credit card for trial" removes the #1 signup friction for small business operators
- Free forever for demand side creates network effects: more requesters = more truck sign-ups
- The scam angle is a monetization lever: trucks pay because the platform keeps scammers out (value > cost)
