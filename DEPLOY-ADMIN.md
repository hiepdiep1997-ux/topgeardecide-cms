# Top Gear Decide — Deployment & Admin Guide

Static Astro site + Sveltia CMS admin, hosted on Cloudflare, content managed via GitHub.

- **Domain:** topgeardecide.com
- **GitHub account:** hiepdiep1997@gmail.com
- **Cloudflare account:** hiepdiep1997@gmail.com
- **Suggested repo name:** `topgeardecide-cms`
- **OAuth worker name:** `topgeardecide-cms-auth`

---

## Architecture

| Piece | What it is |
|---|---|
| Astro static site | Builds `dist/` from `src/` — deployed to **Cloudflare Pages** |
| `/admin` (Sveltia CMS) | Loads via CDN, reads `public/admin/config.yml`, commits to GitHub |
| `oauth-worker/` | Cloudflare **Worker** that does the GitHub OAuth handshake for the CMS |
| GitHub repo | Single source of truth — CMS edits = git commits = auto rebuild |

---

## One-time deploy checklist

### 1. Create the GitHub repo (you)
Create an **empty** private/public repo named `topgeardecide-cms` under `hiepdiep1997`. Do **not** add a README/license (keep it empty so the first push is clean).

### 2. Push the code (Claude/you)
```bash
git init
git add .
git commit -m "Initial commit: Top Gear Decide affiliate site"
git branch -M main
git remote add origin https://github.com/hiepdiep1997/topgeardecide-cms.git
git push -u origin main
```

### 3. Create the Cloudflare Pages project (you)
Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick `topgeardecide-cms`.
Build settings:
- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20` (already pinned in `.nvmrc`)

### 4. Create the GitHub OAuth App (you)
GitHub → Settings → Developer settings → **OAuth Apps** → **New OAuth App**:
- Application name: `Top Gear Decide CMS`
- Homepage URL: `https://topgeardecide.com`
- Authorization callback URL: `https://topgeardecide-cms-auth.<your-workers-subdomain>.workers.dev/callback`
  (you'll know the exact worker URL after step 5 — you can edit this field afterward)
- Copy the **Client ID** and generate a **Client Secret**.

### 5. Deploy the OAuth worker (Claude/you)
```bash
cd oauth-worker
npx wrangler deploy
npx wrangler secret put GITHUB_CLIENT_ID       # paste Client ID
npx wrangler secret put GITHUB_CLIENT_SECRET   # paste Client Secret
```
`wrangler deploy` prints the worker URL — put its `/callback` into the GitHub OAuth App (step 4).

### 6. Wire the CMS to the real repo + worker (Claude/you)
Edit `public/admin/config.yml`:
```yaml
backend:
  name: github
  repo: hiepdiep1997/topgeardecide-cms
  branch: main
  base_url: https://topgeardecide-cms-auth.<your-workers-subdomain>.workers.dev
```
Commit and push — Cloudflare Pages rebuilds automatically.

### 7. Point the domain (you)
Add `topgeardecide.com` to Cloudflare (nameservers) and, in the Pages project → **Custom domains**, add `topgeardecide.com` and `www`. Wait for DNS + SSL.

### 8. Test the admin (you)
Visit `https://topgeardecide.com/admin`, click **Login with GitHub**, authorize. You should see **Articles** and **Site Settings**.

---

## After launch — things to finish

- **Web3Forms key:** create a free account at https://web3forms.com for `info@topgeardecide.com`, then paste the access key into `src/pages/contact.astro` (`WEB3FORMS_ACCESS_KEY`). Push.
- **Google Analytics (optional):** create a GA4 property, then Admin → Site Settings → **Custom Head Code**, paste the gtag snippet, Save. No code deploy needed.
- **Affiliate links:** once approved by Amazon Associates / Awin / Impact, open each article in Admin, paste the per-product **Affiliate Link**. Empty = inert button (safe default).
- **Real images:** replace the green placeholder card/hero images (Admin → each article → Card/Hero Image) and product images with real photos. Do **not** hotlink Amazon/competitor images.

---

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve the built dist/
```

Regenerate brand placeholder assets (needs `npm install --no-save sharp` first):
```bash
node scripts/generate-assets.mjs
```

Test the CMS locally without GitHub login:
```bash
npx @sveltia/cms-proxy-server   # then set local_backend on and open /admin
```
