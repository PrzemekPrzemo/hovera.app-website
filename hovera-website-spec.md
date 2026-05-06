# Hovera — Specyfikacja strony internetowej (product-led)

> Dokument dla zespołu odpowiedzialnego za stronę marketingową `hovera.app`.
> Komplementarny do `hovera-spec.md` (specyfikacja produktu/aplikacji).
>
> **Wersja:** 2.0
> **Status:** Pre-build, do uzgodnień
> **Domena docelowa:** `hovera.app` (z aliasami `hovera.io`, `hovera.eu` redirectującymi na primary)
> **Aplikacja webowa SaaS:** `app.hovera.app` (osobny projekt, opisany w `hovera-spec.md`)

---

## 1. Cel strony i jej rola

Strona `hovera.app` to **product-led marketing site** — nie prosty landing dla lead-genu, lecz pełna prezentacja produktu, która sprzedaje subskrypcję SaaS. Wzorce: Linear, Raycast, Notion, Vercel, Stripe — strony, gdzie produkt jest gwiazdą, każda sekcja pokazuje co oprogramowanie potrafi, a konwersja prowadzi do **płatnej subskrypcji** (z 14-dniowym trial jako technicznym etapem, nie głównym celem).

### 1.1 Trzy priorytety w ścisłej kolejności

1. **Pokazanie produktu** — odwiedzający musi w ciągu 30 sekund zobaczyć, jak Hovera wygląda, co umie i dlaczego jest lepsza niż arkusz/Horstable
2. **Sprzedaż subskrypcji** — jasne pakiety, transparentne ceny, frictionless checkout (karta → konto → praca z produktem)
3. **SEO i organic traffic** — wsparcie wzrostu, nie główny driver konwersji

### 1.2 Strona NIE jest

- ❌ Lead-genowym lejem z 5 lead magnetami
- ❌ Blogiem branżowym
- ❌ Forum / community
- ❌ Dokumentacją techniczną (idzie do `docs.hovera.app`)
- ❌ Statusem usługi (`status.hovera.app`)
- ❌ Stroną korporacyjną z misją i wartościami zespołu

### 1.3 KPI sukcesu

| Metryka | Target 6 miesięcy | Target 12 miesięcy |
|---------|-------------------|--------------------|
| Unique visitors / mies. | 10 000 | 35 000 |
| Konwersja visitor → trial signup | 4% | 6% |
| **Konwersja trial → paid (subscription)** | **30%** | **40%** |
| **Konwersja visitor → paid (end-to-end)** | **1.2%** | **2.4%** |
| Direct paid signup (bez trial) | 5% płacących | 15% płacących |
| Bounce rate | <50% | <40% |
| Avg session duration | >120s | >180s |
| Pages per session | >2.5 | >3.5 |
| Lighthouse Performance | 90+ | 95+ |

Najważniejsza metryka: **visitor → paid subscription**. Trial jest etapem pośrednim, nie celem.

---

## 2. Tone of voice i pozycjonowanie

### 2.1 Brand voice

Krótko: **product-confident expert, nie sprzedawca**.

| ✅ Robimy | ❌ Nie robimy |
|----------|--------------|
| Pokazujemy realne screeny z prawdziwymi danymi | Stockowe zdjęcia szczęśliwych jeźdźców |
| "Tak wygląda nasz kalendarz przy 30 koniach" | "Rewolucjonizujemy zarządzanie!" |
| Liczby z kontekstem ("18 sekund od kliknięcia do gotowej faktury") | "Oszczędź mnóstwo czasu!" |
| Animacje produktu w akcji (loops, GIF, video) | Słajdshow z marketingowymi grafikami |
| Zwracamy się per "Ty" | Korpo-mowa |
| Krótkie zdania. Konkret. | Złożone zdania o synergiach |
| Pokazujemy zarówno mocne, jak i nieukończone strony | Udajemy że jesteśmy 10 lat na rynku |

### 2.2 Pozycjonowanie produktu vs konkurencja

Komunikacyjna luka rynkowa po analizie konkurentów (`hovera-spec.md` sekcja 3):

- **Horstable** prezentuje produkt minimalnie (3-4 screeny na stronie), bardziej sprzedaje "wdrożenie 1:1" niż produkt
- **Equicty** prezentuje produkt ale chaotycznie, korpo-EN, brak jednego "wow"
- **EquineM** strona z 2018, screenshoty wyglądają jak Windows XP
- **Nasza Stajnia** lista funkcji, brak wizualnego storytellingu
- **Mosson Stable** ładnie ale powierzchownie

**Hovera robi to inaczej**: każda strona to dedykowany product showcase. Inspiracja wprost z Linear i Raycast — gdzie strona to praktycznie interaktywna prezentacja produktu, a kupno jest naturalną konsekwencją.

### 2.3 Centralne komunikaty

Hierarchia messagingu (od najmocniejszego do detalu):

1. **Lekkość** (brand promise): "Stajnia działa. Ty oddychasz."
2. **Wszystko w jednym** (product breadth): grafik + karnety + finanse + opieka + KSeF
3. **Polski first, europejski w bonusie** (compliance): "Robimy to z myślą o polskim prawie. Działamy też w UE."
4. **Mobile + offline** (technical edge): "Działa nawet w boksie bez wifi."

---

## 3. Architektura informacji — product-led

### 3.1 Mapa stron — MVP

