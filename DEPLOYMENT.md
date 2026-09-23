# Deployment

The site is a Next.js 14 app with `output: 'export'`, so `npm run build` writes a fully static site to `out/`.

## Vercel (current)

1. Import the repository in Vercel. It detects Next.js automatically.
2. Add the environment variables from `.env.example` (all `NEXT_PUBLIC_*`) under Project Settings → Environment Variables.
3. Push to `main` to deploy.

## Any static host

```bash
npm run build   # outputs out/
```

Upload the contents of `out/`. Serving from a sub-path (for example GitHub Pages at `/<repo>/`) also needs `basePath: '/<repo>'` in `next.config.mjs`.

## Notes

- `NEXT_PUBLIC_*` values are inlined into the client bundle at build time. Treat them as public, and rebuild after changing them.
- `.env`, `.env.local` and `out/` are git-ignored.
