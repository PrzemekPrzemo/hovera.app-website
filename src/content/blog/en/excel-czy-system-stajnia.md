---
locale: en
slug: excel-czy-system-stajnia
title: "Excel or stable management system — when to switch"
description: "When should a stable drop Excel for a dedicated system? Concrete numerical thresholds, costs, pros and cons of each."
date: "2026-04-16"
author: "Przemek"
tags: ["Migration"]
regions: ["PL"]
---

Excel is cheap, familiar and you can do almost anything in it. Many stables run their schedule, passes, finances and horse list in spreadsheets. It works — up to a point.

The question isn't "should I switch", it's **"when to switch"**. In this article I'll show the concrete numerical threshold above which Excel costs more than a dedicated system, and how to spot the moment it's reached you.

## What Excel actually does well

Let's be fair — Excel has real upsides:

- **Free** (or ~€6/mo with Microsoft 365)
- **Everyone knows the basics** — no onboarding
- **Total flexibility** — you build exactly what you want
- **Always offline-capable**
- **Files can be sent to anyone** (accountant, partner)
- **Backup on disk / cloud** — no vendor lock-in

For a one-person operation with 5 horses and 20 clients **Excel is rational**. Thousands of small stables run this way and there's no reason to push them off it.

## Where Excel breaks

The problem isn't "Excel is bad". The problem is that **a spreadsheet doesn't handle data relationships**.

Practical example: client bought an 8-ride pass, scheduled 3 rides, cancelled one 6h before (per policy the ride is forfeit), invoice issued.

Excel:
- "Clients" sheet holds the client data
- "Passes" sheet holds the balance (8 → 6 → ?)
- "Schedule" sheet holds the rides
- "Invoices" sheet holds the invoices
- "Horses" sheet holds the horses

Each ride needs 3-4 sheet updates. Every client question means opening 2-3 sheets and checking manually. After six months there are always inconsistencies.

A system (like Hovera) holds all of this as **one relationship**. Client → pass → ride → invoice. A change in one place propagates everywhere automatically.

## 5 thresholds where Excel becomes a problem

After deploying Hovera in dozens of stables we see the same breaking points:

### Threshold 1: 30 clients (riding school scale)

Up to 30 clients Excel manages. You remember everyone by name, know the history, rarely consult the sheet.

Above 30 — you start mixing people up. "Mrs Kowalska — is that the one with the girl or the one with the boy?" Phone rings more often than you can check sheets.

### Threshold 2: 10 school horses

Up to 10 horses you schedule intuitively. You know Bajka has worked four days this week, so you give her Friday off.

Above 10 — you start assigning horses "alternately", and some end up working 6 days in a row (with health consequences).

### Threshold 3: 50 invoices per month

Up to 50 monthly invoices Excel + Word works. Above that — you start spending 6-10 hours a month on invoices alone. That's 1-2 days lost on something a system does automatically.

And from 2026 most EU countries require structured e-invoicing for B2B, which Excel handles very poorly.

### Threshold 4: 2+ employees

Excel works great for one person. Two — somebody overwrites changes, the file is "in use", and you start seeing files like "schedule_v3_FINAL_really.xlsx".

Google Sheets partially solves this (multi-user) but write conflicts still happen.

### Threshold 5: Clients want to see their balance

The first clients ask "can I see how many rides I have on my pass?" — you reply by SMS.

After 50 clients — you have 20 such questions weekly. That's 2 hours / week on something a system handles itself (clients have their own login).

## The real cost of Excel — math

We audited a typical 50-client, 12-horse, 2-instructor stable running on Excel. Here's what came out:

| Activity | Time/month (Excel) | Time/month (system) |
|----------|--------------------|---------------------|
| Building the schedule | 6 hrs | 1.5 hrs |
| Pass updates | 4 hrs | 0 (auto) |
| Issuing invoices | 8 hrs | 0.5 hr |
| Answering clients about balances | 6 hrs | 0.5 hr (clients self-check) |
| Fixing mistakes | 3 hrs | 0.5 hr |
| Monthly reports | 4 hrs | 5 min |
| **TOTAL** | **31 hrs** | **3 hrs** |

Owner's hourly rate (their own time): €20/hr.

**Hidden cost of Excel: 31 × €20 = €620/month**.

System subscription (Hovera Stable plan): **€59/month**.

ROI: pays back 10× in the first month.

That's not all — Excel also "costs":

- Lost clients (frustration with errors) — 2-3 / year
- Unrecovered passes (client says they used 3, you have 4 → you give in) — €100s/month
- Bad reputation (Google Review: "chaos, nobody knows anything")

## Three system advantages you can't replicate in Excel

### 1. Real-time conflict detection

Excel: you booked a ride for Bajka Wednesday 5pm. You also booked her Wednesday 5:30 (forgot to check). Excel knows nothing. Client arrives, horse in arena, second client waits on the steps.