```
hovera.app/                          Home / product showcase
│
├── /produkt                         Pełen tour produktu (główna sales page)
│   ├── /produkt/kalendarz           Deep-dive: kalendarz multi-resource
│   ├── /produkt/karnety             Deep-dive: karnety i auto-rozliczenia
│   ├── /produkt/dziennik-konia      Deep-dive: timeline konia, zdrowie
│   ├── /produkt/finanse-ksef        Deep-dive: faktury + KSeF
│   ├── /produkt/aplikacja-mobilna   Deep-dive: iOS/Android + offline
│   ├── /produkt/zapisy-online       Deep-dive: portal klienta + booking
│   └── /produkt/ai-copilot          Deep-dive: AI assistant (gdy dostępny)
│
├── /dla/szkolki                     Use case: szkółka (target: Anna)
├── /dla/pensjonatu                  Use case: livery (target: Marek)
├── /dla/sportu                      Use case: trening sport (target: Karolina)
├── /dla/hodowli                     Use case: hodowla (target: Tomasz)
├── /dla/sieci-stajni                Use case: multi-location (Enterprise)
│
├── /cennik                          Plany + checkout (4 pakiety + Enterprise)
├── /aplikacja-mobilna               Marketing landing dla mobile + App Store / Google Play
├── /integracje                      KSeF, Stripe, Przelewy24, FEI, PZJ, Peppol
├── /co-nowego                       Public changelog (changelog-driven marketing)
│
├── /vs/horstable                    Comparison
├── /vs/excel
├── /vs/nasza-stajnia
│
├── /demo                            Interaktywne demo / video tour / book a call
├── /klienci                         Case studies + testimonials
├── /blog                            Wsparcie SEO (mniejsze niż w v1)
│
├── /o-nas                           Krótka wizytówka zespołu
├── /kontakt                         Form + Calendly
├── /pomoc                           FAQ + link do docs
│
└── (legal: /regulamin, /polityka-prywatnosci, /rodo, /cookies, /dostepnosc)
```

### 3.2 Mapa stron — v2 (po 6 miesiącach)

- Wersje językowe: `/en`, `/de`, `/nl`
- `/api` — dev marketing
- `/szablony` — gotowe konfiguracje (jak Notion templates) dla: szkółki, livery, hodowli
- `/sandbox` — interaktywne demo bez logowania (klikanie w prawdziwy UI z fake data)
- `/akademia` — kursy onboardingowe
- Programmatic SEO: `/dla-stajni-w/{miasto}`

### 3.3 Mapa stron — v3 (po roku)

- `/marketplace` (publiczny katalog weterynarzy/kowali)
- `/partnerzy` (program partnerski)
- Pełne FR/IT/ES wersje
- `/api/playground` (interaktywny API explorer)

---

## 4. Strona główna (home) — product showcase

Najważniejsza strona. Cel: w 30 sekundach pokazać produkt, w 90 sekundach przekonać do trial / kupna.

### 4.1 Sekcje w kolejności

**1. Hero z animowanym product mockupem**

- Logo Hovera + nawigacja: Produkt (dropdown z 7 funkcjami) · Dla kogo (dropdown 5 use cases) · Cennik · Demo · Co nowego · Zaloguj · **[CTA: Wypróbuj za 0 zł]**
- H1: "Stajnia działa. Ty oddychasz."
- Subheadline (max 2 zdania): "Grafik, karnety, faktury z KSeF i opieka nad końmi w jednym narzędziu. Działa na komputerze, telefonie, w stajni bez wifi."
- **Hero visual: animowany mockup aplikacji** — desktop + mobile obok siebie. Kalendarz przewija się sam, faktura generuje się, push notification przylatuje na telefon. Wzorzec: linear.app hero, raycast.com hero.
- Primary CTA: "Wypróbuj za 0 zł" (sage)
- Secondary CTA: "Zobacz demo (3 min)" — otwiera modal z video / interactive sandbox
- Drobny tekst: "14 dni za darmo • Bez karty • KSeF w cenie"

**2. Logo bar / social proof**

Tuż pod hero. Logo 6-8 stajni które używają (po pierwszych klientach). Przed nimi: "Już używają nas X stajni w Polsce" + 3 hard stats (np. "12 000 jazd zaplanowanych", "1 200 koni w systemie", "8 minut średnio na wystawienie faktury").

**3. Product tour — przewijalna sekcja "Co Hovera potrafi"**

To jest serce strony. Format: 5-6 sekcji feature, każda z prawdziwym screenshotem/animacją + krótkim opisem + CTA "Dowiedz się więcej" do `/produkt/{feature}`.

Każdy feature jako fullwidth section ze sticky tekstem po lewej i live mockupem po prawej (na desktop), wertykalny stack na mobile:

- **Kalendarz, który nie pozwoli zarezerwować dwóch jazd na ten sam koń** — animacja drag&drop w kalendarzu, conflicts highlightowane
- **Karnety, które same się rozliczają** — animacja: klient kupuje karnet → planuje jazdę → karnet ubywa → faktura wystawia się
- **Faktury z KSeF jednym kliknięciem** — animacja: kliknięcie button → status "wysłana", check mark, "Numer KSeF: 2026/01/..."
- **Dziennik konia w jednym widoku** — animacja timeline konia: szczepienie, jazda, kowal, notatka
- **Aplikacja mobilna, która działa nawet bez wifi** — mockup phone + indicator "offline mode", potem "syncing"

Wzorce inspiracyjne: linear.app/method, raycast.com (przewijające się features), notion.so home.

**4. Krótkie demo video / interactive sandbox**

Pełnoszerokościowa sekcja: "Sprawdź sama, jak to działa" + jedno z dwóch:

- Embedded video (3-min product tour z lektorem)
- LUB interactive sandbox: prawdziwy UI Hovery z mock data, klikalny, bez logowania

Rekomendacja: **oboje**, z toggle. Sandbox po MVP gdy będziemy mieli czas zbudować.

