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

## 📦 Deployment (GitHub Pages)

1. Add to `next.config.js`:

```js
const isProd = process.env.NODE_ENV === "production";
module.exports = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/your-repo-name" : "",
  assetPrefix: isProd ? "/your-repo-name/" : "",
};
```

2. Run `npm run build && npm run export`
3. Push `out/` folder to `gh-pages` branch
4. Enable GitHub Pages in repo settings
