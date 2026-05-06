# Hovera — Specyfikacja strony internetowej

> Dokument dla zespołu odpowiedzialnego za stronę marketingową `hovera.app`.
> Komplementarny do `hovera-spec.md` (specyfikacja produktu/aplikacji).
>
> **Wersja:** 1.0 (draft)
> **Status:** Pre-build, do uzgodnień
> **Domena docelowa:** `hovera.app` (z aliasami `hovera.io`, `hovera.eu` redirectującymi na primary)
> **Aplikacja webowa SaaS:** `app.hovera.app` (osobny projekt, opisany w `hovera-spec.md`)

---

## 1. Cel strony i jej rola

Strona `hovera.app` to **maszyna do generowania trial signupów** dla aplikacji SaaS. Nie jest portalem produktowym ani blogiem branżowym — to landing platform z trzema priorytetami w ścisłej kolejności:

1. **Konwersja** — odwiedzający → trial signup (`app.hovera.app/register`)
2. **Edukacja rynku** — wyjaśnienie wartości (prześcignięcie Horstable na komunikacji)
3. **SEO** — łapanie organicznego ruchu z PL i kluczowych rynków UE

Strona nie jest:

- ❌ Bloggerem (nie piszemy "10 trików dla jeźdźców" — to nie nasz target)
- ❌ Forum / community
- ❌ Dokumentacją produktu (to idzie do `docs.hovera.app` jako osobny projekt)
- ❌ Statusem usługi (to `status.hovera.app`)

### 1.1 KPI sukcesu strony

| Metryka | Target 6 miesięcy | Target 12 miesięcy |
|---------|-------------------|--------------------|
| Unique visitors / mies. | 8 000 | 30 000 |
| Konwersja visitor → trial signup | 3% | 5% |
| Bounce rate | <55% | <45% |
| Avg session duration | >90s | >150s |
| Pages per session | >2.0 | >2.8 |
| Organic traffic share | 40% | 65% |
| Lighthouse Performance | 90+ | 95+ |
| Lighthouse Accessibility | 95+ | 100 |

---

## 2. Tone of voice i pozycjonowanie komunikacji

### 2.1 Brand voice

Krótko: **spokojny ekspert, nie sprzedawca**.

| ✅ Robimy | ❌ Nie robimy |
|----------|--------------|
| Mówimy "ogarnij grafik w 30 minut" | "Zrewolucjonizuj swoją stajnię!" |
| Pokazujemy realne screeny z aplikacji | Stockowe zdjęcia uśmiechniętych ludzi z laptopem |
| Liczby z konkretnym kontekstem ("3 godziny tygodniowo") | "Oszczędź mnóstwo czasu!" |
| Zwracamy się per "Ty" (nie "Państwo") | Korpo-mowa, hołubimy |
| Krótkie zdania. Konkret. | Zdania złożone z trzema myślnikami i rozbudowanymi metaforami |
| Przyznajemy że produkt jest młody | Udajemy że jesteśmy na rynku 10 lat |
| Polski naturalny, anglicyzmy tylko gdy nie ma odpowiednika | Nie używamy "scheduluj", "userzy", "feature" |

### 2.2 Pozycjonowanie vs konkurencja

Komunikacyjna luka rynkowa:

- **Horstable** komunikuje "mniej telefonów, mniej chaosu" — to ich claim. Nie kopiujemy.
- **Equicty** komunikuje korporacyjnie po angielsku — nudno i niedostępnie.
- **Nasza Stajnia** komunikuje feature-list — nudno i nie-emocjonalnie.

Hovera komunikuje **lekkość** (zgodnie z etymologią marki "hover"):

- "Stajnia działa. Ty oddychasz." (PL primary tagline)
- "Lift the weight off your stable." (EN)
- "Mniej rzeczy do pilnowania. Więcej spokoju w głowie."

Atmosfera: minimalizm, dużo whitespace, edytorski layout, **brak stockowych zdjęć szczęśliwych jeźdźców**. Realne screeny aplikacji + abstrakcyjne ilustracje + zdjęcia z polskich stajni naszych pierwszych klientów.

### 2.3 Czego unikamy w copy

- ❌ "Innowacyjny", "rewolucyjny", "next-gen", "AI-powered" (jeszcze)
- ❌ "Najlepszy / numer 1 / lider rynku" (jeszcze nie jesteśmy)
- ❌ Buzzwords: "synergie", "ekosystem", "transformacja cyfrowa"
- ❌ Wykrzykniki!!! Trzy z rzędu szczególnie!!!
- ❌ Wszelkie "kliknij tutaj"

---

## 3. Architektura informacji

### 3.1 Mapa stron (sitemap) — MVP