**5. Use case pivots — "Hovera w 4 rolach"**

Cztery duże karty (clickable):

- 🏇 **Szkółka** — "Mniej telefonów, więcej jazd"
- 🐴 **Pensjonat** — "Każdy właściciel widzi swojego konia"
- 🏆 **Sport i trening** — "Programy + zawody + integracje FEI"
- 👶 **Hodowla** — "Klacze, ogiery, źrebięta, paszporty"

Każda karta = mini-screenshot + 3 kluczowe funkcje + link do `/dla/{use-case}`.

**6. Differentiator strip — "Czego nie znajdziesz nigdzie indziej"**

Trzy mocne wartości w prostej siatce, każda z jednym screenshotem:

- **Polski KSeF i Peppol UE od pierwszego dnia** — nie po latach, nie jako addon
- **Aplikacja mobilna, która działa offline** — w stajni bez wifi, sync kiedy wrócisz
- **Publiczna strona Twojej stajni** — klienci znajdują Cię w Google, rezerwują online (tu screenshot mini-strony)

**7. Pricing teaser**

Trzy karty (Solo, Stable, Pro) z cenami i krótkim "co dostajesz". CTA "Zobacz pełen cennik" → `/cennik`.

UWAGA: tu widać **realne ceny od razu**. Bez gier z "skontaktuj się". Tylko Enterprise jest "od X / na zapytanie".

**8. Testimonial spotlight**

Jeden duży cytat z prawdziwego klienta + wideo selfie 30s + logo stajni. Format Linear/Vercel — duża typografia, bez decorations.

**9. Built for the way stables actually work — sekcja techniczna**

Krótka sekcja dla bardziej technicznych odbiorców (Marek, Karolina) — ikona + jeden bullet:

- 🔒 Pełne szyfrowanie + RODO compliance
- 🇵🇱 KSeF Type 2 cert
- 🇪🇺 Peppol BIS Billing 3.0
- 📱 iOS + Android natywnie
- 🔌 Public API + webhooks
- ⚙️ Eksport do iFirma / Wfirma / Comarch ERP

**10. Final CTA banner**

Pełnoszerokościowy. "Zacznij dziś. Bez instalacji, bez wdrożenia, bez karty." + duży CTA + "lub zobacz demo".

**11. Footer**

Standard 4 kolumny:

- **Produkt**: Kalendarz, Karnety, Dziennik koni, Finanse i KSeF, Aplikacja mobilna, Co nowego, Roadmap
- **Dla kogo**: Szkółka, Pensjonat, Sport, Hodowla, Sieci stajni
- **Zasoby**: Cennik, Integracje, API, Pomoc, Kontakt, Demo, Blog, Klienci
- **Firma**: O nas, Kariera, Status systemu, Bezpieczeństwo, Polityka prywatności, Regulamin, RODO, Cookies, Dostępność

Plus: locale switcher, social, App Store + Google Play badges.

### 4.2 Co odróżnia ten home od konkurencji

- **70% strony to produkt w akcji** (animacje, screeny, video). Konkurencja ma 10-20%.
- **Brak ramki "problemy które rozwiązujemy"** w tradycyjnym formacie. Zamiast tego — produkt sam pokazuje że rozwiązuje problemy.
- **Cena widoczna na home**. Horstable trzyma ceny tylko w `/cennik`.
- **Demo video / sandbox dostępne bez signupu**. Equicty wymaga "book a demo" call.

---

## 5. Strony deep-dive produktu (`/produkt/*`)

To jest **nowy poziom** w stosunku do typowej strony konkurencji. Każdy moduł produktu = osobna landing page wzorowana na Linear (np. linear.app/method). Cel: pokazać feature na poziomie szczegółu, który przekonuje że to rzeczywiście rozwiązuje problem.

### 5.1 Struktura każdej strony /produkt/{feature}

1. **Hero** — duża animacja/video tej funkcji + H1 specyficzne (np. "Kalendarz, który rozumie Twoją stajnię")
2. **3-4 sub-features** — każde z dedykowanym mockupem/animacją (np. dla kalendarza: konflikt detection, drag&drop, multi-view, eksport)
3. **Sekcja "Działa razem z..."** — pokazujemy integracje z innymi modułami (kalendarz → karnety → faktura → email)
4. **Snippet kodu / API example** — gdzie ma sens (dla integrations, API)
5. **Kto z tego korzysta** — krótkie 2-3 testimoniale specyficzne dla tej funkcji
6. **CTA** — z subtelnym kontekstowym przypomnieniem ceny ("Dostępne we wszystkich pakietach od 49 zł/mies.")

### 5.2 Lista stron

| URL | Główne hasło | Priorytet build |
|-----|--------------|-----------------|
| `/produkt/kalendarz` | "Multi-resource calendar bez konfliktów" | P0 |
| `/produkt/karnety` | "Karnety, które same się rozliczają" | P0 |
| `/produkt/finanse-ksef` | "Faktury z KSeF jednym kliknięciem" | P0 (PL killer feature) |
| `/produkt/zapisy-online` | "Twoja stajnia w Google. Klienci sami się zapisują." | P0 |
| `/produkt/dziennik-konia` | "Cała historia konia w jednym widoku" | P1 |
| `/produkt/aplikacja-mobilna` | "Stajnia w kieszeni. Działa też offline." | P1 |
| `/produkt/ai-copilot` | "Mniej myślenia o operacjach, więcej o koniach" | P2 (po dostarczeniu AI) |
| `/produkt/livery` | "Pensjonat, w którym właściciele wszystko widzą" | P2 |
| `/produkt/api` | "Otwarte API. Buduj na Hoverze." | P3 |

