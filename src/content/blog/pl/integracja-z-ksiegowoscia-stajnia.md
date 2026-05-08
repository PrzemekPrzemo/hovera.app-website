---
locale: pl
slug: integracja-z-ksiegowoscia-stajnia
title: "Integracja z księgowością: iFirma, Wfirma, Comarch — jak połączyć z systemem stajni"
description: "Jak połączyć system zarządzania stajnią z księgowością — iFirma, Wfirma, Comarch ERP, FakturaXL. Porównanie integracji, koszty, dla kogo która."
date: "2026-06-04"
author: "Przemek"
tags: ["Finanse"]
regions: ["PL"]
---

Większość polskich stajni wystawia faktury w **dwóch systemach naraz**: jednym do zarządzania klientami i jazdami (np. Horstable), drugim do faktur (np. iFirma). To znaczy, że każdą fakturę wbijasz **dwa razy**: raz w stajennym, raz w księgowym. Plus eksporty CSV, importy XML, ręczne sprawdzanie zgodności.

W 2026 roku to się **zmienia**. Integracje API między systemami stajni a księgowością stają się standardem. W tym artykule pokazuję, które polskie systemy księgowe się integrują, jak to wygląda technicznie i ile czasu / pieniędzy oszczędzisz.

## Dlaczego integracja jest kluczowa w 2026

Trzy konkretne powody:

### 1. KSeF wymaga jednolitego źródła faktur

Od 1 kwietnia 2026 wszystkie faktury B2B muszą być w KSeF. Jeśli wystawiasz w dwóch systemach, masz dwa kanały do KSeF — i ryzyko duplikatów albo brakujących faktur.

**Lepsze**: jeden system stajenny generuje, drugi (lub sam stajenny) wysyła do KSeF.

Patrz: [KSeF dla stajni 2026 →](/blog/ksef-stajnia-2026)

### 2. Czas managera = pieniądze

Stajnia z 50 fakturami / mies. + ręczne wbijanie = **3-5h pracy** miesięcznie tylko na duplikację.

To 36-60h rocznie = niemal cały tydzień pracy. W stawce 50 zł / godz. = 1 800-3 000 zł rocznie marnowanych na pracę manualną.

### 3. Błędy duplikacji

Najczęstsze błędy:
- Faktura wystawiona w stajennym, zapomniana w księgowym → niewykazany VAT
- Różne kwoty w obu systemach (literówka)
- Różne daty
- Klient zapłacił w stajennym, w księgowym wciąż "nieopłacone"

Każdy z tych błędów to potencjalny problem podczas kontroli US.

## Polskie systemy księgowe — porównanie

### iFirma

