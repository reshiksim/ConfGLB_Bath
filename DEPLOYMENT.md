# Deployment Readiness

This project is a React + TypeScript + Vite app using `@google/model-viewer`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

## Production Build

Create a production build:

```bash
npm run build
```

The production output is written to:

```text
dist/
```

## Preview Production Build

After building, preview the production output locally:

```bash
npm run preview
```

## Vercel Deployment

Recommended first deployment target: Vercel static deployment.

Use the default Vite build settings:

```text
Build command: npm run build
Output directory: dist
```

`vercel.json` includes an SPA fallback rewrite so future client routes can be refreshed safely.

Do not add SMTP, provider API keys, or other private credentials to frontend environment variables.

## Netlify Deployment

`netlify.toml` is included with:

```text
Build command: npm run build
Publish directory: dist
```

It also includes an SPA fallback redirect to `/index.html`.

## Static Hosting Deployment

Any static host can serve the generated `dist/` folder.

Minimum requirements:

- serve `index.html`;
- serve JS/CSS/assets with correct MIME types;
- serve `/models/*.glb`;
- route unknown client paths to `index.html` if client-side routing is added later.

## Model Asset Handling

Local public GLB assets live in:

```text
public/models/
```

They are served at:

```text
/models/<file>.glb
```

For production with many or large GLB files, consider CDN/object storage with proper CORS headers.

Required material names for configurable models:

```text
mat_bath_outer
mat_bath_inner
mat_hardware
```

## Environment Variables For Future Email/PDF Backend

Use `.env.example` as a template.

Only variables prefixed with `VITE_` are safe to expose to frontend code. SMTP/API credentials must never use the `VITE_` prefix and must only be read by backend/serverless code.

Future backend-only variables:

```text
EMAIL_PROVIDER
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
EMAIL_FROM
```

Current safe frontend variables:

```text
VITE_DEFAULT_MODEL_ID
VITE_DEFAULT_MODEL_NAME
VITE_DEFAULT_GLB_URL
```

## Known Deployment Risks

1. Large GLB files can slow initial loading.
2. If GLB files are hosted outside the app domain, CORS must be configured.
3. Email sending requires backend/serverless functions.
4. SMTP/API credentials must never be exposed in frontend code.
5. Client-side PDF is acceptable for MVP, but server-side PDF is better for production.
6. The current local project path contains non-ASCII characters, which may cause tooling issues on some setups.
7. Future iframe/embed mode may require additional build packaging.

## Suggested Rollout

1. Prepare Vercel/Netlify configs.
2. First real deployment: Vercel static.
3. Keep GLB files in `/public/models` initially.
4. After stabilization, add `/api/send-configuration`.
5. Add server-side PDF later.