### 5.3 Animacje i video — jak to robimy

To największa różnica względem konkurencji i największe ryzyko (czasowe + budżetowe).

**Opcje (kompromis cost/quality):**

| Metoda | Koszt | Jakość | Kiedy używać |
|--------|-------|--------|--------------|
| Loom screenshare + edycja | 0 zł | Niska | Quick first version, MVP |
| Native screen recording + Premiere | ~10h pracy | Średnia | Dobre dla MVP |
| Lottie animation (After Effects → JSON) | ~500-2000 zł / animacja | Wysoka | Hero animations, konkretne flow |
| Custom motion design (zewnętrzny artysta) | 3-8k zł / animacja | Najwyższa | Hero strony głównej, kluczowe stories |
| Interactive demo (HTML/CSS/React) | 20-40h dev / każdy | Bardzo wysoka, klikalne | Sandbox, zaawansowane sekcje |

**Rekomendacja:**

- MVP: **screen recordingi z Loom/Cleanshot, edytowane podstawowo** — tanio i wystarczająco
- v2 (po 3 miesiącach): **2-3 kluczowe Lottie animacje** w hero strony głównej i `/produkt/kalendarz`
- v3: **interactive sandbox** zastępuje video na home

---

## 6. Strona cennika — primary purchase page

To jest **strona, na której się sprzedaje**. Pricing to nie suchy cennik — to driver konwersji.

### 6.1 Filozofia pricingowa na stronie

- **Pełna transparentność** — żadnych "Skontaktuj się" poza Enterprise
- **Inline checkout** — po kliknięciu "Wybierz plan" → modal z formularzem karty (Stripe Checkout albo wbudowany)
- **Direct paid możliwy** — można pominąć trial i zacząć od razu na karcie (z dyskretnym "Wolisz najpierw 14 dni za 0 zł?" jako alternative)
- **Annual discount widoczny** — "-20% przy płatności rocznej" jako toggle na górze
- **VAT clarity** — przełącznik "Netto / Brutto" dla firm

### 6.2 Sekcje strony

**1. Hero**

- H1: "Wybierz plan dopasowany do Twojej stajni"
- Toggle: "Miesięcznie / Rocznie (-20%)"
- Toggle: "Netto / Brutto"
- Locale-aware currency (PLN / EUR / CZK)

**2. 4 pricing cards**

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
| **CTA** | Załóż konto | **Kup plan Solo** | **Kup plan Stable** ⭐ | **Kup plan Pro** |
| Alt CTA (poniżej) | – | "lub 14 dni za 0 zł" | "lub 14 dni za 0 zł" | "lub 14 dni za 0 zł" |

**3. Enterprise card**

Osobna karta na pełnej szerokości pod 4 pakietami. Z hasłem "Sieci stajni, kluby sportowe, hodowle z 100+ końmi." Lista ekstra: white-label, multi-location, dedicated support, custom SLA, SSO. CTA: "Skontaktuj się" + Calendly.

**4. Add-ony**

- AI Copilot: +99 zł/mies (od v2)
- Custom domain: +29 zł/mies
- Pakiet SMS po wyczerpaniu: 0,12 zł/SMS
- Dodatkowe seats pracownika powyżej limitu: 9 zł/seat/mies

**5. Pełna tabela porównawcza funkcji**

Wertykalna tabela ze wszystkimi funkcjami × pakiety. Zwijalna, by default zwinięta po pierwszych 10 wierszach.

**6. ROI calculator (od v2)**

Interaktywny: "Ile mam koni? Ile klientów? Ile godzin na admin?" → output: "Hovera oszczędzi Ci ~X godzin tygodniowo, czyli ~Y zł rocznie. Plan Stable za 149 zł zwraca się w pierwszym tygodniu."

**7. Pricing FAQ**

- Czy mogę zmienić plan w każdej chwili?
- Co się dzieje gdy przekroczę limit koni / klientów?
- Czy w cenie jest KSeF? *(tak, w Stable+)*
- Czy potrzebuję podpisać umowę?
- Czy faktura VAT jest standardowo?
- Co z VAT MOSS / OSS dla zagranicznych klientów?

**8. Money-back guarantee**

"30-day money back guarantee" — pełny zwrot za pierwszy miesiąc bez pytań. To jest **kluczowy konwerter** — usuwa największą obawę przy direct paid.

**9. Final CTA**

"Wciąż nie pewna?" → "Wypróbuj 14 dni za 0 zł. Bez karty."

### 6.3 Checkout flow

Po kliknięciu "Kup plan Stable":

1. Modal lub strona `/cennik/checkout?plan=stable`
2. Email + nazwa stajni + kraj (już w defaultcie z geolokalizacji)
3. NIP (opcjonalny, dla VAT)
4. Stripe Checkout (karta) — z opcją "BLIK" w Polsce przez Stripe
5. Po płatności: redirect do `app.hovera.app/onboarding?session={stripe_id}` — automatyczne utworzenie konta i logowanie
6. Email z potwierdzeniem + faktura PDF

Frictionless: od kliknięcia do działającego konta — mniej niż 90 sekund.

---

## 7. Strony use case (`/dla/*`) — produkt-led wersja

Główna zmiana vs poprzedniej wersji: zamiast "ból persony → rozwiązanie", teraz **"konkretne use case'y → konkretne ekrany produktu w akcji"**.

### 7.1 Struktura każdej strony

