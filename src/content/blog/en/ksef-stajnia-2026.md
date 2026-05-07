---
locale: en
slug: ksef-stajnia-2026
title: "EU e-invoicing 2026 for stables: what owners need to know"
description: "Everything a stable owner needs to know about EU e-invoicing in 2026. Country deadlines, Peppol BIS Billing 3.0, ViDA reform, and how to prepare practically."
date: "2026-04-14"
author: "Przemek"
tags: ["Finance", "Riding school"]
---

From 2026 onwards more European countries roll out **mandatory B2B e-invoicing**. Yes — that includes equestrian stables. If you run a riding school, boarding, breeding or any horse-related business and you're a VAT taxpayer, you have an obligation to issue invoices through your country's e-invoicing system.

In this article I'll cover what you need to know: when exactly, how to prepare, what changes day-to-day at the stable and what the penalties are for missing deadlines.

## What e-invoicing means in one paragraph

E-invoicing means structured invoices (XML) sent through a national or pan-European clearance platform. Instead of issuing a PDF and emailing the client, you generate an XML invoice, send it to the official platform, the system assigns a unique ID, and only then is the invoice legally valid. The client pulls the invoice from the platform (or you send them a link / PDF with the official ID).

State purpose: closing the VAT gap, faster automated audits, faster VAT refunds.

Your purpose: you adjust how you issue invoices, but in return you get less paperwork, faster VAT refunds, and certainty the invoice is legally valid the moment it's sent.

## EU rollout calendar — key dates

| Country | When B2B mandatory |
|---------|-------------------|
| **Italy** | Already in force (since 2019) |
| **France** | September 2026 (large enterprises), 2027 small/medium |
| **Spain** | 2026 (B2B mandatory) |
| **Germany** | January 2025 (receive), 2027 (issue) |
| **Belgium** | January 2026 |
| **Poland (KSeF)** | February 2026 (large), April 2026 (everyone else VAT) |
| **Romania** | 2024 already in force |
| **Hungary** | Already (NAV) |

**For most European stables the relevant date is 2026-2027.** Check your country's tax authority for the exact rule.

For pan-EU framework: **ViDA (VAT in the Digital Age)** is being phased in from 2025 onwards, harmonizing real-time reporting across the EU. The end state is **structured e-invoicing as standard** across all member states by ~2030.

## Does my stable need e-invoicing

Quick answer:

| Your stable | E-invoicing |
|-------------|-------------|
| VAT taxpayer, B2B invoices (to companies) | **Yes — by your country's deadline** |
| VAT taxpayer, B2C invoices (to individuals) | Mostly later (2027+) |
| VAT-exempt small business | Currently optional, voluntary entry possible |
| No invoices (only receipts) | Doesn't apply |

**In practice:** if you issue at least one B2B invoice a month (e.g. a company buys lessons for employees), you're affected.

## Which stable invoices go through e-invoicing

Almost every invoice you issue:

- **Pass purchases** (B2B — company buying for employees)
- **Monthly boarding** (owner as a company or individual)
- **Horse sales** (mostly B2B but also B2C)
- **Add-on services**: training, transport, horse leases
- **Feed / equipment sales** (if you sell)
- **Stud / breeding fees** (B2B between breeders)

All invoices go through the country's structured XML format (FA(2) in Poland, FatturaPA in Italy, BIS Billing 3.0 in many EU countries). It's not "a PDF with tags" — it's a totally different format. Without a system that does it automatically, manual creation is hours of work.

## Three access models

**Model 1: Direct API (advanced)**

Your accounting system connects to the national platform via API, sends XML, gets the ID, stores it.

- Needs: certificate / API credentials
- Pro: full automation
- Con: needs developer support

**Model 2: Government's free app**

Where available — e.g. PL KSeF Taxpayer App, IT Sistema di Interscambio, FR Chorus Pro.

- Pro: free
- Con: manual entry, doesn't scale

**Model 3: SaaS that integrates the platform for you**

Modern stable management systems (like Hovera) sit between you and the e-invoicing platform. You issue an invoice in the system, it sends to the platform, gets the ID back, attaches to the client. Your effort: 0 minutes per invoice.

## Peppol BIS Billing 3.0 — the EU bridge

For cross-border e-invoicing — when you're in Poland and send to a German company, or in Belgium and bill a French client — the standard is **Peppol BIS Billing 3.0**.

Peppol is a network of certified Access Points that exchange structured invoices between countries. Most EU countries already use it for B2G (government), and it's being extended to B2B.

Hovera supports Peppol BIS Billing 3.0 from day 1.

## What changes day-to-day in your stable

Not much, **if your system is ready**. From your perspective:

- You click "Issue invoice"
- System sends structured invoice to the platform
- You get back the unique ID and confirmation
- Client gets the invoice link / PDF with the ID
- Bookkeeping export is automatic

Without a system: hours of manual work on the platform, custom XML, certificate management.

## Common stable owner questions

### "I'm not VAT — does this affect me?"

In most countries — no, not yet. But check your country's threshold (in Poland it's PLN 200k turnover). Voluntary entry is possible and increasingly encouraged.

### "I issue 5 invoices a month — is it worth a system?"

For 5 invoices, you can use the government's free app. It works. Annoying but works.

For 30+ invoices/month, automation pays for itself quickly. A 20-minute manual entry × 30 invoices = 10 hours/month at €20/hr = €200/month wasted.

### "What if I forget?"

In Poland, fines reach 100% of the VAT due on the invoice, plus the buyer can't deduct VAT. In other countries similar penalties apply. Don't skip the deadline.

### "What about old invoices issued before the deadline?"

They stay as PDFs / paper, don't migrate. Only new invoices from the mandatory date onwards.

### "Can I still send PDFs to clients?"

Yes — the platform sends them automatically through the system, but you can still send a courtesy PDF. The PDF isn't the legal version anymore, the platform record is.

## How to prepare in 4 steps

**Step 1: Find out your country's exact deadline**

Check the tax authority site. Confirm with your accountant.

**Step 2: Choose your access model**

System (recommended for 30+ invoices/month) or government app (for fewer).

**Step 3: Configure 2-3 weeks before the deadline**

If you go with a system — set up the integration, do a test invoice (in test mode), confirm it works.

**Step 4: Inform your B2B clients**

Some clients ask to see the new invoice ID, others want a PDF copy. Communicate the change a week before the switch.

## Hovera and EU e-invoicing

Hovera supports e-invoicing as a native feature on Stable+ plans:

- **Polish KSeF** (Type 2 cert)
- **Peppol BIS Billing 3.0** for cross-border
- **Configurable per country** (we follow the rollouts)
- **Automatic bookkeeping export**

You issue an invoice in Hovera, it goes to the right platform, the client gets it, your accountant gets the export. Zero manual work.

[**Request access →**](/en/kontakt)

Or see invoicing in product: [Invoicing in Hovera →](/en/produkt/finanse-ksef)

---

## Further reading

- [Excel or stable management system — when to switch](/en/blog/excel-czy-system-stajnia)
- [Stable management systems compared](/en/blog/porownanie-systemow-zarzadzania-stajnia)
