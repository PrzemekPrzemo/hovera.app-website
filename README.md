# hovera.app — strona marketingowa

Statyczna strona produktowa dla Hovery. Astro 5 + Tailwind v4 + Sveltia CMS, wdrażana na VPS Plesk.

## Stack

- **Astro 5** — generator statyczny, output `static/`
- **Tailwind CSS v4** — utility classes + design tokens w `src/styles/global.css`
- **Sveltia CMS** — git-based CMS pod `/admin`, edytuje treści przez GitHub
- **PHP mailer** — formularz kontaktowy obsługiwany przez `public/api/contact.php` na Plesku
- **GitHub Actions** — build + rsync na Plesk po każdym pushu na `main`

## Mapa stron

50+ stron w PL i EN:

- Home, `/cennik`, `/kontakt`, `/dziekujemy`
- `/produkt/{kalendarz, karnety, finanse-ksef, dziennik-konia, aplikacja-mobilna, zapisy-online, ai-copilot}`
- `/dla/{szkolki, pensjonatu, sportu, hodowli, sieci-stajni}`
- `/vs/{horstable, excel, nasza-stajnia}`
- `/co-nowego`, `/aplikacja-mobilna`, `/integracje`, `/demo`, `/klienci`, `/blog`, `/o-nas`, `/pomoc`
- Legal: `/regulamin`, `/polityka-prywatnosci`, `/rodo`, `/cookies`, `/dostepnosc`

EN wersje pod `/en/...`.