1. **Hero** — H1 specyficzny + screenshot tej osoby używającej Hovery (np. dashboard managera szkółki)
2. **3-4 typowe scenariusze** — każdy z animacją produktu obsługującego ten scenariusz
3. **Co dostaniesz w ramach Hovery** — tabela funkcji potrzebnych dla tego use case + który pakiet
4. **Workflow w czasie rzeczywistym** — diagram + animacja: "tak wygląda Twój poniedziałek z Hoverą"
5. **Mini-testimonial** — od kogoś z tej kategorii klienta
6. **Pricing pivot** — "Dla {use case} polecamy plan {Stable/Pro}, X zł/mies."
7. **CTA** — "Wybierz plan {X}" + "Zobacz demo"

### 7.2 Lista i akcenty

| URL | Akcent product showcase |
|-----|-------------------------|
| `/dla/szkolki` | Booking + karnety + grafik + portal klienta — pełna animacja zapisu klienta od strony klienta i managera |
| `/dla/pensjonatu` | Boksy + rozliczenia miesięczne + portal właściciela konia — animacja "co widzi właściciel konia" |
| `/dla/sportu` | Programy treningowe + integracja FEI + zawody — diagram "od planu do startu" |
| `/dla/hodowli` | Klacze + krycia + źrebięta + paszporty PASB — kalendarz reprodukcyjny |
| `/dla/sieci-stajni` | Multi-location dashboard + skonsolidowane raporty + white-label — Enterprise CTA |

---

## 8. Co nowego (`/co-nowego`) — changelog jako marketing

Public changelog jest jednym z najsilniejszych narzędzi product-led marketingu (zobacz: linear.app/changelog, raycast.com/changelog, vercel.com/changelog).

### 8.1 Dlaczego to robimy

- Pokazuje że produkt **żyje** — kontrast z konkurencją typu EquineM, która wygląda jak from 2018
- SEO content pisany za nas — każdy release to nowa strona indexowalna
- Buduje zaufanie — "skoro tyle deployują, to muszą być serio"
- Konwersja: visitors którzy widzą "wczoraj dodaliśmy KSeF dla wszystkich pakietów" → trial signup

### 8.2 Format

- 1-2 release per tydzień (zaczynamy od mniej, potem cadence rośnie)
- Każdy entry: data, typ (Feature/Improvement/Fix/Mobile), tytuł, 2-4 zdania opisu, screenshot/GIF, ewentualnie link do dedykowanej strony
- RSS feed — dla power userów
- Email digest miesięczny dla subskrybentów newslettera

### 8.3 Anatomia entry

```markdown
## 6 maja 2026

### 🆕 Hovera Mobile 1.4: Tryb offline pełny

Dotąd offline działał tylko dla widoków read-only. Teraz możesz w stajni bez wifi:
- zaplanować jazdę
- odznaczyć karmienie
- dodać notatkę do dziennika konia
- zrobić zdjęcie i przypisać do konia

Synchronizacja gdy wrócisz w zasięg, konflikty rozwiązywane automatycznie.

[Zobacz w produkcie →](/produkt/aplikacja-mobilna)
```

### 8.4 Implementacja

- Wpisy w Sanity (typ: `changelog_entry`)
- Pre-rendered statycznie
- Tagging (Feature / Improvement / Fix / Mobile / API / Integration)
- Filter po tagu na stronie

---

## 9. Comparison pages (`/vs/*`) — z więcej szczegółu produktowego

Zachowujemy zasady etyczne z poprzedniej wersji. Dodajemy mocniejszy product showcase: zamiast tabeli "my mamy ✓, oni ✗", **pokazujemy screeny side-by-side** gdzie ma sens.

### 9.1 Struktura

1. Hero + dwie kolumny logo
2. TL;DR (3-4 zdania honest comparison)
3. **Side-by-side screens** — np. "Tak wygląda dodawanie konia w Horstable | Tak wygląda w Hoverze" (real screenshots, 2 kolumny)
4. Pełna tabela comparison
5. Sekcje "Wybierz X jeśli..." i "Wybierz Hoverę jeśli..."
6. Migration story — "Jak przenieść dane z {konkurent}" z linkiem do `/migracja/{konkurent}` (gdy gotowe)
7. CTA do trial / demo

### 9.2 Priorytety

| Strona | Priorytet | Specyfika |
|--------|-----------|-----------|
| `/vs/horstable` | P0 | Direct attack ich największej luki: tylko szkółka, brak KSeF, brak hodowli |
| `/vs/excel` | P0 | Most TAM uses Excel — pokazać jak system zastępuje arkusz |
| `/vs/nasza-stajnia` | P1 | Drugi gracz PL |
| `/vs/equinem` | P2 | Po wejściu na NL (akcent: stara estetyka EquineM) |
| `/vs/equicty` | P2 | Po wejściu na BE |
| `/vs/notion` | P3 | Niche SEO, "specialized vs generic" angle |

---

## 10. Aplikacja mobilna — dedykowana strona marketingowa

Mobile to nasz killer feature dla rynku stajni (offline mode, w terenie). Daje to dedykowaną stronę.

### 10.1 `/aplikacja-mobilna` — anatomia

1. **Hero** — phone mockupy iOS i Android obok siebie + duży H1 "Hovera w kieszeni"
2. **App Store + Google Play badges** — duże, klikalne
3. **Co umie aplikacja** — 5-6 sekcji, każda z animacją na phone mockupie:
   - Kalendarz w kieszeni
   - Tryb offline (najmocniejsza sekcja, sample animation: "wracam z zasięgu, syncuje się")
   - Push notifications (jutro szczepienie, klient odwołał, faktura zapłacona)
   - Dziennik konia w 3 kliknięciach
   - Quick actions z poziomu home screen widget
4. **QR code** — do bezpośredniego pobrania na phone z desktopu
5. **Recenzje z App Store / Play** — gdy będą
6. **Compatibility info** — iOS 16+, Android 10+, RAM 2GB+

