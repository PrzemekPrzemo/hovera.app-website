---
locale: en
slug: przejscie-z-excela-na-system-stajnia
title: "How to migrate from Excel to a stable management system in one weekend"
description: "Practical step-by-step guide: how to move your stable from Excel to a dedicated system in 2 days. With checklist, schedule and pitfalls."
date: "2026-04-21"
author: "Przemek"
tags: ["Migration"]
---

The decision to switch from Excel to a dedicated stable management system is often postponed for one reason: "How am I going to move all this?". 80 horses, 200 clients, pass history, three years of invoices — it feels like weeks of work.

It actually takes **two days with good organization**. In this article I'll show an hour-by-hour plan based on 12 stable migrations we ran in 2025-2026. The plan starts Friday evening and you're fully operational Monday morning.

## Before you start — what you need

Before the migration weekend you need:

- **Chosen system** with active account (ideally a 14-day trial)
- **Your current data** in Excel (latest version, cleaned up)
- **2 days off** from operational work (the school can run, but you're at your data)
- **Vendor support** for migration (most have it on mid+ plans)
- **A computer with two monitors** or a big screen (speeds things up a lot)
- **Coffee**

Nice to have but not required:

- Someone to help (instructor, family) for 2-3 hours of mechanical typing
- Second laptop (to test client-side)
- Phone to test the mobile flow

## Two-day plan — hour by hour

### Friday evening: Preparation (3 hours)

**6-7pm — Inventory your Excel**

Open all stable-related Excel files and create a simple map:

| Excel sheet | Content | Records |
|-------------|---------|---------|
| Clients.xlsx | Client data | ~200 |
| Horses.xlsx | Horse list | ~25 |
| Schedule_2026_05.xlsx | Current schedule | ~150 rides |
| Active_passes.xlsx | Active passes | ~80 |
| Invoices_2024-2026.xlsx | Invoice history | ~600 |
| Staff.xlsx | Instructors + grooms | ~5 |

Goal: you know how much work is ahead and nothing gets forgotten.

**7-8:30pm — Data cleanup**

This is the most critical step. Get the data clean **before** migration, not after.

For each sheet:

- Remove duplicates
- Fix column formatting (phone numbers: country code or not? Dates: DD.MM.YYYY or YYYY-MM-DD?)
- Fill missing fields (if you can — leave missing email blank, don't fake)
- Mark inactive clients (last ride > 6 months ago) → don't migrate them or migrate as "archive"
- Save each file as CSV (UTF-8) — most systems prefer CSV import

In practice: a typical 200-client stable has 30-50% inactive. After cleanup you have 130-170 truly active. Migrate only those.

**8:30-9pm — Backup**

Copy the entire Excel folder to an external drive + cloud (Google Drive, Dropbox). If something goes wrong, you have a full rollback.

Go to bed. Saturday will be long.

### Saturday: Data migration (8 hours)

**8-9am — System setup**

Log into your new system (e.g. Hovera).

- Enter basic stable data (name, address, VAT ID, logo)
- Set timezone, currency
- Invite staff as users (don't use yet, just create accounts)
- Set cancellation policy (per your terms)

Goal: environment ready for import.

**9-10:30am — Horse import**

Horses are the simplest, so we start here.

- Export Excel `Horses.xlsx` → CSV
- Check column mapping: name, breed, birth_date, microchip
- Import in the system
- Verify after import: 25 horses → 25 records? All fields filled?
- Add photos (most systems allow bulk upload)

Trap: breed sometimes typed inconsistently ("Polish Halfbred", "PHF", "polish halfbred"). Standardize before import or let the system auto-merge.

**10:30am-12:30pm — Client import**

Clients take longer.

- CSV: name, surname, phone, email, level (beginner/intermediate/advanced), notes
- Import
- Manually check first 10 — does everything line up
- Rest — system imports itself

Trap: parents + children. In Excel often mixed — "Anna Kowalska (Kasia's mom)". In a system it should be separate: child record, parent record, parent→child link. Needs manual work or a "role: parent / child" field.

**12:30-1:30pm — Lunch**

After lunch productivity drops — take the break.

**1:30-3:30pm — Active pass import**

Only **active** passes. Historical (used) passes stay in Excel as archive.

For each active pass:
- Client
- Plan (4/8/12 rides)
- Purchase date
- Expiry date
- Used rides
- Remaining rides

Some systems have pass import. Others need manual entry (15-30 sec per pass → 80 passes = 30-40 minutes).

**3:30-5pm — Future schedule import (1-2 weeks)**

Only **future** booked rides. Past stays in Excel.

For each booked ride:
- Date and time
- Client
- Horse
- Instructor
- Type (individual / group)

In practice: most stables have 50-100 booked rides for the next 1-2 weeks. Manual entry (20 min per day) or CSV import (30 min total).

**5-6pm — Pricing and pass configuration**

For new clients, new passes — set the prices in the system:

- Single ride: €30
- 4-ride pass / 30 days: €110
- 8-ride pass / 30 days: €210
- Monthly boarding: €350
- Etc.

Plus cancellation policy and terms (paste into the system as text).

**6-7pm — Invoicing setup**

If your stable does B2B invoicing — wire up your e-invoicing integration (per your country's setup; we help if you're on Hovera).

**7-8pm — Quality check**

Walk through the system from each perspective:

- Client — do they see their data, pass, rides in the portal
- Manager — is the schedule correct
- Staff — does each see their day
- Invoice — issue a test invoice (to yourself or a fake client) and check it works

If everything's OK — congrats, data is in the system. Sleep. Sunday is testing.

### Sunday: Testing and communication (5 hours)

**10am-12pm — Tests from the client perspective**

The most important step.

- Create a test client account (with your second email)
- Log in as client
- Check: do you see free slots, can you book, did you get SMS / email confirmation
- Check on phone (mobile)
- Try to cancel — does the policy work

Common pitfalls at this stage:
- SMS not going out (SMS gateway not configured)
- Cancellation policy not enforced
- Missing fields in client profile
- Wrong email automation flow

**12-1pm — Tests from the staff perspective**

- Log in as instructor
- Check what they see for the day
- Check notifications

**1-2pm — Communication with clients**

Most important step for retention.

Send a message (SMS + email) to all active clients:

> "Hi [name]! From today our stable runs on a new management system.
>
> What this means for you:
> - Book rides online: [link]
> - See your pass balance in the portal
> - Get SMS / email reminders
>
> Log in here: [link]
> Temporary password: [random]
>
> If you prefer to keep calling — that still works. The system is for your convenience, not a requirement.
>
> Questions? Write or call: [number]
>
> [Your name], [Stable name]"

Key: **don't force it**. The first 30-50% of clients will switch on their own in the first week. The rest — over a month or three. Gradually.

**2-3pm — Staff training**

Each staff member (instructor, groom):

- 30-min walkthrough (you demo)
- Another 30 min for them to click and ask questions
- Monday morning — be available for questions

Don't try to teach the whole system at once. Focus on what each person needs:

- **Instructor** — day view, marking rides complete, horse journal
- **Groom** — morning/afternoon task checklist, school alerts
- **Manager** — everything

## Monday morning: first operational day

The first day without Excel. Keep it calm.

**8am — Check**

- Open the system, check booked rides
- Check that SMS notifications went to today's clients
- Open Excel (still keep it as archive) — cross-check 2-3 rides, do they match

**First client of the day**

Phone rings: "Hi, do I have a ride at 5pm today?" You open the system → confirm or correct. The client sees the same in the app.

**First conflict**

Something will go wrong — staff marks a ride for the wrong horse, system flags it, you fix and show the staff how to do it right. Normal — week one is polishing.

## Common migration pitfalls — and how to avoid them

### Trap 1: Trying to import all history

3 years of clients. 2023 invoices. Old used passes.

**Don't.** Leave history in Excel (archive). Migrate only **active**: active clients, active passes, current-year invoices.

After 6 months you'll notice the Excel history is barely needed — you'll wean off.

### Trap 2: Migrating during peak season

Spring and autumn are peak school. A Sunday afternoon with 30 clients and 20 rides is not the time to learn a system.

**Migrate during dead season**: early January, late July (vacations), early December. Stable is at 50-70% normal traffic, you have patience for mistakes.

### Trap 3: No client communication

Client calls for the first time, hears "now we're in the system", doesn't get it, frustrated, leaves.

**Beforehand** — send "from Monday we're switching, here's what it means" (3-5 days ahead). Clients appreciate it.

### Trap 4: Trying for 100% adoption from day 1

"Everyone must book online, I'm not picking up the phone". This pisses off 60-year-olds without smartphones.

**Gradually**: first month — system + phone in parallel. After a month — most clients have switched. Slowly reduce phone, never fully block it.

### Trap 5: No staff training

Manager knows everything, instructor clicks randomly, groom hunts for features for an hour.

**Sunday evening training + Monday availability** — this is the minimum. Without it the system gain disappears in a week of chaos.

## What to do when something goes wrong

Migration **never** goes 100% smoothly. Plan B:

- **Keep Excel as archive** for 3-6 months (fallback)
- **Vendor support** — most have chat or priority email
- **Worst risks** are at the data level (missing/duplicates), not the system itself — the system works fine

If you can't do something in week one — use the old method for that specific thing. Learn it in week two.

## Migration help from your vendor

Most serious systems offer some level of migration support:

- **Hovera (Stable plan+):** 1-hour onboarding session + bulk import of clients and horses from CSV. 24h chat support for the first 30 days.
- **Horstable:** in-person 1:1 rollout (more hands-on than most)
- **Equicty / EquineM:** mostly self-service + docs

Ask **before** subscribing. Could be the difference between 3 hours and 3 days.

## Hovera — and how we help

All Stable, Pro and Enterprise plans include:

- **Bulk import** of clients, horses, passes from CSV
- **1:1 onboarding session** (60 min) where we help set up basics
- **Migration check** — we review your data before import and flag potential problems
- **Priority support** for the first 30 days — fast answers, every question

14-day free trial — start now, check the system, plan the migration weekend with no commitment.

[**Request access →**](/en/kontakt)

Or book a migration call: [Hovera demo →](/en/demo)

---

## Further reading

- [Excel or stable management system — when to switch](/en/blog/excel-czy-system-stajnia)
- [Stable management systems compared](/en/blog/porownanie-systemow-zarzadzania-stajnia)
- [Riding passes — 5 settlement models that work](/en/blog/karnety-w-stajni)
