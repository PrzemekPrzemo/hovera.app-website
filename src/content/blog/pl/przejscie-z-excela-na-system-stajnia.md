---
locale: pl
slug: przejscie-z-excela-na-system-stajnia
title: "Jak przejść z Excela na system zarządzania stajnią w jeden weekend"
description: "Praktyczny przewodnik krok po kroku: jak w 2 dni przenieść stajnię z Excela do dedykowanego systemu. Z checklistą, harmonogramem i pułapkami."
date: "2026-04-21"
author: "Przemek"
tags: ["Migracja"]
regions: ["PL"]
---

Decyzja o przejściu z Excela na dedykowany system zarządzania stajnią jest często odkładana z jednego powodu: "Jak ja to wszystko przeniosę?". 80 koni, 200 klientów, historia karnetów, faktury z ostatnich trzech lat — wydaje się, że to zajmie tygodnie.

Faktycznie zajmuje **dwa dni przy dobrej organizacji**. W tym artykule pokazuję plan godzina po godzinie, oparty na 12 migracjach polskich stajni, które przeprowadzaliśmy w 2025-2026. Plan zakłada start w piątek wieczorem i pełną operacyjność w poniedziałek rano.

## Zanim zaczniesz — co musisz mieć

Przed weekendem migracji potrzebujesz:

- **Wybrany system** z aktywnym kontem (idealnie 14-dniowy trial)
- **Twoje aktualne dane** w Excelu (najnowsza wersja, posprzątana)
- **2 dni wolne** od bieżącej pracy (operacyjnie szkółka może działać, ale Ty siedzisz przy danych)
- **Wsparcie Twojego dostawcy systemu** (większość ma support migracji w pakietach średnich+)
- **Komputer z dwoma monitorami** lub duży ekran (mocno przyspiesza)
- **Kawa**

To nie jest must-have, ale **mile widziane**:

- Ktoś do pomocy (instruktor, członek rodziny) na 2-3 godziny do mechanicznego wpisywania
- Drugi laptop (do testowania klient-side)
- Telefon do testowania mobilnej aplikacji

## Plan dwudniowy — godzina po godzinie

### Piątek wieczór: Przygotowanie (3 godziny)

**18:00-19:00 — Inwentaryzacja Excela**

Otwierasz wszystkie pliki Excela związane ze stajnią i tworzysz prostą mapę:

| Excel sheet | Zawartość | Ile rekordów |
|-------------|-----------|--------------|
| Klienci.xlsx | Dane klientów | ~200 |
| Konie.xlsx | Lista koni | ~25 |
| Grafik_2026_05.xlsx | Bieżący grafik | ~150 jazd |
| Karnety_aktywne.xlsx | Karnety w trakcie | ~80 |
| Faktury_2024-2026.xlsx | Historia faktur | ~600 |
| Pracownicy.xlsx | Instruktorzy + groomy | ~5 |

Cel: wiesz, ile pracy Cię czeka i nic nie zostanie zapomniane.

**19:00-20:30 — Sprzątanie danych**

To jest najbardziej krytyczny etap. Niech dane będą czyste **przed** migracją, nie po.

Dla każdego arkusza:

- Usuń duplikaty
- Sprawdź formatowanie kolumn (numery telefonów: 9 cyfr czy z prefiksem? Daty: DD.MM.RRRR czy YYYY-MM-DD?)
- Wypełnij brakujące pola (jeśli możesz — np. brakujący email klienta zostaw puste, nie wpisuj fake)
- Oznacz nieaktywnych klientów (ostatnia jazda > 6 miesięcy temu) → ich nie migrujemy lub migrujemy jako "archive"
- Zapisz każdy plik jako CSV (UTF-8) — większość systemów najlepiej importuje CSV

Praktycznie: lista klientów typowej stajni 200-osobowej zawiera 30-50% nieaktywnych. Po sprzątaniu masz 130-170 prawdziwych aktywnych. Migrujesz tylko ich.

**20:30-21:00 — Backup**

Skopiuj cały folder Excela na zewnętrzny dysk + chmurę (Google Drive, Dropbox). Jeśli coś pójdzie nie tak, masz pełen rollback.

Idziesz spać. Sobota będzie długa.

### Sobota: Migracja danych (8 godzin)

**8:00-9:00 — Setup systemu**