---

## 11. Demo (`/demo`) — sales call + interactive

Strona o jednym celu: **konwersja Marka i wyższych segmentów** (livery, sport, hodowla, Enterprise) na rozmowę.

### 11.1 Struktura

1. Hero: "Zobacz Hoverę w akcji. Dopasujemy demo do Twojej stajni."
2. Dwie ścieżki side-by-side:
   - **Self-serve demo** — embedded video 5-7 minut z Tobą lub product owner mówiącym przez UI
   - **Live demo** — Calendly form, 30-min slot, customizowane do typu stajni (formularz: szkółka/livery/sport/hodowla/sieć)
3. Dla power-userów: link do interactive sandbox (od v2)
4. FAQ demo: czy to jest sprzedażowe? (nie), kto prowadzi? (Ty/CSM), co przygotować?
5. CTA "Wypróbuj samemu za 0 zł" — dla tych co nie chcą rozmowy

---

## 12. Conversion paths (zaktualizowane)

### 12.1 Hierarchia CTA

| CTA | Kontekst | Kolor / waga |
|-----|----------|--------------|
| **Kup plan {X}** | Strona cennika, karty pakietów | Sage button, primary |
| **Wypróbuj za 0 zł** | Home, use cases, feature pages | Sage button, primary |
| **Zobacz demo (3 min)** | Pod hero, w produkcie | Outline button, secondary |
| **Umów rozmowę** | Enterprise, livery, sieci | Link albo outline |
| **Pobierz aplikację** | Mobile-related sekcje | Badge App Store / Play |

### 12.2 Funnel mapping

```
Visitor (organic / paid / direct)
  │
  ├─► Home page (product showcase)
  │     ├─► Trial signup ──► Onboarding ──► Trial → Paid
  │     ├─► Direct paid ──► Stripe Checkout ──► Onboarding ──► Active subscription
  │     ├─► Demo video / sandbox ──► Trial signup
  │     └─► Demo booking (sales call) ──► Trial / Direct paid
  │
  ├─► /produkt/{feature} (deep-dive)
  │     ├─► Trial signup
  │     └─► Pricing page
  │
  ├─► /dla/{use-case}
  │     ├─► Trial signup
  │     └─► Pricing (z domyślnym wyborem planu pasującego do use case)
  │
  ├─► /cennik
  │     ├─► Direct paid (preferowane)
  │     └─► Trial signup (alt)
  │
  ├─► /vs/* (comparison)
  │     ├─► Trial signup
  │     └─► Migration story page
  │
  └─► /co-nowego (changelog)
        └─► Trial signup (when feature catches attention)
```

### 12.3 Dla kogo direct paid, dla kogo trial

Direct paid (bez trial) głównie dla:

- Klientów którzy znają już Hoverę (z polecenia)
- Po przeczytaniu comparison vs Horstable
- Z money-back guarantee jako safety net
- Klientów Enterprise (jak negocjujemy custom)

Trial dla większości:

- Pierwszy kontakt
- Wciąż "research mode"
- Niepewni czy spasuje do ich stajni

UX musi tego dwie ścieżki obsłużyć równolegle bez forsowania jednej.

---

## 13. Blog i content strategy (downscale vs v1)

Blog pozostaje, ale schodzi z roli głównego drivera. Cel: SEO support + nurturing istniejących leadów.

### 13.1 Cadence i scope

- MVP launch: **3 posty** (zamiast 5 z v1)
- Po starcie: **1 post / miesiąc** (zamiast 2)
- Każdy post musi **zwiększać konwersję** (nie być thought leadership)

### 13.2 Tematy zostają z poprzedniej wersji

Klastry: operacje stajni, finanse, dyscypliny, regulacje (KSeF/ViDA).

Główna zmiana: **każdy post ma in-content product screenshots** pokazujące jak Hovera obsługuje opisywany problem. To zamienia blog post w mini-product showcase.

### 13.3 Zamiast lead magnetów

W v1 było 4 lead magnety (PDF, kalkulator, webinar, mini-przewodnik). Teraz redukujemy do **2**:

- **Kalkulator ROI** (interactive) — bezpośrednio na cenniku, nie email-gated
- **Webinar "KSeF dla stajni 2026"** — email-gated, ale z natychmiastowym dostępem do nagrania (nie poczekaj-na-email)

PDF-y skreślam — odprowadzają od produktu. Niech ludzie patrzą na produkt, nie czytają nasze ebooki.

---

## 14. SEO — strategia (drobne zmiany)

Strategia techniczna z poprzedniej wersji w pełni aktualna. Słowa kluczowe te same.

### 14.1 Co dochodzi w wersji product-led

- **Każda strona /produkt/{feature}** to nowa landing pod konkretne keyword:
  - `/produkt/kalendarz` → "kalendarz dla stajni jeździeckiej"
  - `/produkt/karnety` → "karnety stajnia online"
  - `/produkt/finanse-ksef` → "KSeF stajnia faktura"
- **Każdy entry w `/co-nowego`** to indexowalna mini-strona
- **Każda strona /dla/{use-case}** target konkretny pod-segment

### 14.2 Structured data dodatkowe

- `SoftwareApplication` z aggregateRating na home + cenniku (gdy mamy reviews)
- `FAQPage` na każdej stronie use case
- `Article` na każdym blog poście i changelog entry
- `Product` z offerings na cenniku

---

## 15. Design system (drobne dodatki vs v1)

Paleta, typografia, spacing — bez zmian (zobacz v1 sekcja 10).

### 15.1 Co dochodzi dla product-led

**Komponenty product showcase:**

