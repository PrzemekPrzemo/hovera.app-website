---
locale: en
slug: integracja-z-ksiegowoscia-stajnia
title: "Bookkeeping integration: connecting your stable system to accounting"
description: "How to connect a stable management system to accounting software (iFirma, Wfirma, Comarch, Xero, QuickBooks). Comparison of integrations, costs, who's it for."
date: "2026-06-04"
author: "Przemek"
tags: ["Finance"]
---

Most stables issue invoices in **two systems at once**: one for managing clients and lessons (e.g. Horstable), one for accounting (e.g. iFirma). That means you key every invoice **twice**: once in the stable system, once in the accounting one. Plus CSV exports, XML imports, manual reconciliation.

In 2026 this is **changing**. API integrations between stable systems and accounting are becoming standard. This article shows how the Polish (and increasingly EU) ecosystem looks, and how much time/money you'll save.

## Why integration is key in 2026

Three reasons:

### 1. E-invoicing requires a single source of truth

From 2026, in many countries B2B invoices must go through the e-invoicing platform. If you issue in two systems, you have two paths to the platform — and risk of duplicates or missing invoices.

**Better:** one stable system generates, the same one (or via integration) sends to the platform.

### 2. Manager's time = money

A stable with 50 invoices/mo + manual double-entry = **3-5h/month** just on duplication.

That's 36-60h/year = nearly a full work week. At €15/hr = €540-900/year wasted on manual work.

### 3. Duplication errors

Most common errors:
- Invoice issued in stable system, forgotten in accounting → unreported VAT
- Different amounts in both systems (typo)
- Different dates
- Client paid in stable system, accounting still says "unpaid"

## Polish accounting systems — short comparison

### iFirma

**Strengths:**
- Most popular system among small stables
- Lowest price (~€10-20/mo for basic plan)
- Simple UX, fast onboarding
- Direct API for KSeF (Polish e-invoicing)

**Weaknesses:**
- Limited features in low plans
- Limited custom reports

**For:** stables 30-100 clients, simple operations.

### Wfirma

**Strengths:**
- Wider feature set than iFirma
- Strong CRM module
- Better for service stables (boarding, rental)

**Weaknesses:**
- Slightly higher price (~€20-35/mo)
- Slightly more complex UX

**For:** stables 100-300 clients, mid-sized operations.

### Comarch ERP / Optima

**Strengths:**
- Full ERP system (not just accounting)
- Great for multi-location stables
- Strong reports
- Used by larger stables

**Weaknesses:**
- High price (€80-200+/mo)
- Long implementation
- Requires accountant familiar with the system

**For:** networks of stables, large operations 300+ clients.

### Saldeo (PL-specific)

**Strengths:**
- Cheap
- Specifically for self-employed
- Simple UX

**Weaknesses:**
- Less features than competitors
- Limited custom reports

**For:** sole-proprietor stables, smallest operations.

## International equivalents

For stables outside Poland, similar SaaS accounting:

- **Xero** (UK, NZ, AU, EU) — equivalent of iFirma, very popular EU-wide
- **QuickBooks Online** (US, UK) — strong in UK + Ireland
- **Sage** (DE, UK) — for medium businesses
- **Lexware** (DE) — popular German SMB accounting
- **DATEV** (DE) — used by accountants

## Three integration models

### Model 1: API direct (best)

Stable system communicates with accounting system in real time. Issued invoice in stable system → automatically appears in accounting → goes to e-invoicing platform.

**Pro:** zero manual work
**Con:** requires both systems to support a common API

### Model 2: Periodic import (acceptable)

Stable system exports invoices to a file (CSV / XML), accountant imports daily/weekly.

**Pro:** doesn't require API integration
**Con:** human in the loop = errors

### Model 3: Manual (don't do)

You issue twice, in two systems. As above — 3-5h/month wasted.

## How Hovera integrates with accounting

Hovera supports:

### Direct API
- iFirma, Wfirma, Comarch ERP (PL)
- Xero (planned Q3 2026)
- QuickBooks Online (planned Q4 2026)

### Standard exports
- CSV (configurable columns)
- XML (per ERP requirements)
- JPK_FA / JPK_VAT (Polish tax format)
- BIS Billing 3.0 / Peppol (cross-border)

### Direct e-invoicing
- KSeF Type 2 cert (Polish)
- Peppol BIS Billing 3.0 (EU)

## How to deploy integration step by step

### Step 1: Check accountant compatibility

Talk to your accountant. Ask:
- What system do they use (iFirma / Wfirma / Comarch / Xero / etc.)
- Do they support API integration with stable systems
- What format of exports do they accept

### Step 2: Configure on the stable side

In Hovera (Stable plan+):
- Settings → Integrations → Accounting
- Choose your provider
- Enter API credentials (token from accountant)
- Test invoice (test mode)

### Step 3: Configure on the accounting side

Your accountant:
- Activates the API for your account
- Creates token
- Sends to you (you put in Hovera)

### Step 4: Test in test mode

Issue 2-3 test invoices in test mode. Check:
- Did they arrive in accounting
- Are amounts correct
- Are dates correct
- Did they go to e-invoicing

### Step 5: Switch to production

After 2-3 successful test invoices — turn on production. Monitor first month carefully.

## How much does integration cost

Three potential costs:

1. **Stable system subscription** — Hovera Stable plan (€59/mo)
2. **Accounting subscription** — €10-200/mo
3. **One-time setup** — usually free, sometimes €25-100 if accountant charges for setup

ROI: integration saves 3-5h/month → at €15/hr that's €45-75/month. Pays back in <2 months.

[**Request access →**](/en/kontakt)

Or see invoicing in product: [Invoicing in Hovera →](/en/produkt/finanse-ksef)

---

## Further reading

- [EU e-invoicing 2026: what stables need to know](/en/blog/ksef-stajnia-2026)
- [Excel or stable management system — when to switch](/en/blog/excel-czy-system-stajnia)
