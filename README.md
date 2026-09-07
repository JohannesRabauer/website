# Cyber Portfolio

A modern cyberpunk-inspired developer portfolio built with:

- **Next.js 13** (App Router)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **tsparticles** for particle effects

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Preview deployments

Work-in-progress content can be viewed live at `https://rabauer.dev/preview/`
before it's merged to `main`, which is useful for checking a post on a phone
or sharing a draft link.

To use it:

1. Push (or merge) the content you want to check onto the `preview` branch.
2. That push triggers `.github/workflows/publish-preview.yml`, which builds
   `main` at the root and the `preview` branch under `/preview`, then deploys
   both together to GitHub Pages.
3. `next.config.js` reads `NEXT_BASE_PATH` to build under a sub-path — this is
   only set for the preview build, so the normal production build (`main`,
   via `deploy.yml`) is unaffected.

**Caveat:** `deploy.yml` (the normal production deploy on push to `main`)
only builds the root site — it doesn't know about `/preview` and will
overwrite it. So after `main` deploys again, `/preview` disappears until the
preview workflow is re-run (push to `preview` again, or run it manually from
the Actions tab). This was a deliberate simplification: it avoids touching
the production deploy workflow at all, at the cost of `/preview` needing a
manual refresh whenever `main` deploys after it.