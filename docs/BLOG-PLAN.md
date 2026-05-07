# Plan blogu Hovera — strategia SEO i kategorie

Cel: budować ruch organiczny pod konkretne intencje wyszukiwania właścicieli i managerów stajni jeździeckich. Każdy post musi prowadzić w stronę produktu (link do `/produkt/*`, `/cennik`, `/kalkulator-roi` lub `/kontakt`).

## Jak dodać artykuł

Dwa sposoby — wybierz, który Ci pasuje.

### A) Przez CMS (zalecane do regularnej pracy)

1. Wejdź na `https://hovera.app/admin`
2. Zaloguj się tokenem GitHub (instrukcja niżej)
3. **Collections → Blog → New post**
4. Wypełnij pola:
   - Język (locale): `pl` lub `en`
   - Slug (URL): np. `karnety-stajnia-rozliczanie` (bez polskich znaków)
   - Tytuł, Meta description, Data, Autor, Tagi
   - Treść (markdown z formatowaniem)
5. **Publish** — w tle robi się commit, GitHub Actions buduje stronę i wgrywa na Plesk w ~2 min

### B) Bezpośrednio w repo (gdy masz gotowy markdown)

Stwórz plik:

- `src/content/blog/pl/{slug}.md` — wersja polska
- `src/content/blog/en/{slug}.md` — wersja angielska (opcjonalnie)

Frontmatter (przykład):

```yaml
---
locale: pl
slug: ksef-2026-stajnia
title: "KSeF 2026 dla stajni: co musisz wiedzieć przed 1 lutego"
description: "Krótki opis pod meta description (max 160 znaków). Zawiera słowo kluczowe."
date: "2026-04-15"
author: "Przemek"
tags: ["KSeF", "Faktury", "Compliance"]
---
```

Treść jako markdown — `## h2`, `### h3`, listy `-`, **bold**, [linki](/cennik), kod `` `inline` ``.

## Jak pisać dobry post pod SEO

Każdy post powinien:

1. **Słowo kluczowe w tytule + URL + H1 + pierwszym akapicie**
   - Przykład: target keyword „karnety stajnia online" → tytuł zawiera, slug zawiera, opis zawiera, H1 zawiera
2. **Długość 1 200-2 500 słów** dla głównych treści (top-of-funnel, edukacyjne)
   - Krótsze posty (600-800 słów) to support content / news / changelog
3. **Wewnętrzne linki do produktu** — co najmniej 2-3 linki do `/produkt/*`, `/cennik`, `/kalkulator-roi`
4. **Jeden zewnętrzny link do autorytetu** — np. <https://www.gov.pl/web/finanse/ksef> dla artykułów o KSeF
5. **Schema.org Article** już jest w blog post layout (autoryzacja przez `frontmatter.date` + `frontmatter.author`)
6. **Obrazek główny** — w `public/images/blog/{slug}.jpg` (1200×630 dla OG, kompresja AVIF/WebP)
7. **CTA na końcu** — link do produktu albo `/kontakt` z konkretnym argumentem ("Wypróbuj Hoverę za 0 zł", nie "kliknij tutaj")
8. **FAQ section** (opcjonalnie) — 3-5 pytań na końcu z odpowiedziami, przykład

## Kategorie blogu — co i kiedy publikować

### 🇵🇱 KLASTRY GŁÓWNE (priorytet SEO)

#### 1. Regulacje i compliance

Słowa kluczowe: `KSeF stajnia`, `JPK_VAT stajnia`, `RODO stajnia`, `e-faktura jeździecka`

Pomysły na 12 miesięcy:
- "KSeF 2026 dla stajni: co musisz wiedzieć przed 1 lutego" ✅ *(już mamy)*
- "JPK_VAT i JPK_FA dla stajni — co księgowa potrzebuje miesięcznie"
- "RODO w stajni: zgody klientów, dane koni, weterynarz"
- "Faktura na NIP klienta — kiedy obowiązkowa, jak ją wystawić"
- "Kasa fiskalna w stajni — 2026 i czy musisz ją mieć"
- "VAT MOSS dla zagranicznych klientów — zawodnicy z UE"

> Volume tych keywordów w Polsce: 200-2000 wyszukiwań/mc. Niska konkurencja, wysoka intencja zakupowa.

#### 2. Operacje stajni (najliczniejszy klaster)

Słowa kluczowe: `zarządzanie stajnią`, `karnety jeździeckie`, `grafik stajni`, `kalendarz jazd konnych`

Pomysły:
- "Jak rozliczać karnety w stajni: 5 częstych błędów" ✅ *(już mamy)*
- "Konflikty rezerwacji w kalendarzu — jak unikać i automatyzować"
- "Harmonogram instruktorów jeździeckich — 7 modeli + szablony"
- "Polityka anulowania jazd: szablon dla szkółki"
- "Cennik szkółki jeździeckiej — jak wycenić jazdy i karnety"
- "Onboarding nowego klienta: szablon mailowy i checklista"
- "Co robić, gdy klient nie chce zapłacić (w 2026 r.)"

#### 3. Konkretne segmenty (long-tail SEO)

Słowa kluczowe: `pensjonat dla koni Warszawa`, `livery stajnia oferta`, `hodowla koni paszport`

