# Alistair Vizuet — Portfolio

Minimalist portfolio site built from the Figma design with React + Vite + TypeScript.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  components/
    Layout.tsx      # page shell (60px margins) + back-link logo
    Logo.tsx        # "Alistair Vizuet" (blue on home, "< …" back-link elsewhere)
    MediaPanel.tsx  # single image or collage grid, data-driven
  data/
    projects.ts     # single source of truth for all projects + section copy + media
  pages/
    Home.tsx        # logo, About + Resume link, Work list
    Resume.tsx      # About + Resume (text column + portrait)
    Project.tsx     # Overview / Process / Showcase template
  styles/
    global.css      # design tokens + layout
```

Routes: `/`, `/resume`, `/work/:slug` (sections via `?section=process|showcase`).

## Design tokens

- Accent blue: `#0000ff` (`--blue`)
- Text: black / `rgba(0,0,0,.7)` muted
- Typeface: **Monument Grotesk Semi-Mono** (commercial, from the Figma file). This
  build loads **Space Grotesk** (Google Fonts) as a free fallback. If you have a
  Monument Grotesk web license, it is already first in the `--font` stack in
  `src/styles/global.css` and will be used automatically.

## Adding the real images

Image assets are exported from Figma manually via the remote Figma MCP server.
`Sensing the Fields` and `Pipebot` have their real images in place; the remaining
media slots render a labeled placeholder. To add a real image:

1. Export/drop the file into `src/assets/`.
2. In `src/data/projects.ts`, import it and set the `src` on the matching cell, e.g.

```ts
import sensingBuoy from '../assets/sensing_buoy.png'
// ...
media: { type: 'single', cell: { label: 'sensing_buoy', src: sensingBuoy } },
```

Collage cells work the same way — set `src` on each cell you have an image for.

Two of five projects are fully designed (`Sensing the Fields`, `Pipebot`). The other
three (`chat am i going to hell?`, `Wavelamp`, `Wavedrifter`) use the same template
with placeholder copy until their designs are finalized.

## Deploying

This is a client-side SPA. On static hosts, add a catch-all rewrite to `index.html`
so deep links (`/resume`, `/work/...`) resolve (e.g. Vercel/Netlify SPA fallback).