```
hovera.app/                      Home / landing główny
├── /szkolka-jezdziecka         Use case: szkółka (target: Anna)
├── /pensjonat                   Use case: livery (target: Marek)
├── /sport                       Use case: trening sport (target: Karolina)
├── /hodowla                     Use case: hodowla (target: Tomasz)
├── /funkcje                     Lista wszystkich modułów
│   ├── /funkcje/konie
│   ├── /funkcje/kalendarz
│   ├── /funkcje/karnety
│   ├── /funkcje/finanse
│   └── /funkcje/aplikacja-mobilna
├── /cennik                      Pricing (4 pakiety + add-ony)
├── /vs/horstable                Comparison page (delikatna, faktografia)
├── /vs/excel                    Comparison: dlaczego nie arkusz
├── /integracje                  KSeF, Stripe, Przelewy24, FEI, PZJ
├── /o-nas                       O zespole, mission, kontakt
├── /kontakt                     Form + dane kontaktowe + Calendly
├── /blog                        Content marketing (start z 5 postami)
│   └── /blog/{slug}
├── /case-studies                Pierwsze case'y (puste w MVP, gotowe na v2)
│   └── /case-studies/{slug}
├── /pomoc                       FAQ + linki do docs.hovera.app
├── /regulamin                   ToS
├── /polityka-prywatnosci        Privacy policy
├── /rodo                        DPA i compliance info
└── /cookies                     Cookie policy
```

### 3.2 Mapa stron — v2 (po 6 miesiącach)

Dodajemy:

- **Wersje językowe**: `/en/...`, `/de/...`, `/nl/...`
- **Programmatic SEO**: `/system-zarzadzania-stajnia/{miasto}` (Warszawa, Kraków, Poznań, Wrocław, Gdańsk + 30 innych)
- **Calculator**: `/kalkulator-czasu` — "ile zaoszczędzisz na administracji?"
- **API marketing**: `/api` (z odsyłaniem do `docs.hovera.app/api`)
- **Webinary**: `/webinary`
- **Partnerzy**: `/partnerzy` (program partnerski dla księgowych, weterynarzy, branży)

### 3.3 Mapa stron — v3 (po roku)

- **Marketplace usług**: `/marketplace` (publiczny katalog weterynarzy, kowali)
- **Akademia Hovera**: `/akademia` (kursy, certyfikaty)
- **Forum / community**: `/forum` (jeśli traction wymaga)
- **Job board branżowy**: `/praca` (revenue stream)
- Pełne wersje językowe FR/IT/ES

---

## 4. Strona główna (home) — anatomia

Najważniejsza strona. 70% odwiedzin zacznie tutaj.

### 4.1 Sekcje w kolejności

**1. Hero (above the fold)**

- Logo Hovera (lewy górny róg)
- Nawigacja: Funkcje · Cennik · Use cases (dropdown) · Blog · Zaloguj · **[CTA primary: Wypróbuj za 0 zł]**
- H1: "Stajnia działa. Ty oddychasz."
- Subheadline: "Hovera porządkuje grafik, karnety, finanse i opiekę nad końmi w jednym miejscu. Bez instalacji, bez ściśle określonej dyscypliny, z polskim KSeF już dziś."
- Primary CTA: "Załóż konto za 0 zł" (sage green button)
- Secondary CTA: "Zobacz demo (15 min)" (link, nie button)
- Hero visual: **screen aplikacji** (kalendarz na laptopie + mobile widok obok). NIE stockowy obraz konia.
- Drobny tekst pod CTA: "Bez karty. Bez wdrożenia. Pierwsze konie w grafiku w 10 minut."

**2. Social proof bar**

Tuż pod hero, przed scrollem. Logo lub liczby:

- Pierwszy etap (przed klientami): "Budujemy z 8 polskimi stajniami w ramach early access"
- Po klientach: logosy (5-8 stajni) + stats: "~Y koni w systemie", "~X jazd zaplanowanych w tym tygodniu"

**3. Problem section — "To znasz?"**

3 karty z konkretnymi bólami persony Anny / Marka:

- "Telefon dzwoni 40 razy dziennie z pytaniem o terminy."
- "Karnety w zeszycie. Klient mówi że ma 5, Ty że 3."
- "Co miesiąc walczysz z Excelem żeby wystawić faktury."

Każda karta ma drobną metaforę wizualną (nie zdjęcia ludzi — abstrakcja, ikona, prosty obrazek).

**4. Rozwiązanie — "Jak Hovera to rozwiązuje"**

3-kolumnowa siatka, krótkie opisy + screenshot:

- **Grafik bez konfliktów** — multi-resource calendar (konie × instruktorzy × ujeżdżalnie)
- **Karnety same się rozliczają** — auto-decrement, alerty wyczerpania
- **Faktury z KSeF jednym klikiem** — od razu w Krajowym Systemie

**5. Use cases — "Hovera dla każdej stajni"**

Cztery duże karty z linkami do podstron:

- 🏇 **Szkółka jeździecka** — zapisy online, karnety, instruktorzy → `/szkolka-jezdziecka`
- 🐴 **Pensjonat (livery)** — boksy, dziennik konia, rozliczenia z właścicielami → `/pensjonat`
- 🏆 **Sport i trening** — programy, integracje FEI/PZJ, zawody → `/sport`
- 👶 **Hodowla** — klacze, krycia, źrebięta, paszporty → `/hodowla`

(Emoji ilustracyjne; w finalnym designie zastępujemy je customowymi piktogramami w stylu marki)

**6. Differentiator section — "Czego nie znajdziesz u konkurencji"**

3-4 unikalne wartości, każda z konkretnym screenshotem:

- **Aplikacja mobilna z trybem offline** — działa nawet w boksie bez wifi
- **Pełna integracja z KSeF** — od stycznia 2026 wymóg, my już to mamy
- **Publiczna mini-strona Twojej stajni** — klienci znajdują Cię w Google i rezerwują online

**7. Pricing teaser**

