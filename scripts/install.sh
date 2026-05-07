#!/usr/bin/env bash
# Hovera — instalator dla VPS Plesk.
# Wkleić to do SSH na VPSie (jako użytkownik Plesku domeny, NIE jako root):
#
#   bash <(curl -fsSL https://raw.githubusercontent.com/PrzemekPrzemo/hovera.app-website/main/scripts/install.sh)
#
# Skrypt:
#  1) wykryje katalog domeny hovera.app (httpdocs) w Plesku
#  2) zainstaluje Node 22 lokalnie (przez nvm, bez sudo)
#  3) sklonuje repo, zbuduje stronę i wgra do httpdocs
#  4) zapyta o adres email, na który mają iść zapytania z formularza
#
# Bezpieczne do ponownego uruchomienia — aktualizuje stronę bez utraty danych.

set -euo pipefail

# ─── kolory ───
GREEN=$'\033[0;32m'; BLUE=$'\033[0;34m'; YELLOW=$'\033[0;33m'; RED=$'\033[0;31m'; NC=$'\033[0m'
say()  { echo "${BLUE}▶${NC} $*"; }
ok()   { echo "${GREEN}✓${NC} $*"; }
warn() { echo "${YELLOW}!${NC} $*"; }
die()  { echo "${RED}✗${NC} $*" >&2; exit 1; }

REPO_URL="${REPO_URL:-https://github.com/PrzemekPrzemo/hovera.app-website.git}"
DOMAIN="${DOMAIN:-hovera.app}"
BRANCH="${BRANCH:-main}"
WORK_DIR="$HOME/.hovera-build"

echo
echo "  ╔════════════════════════════════════════╗"
echo "  ║   Hovera — instalator dla Plesk VPS    ║"
echo "  ╚════════════════════════════════════════╝"
echo

# ─── 1. wykryj tryb (user vs root) ───
RUN_AS_ROOT=0
if [[ $(id -u) -eq 0 ]]; then
  RUN_AS_ROOT=1
  warn "Uruchamiasz jako root."
  echo "  Plesk zwykle daje SSH dostęp przez konto użytkownika domeny."
  echo "  Jako root też zadziała — ustawię właściciela plików na użytkownika"
  echo "  domeny ${DOMAIN}, żeby Plesk file manager i webserver miały dostęp."
  echo
fi

# ─── 2. wykryj katalog httpdocs ───
say "Wykrywam katalog domeny ${DOMAIN}..."

DOCROOT=""
candidates=(
  "/var/www/vhosts/${DOMAIN}/httpdocs"
  "$HOME/httpdocs"
  "$HOME/${DOMAIN}/httpdocs"
  "/home/${USER}/httpdocs"
)

for c in "${candidates[@]}"; do
  if [[ -d "$c" && -w "$c" ]]; then DOCROOT="$c"; break; fi
done

if [[ -z "$DOCROOT" ]]; then
  warn "Nie znalazłem katalogu domeny automatycznie."
  echo
  echo "  Sprawdź w Plesk → Domains → ${DOMAIN} → File Manager"
  echo "  i podaj pełną ścieżkę do katalogu httpdocs (np. /var/www/vhosts/${DOMAIN}/httpdocs):"
  echo
  read -rp "  > " DOCROOT
  [[ -d "$DOCROOT" && -w "$DOCROOT" ]] || die "Katalog $DOCROOT nie istnieje albo nie masz w nim uprawnień zapisu."
fi
ok "Katalog domeny: $DOCROOT"

# ─── 3. zapytaj o adres email do formularza ───
echo
read -rp "  Email, na który mają iść zapytania z formularza kontaktowego [hello@${DOMAIN}]: " MAIL_TO
MAIL_TO="${MAIL_TO:-hello@${DOMAIN}}"
read -rp "  Email-nadawca (zwykle ten sam) [${MAIL_TO}]: " MAIL_FROM
MAIL_FROM="${MAIL_FROM:-$MAIL_TO}"
ok "Email docelowy: $MAIL_TO"
ok "Email-nadawca: $MAIL_FROM"

# ─── 3b. opcjonalnie SMTP (Google Workspace, SendGrid, Postmark itd.) ───
echo
echo "  Konfiguracja SMTP (np. Google Workspace dla hello@${DOMAIN})"
echo "  Pomiń (Enter) jeśli wystarcza Ci lokalny mail() z Plesku — wiadomości"
echo "  częściej trafią do spamu, ale zero konfiguracji."
echo
read -rp "  SMTP host (np. smtp.gmail.com) [pomiń]: " SMTP_HOST
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
SMTP_SEC=""
if [[ -n "$SMTP_HOST" ]]; then
  read -rp "  SMTP port [587]: " SMTP_PORT
  SMTP_PORT="${SMTP_PORT:-587}"
  read -rp "  SMTP username [${MAIL_FROM}]: " SMTP_USER
  SMTP_USER="${SMTP_USER:-$MAIL_FROM}"
  read -rsp "  SMTP password (App Password dla Google): " SMTP_PASS
  echo
  read -rp "  Security [starttls / ssl] [starttls]: " SMTP_SEC
  SMTP_SEC="${SMTP_SEC:-starttls}"
  ok "SMTP skonfigurowany: $SMTP_HOST:$SMTP_PORT ($SMTP_SEC)"
else
  warn "SMTP pominięty — używam lokalnego mail() (Postfix Plesku)"
fi

# ─── 4. node 22 (przez nvm) ───
say "Sprawdzam Node.js..."
NEED_NODE=1
if command -v node >/dev/null 2>&1; then
  V=$(node -v | sed 's/v//' | cut -d. -f1)
  if [[ "$V" -ge 22 ]]; then NEED_NODE=0; ok "Node $V już jest"; fi
