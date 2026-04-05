---
name: swfl-foodtruck-market-research
description: Daily 8am: scrape 3 high-signal SWFL food truck Facebook groups (24h window), save dated report to C:\Users\wesfi\OneDrive\Desktop\Food Truck App\Market Research\
---

You are running the daily SWFL food truck market research scrape. Today's date is available via bash.

---

TASK: Scrape the following 3 Facebook groups for all posts within the last 24 hours. Extract every contact, booking request, coverage need, and operator signal. Save a dated report.

GROUPS TO SCRAPE (in order):
1. Food Truck Connection of SWFL — https://www.facebook.com/groups/620795443402808
   Signal type: Booking requests from clients/venues looking for trucks. High signal-to-noise.

2. SWFL Food Truck Depot — https://www.facebook.com/groups/SWFLFoodTruckDepot
   Signal type: High volume. Truck schedules, venue calls, operator pain points, equipment. Largest group.

3. Collier & Lee County Food Trucks — https://www.facebook.com/groups/1420947091617027
   Signal type: Naples/Collier area coverage needs, vendor calls, truck availability.

NAVIGATION: Append ?sorting_setting=CHRONOLOGICAL to all group URLs to get newest-first chronological feed.

SCRAPING RULES:
- Capture every post within the last 24 hours. Stop scrolling when you see a specific date timestamp (e.g., "March 28 at...") that falls outside the 24h window.
- Relative timestamps (e.g., "9h", "22h") are within the window. Specific dates 2+ days ago are outside.
- Expand "See more" on any truncated posts before capturing.
- For each group: scroll until you hit the 24h cutoff or reach the bottom of the feed.
- Note cross-post duplicates — capture once, note duplication.
- If a group has 0 posts in the window, record that and move on immediately.

FOR EACH POST CAPTURE:
- Post type (BOOKING REQUEST / COVERAGE NEEDED / TRUCK AVAILABLE / VENUE LEAD / ANNOUNCEMENT / PAIN POINT / EQUIPMENT)
- Posted by (name, role if visible)
- Timestamp
- Reactions + comment count
- Full text (expand "See more" if truncated)
- Any contact info visible (phone, email, website)
- Location
- Notes / signal assessment

REPORT FORMAT — save as market-research-YYYY-MM-DD.txt:

SERVICEWINDOW MARKET RESEARCH
Date: [today]
Coverage window: Last 24 hours
Groups: Food Truck Connection of SWFL | SWFL Food Truck Depot | Collier & Lee County Food Trucks
============================================================

## TOP ACTION ITEMS — IMMEDIATE
[ranked by urgency and signal strength — max 10 items]

## RAW FEED — ALL POSTS CAPTURED
[by group, with full post details]

## CONTACT LIST
[table: Name | Role | Contact | Context | Priority]

## SIGNALS & INTEL
- Demand signals (venues/clients seeking trucks)
- Supply signals (trucks advertising availability)
- Coverage needs (live mismatches)
- Pain points
- Geographic clusters

## ALL CONTACTS — MASTER LIST

============================================================

SAVE INSTRUCTIONS:
1. Get today's date via bash: date +%Y-%m-%d
2. Filename: market-research-[date].txt
3. Save using the Write tool to /mnt/Market Research/market-research-[date].txt
4. Confirm the file was written with: bash ls -lh "/mnt/Market Research/market-research-[date].txt"
5. Provide a computer:// link to the saved file so the user can open it directly