Trzy karty (Solo, Stable, Pro) z cenami i CTA "Zobacz pełen cennik" linkujący do `/cennik`.

**8. Testimonial / case study spotlight**

Jeden duży cytat z pierwszego klienta + zdjęcie + logo stajni. Format jak Linear.app testimonials.

**9. FAQ (5 najczęstszych pytań)**

- Czy Hovera działa na telefonie?
- Czy mogę przenieść dane z Excela / Horstable / Nasza Stajnia?
- Co z RODO i bezpieczeństwem?
- Czy w trial muszę podać kartę?
- Co jeśli przekroczę limity pakietu?

Z linkiem "Wszystkie pytania" → `/pomoc`.

**10. Final CTA**

Pełnoszerokościowy banner: "Wypróbuj 14 dni za 0 zł" + wizualizacja produktu w tle.

**11. Footer**

- Kolumna 1: O nas, Kariera (link), Blog, Case studies
- Kolumna 2: Funkcje, Cennik, Integracje, Aplikacja mobilna, API
- Kolumna 3: Pomoc, Status systemu, Kontakt, Calendly demo
- Kolumna 4: Polityka prywatności, Regulamin, RODO, Cookies
- Newsletter signup
- Social: LinkedIn, Instagram, YouTube
- Locale switcher (PL/EN/DE/...)
- Copyright + numer NIP/REGON Twojej firmy

---

## 5. Strony use case (4 sztuki)

Każda buduje argumentację pod jedną personę. Struktura ta sama:

1. **Hero** — H1 specyficzne dla persony ("System dla szkółki jeździeckiej, który działa szybciej niż telefon")
2. **Pain points** — 3-4 problemy specyficzne dla tej persony
3. **Funkcje rozwiązujące** — mapping problem → fokus moduł produktu
4. **Screenshoty** — kalendarz / karnety / dziennik koni — w kontekście tego use case
5. **Mini-testimonial** — od kogoś z tej samej kategorii klienta
6. **Tabela funkcji** — co dostajesz w którym pakiecie dla tego use case
7. **FAQ specyficzne** — 5 pytań tej persony
8. **CTA** — "Załóż konto za 0 zł"

---

## 6. Strona cennika (`/cennik`)

Najważniejsza strona po home. Decyzje zakupowe się tu podejmują.

### 6.1 Struktura

**Sekcja 1: Tabela 4 pakietów**

| | Free | Solo | Stable | Pro |
|---|---|---|---|---|
| Cena | 0 zł | 49 zł / mies. | 149 zł / mies. | 349 zł / mies. |
| Konie | 5 | 10 | 30 | 100 |
| Klienci | 10 | 30 | 100 | bez limitu |
| Online booking | – | ✓ | ✓ | ✓ |
| Karnety | – | – | ✓ | ✓ |
| Faktury + KSeF | – | – | ✓ | ✓ |
| Livery / pensjonat | – | – | – | ✓ |
| Aplikacja mobilna | ✓ | ✓ | ✓ | ✓ |
| Wsparcie | community | email | email + chat | priority |
| **CTA** | Załóż konto | Wybierz Solo | **Najczęściej wybierany** | Wybierz Pro |

**Sekcja 2: Enterprise / Multi-location**

Osobna karta z "Skontaktuj się" — bez ceny. Dla sieci stajni, klubów sportowych, hodowli.

**Sekcja 3: Add-ony**

- AI Copilot: +99 zł/mies (po dostarczeniu)
- Custom domain dla mini-strony: +29 zł/mies
- Pakiet SMS: 0,12 zł/SMS po pakiecie

**Sekcja 4: FAQ cennika**

- Czy mogę zmienić plan w każdym momencie?
- Co się dzieje gdy przekroczę limit?
- Roczna płatność — jaki rabat?
- Faktura czy paragon?
- Czy w cenie jest wsparcie wdrożeniowe?

**Sekcja 5: Porównanie funkcji szczegółowe**

Tabela ze wszystkimi funkcjami w pakietach (jak na Horstable, ale szerszy zakres).

### 6.2 Zasady cennikowe (UX)

- Toggle "Miesięcznie / Rocznie (-20%)" u góry
- Plan "najczęściej wybierany" (Stable) wyróżniony wizualnie
- Każdy plan ma "od" przy pierwszej wizycie, jeśli różne kraje (waluty)
- Przeliczanie waluty: detect locale → pokazuje EUR/PLN/CZK adekwatnie
- Przy każdym CTA: "Bez karty. 14 dni testów."

---

## 7. Strony comparison (`/vs/{konkurencja}`)

Strony porównawcze są **organicznym ruchem złotem** — ludzie googlują "horstable vs" i znajdują nas. Robimy je, ale fair.

### 7.1 Zasady etyczne (musi być)

- ✅ Tylko fakty publicznie dostępne
- ✅ Zachowujemy neutralny ton
- ✅ Wskazujemy gdzie konkurencja jest lepsza (jeśli jest)
- ✅ Zawsze link do strony konkurencji ("Sprawdź też Horstable")
- ❌ Nie ośmieszamy
- ❌ Nie sugerujemy że konkurencja działa źle
- ❌ Nie cytujemy klientów konkurencji

### 7.2 Lista do zrobienia