- `<HoveraProductFrame>` — ramka z subtle shadow obejmująca product mockup, z toggle desktop/mobile
- `<HoveraFeatureScroll>` — sticky-text + scrolling product visual (jak Linear `/method`)
- `<HoveraAnimatedCallout>` — wskaźniki "tu kliknij" / "to się dzieje" na statycznym screenie
- `<HoveraSplitView>` — side-by-side (np. Horstable vs Hovera screens)
- `<HoveraChangelogEntry>` — entry na changelog
- `<HoveraPriceCard>` — z direct paid + trial alt CTA
- `<HoveraQRBadge>` — dla mobile download

**Asset library:**

- Library prawdziwych screenshotów (anonimizowanych) — minimum 30 screenów do MVP
- Library Lottie animations — minimum 5 do MVP, 15 do v2
- Mockup frames: laptop (MacBook) + phone (iPhone + Pixel) — Figma library

### 15.2 Wizualny rytm strony

- 4-5 product showcase blocks per long page
- Każdy block min. 60vh wysoki
- Whitespace 96px między blocks na desktop, 64px na mobile
- Text + visual jako stacked na mobile, side-by-side na desktop

---

## 16. Stack technologiczny — dodatki dla product-led

Bazowy stack z v1 (Next.js 15 + Sanity + Tailwind + shadcn) bez zmian.

### 16.1 Nowe biblioteki dla product showcase

| Biblioteka | Zastosowanie |
|------------|--------------|
| **Framer Motion** | Animacje scroll-triggered, hover effects |
| **Lottie React** | Embedding Lottie animations z After Effects |
| **react-player** | Embed video (YouTube / własny self-hosted) |
| **@react-three/fiber** (opcjonalnie) | 3D mockupy phone/laptop dla hero — tylko jeśli rzeczywiście potrzebne |
| **Mux Player** lub **Cloudflare Stream** | Self-hosted video z adaptive bitrate (lepsze niż YT embed) |

### 16.2 Hosting video i ciężkich assetów

- Hero video (3-min product tour): **Mux** lub **Cloudflare Stream** — adaptive bitrate, własna kontrola
- Krótkie GIF/MP4 loops: konwersja do MP4 + AVIF, hostowane na Cloudflare R2
- Lottie JSON: bundled z webem (małe, kilka KB)

### 16.3 Interactive sandbox (od v2)

Dwie opcje techniczne:

- **iframe z aktualną aplikacją** — z guest tenant z fake data, JWT bez autoryzacji
- **Wbudowany re-render kluczowych komponentów** — kopia komponentów z aplikacji, bez backendu, mock store

Rekomendacja: iframe (mniej duplikacji kodu, więcej realizmu).

---

## 17. Internacjonalizacja, compliance, analityka

Bez zmian względem v1 (sekcje 13-15 z poprzedniej wersji). Wszystko pozostaje aktualne.

Jedna uwaga dla product-led: **changelog jest pisany tylko po polsku w MVP, tłumaczony do EN/DE w v2**. Tłumaczenie 1-2 entry tygodniowo to taniej niż się wydaje (~50 zł/tłumaczenie).

---

## 18. Roadmapa wdrożenia (zaktualizowana)

### 18.1 Sprint 0 — Fundamenty (tydzień 1-2)

Standard z v1 + extra:

- [ ] Setup Mux/Cloudflare Stream do video
- [ ] Library mockupów Figma (laptop, phone)
- [ ] First screencasts kluczowych flow w aplikacji (tylko jeśli MVP aplikacji jest gotowy enough)
- [ ] Decision: Lottie czy MP4 dla hero animations

### 18.2 Sprint 1-2 — Core product showcase (tydzień 3-6)

- [ ] Home page z animowanym hero + 5 product sections
- [ ] `/produkt/kalendarz`, `/produkt/karnety`, `/produkt/finanse-ksef`, `/produkt/zapisy-online` (P0 deep-dives)
- [ ] `/cennik` z checkout flow (Stripe)
- [ ] `/aplikacja-mobilna` (z deep linkami App Store/Play kiedy gotowe)
- [ ] 4 strony `/dla/*` (use cases)

### 18.3 Sprint 3 — Wsparcie konwersji (tydzień 7-8)

- [ ] `/co-nowego` (changelog) + 5-10 pierwszych entries (z release notes z dev)
- [ ] `/vs/horstable`, `/vs/excel`
- [ ] `/demo` z video + Calendly
- [ ] `/integracje` (KSeF, Stripe, ...)
- [ ] 3 pierwsze blog posty
- [ ] Newsletter + 1 webinar landing

### 18.4 Sprint 4 — Polish + launch (tydzień 9-10)

- [ ] Lighthouse 90+
- [ ] All animations Loom-quality minimum
- [ ] Analytics + A/B test framework
- [ ] Soft launch z 5-10 early access klientami
- [ ] Press release

### 18.5 Po MVP (kwartalnie)

- **Q+1**: Replace top-3 animacji na Lottie, EN wersja, ROI calculator interactive, sandbox started
- **Q+2**: Sandbox live, DE wersja, 3 case studies, `/produkt/dziennik-konia`, `/produkt/aplikacja-mobilna` deep-dive
- **Q+3**: NL wersja, `/produkt/livery`, `/produkt/ai-copilot` (jeśli AI wydane), templates page
- **Q+4**: FR/IT/ES, marketplace landing, dev portal `/api`

---

## 19. Decyzje do podjęcia (zaktualizowane)

Lista zmian względem v1:

1. **Animacje: Lottie czy MP4 czy interactive React?**
   - Lottie = czysto wektorowe, lekkie, ale wymagają designera w After Effects
   - MP4 = najprostsze, ciężkie, gorszy SEO ale gotowe szybko
   - Interactive React = najwyższa jakość ale duża inwestycja
   - Rekomendacja: **MP4 dla MVP, Lottie dla 3 najważniejszych w v2, Interactive dla home hero v3**
