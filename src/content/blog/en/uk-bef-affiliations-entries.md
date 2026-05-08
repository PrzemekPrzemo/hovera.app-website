---
locale: en
slug: uk-bef-affiliations-entries
title: "BEF affiliations and entry fees: bulk processing for sport yards"
description: "Managing BD, BS, BE memberships and entries across a 20-rider sport yard. The admin shortcut that frees up 4 hours per show weekend."
date: "2026-03-20"
author: "Przemek"
tags: ["BEF", "BD", "BS", "Sport"]
regions: ["UK"]
---

UK sport yards juggle multiple **British Equestrian Federation (BEF)** member bodies: British Dressage (BD), British Showjumping (BS), British Eventing (BE), Endurance GB. Each has its own:
- Membership level (full / regional / unaffiliated)
- Annual fee (£50-200)
- Horse registration (£20-60 per horse per discipline)
- Entry process

Multiply by 20 riders × 30 horses × 10 events/year. Manual handling is a part-time job.

## The bottleneck

Standard yard process:
1. Rider tells trainer they want to compete next month
2. Trainer checks if rider is BD/BS member, paid up
3. Trainer checks if horse is registered for the discipline
4. Trainer logs into the federation portal, makes the entry
5. Yard accountant invoices the parent / owner with breakdown
6. Show day: paper schedule, drawn classes, calling

This is 30-45 minutes per entry × 50 entries/month = **20-25 hours/month**.

## Where automation helps

### Membership status sync

Hovera (or your operations tool) keeps a roster of riders + horses with current memberships. When the trainer asks "can Sarah enter Class 4 BD next weekend?", the answer is in the system, not in the federation portal.

### Entry batching

Rather than 1 entry at a time, batch entries by show: select riders, select horses, select classes. The system pre-fills federation requirements.

### Auto-billing breakdown

Entry fee × class + transport contribution + box rental + trainer fee = automatic breakdown to owners. No more "wait, what does my £350 invoice cover exactly?"

### Results capture

Show results come back as PDFs from the federation. Logging them automatically against horse profiles helps with progression tracking and selling decisions.

## The grading challenge

Showjumping uses **double-clear / clear-round** based grading; eventing uses points; dressage has percentage scores. Each updates affiliations differently. Manual tracking misses thresholds (e.g., horse exceeds Foxhunter Novice level → must move up next season).

A good system:
- Tracks every result chronologically
- Flags grading thresholds before a horse competes
- Avoids the disaster: showing in Novice when the horse is now Open

## How Hovera supports BEF disciplines

Sport module:
- Rider + horse roster with BD/BS/BE membership status and renewal alerts
- Horse competition history with auto-grading calculation
- Entry batching + automatic financial breakdown
- Result import (manual now, BEF API integration in development)
- "Eligibility check" before entry: rider eligible? horse eligible? grade level OK?

Time saved on a typical sport yard: **4-6 hours per show weekend**.

[Sport yard demo](/en/kontakt) — we'll walk through your specific federation mix.