| Strona | Priorytet | Uzasadnienie |
|--------|-----------|--------------|
| `/vs/horstable` | P0 | Najsilniejszy konkurent PL |
| `/vs/excel` | P0 | Większość naszego TAM-u używa Excela |
| `/vs/nasza-stajnia` | P1 | Drugi gracz PL |
| `/vs/equinem` | P2 | Po wejściu na NL/EU |
| `/vs/equicty` | P2 | Po wejściu na BE |
| `/vs/notion` | P3 | Niche ale viral SEO potential |

### 7.3 Struktura strony vs

1. Hero + dwie kolumny logo
2. TL;DR table (3-4 najważniejsze różnice)
3. Pełna tabela porównawcza (20-30 funkcji)
4. "Wybierz X jeśli..." (kiedy konkurent jest lepszy)
5. "Wybierz Hovera jeśli..." (kiedy my jesteśmy lepsi)
6. CTA do trial

---

## 8. Blog i content strategy

### 8.1 Cel bloga

**Wyłącznie SEO i nurturing**, nie thought leadership. Na każdy post pytanie:

> "Czy ten artykuł skłoni właściciela stajni do założenia konta w ciągu 24h?"

Jeśli nie — nie piszemy.

### 8.2 Pillar topics (na 12 miesięcy)

Klastry contentowe pod SEO:

**Klaster 1: Operacje stajni**

- Jak ułożyć grafik szkółki jeździeckiej
- Karnety w stajni — jak rozliczać uczciwie
- Dziennik koński — co warto zapisywać
- Zarządzanie obciążeniem koni
- RODO w stajni jeździeckiej (lawful basis dla zdjęć dzieci itd.)

**Klaster 2: Finanse stajni**

- Faktura za boarding — co musi zawierać
- KSeF dla stajni — przewodnik 2026
- Excel vs system — kiedy zmienić
- Stawki za jazdę — analiza rynku 2026

**Klaster 3: Dyscypliny**

- Sport vs rekreacja — jak inaczej zarządzać
- Hodowla — księgowość specjalistyczna
- Livery / pensjonat — modele rozliczeń

**Klaster 4: Trendy i regulacje**

- E-invoicing w UE 2026
- ViDA 2028 — co to znaczy dla stajni
- Trendy SaaS w jeździectwie

### 8.3 Format

- 1500-3000 słów per post
- Każdy post: 1 H1, struktura H2/H3, listy, **przynajmniej 2 obrazki** (screenshoty + diagram)
- TOC (table of contents) automatyczny
- "Related posts" sekcja na dole
- CTA do trial w środku i na końcu (nie tylko na końcu)
- Czas czytania policzony
- Strukturalne dane: Article schema

### 8.4 Cadence

- MVP launch: 5 postów (klastry 1+2)
- Po starcie: 2 posty / miesiąc
- Po 6 miesiącach: 4 posty / miesiąc + 1 case study / miesiąc

### 8.5 Autor i CMS

- Autorzy: Ty + content writer freelance + zaproszeni eksperci (weterynarz, prawnik specjalizacja agro)
- CMS: Sanity (rekomendowany — multilingual native, structured) lub MDX z plików w repo

---

## 9. SEO — strategia techniczna i contentowa

### 9.1 SEO techniczne — checklista

- [ ] Każda strona ma unique title + meta description
- [ ] Open Graph + Twitter Cards na każdej stronie
- [ ] Canonical URL na każdej stronie
- [ ] Sitemap.xml dynamiczny + indexowanie w Google Search Console
- [ ] Robots.txt z wyłączeniem `/api`, `/admin` itd.
- [ ] hreflang tags dla wersji językowych
- [ ] Structured data (JSON-LD):
  - Organization (na każdej stronie)
  - SoftwareApplication (na home + features)
  - Product + AggregateRating (na cennik, gdy mamy reviews)
  - FAQPage (na FAQ)
  - Article (na blog posts)
  - BreadcrumbList (na zagłębionych stronach)