Logujesz się do swojego nowego systemu (np. Hovera).

- Wprowadzasz podstawowe dane stajni (nazwa, adres, NIP, logo)
- Ustawiasz strefę czasową, walutę
- Zapraszasz pracowników jako użytkowników (jeszcze ich nie używamy, ale niech mają konta)
- Ustawiasz politykę odwołań (zgodnie z Twoim regulaminem)

Cel: środowisko gotowe do importu.

**9:00-10:30 — Import koni**

Konie są najprostsze, dlatego zaczynamy od nich.

- Eksport z Excela `Konie.xlsx` → CSV
- Sprawdzasz mapping kolumn: imię konia → name, rasa → breed, data urodzenia → birth_date, microchip → microchip
- Import w systemie
- Sprawdzasz po imporcie: 25 koni → 25 rekordów w systemie? Wszystkie pola wypełnione?
- Dodajesz zdjęcia (jeśli masz folder ze zdjęciami koni — większość systemów pozwala na bulk upload)

Praktyczna pułapka: czasem rasa jest wpisana niespójnie ("Polski koń szlachetny", "PŚK", "polski szlachetna"). Ujednolić przed importem albo pozwolić systemowi zrobić auto-merge.

**10:30-12:30 — Import klientów**

Klientów jest więcej i to dłuższe.

- CSV: imię, nazwisko, telefon, email, data urodzenia (jeśli niezbędna), poziom (początkujący/średni/zaawansowany), notatki
- Import
- Sprawdzasz pierwszych 10 ręcznie — czy wszystko się zgadza
- Reszta — system zaimportuje sam

Pułapka: rodzice + dzieci. W Excelu często to wszystko zmieszane — "Anna Kowalska (mama Kasi)". W systemie powinno być oddzielne: rekord dziecka, rekord rodzica, link rodzic→dziecko. Wymaga to ręcznej pracy lub specjalnego polą "rola: rodzic / dziecko".

**12:30-13:30 — Lunch**

Po południu produktywność spada — koniecznie zrób przerwę.

**13:30-15:30 — Import karnetów aktywnych**

Karnety aktywne (jeszcze ważne) musisz przenieść, żeby nie pogubić klientów. Karnety historyczne (już wykorzystane) zostawiasz w Excelu jako archiwum.

Dla każdego aktywnego karnetu:
- Klient
- Plan (4 jazdy / 8 jazd / 12 jazd)
- Data zakupu
- Data ważności
- Wykorzystane jazdy (jeśli np. 3 z 8 zostało zrealizowane)
- Pozostałe jazdy

Niektóre systemy mają import karnetów. Inne wymagają ręcznego wpisania (15-30 sekund per karnet → 80 karnetów = 30-40 minut).

**15:30-17:00 — Import grafiku przyszłego (1-2 tygodnie)**

Tylko **przyszłe** zaplanowane jazdy. Historyczne zostają w Excelu.

Dla każdej zaplanowanej jazdy:
- Data i godzina
- Klient
- Koń
- Instruktor
- Typ (indywidualna / grupowa)

Praktyka: większość polskich szkółek ma 50-100 zaplanowanych jazd na 1-2 tygodnie do przodu. Można to przepisać ręcznie (20 minut per dzień grafiku) albo przez import CSV (30 minut całość).

**17:00-18:00 — Konfiguracja cennika i karnetów**

Dla nowych klientów, nowych karnetów — ustawiasz cennik w systemie:

- Jazda jednorazowa: 120 zł
- Karnet 4 jazdy / 30 dni: 440 zł
- Karnet 8 jazd / 30 dni: 840 zł
- Boarding miesięczny: 1500 zł
- Itd.

Plus polityka odwołań i regulamin (do wklejenia w system jako tekst).

**18:00-19:00 — Konfiguracja KSeF (jeśli stajnia VAT-owa)**

Najbardziej techniczny etap. Jeśli używasz Hovery, ten krok zajmuje 5 minut z naszą pomocą — wgrywasz certyfikat Type 2 (jeśli go masz) lub dostajemy zlecenie wystawienia.

Jeśli inny system — proceduralnie podobnie, sprawdź w dokumentacji.

**19:00-20:00 — Quality check**

Przeglądasz cały system z perspektywy:

- Klient — czy widzi swoje dane, swój karnet, swoje jazdy w portalu klienta
- Manager — czy grafik jest poprawny
- Pracownik — czy widzi swój dzień
- Faktura — wystaw testową fakturę (na siebie albo na fake-klienta) i sprawdź, czy idzie do KSeF (testowo)

Jeśli wszystko OK — gratulacje, dane są w systemie. Idziesz spać. Niedziela to testy.

### Niedziela: Testy i komunikacja (5 godzin)

**10:00-12:00 — Testy z perspektywy klienta**

Najważniejszy etap — testowanie z perspektywy użytkownika końcowego.

- Załóż konto klienta testowego (z Twoim drugim emailem)
- Zaloguj się jako klient
- Sprawdź: czy widzisz wolne terminy, czy możesz zarezerwować, czy dostałeś SMS / email potwierdzający
- Sprawdź na telefonie (mobile)
- Spróbuj odwołać jazdę — czy polityka działa

Pułapki, które najczęściej wychodzą na tym etapie:
- SMS-y nie idą (nie ustawiona integracja z bramką SMS)
- Polityka odwołań nie egzekwowana (klient może odwołać 1h przed bez konsekwencji)
- Brakujące pola w profilu klienta
- Nieprawidłowy email automation flow

**12:00-13:00 — Testy z perspektywy pracownika**

- Zaloguj się jako instruktor
- Sprawdź widok mobilny — co widzi w stajni
- Sprawdź push notifications

**13:00-14:00 — Komunikacja z klientami**

Najważniejszy etap z punktu widzenia retencji klientów.

Wysyłasz wiadomość (SMS + email) do wszystkich aktywnych klientów:

> "Cześć, [imię]! Od dziś nasza stajnia działa w nowym systemie zarządzania.
> 
> Co to dla Ciebie znaczy:
> - Możesz zarezerwować jazdę online: [link]
> - Widzisz swój stan karnetu w aplikacji
> - Dostajesz przypomnienia SMS / email
> - Pobierz aplikację Hovera: [link iOS / Android]
> 
> Zaloguj się tutaj: [link]
> Hasło tymczasowe: [losowe]
> 
> Jeśli wolisz nadal dzwonić — działa też tradycyjnie. System jest do Twojej wygody, nie obowiązku.
> 
> Pytania? Napisz lub zadzwoń: [numer]
> 
> [Imię Ciebie], [Nazwa Stajni]"

Klucz: **nie wymuszaj**. Pierwsi 30-50% klientów przejdą sami w pierwszym tygodniu. Reszta — w ciągu miesiąca-trzech. Stopniowo.

**14:00-15:00 — Trening pracowników**

Każdy pracownik (instruktor, groom):

- 30-minutowy walk-through systemu (Ty pokazujesz)
- Jeszcze 30 minut na własne klikanie i pytania
- Poniedziałek rano — dostępność na pytania

Nie próbuj nauczyć całego systemu naraz. Skup się na tym, co dany pracownik potrzebuje:

- **Instruktor** — widok dnia, zaznaczanie ukończonej jazdy, dziennik konia
- **Groom** — checklista zadań poranek/popołudnie, alerty ze szkółki
- **Manager** — całość

## Poniedziałek rano: pierwszy dzień operacyjny

Pierwszy dzień bez Excela. Niech będzie spokojny.

**8:00 — Sprawdzenie**

- Otwórz system, sprawdź czy są zaplanowane jazdy
- Sprawdź czy notyfikacje SMS poszły do klientów dzisiejszych jazd
- Otwórz Excel (jeszcze trzymaj w archiwum) — porównaj na 2-3 jazdach, czy się zgadza

**Pierwszy klient dnia**

Telefon dzwoni: "Cześć, mam dziś jazdę o 17, prawda?" Otwierasz system → potwierdzasz albo korygujesz. Klient widzi w aplikacji to samo.

**Pierwszy konflikt**

Coś się sypnie — pracownik zaznaczy jazdę dla złego konia, system pokaże alert, Ty cofniesz, pokażesz pracownikowi jak prawidłowo. To normalne, pierwszy tydzień to doskonalenie.

## Częste pułapki migracji — i jak je ominąć

### Pułapka 1: Próbowanie zaimportować całą historię

