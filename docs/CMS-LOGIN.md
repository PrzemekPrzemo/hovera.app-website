# Logowanie do panelu CMS Hovera

Edycja treści idzie przez **Sveltia CMS** (git-based). Zmiany zapisują się jako commity do GitHuba i automatycznie deployują na Plesk w ~2 min.

## 🚀 Jednorazowy setup (5 minut)

### Krok 1 — wygeneruj GitHub Personal Access Token

Kliknij ten link → otworzy gotowy formularz na GitHubie:

**<https://github.com/settings/personal-access-tokens/new>**

Wypełnij:

| Pole | Wartość |
|---|---|
| Token name | `Hovera CMS` |
| Expiration | 1 year (potem wygenerujesz nowy) |
| Resource owner | `PrzemekPrzemo` (Twoje konto) |
| Repository access | **Only select repositories** → wybierz `hovera.app-website` |

W sekcji **Permissions → Repository permissions** ustaw:

| Permission | Access |
|---|---|
| **Contents** | Read and write |
| **Metadata** | Read-only (auto) |
| **Pull requests** | Read and write |

Kliknij **Generate token** na dole.

GitHub pokaże token zaczynający się od `github_pat_...` — **skopiuj go teraz**, nie zobaczysz go drugi raz.

### Krok 2 — zaloguj się do CMS

Otwórz w przeglądarce:

**<https://hovera.app/admin>**

W ekranie logowania wybierz **„Use a token"** (lub „Sign in with token"), wklej skopiowany PAT, zatwierdź.

Sveltia zapamięta token w localStorage Twojej przeglądarki — następnym razem zalogujesz się jednym kliknięciem na tym samym urządzeniu.

## 📝 Codzienne logowanie

Po pierwszym setupie wystarczy:

1. Otwórz `https://hovera.app/admin`
2. Sveltia automatycznie Cię rozpozna, klikasz **Sign in**
3. Pracujesz, klikasz **Save** lub **Publish**

## 🔄 Co się dzieje po zapisie

1. Klikasz **Save & Publish** w CMS
2. Sveltia robi commit do gałęzi `main` na GitHubie (przez Twój token)
3. GitHub Actions automatycznie buduje stronę
4. Wgrywa nową wersję na Plesk (`https://hovera.app`) — całość ~2 min

> **Bez automatycznego deployu (jeśli GitHub Actions secrets nie są skonfigurowane)**: zmiana siedzi w repo, ale nie jest live. Wtedy trzeba ręcznie zaktualizować VPS:
>
> ```bash
> bash <(curl -fsSL https://raw.githubusercontent.com/PrzemekPrzemo/hovera.app-website/main/scripts/install.sh)
> ```

## 📂 Co możesz edytować w CMS

| Kolekcja | Co to | Gdzie się pojawia |
|---|---|---|
| **Produkt — funkcje** | Opisy modułów (kalendarz, karnety...) | `/produkt/*` deep-dive pages |
| **Dla kogo — use cases** | Strony per segment (szkółka, pensjonat...) | `/dla/*` pages |
| **Porównania (vs)** | Hovera vs konkurencja | `/vs/*` pages |
| **Co nowego (changelog)** | Historia release'ów produktu | `/co-nowego` |
| **Blog** | Artykuły blogowe | `/blog/*` |

## ❓ Co, gdy coś nie działa

| Problem | Rozwiązanie |
|---|---|
| „Invalid token" przy logowaniu | Token wygasł albo brak uprawnień. Wygeneruj nowy z Contents R/W. |
| „Repository not found" | Token nie ma dostępu do tego repo. Sprawdź `Repository access` w PAT. |
| Klikam Save, ale strona się nie aktualizuje | GitHub Actions nie ma sekretów do Plesku — uruchom skrypt instalujący ręcznie. |
| Zapomniałem tokena | Pójdź na <https://github.com/settings/personal-access-tokens> i wygeneruj nowy. |

## 🔐 Bezpieczeństwo

- Token zapisany jest **lokalnie w przeglądarce** (localStorage). Nie wysyła się na żaden zewnętrzny serwer poza GitHubem.
- Wygeneruj token z **najmniejszym potrzebnym scope** — jak wyżej, tylko Contents/Metadata/PRs dla jednego repo.
- Jeśli zgubisz urządzenie lub udostępniasz przeglądarkę — odwołaj token na <https://github.com/settings/personal-access-tokens>.

## 🧠 Tip pro

Jeśli chcesz, możesz mieć **dwa tokeny**:

1. Krótkoterminowy (30 dni) do CMS w przeglądarce na laptopie
2. Długoterminowy (1 rok) do CMS na telefonie / iPadzie

Token na telefonie wygodnie wpisać raz, potem klikasz „Sign in" automatycznie.