- [ ] Core Web Vitals zielone (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- [ ] HTTPS wszędzie + HSTS
- [ ] 404 page user-friendly z search bar
- [ ] Wewnętrzne linkowanie kontekstowe (każdy post → 3-5 powiązanych)
- [ ] Obrazki: AVIF/WebP, alt teksty, lazy loading
- [ ] No render-blocking resources

### 9.2 Słowa kluczowe — priorytety PL

**P0 (must-rank w 6 miesięcy):**

- system zarządzania stajnią
- aplikacja do stajni jeździeckiej
- program do szkółki jeździeckiej
- zarządzanie szkółką jazdy konnej
- karnety stajnia online

**P1 (target 12 miesięcy):**

- Horstable alternatywa
- system rezerwacji jazd konnych
- KSeF stajnia
- pensjonat dla koni system
- aplikacja dla instruktora jazdy konnej

**P2 (programmatic SEO 12+ miesięcy):**

- system zarządzania stajnią [miasto] × 50 miast PL
- szkółka jeździecka oprogramowanie [województwo] × 16

### 9.3 Słowa kluczowe — EN/DE/NL (po wejściu)

EN (UK + IE + EU):

- stable management software
- equestrian booking system
- riding school software
- horse boarding software
- livery yard management

DE:

- Reitschule Software
- Pferdestall Verwaltung
- Stallverwaltung App

NL:

- manege software
- paardenstal beheer
- ruitersport boekingssysteem

### 9.4 Link building

- Wpisy w polskich katalogach branżowych (PZJ, Konieipasja, Pferd)
- Wymiana z weterynarzami i kowalami (linki w obie strony)
- Guest posts na Pferd, Equita, Konieipasja, Galopuje.pl
- Press release przy launchu (Bankier, Spider's Web — sektor SaaS)

---

## 10. Design system

### 10.1 Kolory (z brandingu Hovera)

```css
:root {
  /* Primary palette */
  --hovera-slate: #1A1F2E;        /* Default text, primary backgrounds */
  --hovera-sand: #E8DDD0;         /* Soft accents, dividers */
  --hovera-sage: #7A8B7A;         /* CTA buttons, brand accent */
  --hovera-bg: #FAF8F4;           /* Off-white background */

  /* Functional */
  --hovera-success: #5C8A5F;      /* Success states */
  --hovera-warning: #B89461;      /* Warnings, w spójnej palecie ziemi */
  --hovera-danger: #A65A4A;       /* Errors, w spójnej palecie ziemi */
  --hovera-link: #4A6B7C;         /* Linki, neutralny niebieski-szary */

  /* Neutrals */
  --hovera-gray-100: #F2EDE6;
  --hovera-gray-300: #C9C2B5;
  --hovera-gray-500: #8C8579;
  --hovera-gray-700: #4D4940;
}
```

Dark mode: tak, ale **nie w MVP** — odsuwamy do v2.

### 10.2 Typografia

```css
/* Heading: Geist Sans */
@font-face { font-family: 'Geist'; src: url('/fonts/Geist-Variable.woff2'); font-weight: 100 900; font-display: swap; }

/* Body: Inter */
@font-face { font-family: 'Inter'; src: url('/fonts/Inter-Variable.woff2'); font-weight: 100 900; font-display: swap; }

/* Mono (dla kodu w blog/api): JetBrains Mono */
```

Skala typograficzna (rem-based, 16px base):

- H1: 3.5rem (56px) / weight 600 / tracking -0.02em
- H2: 2.5rem (40px) / 600 / -0.01em
- H3: 1.75rem (28px) / 600 / 0
- H4: 1.25rem (20px) / 600
- Body: 1rem (16px) / 400 / line-height 1.65
- Small: 0.875rem (14px)

### 10.3 Spacing i layout

- 8px grid (każdy spacing = wielokrotność 8px)
- Max content width: 1280px
- Reading width (prose): 720px
- Generous whitespace — sekcje rozdzielone min. 96px na desktop, 64px na mobile

### 10.4 Komponenty UI

Stack: **Tailwind CSS + shadcn/ui** (consistent z aplikacją SaaS dla DRY).

Custom komponenty:

- `<HoveraButton>` — primary (sage bg), secondary (outline), tertiary (link)
- `<HoveraCard>` — z subtle shadow, off-white tło
- `<HoveraBadge>` — dla "Nowość", "Najczęściej wybierany"
- `<HoveraTestimonial>` — duże cytaty
- `<HoveraFeature>` — ikona + tytuł + opis + screenshot
- `<HoveraComparisonRow>` — wiersz tabeli vs konkurencja
- `<HoveraPriceCard>` — karta cenowa z toggle miesiąc/rok
- `<HoveraFAQ>` — accordion z animacją
- `<HoveraCTABanner>` — pełnoszerokościowy CTA na końcu sekcji

### 10.5 Zasady wizualne

- ❌ Brak gradientów (poza bardzo subtle linear w hero)
- ❌ Brak mocnych shadowów (max `shadow-sm`)
- ❌ Brak ramek dookoła wszystkiego — używamy whitespace zamiast borderów
- ✅ Mocna typografia robi pracę za graphics
- ✅ Screen prawdziwych danych z aplikacji jako głównego visualu
- ✅ Mikrointerakcje subtelne (hover button: lekka zmiana koloru, 200ms easing)

### 10.6 Ilustracje

Brak stocków. Trzy źródła wizuali:

1. **Screenshoty produktu** — z prawdziwymi (anonimizowanymi) danymi
2. **Custom abstrakcyjne ilustracje** — geometryczne, w palecie marki, zlecone zewnętrznemu designerowi (~300-500 zł sztuka, ~10 ilustracji = 3-5k PLN)
3. **Zdjęcia z polskich stajni** — robione na zamówienie u early-access klientów (1-2 sesje fotograficzne, ~2-3k PLN każda)

### 10.7 Zasady accessibility

- WCAG 2.1 AA na wszystkich stronach
- Kontrasty ≥ 4.5:1 (sage #7A8B7A na off-white #FAF8F4 — sprawdzić, na granicy)
- Focus states wyraźne (outline 2px sage)
- Keyboard navigation pełna
- Skip-to-content link
- Aria-labels gdzie ikony bez tekstu
- Screen reader friendly forms
- Reduced motion respected (`prefers-reduced-motion`)

---

## 11. Stack technologiczny

### 11.1 Rekomendacje

| Warstwa | Wybór | Uzasadnienie |
|---------|-------|--------------|
| **Framework** | Next.js 15 (App Router) + React 19 + TypeScript | SSG + ISR, świetny SEO, spójność z aplikacją |
| **Styling** | Tailwind CSS 4 | Standard, spójność z aplikacją |
| **Komponenty UI** | shadcn/ui (cherry-picked) | Bez vendor lock-in |
| **CMS dla bloga** | Sanity v3 | Native multilingual, structured content, dobre DX, free tier |
| **Forms** | React Hook Form + Zod | Standard |
| **Email** | Resend (transactional) + Loops.so (lifecycle) | RODO compliant, dobre DX |
| **Hosting** | Vercel (Pro plan) lub Cloudflare Pages | Vercel = najlepsze DX dla Next; Cloudflare = tańsze + lepsza pan-EU latency |
| **CDN + DDoS** | Cloudflare | W obu wariantach |
| **DNS** | Cloudflare | Standard |
| **Analytics primary** | Plausible.io (self-host na Hetzner lub cloud) | RODO friendly, no-cookie default |
| **Analytics secondary** | GA4 (po consent) | Dla zaawansowanych konwersji |
| **Heatmaps** | Microsoft Clarity (free, RODO ok) | Lepsza alternatywa Hotjar |
| **A/B testing** | Vercel Edge Config + własna logika lub PostHog | PostHog gdy mamy >5k visitors/mc |
| **Forms backend** | Własny endpoint na app.hovera.app/api/leads + Resend | Trzymamy lead capture w naszych systemach |
| **Cookie consent** | Cookiebot (płatne) lub własny minimalist | Cookiebot dla compliance, własny dla aestethic |
| **Search (blog)** | Algolia free tier lub Pagefind (static) | Pagefind dla MVP |
| **Newsletter** | Loops.so lub Buttondown | Resend+Loops jest tańsze |
| **Testimonials** | Senja.io | Łatwe collecting + display |

### 11.2 Architektura wysokopoziomowa

```
┌──────────────────────────────────────────┐
│           Cloudflare CDN + WAF           │
└─────────────────┬────────────────────────┘
                  │
        ┌─────────▼──────────┐
        │   Next.js (Vercel) │
        │   - Static (SSG)   │
        │   - ISR (60s revalidate dla blog) │
        │   - SSR (search, dynamic) │
        └─────────┬──────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
   ┌────▼─────┐       ┌──────▼────────┐
   │  Sanity  │       │ app.hovera.app│
   │  (CMS)   │       │ (lead capture │
   │          │       │  + signup)    │
   └──────────┘       └───────────────┘
```

### 11.3 Performance budget

- Total page weight: < 500 KB initial (HTML + critical CSS + critical JS)
- Hero image: < 100 KB (AVIF, lazy fallback do WebP)
- Web fonts: max 2 woff2 files, subset PL+EN
- Third-party scripts: tylko po consent, defer + async
- LCP target: < 1.8s na 3G fast simulated
- TTI target: < 3s na 3G fast

---

## 12. Conversion paths

### 12.1 Primary CTA: trial signup

Każda strona ma minimum 2 instancje CTA "Załóż konto za 0 zł" (jedna w hero/górze, jedna w stopce). Strony długie (use cases, blog) mają też w środku.

CTA → `app.hovera.app/register?source={page}&utm_source=...` (atrybucja źródła)

### 12.2 Secondary CTA: demo booking

"Zobacz demo (15 min)" → Calendly / Cal.com z grafikiem Twoim (lub customer success person).

Dostępne na stronach use case + cennik + porównania.

### 12.3 Tertiary CTA: lead magnets

Email capture w zamian za:

- **Checklista**: "20-punktowy audyt operacji stajni" (PDF, 4 strony)
- **Kalkulator**: "Ile czasu marnujesz na administrację?" (interaktywny, na stronie)
- **Webinar**: "KSeF dla stajni 2026 — co musisz wiedzieć" (livestream + recording)
- **Mini-przewodnik**: "Jak przejść z Excela na system w 1 weekend" (PDF, 8 stron)

Każdy lead magnet → email sequence (Loops.so) → kontekstowy push do trial signup.

### 12.4 Funnel mapping

```
Visitor (organic/paid)
  │
  ├─► Blog post / SEO landing
  │     │
  │     ├─► Lead magnet (email capture)  ──► Email sequence ──► Trial signup
  │     └─► CTA in-content                ──► Trial signup
  │
  ├─► Home page
  │     ├─► Trial signup (direct)
  │     └─► Demo booking ──► Sales call ──► Trial / paid
  │
  ├─► Pricing page
  │     ├─► Trial signup
  │     └─► Demo booking (Enterprise)
  │
  └─► Comparison /vs page
        └─► Trial signup
```

Cel: każda strona ma jasny, mierzalny path do konwersji.

---

## 13. Internacjonalizacja

### 13.1 Strategia rolloutu

| Faza | Języki | Czas | Notatki |
|------|--------|------|---------|
| MVP | PL | 0 | Native, pełen content |
| v2 (3-4 mc) | EN | +2 mc | Tłumaczenie + lokalizacja CTA |
| v2 (5-6 mc) | DE | +2 mc | Native speaker review (DACH ważne) |
| v3 (7-9 mc) | NL | +2 mc | Pod NL/BE expansion |
| v3 (10-12 mc) | FR, IT, ES | +3 mc | Profesjonalne tłumaczenie + kontener cultural review |

### 13.2 Implementacja techniczna

- Routing: `/[locale]/...` (PL bez prefiksu lub z `/pl/...` — decyzja: **bez prefiksu**, bo PL primary)
- next-intl (preferowane) lub next-i18next
- Tłumaczenia w Sanity (multi-locale fields) lub w plikach JSON w repo
- hreflang tags automatyczne
- Locale switcher w nawigacji + footer
- Detect locale po Accept-Language + IP geolocation, ale nie wymuszać (zawsze respect user choice cookie)
- Format dat, walut, liczb przez `Intl` API per locale

### 13.3 Co NIE jest po prostu tłumaczone

- **CTA copy** — "Zaloz konto" ≠ "Sign up". Każdy język ma swoje wzorce CTA, dostosować native speaker.
- **Pricing** — różne waluty (PLN/EUR), różne pakiety per kraj jeśli różne realia (np. KSeF tylko w PL planie)
- **Comparison pages** — `/vs/horstable` tylko po polsku (Horstable to lokalna marka). DE ma `/vs/equicty` itd.
- **Blog content** — nie tłumaczymy automatycznie, piszemy native dla każdego rynku
- **Legal pages** — adaptowane do prawa lokalnego (GDPR jest pan-EU, ale ToS różnice)

---

## 14. Compliance i prawo

### 14.1 RODO

- Cookie banner z granular consent (functional / analytics / marketing)
- Privacy policy szczegółowa, generowana z template (Iubenda lub własna)
- Prawo dostępu / prawo bycia zapomnianym — formularz na `/rodo`
- Newsletter consent: double opt-in
- Form data: minimalne pole zbierane (email + nazwa stajni wystarczy, nie zbieramy NIP-u na lead capture)
- DPA (Data Processing Agreement) dla klientów → na osobnej stronie / generowany w aplikacji

### 14.2 Cookies

- Striktnie funkcjonalne by default
- Analytics tylko po consent
- Marketing pixele (Facebook, LinkedIn) tylko po consent
- Cookie banner zgodny z TTDSG (DE), CNIL (FR), ePrivacy (PL/UE)

### 14.3 European Accessibility Act (EAA) 2025

- WCAG 2.1 AA wymóg prawny dla SaaS B2B w UE od 28 czerwca 2025
- Coroczny audyt accessibility
- Strona accessibility statement (`/dostepnosc`)

### 14.4 Inne

- Impressum / dane firmy w stopce (wymóg DE/AT)
- Numer NIP/VAT widoczny
- Regulamin świadczenia usług (PL: ustawa o świadczeniu usług drogą elektroniczną)
- Polityka zwrotów (gdy płatne)

---

## 15. Analityka i tracking

### 15.1 Eventy do trackowania

**Engagement:**
- `page_view`
- `scroll_depth_25/50/75/100`
- `time_on_page_30s/60s/180s`
- `external_link_click`

**Konwersja:**
- `cta_clicked` (z metadanymi: ktora strona, ktora pozycja, copy)
- `lead_magnet_download` (który + email)
- `newsletter_signup`
- `demo_booking_started`
- `demo_booking_completed`
- `trial_signup_started`
- `trial_signup_completed` (z atrybucją źródła)

**Content:**
- `blog_post_read_25/50/75/100`
- `comparison_table_viewed`
- `pricing_toggle_changed` (monthly ↔ yearly)
- `faq_expanded` (które pytanie)

### 15.2 Atrybucja

- UTM parameters na każdym kanale paid
- Last-click attribution domyślnie
- Multi-touch attribution dla większych cykli (gdy tracking dojrzały)
- `source` parameter do app signup żeby sprzedaż wiedziała skąd przyszedł lead

### 15.3 Dashboard (cotygodniowy review)

Najważniejsze metryki na jednym ekranie (Plausible + custom dashboard):

- Visitors (week-over-week)
- Top pages
- Top referrers
- Conversion rate per page
- Funnel: home → pricing → trial
- Top blog posts
- Bounce rate per landing source

---

## 16. Roadmapa wdrożenia

### 16.1 Sprint 0 — Fundamenty (tydzień 1-2)

- [ ] Setup repo Next.js 15 + TS + Tailwind + shadcn/ui
- [ ] Setup Sanity CMS z schema dla blog/case-study
- [ ] Setup Vercel/Cloudflare Pages deploy
- [ ] DNS + Cloudflare zabezpieczenia
- [ ] Wireframes wszystkich stron MVP w Figma
- [ ] Design system w Figma (zsynchronizowany z aplikacją SaaS)

### 16.2 Sprint 1-2 — Core strony (tydzień 3-6)

- [ ] Home page (8 sekcji)
- [ ] Cennik
- [ ] 4 use cases (szkółka, livery, sport, hodowla)
- [ ] Funkcje (overview + 5 podstron)
- [ ] FAQ + pomoc
- [ ] Footer + nawigacja + cookie banner
- [ ] Legal pages (regulamin, RODO, polityka, cookies)

### 16.3 Sprint 3 — SEO i content (tydzień 7-8)

- [ ] Sitemap + robots + structured data
- [ ] 5 pierwszych blog postów
- [ ] /vs/horstable i /vs/excel
- [ ] /o-nas + /kontakt + /integracje
- [ ] Newsletter signup + lead magnet (1 PDF)

### 16.4 Sprint 4 — Polish + launch (tydzień 9-10)

- [ ] Lighthouse 90+ na wszystkich
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile testing realnie na 3 urządzeniach
- [ ] Accessibility audit (WAVE + manual screen reader)
- [ ] Analytics + tracking konfiguracja
- [ ] Press release + launch announcement

### 16.5 Po MVP (kwartalnie)

- Q+1: EN + DE wersja, kalkulator, więcej blog postów (10+)
- Q+2: NL wersja, programmatic SEO, 3 case studies
- Q+3: FR/IT/ES, marketplace landing, akademia
- Q+4: A/B testing intensywny, redesign jeśli dane sugerują

---

## 17. Decyzje do podjęcia

Lista do ustalenia przed startem zespołu:

1. **CMS: Sanity czy MDX-in-repo?**
   - Sanity = łatwiejsze dla content writera (non-tech)
   - MDX = trzymamy wszystko w git, prostsze devopsowo
2. **Hosting: Vercel czy Cloudflare Pages?**
   - Vercel: najlepsze DX dla Next.js, ale drogie przy skali ($20/mc Pro + bandwidth costs)
   - Cloudflare: tańsze, świetna pan-EU latency, ale niektóre Next.js features mniej sprawne
3. **Analytics: Plausible czy GA4 czy oba?**
   - Plausible = RODO without consent, prosty
   - GA4 = standard branżowy, więcej featurów
   - Rekomendacja: **oba** — Plausible always-on dla podstaw, GA4 po consent dla głębi
4. **Locale strategy: subfolder vs subdomain?**
   - Subfolder (`hovera.app/de/...`): SEO juice się dzieli mniej, prostsze
   - Subdomain (`de.hovera.app`): osobne brandy per kraj, łatwiej dla SEO lokalnego
   - Rekomendacja: **subfolder** (SEO experts są zgodni że dla SaaS B2B to lepiej)
5. **Cookie banner: Cookiebot ($) czy własny?**
   - Cookiebot = compliance gwarantowany ale 12-50 EUR/mc
   - Własny = darmowy ale wymaga utrzymania
6. **Domain primary: hovera.app czy hovera.io czy hovera.eu?**
   - `.app` = nowoczesne, automatic HTTPS
   - `.io` = developer-friendly (może mylić)
   - `.eu` = mocniej europejskie ale słabsze rozpoznanie poza EU
   - Rekomendacja: **`.app` jako primary, `.eu` jako redirect z power lokalizacyjną**
7. **Custom illustrations: zewnętrzny designer czy wewnątrz?**
   - Zewnętrzny = ~3-5k PLN, profesjonalny output
   - Wewnątrz (np. Ty + AI) = darmowe, ale czasochłonne i niespójne
8. **Dark mode: w MVP czy v2?**
   - Rekomendacja: **v2** — robić go dobrze wymaga 2x designu
9. **Newsletter: w MVP czy v2?**
   - Loops.so basic plan free do 1k subscribers — opłaca się włączyć od MVP
10. **Forum / community: czy w ogóle?**
    - Rekomendacja: **NIE w pierwszym roku** — community wymaga moderacji, my mamy app do zbudowania

---

## 18. Anti-pattern — czego NIE robimy

- ❌ Nie kopiujemy Horstable estetycznie. Oni robią warm, ciepły, klasyczny. My — minimalistyczny, edytorski, lekki.
- ❌ Nie używamy stockowych zdjęć szczęśliwych jeźdźców na białym tle. Każdy taki obraz = -1 punkt brand.
- ❌ Nie robimy "live chat" w prawym dolnym rogu z agresywnym pop-upem po 10 sekundach. Może być, ale subtelny i opt-in.
- ❌ Nie umieszczamy "WIDEO POWITALNE" w hero z autoplay. Stage 2010 era.
- ❌ Nie piszemy długich akapitów. Każdy paragraf maksimum 3 zdania. Każde zdanie maksimum 25 słów.
- ❌ Nie używamy "kliknij tutaj" jako copy linku.
- ❌ Nie pisujemy CTA "Zarejestruj się teraz!". Piszemy "Załóż konto za 0 zł".
- ❌ Nie kopiujemy konkurencji testimonialami w stylu "Niesamowita aplikacja, polecam!". Konkretne liczby albo nic.
- ❌ Nie ukrywamy cen za "Skontaktuj się z nami". Tylko Enterprise jest "od X / na zapytanie".
- ❌ Nie blokujemy prawego klika (sic — niektórzy konkurenci to robią; absurdalne).

---

## 19. Załączniki — co dostarczam później

- `02-website-wireframes.md` — wireframes wszystkich stron MVP (Figma export)
- `03-content-blueprint.md` — szczegółowy outline dla 5 pierwszych blog postów + 4 stron use case
- `04-seo-keyword-map.md` — pełna mapa słów kluczowych z volumes (Ahrefs/Semrush data)
- `05-design-tokens.md` — tokeny designu w formacie Style Dictionary (eksport do code)
- `06-launch-plan.md` — plan launchu (PR, ads, partnerstwa, soft launch z early access)
- `07-paid-marketing.md` — strategia płatna (Google Ads, Meta, LinkedIn) — gdy i co
- `08-conversion-rate-optimization.md` — A/B test backlog + framework do przeprowadzania

---

## Stopka

**Owner:** Przemek
**Last updated:** 2026-05-06
**Następny review:** po decyzjach z sekcji 17 + po Sprint 0

> Dokument jest **żywy**. Zmiany messagingu, struktury IA, copy → update tutaj + changelog.
> Spójność z `hovera-spec.md` i designem aplikacji SaaS jest absolutnym priorytetem — strona i produkt to jeden brand experience.
