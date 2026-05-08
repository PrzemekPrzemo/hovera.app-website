# Hovera — Social Manager (admin-app)

Internal Express app for the Hovera team. Runs on the same VPS as the
public site, exposed at **`https://hovera.app/admin/social/`** via an
nginx proxy. The public Astro site stays static and untouched.

## What it does

- **AI generator** — Claude (`claude-sonnet-4-6`) drafts an Instagram
  caption + hashtags + graphic brief + first comment in your brand
  voice, with translation snippets for picked languages.
- **Editor** — clean up the draft, tweak schedule, paste image URL.
- **Manual publish** — "Publish now" button → IG Graph API.
- **Scheduled publish** — `scripts/ig-publisher.mjs` runs from cron,
  finds posts that are `approved` and whose `scheduled_time <= now`,
  publishes them, posts a first comment, marks them `published`.
- **Token refresh** — UI button + reminder of days-to-expiry for the
  IG long-lived token.

## Local development

```bash
cd admin-app
cp .env.example .env
# edit .env with your secrets
npm install
npm run dev   # node --watch
# open http://127.0.0.1:3001/admin/social/
```

## Deployment on Plesk VPS

The full repo is pulled by the main `scripts/install.sh`. To enable the
admin-app:

### 1. Install dependencies + secrets

```bash
cd /var/www/vhosts/hovera.app/admin-app
npm install --omit=dev
cp .env.example .env
nano .env       # fill in everything
chmod 600 .env
mkdir -p data/posts
```

### 2. Configure Plesk Node.js app

Plesk → Domains → hovera.app → **Node.js**:

- **Node.js version**: 22 (or latest LTS)
- **Application Mode**: production
- **Application Root**: `/admin-app`
- **Application Startup File**: `server.mjs`
- **Custom Environment Variables**: leave empty (we use `.env` via
  dotenv inside `server.mjs`)
- Click **Enable Node.js**, then **Restart**.

Plesk runs the app on a random localhost port and writes it to
`/var/www/vhosts/hovera.app/.NODE_PORT` (or shows it in the UI). Copy
that port — you need it for the proxy.

Alternatively, set a fixed port in `.env`:
```
PORT=3001
HOST=127.0.0.1
```
and use that one in the proxy below.

### 3. Add nginx proxy in Plesk

Plesk → Domains → hovera.app → **Apache & nginx Settings** →
**Additional nginx directives** → paste:

```nginx
location /admin/social/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /api/admin/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Save, restart nginx (Plesk does it automatically).

### 4. Set up the scheduler cron

```bash
crontab -e
```

Add:
```
*/5 * * * * cd /var/www/vhosts/hovera.app/admin-app && /usr/bin/node scripts/ig-publisher.mjs >> /var/log/hovera-ig.log 2>&1
```

(Adjust path to `node` — `which node` will tell you. If using nvm, it's
typically `~/.nvm/versions/node/v22.x.x/bin/node`.)

### 5. Test

```bash
curl -sI https://hovera.app/admin/social/
# → 401 Unauthorized (Basic Auth required)

curl -sI -u "$ADMIN_USER:$ADMIN_PASSWORD" https://hovera.app/admin/social/
# → 200 OK

# Open in browser:
# https://hovera.app/admin/social/
```

## Instagram setup (one-time)

1. Convert your IG account to **Business** and connect it to a
   Facebook Page you own.
2. Go to https://developers.facebook.com/apps/ → **Create app** →
   **Business** type.
3. Add the **Instagram Graph API** product.
4. In **App Settings → Basic**, copy your **App ID** and **App
   Secret** → put in `.env` (`IG_APP_ID`, `IG_APP_SECRET`).
5. Use [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
   to generate a **User token** with these scopes:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
6. Exchange the short-lived (1h) token for a long-lived one (~60d)
   using the explorer or:
   ```bash
   curl -G "https://graph.facebook.com/v18.0/oauth/access_token" \
     -d grant_type=fb_exchange_token \
     -d client_id=YOUR_APP_ID \
     -d client_secret=YOUR_APP_SECRET \
     -d fb_exchange_token=YOUR_SHORT_TOKEN
   ```
7. Find your **Instagram Business Account ID**:
   ```bash
   curl "https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_PAGE_TOKEN"
   # find the page → use its id below
   curl "https://graph.facebook.com/v18.0/PAGE_ID?fields=instagram_business_account&access_token=YOUR_PAGE_TOKEN"
   # the returned instagram_business_account.id is IG_BUSINESS_ACCOUNT_ID
   ```
8. Put `IG_ACCESS_TOKEN` and `IG_BUSINESS_ACCOUNT_ID` in `.env`,
   restart the Node.js app via Plesk.
9. Open `/admin/social/` → **Settings** tab — should show "IG OK".

The app shows days-to-expiry for your token. About a week before
it expires, click **Refresh token** in the UI and copy the new value
from `data/tokens.json` to `.env`, then restart.

## Image hosting

The IG Graph API needs a **publicly reachable HTTPS URL** for every
image / video. The simplest options:

- Upload to your VPS under `/public/social-assets/` (rsync from your
  laptop) and use `https://hovera.app/social-assets/foo.jpg`.
- Use Cloudinary, Imgix, S3 — any CDN that returns the image at a
  stable URL.
- For Reels: video must be MP4, H.264, ≤100MB, ≤90s.

The admin UI just stores the URL — uploading is up to you for now.

## Security notes

- The whole `/admin/social/` and `/api/admin/` paths are behind HTTP
  Basic Auth. Use a long random password (`openssl rand -base64 24`).
- `data/posts/*.json` may contain captions and hashtags only — no
  user data. Still, `chmod 700 data/`.
- `.env` and `data/tokens.json` are in `.gitignore`. **Never commit
  them.**
- `robots.txt` already disallows `/admin/`.

## Files

```
admin-app/
├── server.mjs              # Express app
├── package.json
├── .env.example            # template
├── lib/
│   ├── auth.mjs            # Basic Auth middleware
│   ├── storage.mjs         # JSON CRUD
│   ├── claude.mjs          # Anthropic client + system prompt
│   └── instagram.mjs       # Graph API wrapper
├── public/
│   └── index.html          # full admin SPA (Tailwind + Alpine)
├── scripts/
│   └── ig-publisher.mjs    # cron scheduler
└── data/
    └── posts/              # post JSON files (gitignored)
```
