# Copilot Instructions

## Build & Dev Commands

- `npm run dev` — Start local dev server (http://localhost:3000)
- `npm run build` — Static export to `out/` (includes `.nojekyll` for GitHub Pages)
- `npm run lint` — Run Next.js ESLint

## Architecture

This is a **static portfolio site** for [rabauer.dev](https://rabauer.dev), built with Next.js 15 App Router and exported as static HTML via `output: 'export'` in `next.config.js`. It deploys to **GitHub Pages** through a GitHub Actions workflow on push to `main`.

### Page Structure

- `app/page.tsx` — Home page, composes section components: `Hero`, `Youtube`, `Certifications`, `Publications`
- `app/meetup/page.tsx` — Server-side redirect to an external Meetup URL
- `app/components/` — All UI components live here (flat, no nesting)

### Key Technical Decisions

- **Static export only** — No server-side features (API routes, SSR, middleware). Images use `unoptimized: true`. New pages must work as static HTML.
- **`"use client"` for interactive components** — Components using Framer Motion, tsparticles, or browser APIs need the `"use client"` directive. Data-only section components (Certifications, Publications, Youtube) are server components.
- **Particle background** — `ParticlesBackground.tsx` renders a fixed full-screen canvas using `react-particles` + `tsparticles-slim`. It sits behind all content via CSS `z-index: -1`.

## Conventions

### Styling

- **Tailwind CSS** with a custom cyberpunk color palette defined in `tailwind.config.js`:
  - `cyber-bg` (dark translucent), `cyber-green` (neon green), `cyber-purple` (neon purple), `cyber-cyan` (cyan accent)
- Use `cyber-*` color tokens for all themed elements. Each section heading uses a different cyber color.
- Component-level CSS classes (`content-layer`, `particles-background`, `certification-badge`) are defined in `app/globals.css` using `@layer components`.
- The `tailwind.config.js` safelist ensures dynamically referenced cyber classes are included in the build.

### Content Data

- Certifications, publications, and YouTube playlists are defined as **inline arrays** within their respective component files — there is no separate data layer or CMS.
- Badge images for certifications are stored directly in `public/`.

### Component Patterns

- Section components (`Certifications`, `Publications`, `Youtube`) follow a consistent pattern: define a TypeScript interface, declare a data array, render with a heading + flex layout.
- `ProjectCard` is the reusable card component (used by Publications), featuring Framer Motion hover animation.
- Icons come from `react-icons` (Font Awesome set via `react-icons/fa`, Simple Icons via `react-icons/si`).