Klienci historię ostatnich 3 lat. Faktury z 2023. Stare karnety wykorzystane.

**Nie rób tego.** Historię zostaw w Excelu (jako archiwum). Migruj tylko **aktywne**: aktywni klienci, aktywne karnety, faktury z bieżącego roku (do KSeF).

Po pół roku zauważysz, że historia z Excela praktycznie nie jest potrzebna — i tak się odzwyczaisz.

### Pułapka 2: Migracja w trakcie sezonu

Wiosna i jesień to peak szkółki. Niedziela popołudnie z 30 klientami i 20 jazdami to nie jest moment na uczenie się systemu.

**Migruj w "martwym" momencie**: początek stycznia, koniec lipca (wakacje), początek grudnia. Stajnia ma wtedy 50-70% normalnego ruchu, masz cierpliwość na błędy.

### Pułapka 3: Brak komunikacji z klientami

Klient pierwszy raz dzwoni, słyszy "teraz w systemie", nie rozumie, frustracja, idzie do konkurencji.

**Wcześniej** — wyślij komunikat "od poniedziałku zmieniamy system, oto co to znaczy" (3-5 dni przed). Klienci docenią.

### Pułapka 4: Próbowanie 100% adopcji od dnia 1

"Wszyscy muszą zarezerwować online, nie odbieram telefonu". To wkurza klientów, którzy mają 60 lat i nie korzystają ze smartfonów.

**Stopniowo**: pierwszy miesiąc — system + telefon w równolegle. Po miesiącu — większość klientów już się przyzwyczaiła. Powoli ograniczasz telefon, ale nigdy nie blokujesz.

### Pułapka 5: Brak treningu pracowników

Manager wie wszystko, instruktor klika na chybił trafił, pracownik godzinę szuka funkcji.

**Trening w niedzielę wieczór + poniedziałek dostępność** — to minimum. Bez tego cały zysk z systemu znika w tygodniu chaosu.

## Co robić, gdy coś się sypie

Migracja **nigdy** nie idzie w 100% gładko. Plan B:

- **Excel zostawiasz w archiwum** przez 3-6 miesięcy (jako fallback)
- **Telefon do supportu systemu** — większość ma chat lub priority email
- **Najgorsze ryzyka** są na poziomie danych (brakujące/duplikaty), nie systemu — system działa OK

Jeśli czegoś nie umiesz zrobić w pierwszym tygodniu — używaj starej metody dla tej konkretnej rzeczy. Naucz się w drugim tygodniu.

## Pomoc przy migracji od dostawcy

Większość poważnych systemów ma jakiś poziom wsparcia migracji:

- **Hovera (Stable plan+):** 1-godzinna sesja onboardingowa + import bulk klientów i koni z CSV. Pomoc czat 24h pierwszych 30 dni.
- **Horstable:** wdrożenie 1:1 osobiste (mocniejsze niż większość)
- **Equicty / EquineM:** głównie self-service + dokumentacja

Pytaj o to **przed** zakupem subskrypcji. Może to być różnica 3 godzin migracji vs 3 dni.

## Hovera — i jak Ci pomożemy

Wszystkie pakiety Stable, Pro i Enterprise zawierają:

- **Bulk import** klientów, koni, karnetów z CSV
- **Onboarding session** 1:1 (60 min) gdzie pomagamy ustawić podstawy
- **Migration check** — przejrzymy Twoje dane przed importem i wskażemy potencjalne problemy
- **Priority support** przez pierwsze 30 dni — odpowiadamy szybko, każde pytanie

Trial 14 dni za 0 zł — możesz zacząć już teraz, sprawdzić system, zaplanować weekend migracji bez zobowiązań.

[**Zacznij trial Hovery →**](/kontakt)

Albo umów rozmowę o migracji: [Demo Hovery →](/demo)

---

## Dalsza lektura

- [Excel czy system zarządzania stajnią — kiedy zmienić](/blog/excel-czy-system-stajnia)
- [KSeF dla stajni 2026: kompletny przewodnik](/blog/ksef-stajnia-2026)
- [Bezpieczeństwo danych w SaaS dla stajni](/blog/bezpieczenstwo-danych-saas-stajnia)
- [Horstable, Nasza Stajnia, Hovera — jak wybrać system dla stajni](/blog/porownanie-systemow-zarzadzania-stajnia)