fi

if [[ $NEED_NODE -eq 1 ]]; then
  say "Instaluję Node 22 lokalnie (przez nvm, bez sudo)..."
  export NVM_DIR="$HOME/.nvm"
  if [[ ! -d "$NVM_DIR" ]]; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash >/dev/null 2>&1
  fi
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm install 22 >/dev/null
  nvm use 22 >/dev/null
  ok "Node $(node -v) zainstalowany"
fi

# upewnij się, że nvm jest aktywny w tej sesji
if [[ -d "$HOME/.nvm" ]]; then
  export NVM_DIR="$HOME/.nvm"
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh" >/dev/null 2>&1 || true
fi

# ─── 5. klon / pull ───
say "Pobieram źródła z GitHub..."
if [[ -d "$WORK_DIR/.git" ]]; then
  git -C "$WORK_DIR" fetch --quiet origin "$BRANCH"
  git -C "$WORK_DIR" reset --hard "origin/$BRANCH" --quiet
else
  rm -rf "$WORK_DIR"
  git clone --quiet --depth=1 --branch "$BRANCH" "$REPO_URL" "$WORK_DIR"
fi
ok "Źródła w $WORK_DIR"

# ─── 6. install + build ───
say "Instaluję zależności (~30s)..."
cd "$WORK_DIR"
npm ci --no-audit --no-fund --silent

say "Buduję stronę (~30s)..."
npm run build --silent

ok "Zbudowane: $WORK_DIR/dist/ (rozmiar: $(du -sh dist/ | cut -f1))"

# ─── 7. backup + sync ───
if [[ -n "$(ls -A "$DOCROOT" 2>/dev/null | grep -v "^\.\." | grep -v "^\.$" || true)" ]]; then
  BACKUP="$DOCROOT.bak.$(date +%Y%m%d-%H%M%S)"
  say "W httpdocs są pliki — robię backup do ${BACKUP}/"
  cp -r "$DOCROOT" "$BACKUP" 2>/dev/null || true
  ok "Backup gotowy"
fi

say "Wgrywam stronę do $DOCROOT..."
# rsync zachowa pliki spoza dist (np. .well-known dla Let's Encrypt)
rsync -a --delete \
  --exclude='/.well-known' \
  --exclude='/api/.env' \
  "$WORK_DIR/dist/" "$DOCROOT/"

# PHP API
mkdir -p "$DOCROOT/api"
cp "$WORK_DIR/public/api/contact.php" "$DOCROOT/api/contact.php"

# konfig email + SMTP (czytany przez contact.php)
{
  echo "HOVERA_MAIL_TO=$MAIL_TO"
  echo "HOVERA_MAIL_FROM=$MAIL_FROM"
  echo "HOVERA_MAIL_FROM_NAME=Hovera"
  if [[ -n "$SMTP_HOST" ]]; then
    echo "SMTP_HOST=$SMTP_HOST"
    echo "SMTP_PORT=$SMTP_PORT"
    echo "SMTP_USERNAME=$SMTP_USER"
    echo "SMTP_PASSWORD=$SMTP_PASS"
    echo "SMTP_SECURITY=$SMTP_SEC"
  fi
} > "$DOCROOT/api/.env"
chmod 600 "$DOCROOT/api/.env"

# .htaccess — blokuje dostęp HTTP do .env, ustawia env vars dla PHP
cat > "$DOCROOT/api/.htaccess" <<'EOF'
# Block HTTP access to .env file
<Files ".env">
  Require all denied
</Files>
<Files ".env.example">
  Require all denied
</Files>
EOF

ok "Strona wgrana do $DOCROOT"

# ─── 7b. chown (gdy jako root) ───
if [[ $RUN_AS_ROOT -eq 1 ]]; then
  # właściciel httpdocs to zwykle użytkownik domeny w Plesku
  PLESK_OWNER=$(stat -c '%U:%G' "$DOCROOT" 2>/dev/null || echo "")
  if [[ -z "$PLESK_OWNER" || "$PLESK_OWNER" == "root:root" ]]; then
    # spróbuj wykryć po katalogu nadrzędnym
    PARENT_OWNER=$(stat -c '%U:%G' "$(dirname "$DOCROOT")" 2>/dev/null || echo "")
    if [[ -n "$PARENT_OWNER" && "$PARENT_OWNER" != "root:root" ]]; then
      PLESK_OWNER="$PARENT_OWNER"
    fi
  fi

  if [[ -n "$PLESK_OWNER" && "$PLESK_OWNER" != "root:root" ]]; then
    say "Ustawiam właściciela $DOCROOT na $PLESK_OWNER..."
    chown -R "$PLESK_OWNER" "$DOCROOT"
    ok "Właściciel ustawiony"
  else
    warn "Nie wykryłem użytkownika domeny — pliki pozostają jako root."
    warn "Jeśli strona nie ładuje się, w Plesk → File Manager popraw uprawnienia."
  fi
fi

# ─── 8. podsumowanie ───
echo
echo "  ╔════════════════════════════════════════╗"
echo "  ║              GOTOWE ✓                  ║"
echo "  ╚════════════════════════════════════════╝"
echo
ok "Otwórz: https://${DOMAIN}"
ok "CMS:    https://${DOMAIN}/admin (po skonfigurowaniu OAuth — patrz README)"
echo
echo "  Co dalej:"
echo "    • Sprawdź stronę w przeglądarce"
echo "    • Wyślij testowo formularz kontaktowy z /kontakt"
echo "    • Zaloguj się do Plesku → Mail → upewnij się że ${MAIL_FROM} istnieje"
echo "    • Aby zaktualizować stronę, wystarczy ponownie wkleić ten sam command"
echo