## Lokalny dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # produkcja → dist/
npm run preview
```

## Architektura treści

| Co | Gdzie |
|---|---|
| Tłumaczenia UI (nawigacja, CTA, etykiety) | `src/i18n/ui.ts` |
| Treści `/produkt/*` | `src/content/product/{pl,en}/*.md` |
| Treści `/dla/*` | `src/content/usecase/{pl,en}/*.md` |
| Treści `/vs/*` | `src/content/versus/{pl,en}/*.md` |
| Wpisy `/co-nowego` | `src/content/changelog/{pl,en}/YYYY-MM-DD-slug.md` |
| Wpisy bloga | `src/content/blog/{pl,en}/*.md` |
| Tekst stron statycznych (cennik, demo, integracje, legal itd.) | bezpośrednio w `src/pages/**` |

Brand tokens (kolory, czcionki, radius, shadow, easing) — `src/styles/global.css` w bloku `@theme`.

## Edycja treści przez Sveltia CMS

Po wdrożeniu CMS dostępny jest pod `https://hovera.app/admin`.

### Pierwsza konfiguracja

1. Stwórz GitHub OAuth App na <https://github.com/settings/developers>
   - **Application name**: Hovera CMS
   - **Homepage URL**: `https://hovera.app`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
2. Z poziomu Plesk lub repo, otwórz `https://hovera.app/admin` i zaloguj się przez GitHub.
3. Każda zmiana w CMS = commit do `main` + automatyczny rebuild i deploy przez GitHub Actions (~2 min).

### Bez Netlify (opcjonalnie)

Sveltia opisuje, jak hostować mały OAuth proxy samodzielnie:
<https://github.com/sveltia/sveltia-cms#authentication>. Gdy przygotujesz proxy, wystarczy
podmienić `base_url` w `public/admin/config.yml`.

## Wdrożenie na Plesk

### 1. Konfiguracja Plesku

W panelu Plesk dla domeny `hovera.app`:

1. **Hosting type**: zwykły hosting statyczny + PHP (8.2+).
2. **Document root**: zostaw `httpdocs` (lub inną ścieżkę — patrz krok 4).
3. Zainstaluj **Let's Encrypt** dla `hovera.app` i `www.hovera.app`.
4. (Opcjonalnie) **HTTP/2** włączone, **Brotli compression** włączone.
5. **Apache & nginx Settings** → dodaj nginx-level reguły (cache + canonical):

   ```nginx
   error_page 404 /404.html;

   location ~* \.(woff2|woff|ttf|otf|eot|jpg|jpeg|png|gif|svg|webp|avif|ico|css|js)$ {
     expires 1y;
     add_header Cache-Control "public, immutable";
   }
   location ~* \.html$ {
     expires 5m;
     add_header Cache-Control "public, max-age=300";
   }

   if ($host = www.hovera.app) {
     return 301 https://hovera.app$request_uri;
   }
   ```

### 2. Konfiguracja PHP (formularz kontaktowy)

`public/api/contact.php` jest kopiowany do `dist/api/contact.php` przez krok build w GitHub Actions.

W Plesk → domena → **PHP Settings** ustaw zmienne środowiskowe:

```
HOVERA_MAIL_TO=hello@hovera.app
HOVERA_MAIL_FROM=no-reply@hovera.app
```

Albo edytuj defaulty bezpośrednio w pliku `public/api/contact.php`.

Plesk obsługuje `mail()` przez lokalny SMTP (Postfix). Jeśli wolisz wysyłkę przez
zewnętrzny SMTP (np. Postmark, SendGrid), zamień implementację `mail()` na
PHPMailer/SwiftMailer.

### 3. SSH key dla GitHub Actions

```bash
ssh-keygen -t ed25519 -C "github-deploy@hovera" -f ~/.ssh/hovera_deploy
ssh-copy-id -i ~/.ssh/hovera_deploy.pub user@hovera.app
cat ~/.ssh/hovera_deploy   # → wartość secret PLESK_SSH_KEY
```

### 4. GitHub Secrets

W repo → Settings → Secrets and variables → Actions, dodaj:

| Secret | Wartość |
|---|---|
| `PLESK_HOST` | `hovera.app` (albo IP VPSa) |
| `PLESK_SSH_PORT` | `22` (jeśli niestandardowy SSH port) |
| `PLESK_USER` | username SSH na Plesku (np. `hovera-deploy`) |
| `PLESK_PATH` | `/var/www/vhosts/hovera.app/httpdocs` (sprawdź w Plesku → File Manager) |
| `PLESK_SSH_KEY` | zawartość `~/.ssh/hovera_deploy` (klucz prywatny) |

### 5. Pierwszy deploy

```bash
git push origin main
```

Po ~2 minutach `https://hovera.app` powinno działać. GitHub Actions → workflow `Build and deploy to Plesk` pokazuje logi.

### Manualny deploy (bez GitHub Actions)

```bash
npm run build
rsync -avz --delete dist/ user@hovera.app:/var/www/vhosts/hovera.app/httpdocs/
```

## Aktualizacja treści po wdrożeniu

**Drobne edycje** (poprawka literówki, zmiana ceny, nowy wpis w changelogu): wejdź w `https://hovera.app/admin`, edytuj, zapisz. Po commitcie GitHub Actions zbuduje i wgra zmiany na Plesk w ~2 min.

**Większe zmiany** (nowy moduł, nowa sekcja na home): edytuj kod lokalnie, push do `main`.

## Brand

| Token | Wartość | Użycie |
|---|---|---|
| `--color-bark` | `#3D2E22` | Główny tekst, primary CTA |
| `--color-sand` | `#E8DDD0` | Akcent tła |
| `--color-ochre` | `#A8956B` | Akcent, ikony, animacje |
| `--color-cream` | `#FAF8F4` | Tło |

Logo i mark — `src/components/Logo.astro` i `HorseshoeMark.astro`.

## Custom — co warto edytować po wdrożeniu

Pliki z placeholderami / TODO:

- `src/pages/o-nas.astro` + EN — sekcja Dane firmy: NIP, REGON, KRS, adres
- `src/pages/kontakt.astro` + EN — telefon, adres, NIP
- `src/pages/regulamin.astro`, `polityka-prywatnosci.astro`, `rodo.astro` — wymagają konsultacji prawnej
- `public/api/contact.php` — adres `HOVERA_MAIL_TO`
- `src/components/Footer.astro` — linki social (LinkedIn, Instagram, YouTube), App Store / Google Play

## Performance

Goal Lighthouse: Performance 95+, Accessibility 95+, Best Practices 95+, SEO 100.

Co już jest:

- Brak JS poza View Transitions + ~2 KB IntersectionObserver / magnetic CTA
- Fonts loaded z Bunny Fonts (privacy-friendly), `font-display: swap`
- Obrazy: SVG inline (no asset request), gradient mesh w CSS (zero rasterów)
- Reduced-motion: pełne wsparcie dla użytkowników z `prefers-reduced-motion`
- View Transitions API: płynne przejścia między stronami bez SPA boilerplate

## Licencja

Wszystkie prawa zastrzeżone. Hovera Sp. z o.o.
