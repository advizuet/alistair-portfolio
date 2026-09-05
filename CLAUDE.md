# CLAUDE.md

Portfolio site for Alistair Vizuet. React 18 + Vite 5 + TypeScript, deployed to
GitHub Pages at `advizuet.github.io/portfolio/`.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc --noEmit && vite build  — MUST pass before any commit
npm run preview  # serve dist/ locally
```

Always run `npm run build` before committing. It type-checks; `npm run dev` does not.

## Architecture

**`src/data/projects.ts` is the single source of truth.** All project copy, section
structure, and media layout live there as typed data. The page components render that
data generically — they contain no per-project content.

```
src/
  data/projects.ts      # ALL content: projects, sections, copy, media layout
  pages/
    Home.tsx            # logo, About link, work list w/ hover previews
    Resume.tsx          # About + resume (route is /about; /resume redirects)
    Project.tsx         # renders Overview / Process / Showcase from data
  components/
    Layout.tsx          # page shell, 60px margins
    Logo.tsx            # wordmark on home, "< …" back-link elsewhere
    MediaPanel.tsx      # renders a Media object: single image or collage grid
  styles/global.css     # design tokens + layout
  blueScrollbars.ts     # custom scrollbar behaviour
```

Routes: `/`, `/about`, `/work/:slug`. Sections via `?section=process|showcase`.
`BrowserRouter` basename derives from `import.meta.env.BASE_URL`, so it works at both
`/` (dev) and `/portfolio/` (Pages). Don't hardcode paths.

### Adding or editing content

Edit `src/data/projects.ts`. To add an image: drop the file in `src/assets/`, import
it at the top of the file, and set `src` on the relevant `MediaCell`. A cell with no
`src` renders a labeled placeholder — that is intentional and safe.

Collage layout: `rows[].height` and `cells[].flex` are relative flex units taken from
the Figma frame's pixel dimensions. Keep them proportional to the design rather than
rounding to small integers. An optional `rail` is a full-height right-hand column.

## Design tokens

Defined in `src/styles/global.css` under `:root`. Use the variables; don't inline
hex values.

- `--blue: #0000ff` — accent
- `--fg: #000000`, `--muted: rgba(0,0,0,.7)`, `--bg: #ffffff`
- `--page-pad: 3.75rem` (60px), `--col-left`, `--col-gap`
- `--font` — Monument Grotesk Semi-Mono, falling back to Space Grotesk

## Deployment

`.github/workflows/pages.yml` builds on push to `main` and publishes to Pages.
It sets `GITHUB_PAGES=true`, which flips `vite.config.ts` `base` to `/portfolio/`,
and copies `dist/index.html` to `404.html` as the SPA deep-link fallback.

Do not edit `base` in `vite.config.ts` to fix a local path problem — local dev is
meant to run at `/`.

## Figma

Design file: `portfolio-site-wip`. `Page 1` holds the approved design and is
read-only — do not propose changes to it. In-progress layout work lives on separate
pages.

**Figma is layout guidance, not the full source of truth.** Behaviour that exists
only in code is deliberate and predates the design file. When implementing from a
Figma frame:

- Never remove existing behaviour because it is absent from the design.
- Never assume an unrepresented feature was cut. Ask.
- Treat the frame as authority on layout, dimensions, spacing, and type — not on
  what the page does.

Known code-only behaviour, none of which appears in Figma:

- `src/blueScrollbars.ts` — custom scrollbar behaviour
- Homepage hover previews wired through `MediaPanel.tsx`
- Route and section transitions (`?section=process|showcase`)

Collage `rows[].height` and `cells[].flex` values come from the Figma frame's pixel
dimensions. Read them from the design rather than estimating, and keep them
proportional rather than rounding to small integers.

## Conventions

- TypeScript strict. No `any`. Prefer widening the types in `projects.ts` over casts.
- No CSS frameworks. Plain CSS in `global.css`, tokens over literals.
- Keep `Project.tsx` generic. If a project needs a one-off layout, extend the `Media`
  or `Section` type rather than branching on `slug`.
- Commit messages: imperative mood, one line, sentence case.

## Known issues / current work

- **Image weight.** `src/assets/` is ~23 MB of unoptimized PNGs; several previews are
  ~1880×1808 and 2–5 MB each. Convert photographic assets to WebP and cap the long
  edge around 1600px before adding more. Do this before adding the remaining projects.
- **Placeholder copy.** `chat-am-i-going-to-hell`, `wavelamp`, and `wavedrifter` use
  `placeholderSections()`. `sensing-the-fields` and `pipebot` have real images but
  literal `'blah blah processy stuff'` body copy in Process/Showcase.
- **`sensing-overview.png`** is committed but unreferenced.
- **Font licensing.** `src/assets/fonts/monument-grotesk-semi-mono.otf` is a
  commercial typeface committed to a public repo. Confirm the license permits
  redistribution and web embedding, or remove it and rely on the Space Grotesk
  fallback.
- **README is stale.** It says images can't be exported from Figma and every slot is a
  placeholder; both are now outdated.