2. **Sandbox dla `/demo`: w MVP, v2 czy v3?**
   - Najsilniejsze conversion tool jakie istnieje, ale wymaga aplikacji w stanie publicznie pokazywalnym
   - Rekomendacja: **v2** — najpierw video tour, potem sandbox
3. **Direct paid checkout: Stripe Checkout (hosted) czy embedded?**
   - Hosted = szybkie, mniej kodu
   - Embedded = lepsze UX, brand consistency
   - Rekomendacja: **Embedded od MVP** — to jest sales page, brand matters
4. **Money-back guarantee: 30 czy 60 dni?**
   - 30 = standard
   - 60 = wyróżnia, ale ryzyko churn early
   - Rekomendacja: **30 dni** + jasna komunikacja
5. **Pricing currency: tylko PLN w MVP czy multi-currency?**
   - Multi-currency = więcej work, ale gotowość na EU
   - Rekomendacja: **PLN w MVP, EUR + CZK w v2** (po wejściu na EN/DE)
6. **Trial bez karty czy z kartą?**
   - Bez karty = większy top-of-funnel ale niższy trial-to-paid (~20%)
   - Z kartą = mniejszy top-of-funnel, ale ~50% trial-to-paid
   - Rekomendacja: **bez karty** (zgodnie z Horstable, większy reach na początek)
7. **Hosting video: Mux czy Cloudflare Stream czy YouTube?**
   - Mux: enterprise-grade, drogie ($1/1000 minutes streaming + storage)
   - Cloudflare Stream: tanie, dobra integracja CF stack ($1/1000 minutes + $5/1000 minutes uploaded)
   - YouTube: free, ale brand się rozmywa, ads możliwe
   - Rekomendacja: **Cloudflare Stream** — best price/performance dla SaaS skali
8. **Changelog cadence: 1/tydz, 2/tydz, dynamicznie?**
   - Linear robi 1-2/tydzień
   - Vercel robi 1/dziennie ale to inna skala
   - Rekomendacja: **1/tydzień start, 2/tydz po 3 miesiącach gdy product velocity rośnie**
9. **A/B testing: PostHog czy Vercel Edge Config?**
   - PostHog: pełen produkt analytics + A/B + session replay
   - Vercel Edge: tylko A/B, ale bardzo szybkie
   - Rekomendacja: **PostHog cloud** od v2 (zbyt drogie dla MVP, robimy bez na start)
10. **Wideo lektor: Ty, profesjonalny lektor czy AI?**
    - Ty = autentyczność, bardzo dobre dla "founder-led marketing"
    - Profesjonalny = jakość +, ale brak personality
    - AI (ElevenLabs) = perfekcyjne ale wkrótce wszyscy poznają
    - Rekomendacja: **Ty** dla pierwszych 3-5 video, potem decyzja po feedbacku

---

## 20. Anti-patterns (zachowane z v1 + nowe)

Zachowane wszystkie z v1 (stocki, agresywne pop-upy, ukryte ceny, korpo-mowa, blokowanie prawego klika).

### 20.1 Nowe — specyficzne dla product-led website

- ❌ Nie pokazujemy product mockupów które wyglądają lepiej niż produkt. Każdy screen to **prawdziwy** screen lub realistic mock.
- ❌ Nie używamy nigdy "Coming soon" / "Wkrótce" — tylko features które działają. Roadmap idzie do `/co-nowego/roadmap` jako osobna sekcja, nie na home.
- ❌ Nie ukrywamy ograniczeń produktu. Jeśli czegoś nie ma, mówimy: "Hodowla jest w przygotowaniu, dostępna w Q3 2026".
- ❌ Nie używamy fake testimonials. Każdy cytat ma osobę + stajnię + (gdy się zgadzają) zdjęcie.
- ❌ Nie kopiujemy linear.app/notion.so 1:1 wizualnie. Czerpiemy z **filozofii product-led**, nie z aesthetic.
- ❌ Nie robimy "scrolljacking" (force scroll). Trends 2018, irytujące.
- ❌ Nie autoplay video z dźwiękiem.

---

## 21. Załączniki — dostarczam później

- `02-product-screenshots-library.md` — checklist 30 screenów do zrobienia w aplikacji
- `03-animations-spec.md` — szczegółowe spec każdej animacji (storyboard, długość, format)
- `04-pricing-page-wireframe.md` — wireframe + checkout flow + edge cases
- `05-changelog-style-guide.md` — jak pisać entries w changelog (przykłady, dont's)
- `06-comparison-pages-content.md` — copy + screenshots dla `/vs/horstable` i `/vs/excel`
- `07-product-deep-dive-blueprint.md` — szczegółowa struktura `/produkt/{feature}` na przykładzie kalendarza
- `08-design-tokens.md` — tokeny designu (synced z aplikacją)
- `09-launch-plan.md` — plan launchu (PR, partnerstwa, soft launch z early access)
- `10-conversion-rate-optimization.md` — A/B test backlog

---

## Stopka

**Owner:** Przemek
**Last updated:** 2026-05-06
**Wersja:** 2.0 (product-led pivot z v1)
**Następny review:** po decyzjach z sekcji 19 + po Sprint 0

> Dokument jest **żywy**. Każda zmiana messagingu, IA, ścieżek konwersji → update tutaj + changelog.
> Spójność z `hovera-spec.md` (aplikacja) i designem produktu jest absolutnym priorytetem — strona i produkt to **jeden brand experience**.
