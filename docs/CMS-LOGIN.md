# Logowanie do panelu CMS Hovery

Edytujemy treści przez **[Pages CMS](https://pagescms.org)** — hostowany przez nich, w pełni przeglądarkowy CMS git-based. Zmiany zapisują się jako commity do GitHuba, GitHub Actions automatycznie buduje i wgrywa stronę na Plesk (~2 min).

## 🚀 Jednorazowy setup (2 minuty)

### Krok 1 — wejdź do panelu

**<https://app.pagescms.org>**

### Krok 2 — zaloguj się przez GitHub

1. Klik **„Sign in with GitHub"**.
2. GitHub zapyta o uprawnienia — autoryzujesz aplikację **Pages CMS** (read/write tylko do wskazanych repozytoriów).
3. Z listy repozytoriów wybierz **`PrzemekPrzemo/hovera.app-website`**.

To wszystko. Bez generowania PAT-ów, bez instalacji.

## 📝 Codzienne logowanie

1. Otwórz <https://app.pagescms.org>.
2. Klikasz w repo `hovera.app-website` → masz pełny panel.
3. Edytujesz → klikasz **Save** → automatycznie commit do `main` → deploy.

Pages CMS pamięta logowanie w przeglądarce (z konta GitHub). Działa na laptopie, iPadzie i telefonie.

## 🔄 Co się dzieje po zapisie

1. Klikasz **Save** w Pages CMS.
2. Pages CMS commituje do gałęzi `main` (przez Twoje uprawnienia GitHub).
3. GitHub Actions (workflow `Build and deploy to Plesk`) buduje stronę.
4. `rsync` wgrywa nowy build na `hovera.app` — całość ~2 min.

Status deployu zobaczysz pod: <https://github.com/PrzemekPrzemo/hovera.app-website/actions>

## 📂 Co możesz edytować

Boczne menu w Pages CMS dzieli kolekcje per język (PL / EN / DE / FR). Wszystko mapowane z folderów w `src/content/`.

| Kolekcja | Co to | Gdzie się pojawia |
|---|---|---|
| **Produkt** | Strony per moduł (Kalendarz, Transport, KSeF…) | `/produkt/<slug>` |
| **Blog** | Artykuły | `/blog/<slug>` |
| **Changelog** | Historia release'ów produktu | `/co-nowego` |
| **Dla kogo (use case)** | Strony per segment (szkółka, pensjonat, hodowla…) | `/dla/<slug>` |
| **Versus** | Hovera vs konkurencja | `/vs/<slug>` |

## 🖼️ Banery i obrazki

Pages CMS ma wbudowany media manager.

- **Bannery hero** (`/og/*.png`) — w lewym menu wchodzisz w **„Media → OG / Banery"**, klik **Upload**, wrzucasz np. `transport-banner-pl.png`. Potem w polu **Hero image (banner)** w danej stronie Produkt wybierasz wgrany plik.
- **Inne assety** — sekcja **„Media → Public assets"** trafia bezpośrednio do `public/`.

Rekomendowane wymiary bannera: **1600 × 900 px** (proporcja 16:9), PNG/WebP do 400 KB.

## ❓ Co, gdy coś nie działa

| Problem | Rozwiązanie |
|---|---|
| „Repository not found / not authorized" | Wróć do <https://github.com/settings/applications> → Pages CMS → upewnij się, że `hovera.app-website` jest na liście autoryzowanych repo. |
| Zapis nie pojawia się na stronie | Sprawdź <https://github.com/PrzemekPrzemo/hovera.app-website/actions> — jeśli czerwony, kliknij i zobacz log. |
| „Schema validation failed" | Treść nie pasuje do schematu w `.pages.yml` — najprostsze: cofnij ostatnią edycję i daj znać developerowi. |
| Strona stary banner | Cache CDN — wymuś hard-refresh (Cmd/Ctrl+Shift+R). |

## 🔐 Bezpieczeństwo

- Pages CMS używa **GitHub OAuth** — Twoje uprawnienia są dokładnie takie same, jak na GitHubie. Nie ma dodatkowych haseł do zapamiętania.
- Pages CMS przekazuje tokeny w sessionStorage przeglądarki — wylogowując się z GitHuba odcinasz dostęp.
- Konfiguracja kolekcji jest w pliku **`.pages.yml`** w korzeniu repo. Jeśli będziesz chciał dodać nowe pola/kolekcje — edytujesz ten plik i commitujesz.

## 🧑‍💻 Czego CMS NIE edytuje

Te rzeczy są w kodzie (Astro/TypeScript), nie w plikach markdown — żeby je zmienić, potrzeba edycji repo:

- `CarrierOnboarding.astro` — 4 plany dla przewoźników, ceny w 5 walutach, ROI, dokumenty (do edycji przez developera lub Claude'a).
- `TransportDisclaimer.astro` — copy prawne.
- `ProductScreenshot.astro` — mockupy aplikacji w SVG/HTML.
- `Nav.astro`, `Footer.astro`, `ProductHero.astro` — szablony layoutu.
- Cennik główny `/cennik` — w `src/pages/cennik.astro` + `src/i18n/ui.ts`.

Daj znać Claude'owi (przez `/ultrareview` albo nowy task), jeśli chcesz zmiany w którymś z tych obszarów.

## 🧠 Tip pro

- W Pages CMS jest pole **„View as draft"** — możesz zapisać zmiany jako PR zamiast bezpośrednio do `main`. Wtedy zmiana nie idzie od razu live, tylko czeka na akceptację. Włącza się to per-kolekcja, jeśli chcesz — daj znać developerowi i ustawimy.
- Telefon / tablet — `app.pagescms.org` jest responsive. Pisz artykuły blogowe w pociągu.