System: you book the second ride → system blocks, red icon, "conflict: Bajka busy 5-6pm". Impossible to make the error.

### 2. Client sees their account

Excel: client calls "how many rides left?". You open the sheet, check, call back.

System: client logs into the app, sees 4 rides remaining, 3 booked, 1 free, expires 23 May. Zero of your time.

### 3. Auto-recurring invoicing

Excel: 1st of every month you open 30 invoice templates, copy client data, fill the period, calculate VAT, print, send.

System: set once "client X, boarding €350/mo, 1st of every month". Invoice issues itself, sends to client, integrates with bookkeeping. Your involvement: 0 minutes.

## When Excel still makes sense

Despite everything — **for some stables Excel remains a good tool**:

- **Solo stable, < 5 horses, < 20 clients, no B2B invoicing** — Excel works
- **Breeding-only, no service sales** — stable system isn't priority
- **Seasonal-only stable** (e.g. summer 2 months) — subscription cost disproportionate
- **Very specific business** (e.g. only horse transport) — generic system doesn't fit

If you're in one of these categories — Excel is rational. Read again next year when the business grows.

## What to look for when picking a system

If you crossed the threshold and decide to switch, here's the checklist:

### Must-have

- [ ] **Multi-resource calendar** — horse × instructor × arena × client
- [ ] **Passes and packs** with auto-settlement
- [ ] **Invoicing** (with EU e-invoicing for 2026+)
- [ ] **Cancellation policy** enforced automatically
- [ ] **Client portal** (clients see their balance)
- [ ] **Automatic SMS / email notifications**

### Nice-to-have

- [ ] **Online booking** (public page with self-service)
- [ ] **Horse database with health journal**
- [ ] **Bookkeeping export**
- [ ] **Financial reports** (revenue, dues, horse profitability)

### Non-functional

- [ ] **EU hosting** (GDPR)
- [ ] **Automatic backup**
- [ ] **2FA login**
- [ ] **Local-language support**
- [ ] **Free trial** (test without commitment)
- [ ] **Real migration help** from Excel

If something on the first list is missing — keep looking. Lists 2 and 3 are negotiable.

## Common fears about switching

### "I'll lose my Excel data"

Every serious system has CSV/Excel import. Migration of horses, clients, passes is 1-2 hours of work. Do it yourself or ask the vendor.

### "Staff won't learn it"

European stable systems (Hovera, Horstable, etc.) have UIs designed for non-technical users. Test: 30-min onboarding works for 90% of users.

### "Clients don't want to log in"

Real concern. Solution: don't force it. Clients can still call, you book in the system, they only see the confirmation email. They'll switch over once they see the convenience.

### "What if the system goes down?"

Any serious system has 99.9% SLA (43 min downtime/month max). Plus backup. Plus you can export data anytime. Statistically the system is **safer than Excel on a local disk** that you might accidentally overwrite.

### "Subscription is expensive"

€19-119/mo seems like a lot, but [calculate the cost of Excel above](#the-real-cost-of-excel--math). Plus, good systems offer 14-day free trials.

## Decide in 5 questions

Answer honestly:

1. In the last 3 months did you have at least 1 schedule conflict (two rides on one horse)? **Yes / No**
2. Do clients ask you about pass balance more than once a week? **Yes / No**
3. Do you spend more than 4 hours invoicing on the 1st of the month? **Yes / No**
4. Do you employ or plan to employ staff within 6 months? **Yes / No**
5. Will your stable issue B2B invoices in 2026? **Yes / No**

**3+ "Yes" = time for a system.** Excel costs you more than you think.

## What's next

If you decided to switch, two recommendations:

**Test 1: start with a trial**

Most systems offer 14 days free without a card. Add 5-10 of your clients, a few horses, build a week's schedule. See if the UI fits.

**Test 2: don't migrate everything at once**

Start with one module (e.g. schedule) that's most painful for you. Add others (passes, invoicing) after 2-3 weeks. Full migration in one weekend = risk of frustration. Step-by-step = painless.

I have a separate article on the technical side of switching from Excel: [How to migrate from Excel in one weekend](/en/blog/przejscie-z-excela-na-system-stajnia).

## Try Hovera

Hovera is built for European equestrian businesses — local language, local invoicing, local support. Cancellation policy enforced, client portal, online booking, automatic invoicing.

14 days free, no card. We help with migration of your Excel data (Stable+ plans).

[**Request access →**](/en/kontakt)

Or see pricing: [Hovera pricing →](/en/cennik)

---

## Further reading

- [How to migrate from Excel in one weekend](/en/blog/przejscie-z-excela-na-system-stajnia)
- [Stable management systems compared](/en/blog/porownanie-systemow-zarzadzania-stajnia)
- [Riding passes — 5 settlement models that work](/en/blog/karnety-w-stajni)