**Strona:** [ifirma.pl](https://ifirma.pl)
**Cena:** od 39 zł / mies.

**Mocne strony:**
- Najpopularniejszy w Polsce dla małych firm
- Pełen KSeF od 2024
- Mobile app
- Dobra dokumentacja API

**API**: Tak, REST API publiczne, dobrze udokumentowane.

**Komu polecam:** stajnia 1-15 koni, małe i średnie obroty (do 1 mln zł / rok).

### Wfirma (firmao.pl)

**Strona:** [wfirma.pl](https://wfirma.pl)
**Cena:** od 49 zł / mies.

**Mocne strony:**
- Mocna w obszarze samozatrudnienia (B2B z Twoimi pracownikami)
- KSeF gotowy
- Dobry interfejs

**API:** Tak, ale dokumentacja słabsza.

**Komu polecam:** stajnia z pracownikami na umowach B2B / zleceniach.

### Comarch ERP Optima / XL

**Strona:** [comarch.pl](https://www.comarch.pl)
**Cena:** od 200 zł / mies. (Optima Start)

**Mocne strony:**
- Profesjonalne ERP, kompletny moduł księgowy
- KSeF + Peppol gotowy
- Bardzo rozbudowane raporty

**API:** Tak, ale komercyjne, wymaga partnera Comarch dla integracji.

**Komu polecam:** duża stajnia (30+ koni, obroty 1 mln+ zł), kompleks z wieloma działalnościami.

### FakturaXL

**Strona:** [fakturaxl.pl](https://fakturaxl.pl)
**Cena:** od 19 zł / mies.

**Mocne strony:**
- Najtaniej
- KSeF gotowy
- Prosty, dla małych firm

**API:** Tak, ale podstawowe.

**Komu polecam:** stajnia bardzo mała (1-5 koni), do 50 faktur / mies.

### inFakt

**Strona:** [infakt.pl](https://infakt.pl)
**Cena:** od 29 zł / mies.

Solidna alternatywa dla iFirma. KSeF, API, dobra mobile app.

### Streamsoft

**Strona:** [streamsoft.pl](https://streamsoft.pl)

Dla średnich i dużych firm. Lokalne wsparcie. Cena negocjowalna.

## Jak działają integracje API

### Mechanizm w skrócie

System stajni (np. Hovera) wysyła do systemu księgowego dane faktury przez API. Księgowy generuje fakturę i zwraca jej numer / link do PDF. Stajnia zapisuje numer w swojej bazie.

**Wygląda to tak:**

1. Klient płaci karnet przez online booking w Hoverze
2. Hovera generuje fakturę (proforma)
3. Hovera wysyła do iFirma przez API
4. iFirma generuje pełną fakturę zgodną z polskim prawem
5. iFirma wysyła do KSeF (jeśli B2B)
6. iFirma zwraca numer faktury i link
7. Hovera wyświetla numer w profilu klienta + wysyła PDF do klienta

Cały proces: **5-15 sekund**, bez interwencji człowieka.

### Co jest wymieniane

- Dane klienta (nazwa, NIP, adres)
- Pozycje na fakturze (usługi, kwoty)
- VAT
- Data, terminy płatności
- Numer faktury

### Co przechowuje gdzie

- **Stajnia (Hovera)**: dane klientów, jazdy, karnety, płatności, **numer faktury** (referencja)
- **Księgowy (iFirma)**: pełne PDF-y faktur, wysyłka do KSeF, ewidencja, deklaracje VAT/PIT

Ten podział jest **logiczny**: stajnia robi to, co zna (klienci, konie, jazdy), księgowy robi to, co zna (faktury zgodne z prawem, deklaracje, archiwizacja).

## Hovera + integracje — stan w 2026

Hovera ma **roadmap integracji** (Q3-Q4 2026):

- ✅ **iFirma** (Q3 2026) — pełna integracja
- ✅ **inFakt** (Q3 2026)
- ✅ **FakturaXL** (Q3 2026)
- ⚠️ **Wfirma** (Q4 2026) — w developmencie
- ⚠️ **Comarch** (Q4 2026) — przez partnera Comarch
- ⚠️ **Streamsoft** (Q1 2027) — planowane

Do tego czasu Hovera oferuje:
- **Eksport CSV/XML** zgodny z formatami akceptowanymi przez większość systemów
- **KSeF natywnie** (dla B2B faktury bezpośrednio z Hovery)
- **PDF faktur** generowane lokalnie zgodne z polskim prawem

Bez pełnej integracji API musisz robić **import CSV raz w miesiącu** zamiast pisać wszystko ręcznie. Czas pracy: **15-30 min / mies.** vs 3-5h ręcznie.

## Co inne systemy oferują

### Horstable + księgowość

**Status:** brak natywnej integracji z polskimi systemami księgowymi.

Klient musi eksportować CSV z Horstable, importować w księgowym (jeśli format pasuje) lub wpisywać ręcznie.

### Nasza Stajnia + księgowość

**Status:** brak integracji API.

Eksport CSV podstawowy. Import w księgowym ręczny.

### Equicty (Belgia) + księgowość

**Status:** integracja z **belgijskimi** systemami (TeamLeader, Yuki). Brak integracji z polskimi.

Polski klient Equicty musi: Equicty → eksport CSV → przetwarzanie → import iFirma. Niewygodne.

## Praktyka — przykłady setup

### Setup 1: Mała stajnia (5 koni, 30 klientów)

- **Stajnia**: Hovera Solo (49 zł)
- **Księgowość**: FakturaXL (19 zł)
- **Integracja**: eksport CSV miesięczny
- **Razem**: 68 zł / mies.

### Setup 2: Średnia stajnia (15 koni, 80 klientów)

- **Stajnia**: Hovera Stable (149 zł)
- **Księgowość**: iFirma (49 zł)
- **Integracja**: API (od Q3 2026)
- **Razem**: 198 zł / mies.

### Setup 3: Duża stajnia (40 koni, 200 klientów)

- **Stajnia**: Hovera Pro (349 zł)
- **Księgowość**: Comarch ERP Optima (350 zł)
- **Integracja**: API przez partnera Comarch (od Q4 2026, jednorazowy koszt setup ~5 000 zł)
- **Razem**: 700 zł / mies.

## Setup integracji krok po kroku (dla iFirma + Hovera)

Jeśli już masz oba konta, integracja zajmuje 30 minut.

### Krok 1: Włącz API w iFirma

1. Zaloguj do iFirma
2. Ustawienia → API → Włącz dostęp
3. Wygeneruj klucz API (zapisz go!)

### Krok 2: Połącz w Hoverze

1. Hovera → Ustawienia → Integracje → iFirma
2. Wpisz klucz API
3. Test połączenia → "Sukces"
4. Wybierz mapowanie pól (Klient = Kontrahent w iFirma, itd.)

### Krok 3: Test pierwszej faktury

1. W Hoverze utwórz fakturę testową dla klienta testowego
2. Kliknij "Wyślij do iFirma"
3. Sprawdź w iFirma — faktura powinna pojawić się w sekcji "Faktury sprzedażowe"
4. Numer faktury z iFirma automatycznie wraca do Hovery

### Krok 4: Auto-sync

W ustawieniach możesz włączyć:
- **Auto-wysyłka**: każda nowa faktura w Hoverze → automatycznie w iFirma
- **Auto-status płatności**: gdy klient zapłaci, status synchronizuje się w obu systemach
- **Auto-KSeF**: faktura B2B → automatycznie wysłana do KSeF przez iFirma

## Pułapki integracji

### Pułapka 1: Mapowanie pól

Niektóre dane mogą się rozjeżdżać między systemami (np. Hovera ma "Klient", iFirma ma "Kontrahent"). Sprawdź mapowanie przed pełnym uruchomieniem.

### Pułapka 2: Duplikaty klientów

Jeśli klient jest w obu systemach z różnym NIP-em (literówka), integracja stworzy duplikat. **Czyść bazę danych** przed włączeniem auto-sync.

### Pułapka 3: Limit API

Niektóre systemy księgowe mają **limit wywołań API** (np. 1000 / mies.). Jeśli masz 1500 faktur, integracja przestaje działać po przekroczeniu. Sprawdź limity w wybranym systemie.

### Pułapka 4: Brak rollback

Gdy faktura już poszła do KSeF — nie da się jej skasować, tylko skorygować. Jeśli integracja wysłała fakturę z błędem, musisz wystawić korektę. Nie próbuj "odpiąć" w Hoverze i wystawić ponownie.

### Pułapka 5: Zmiany w API

Systemy księgowe od czasu do czasu zmieniają API. Jeśli używasz integracji, **subskrybuj newsletter** dostawcy (zarówno stajennego jak i księgowego), żeby wiedzieć o zmianach.

## Co zrobić, jeśli integracji jeszcze nie ma

Do czasu pełnej integracji:

### Plan A: Eksport CSV + import

- Co miesiąc: eksport faktur z Hovery (CSV)
- Import w iFirma (większość systemów akceptuje CSV)
- Czas: 15-30 min / mies.
- Ryzyko błędów: niskie

### Plan B: Hovera generuje, iFirma archiwizuje

- Hovera generuje pełne faktury PDF
- Hovera wysyła do KSeF
- W iFirma robisz tylko deklaracje VAT/PIT (raz / mies.)
- Czas: 30-60 min / mies. (deklaracje)
- Idealne dla małych stajni

### Plan C: Księgowy zewnętrzny

- Hovera dla zarządzania
- Księgowy zewnętrzny dla deklaracji
- Faktury w obu systemach (bez integracji, ale ktoś inny robi)
- Czas Twój: 0 (księgowy 200-1500 zł / mies.)

## Hovera i integracje (status maj 2026)

W tej chwili Hovera oferuje:

- **KSeF natywnie** (od dnia 1) dla wszystkich planów Stable+
- **Eksport CSV/XML** dla wszystkich pakietów
- **Faktury PDF** zgodne z polskim prawem
- **Plan integracji**: iFirma + inFakt + FakturaXL w Q3 2026, Wfirma + Comarch w Q4 2026

Jeśli masz konkretne wymagania integracyjne, [napisz do nas](mailto:hello@hovera.app) — możemy przyspieszyć priorytet.

[**Zapytaj o dostęp →**](/kontakt)

---

## Dalsza lektura

- [KSeF dla stajni 2026 — kompletny przewodnik](/blog/ksef-stajnia-2026)
- [Excel do faktur w stajni — dlaczego to się przestaje opłacać](/blog/excel-faktury-stajnia)
- [Faktura za boarding konia — co musi zawierać](/blog/faktura-boarding-konia)
- [Bezpieczeństwo danych w SaaS dla stajni](/blog/bezpieczenstwo-danych-saas-stajnia)