Pomysły:
- "Pensjonat dla koni — jak ustalić cenę za boks"
- "Lista kontrolna pensjonatu: 27 rzeczy do uzgodnienia z właścicielem"
- "Kalendarz krycia klaczy — krok po kroku"
- "Paszport hodowlany PASB — jak wypełnić, zarejestrować, eksportować z systemu"
- "Trening cyklu 6-tygodniowego — szablon dla skoków i ujeżdżenia"
- "Integracja FEI — jak zgłaszać starty zawodników z systemu"

#### 4. Konkurencja / migracja (decision-stage)

Słowa kluczowe: `Horstable opinie`, `Excel stajnia jak`, `program do zarządzania stajnią`

Pomysły:
- "Jak wybrać SaaS dla stajni: 8 pytań" ✅ *(już mamy)*
- "Migracja z Excela na system stajenny — checklista 7 dni"
- "Hovera vs Horstable — recenzja 2026" *(rozszerzenie /vs/horstable)*
- "Nasza Stajnia opinie 2026 — alternatywy"
- "Najlepsze programy do zarządzania stajnią jeździecką w Polsce"

#### 5. Lokalne SEO (rosnący ruch)

Słowa kluczowe: `stajnia jeździecka {miasto}`

Programmatic content (gdy będzie czas):
- "Stajnie jeździeckie w Warszawie — co warto wiedzieć przed wizytą"
- "Pensjonaty dla koni — Mazowsze 2026"
- "Szkółka jeździecka Kraków, Wrocław, Poznań — porównanie"

> Te artykuły w v2 — najpierw zbieraj dane od klientów, potem pisz o regionach gdzie ich masz.

### 🇬🇧 EN — wybiórczo, dopiero po wejściu na rynek UE

Wersję EN robisz dla artykułów, które realnie targetują UE (KSeF nie — to PL only). Priorytety:

- "How to choose a SaaS for your stable" ✅ *(już mamy)*
- "Stable management software comparison 2026"
- "EU e-invoicing (Peppol BIS Billing 3.0) for equestrian businesses"
- "Boarding stable management — checklist for new owners"

## Cadence i KPI

| Faza | Cadence | Typ | Cel |
|---|---|---|---|
| Miesiąc 1-3 (start) | 1× tydz. | Top-of-funnel edukacyjne | 100-500 unique/mc |
| Miesiąc 4-6 | 1-2× tydz. | Mix edu + segment + decision | 1k-3k unique/mc |
| Miesiąc 7-12 | 2× tydz. + lokalne | Programmatic + persona | 5k-15k unique/mc |
| Q+1 | 1× dzień (jeśli zatrudniony copywriter) | Pełna machina | 30k+ unique/mc |

KPI per post:
- **Time on page > 2 min** = treść angażuje
- **Bounce rate < 60%** = znaleźli to czego szukali
- **Konwersja na trial / kontakt > 0.5%** dla blogu (więcej niż norma 0.2-0.4%)

## Kalendarz redakcyjny — szablon

Tworzyć `docs/EDITORIAL-CALENDAR.md` (nie publikowany) — co tydzień jeden post.

| Tydzień | Tytuł | Klaster | Słowo kluczowe | Status |
|---|---|---|---|---|
| 19 | KSeF 2026 dla stajni | Regulacje | "KSeF stajnia" | ✅ Published |
| 20 | Karnety - 5 błędów | Operacje | "karnety stajnia rozliczanie" | ✅ Published |
| 21 | Jak wybrać SaaS | Decision | "program stajnia jeździecka" | ✅ Published |
| 22 | Konflikty rezerwacji | Operacje | "kalendarz stajnia konflikty" | 📝 Draft |
| 23 | Kalendarz krycia klaczy | Hodowla | "kalendarz krycia klaczy online" | 📋 Planned |
| 24 | Polityka anulowania jazd | Operacje | "polityka anulowania jazda konna" | 📋 Planned |
| ... | | | | |

## Twoje istniejące artykuły — jak je dodać

Pisałeś, że masz artykuły gotowe. Tryb dodawania:

1. **Mam Word/PDF** → wklej tekst do CMS w polu „Treść", przeformatuj na markdown (krótkie akapity, listy `-`, nagłówki `##`)
2. **Mam markdown** → utwórz plik `src/content/blog/pl/{slug}.md` z frontmatterem (szablon wyżej) i pchnij commit
3. **Mam Notion/Google Docs** → eksportuj do markdown (Notion ma natywny export, Docs przez „Plik → Pobierz → Markdown") i jak wyżej

Jeśli chcesz, podeślij artykuły — przetłumaczę formatowanie, dodam frontmatter i zoptymalizuję pod SEO (tytuł, meta, internal linking).

## Co zrobić w pierwszym tygodniu

1. **Dodaj 3-5 swoich gotowych artykułów** — na start blog wygląda już na żywą sekcję
2. **Pierwszy post w nowej kategorii** — najlepiej „KSeF dla stajni 2026" lub coś sezonowego
3. **Sprawdź `https://hovera.app/blog`** — czy listing wygląda OK
4. **Submit sitemap do Google Search Console** — `https://hovera.app/sitemap-index.xml`
5. **Powiąż z Google Business Profile** — zwiększa lokalne SEO dla stajni
