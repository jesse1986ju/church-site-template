# Church Site Template

Generated and deployed automatically by Engage My Church during onboarding.

## How it works

- Content is fetched from the shared Supabase instance at build time (ISR, 60s revalidation)
- Each site is a private GitHub repo under `jesse1986ju`, deployed to Cloudflare Pages
- The church dashboard triggers a rebuild via `POST /api/revalidate` after any content update

## Environment variables

See `.env.example`. All values are injected by Cloudflare Pages — never committed.

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Shared Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Read access to `churches` + `onboarding_data` |
| `CHURCH_ID` | UUID of this church in the `churches` table |
| `CHURCH_NAME` | Used for `<title>` and metadata |
| `REVALIDATE_SECRET` | Shared secret for the dashboard revalidation webhook |
| `CF_DEPLOY_HOOK_URL` | Cloudflare Pages deploy hook for on-demand rebuilds |

## Local development

```bash
cp .env.example .env.local
# Fill in real values
npm install
npm run dev
```
