# AgainstMM

React frontend containing a marketing landing page and the KEEL technical
methodology document, sharing one design system.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Framer Motion
- Inter + JetBrains Mono (Google Fonts)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The methodology document lives at `/methodology`.

## Routes

| Path           | Page                              |
| -------------- | --------------------------------- |
| `/`            | Marketing landing page            |
| `/methodology` | KEEL technical methodology · v1   |

## Structure

```
src/
├── components/
│   ├── landing/         Landing sections, dot-matrix type, motion variants
│   ├── docs/            Doc primitives: formulas, tables, figures, TOC
│   └── illustrations/   14 animated SVG diagrams + shared primitives
├── content/
│   └── methodology.tsx  All 16 sections as structured content
├── hooks/
│   └── useActiveSection.ts
├── pages/               Home, Methodology, NotFound
└── styles/docs.css      Documentation stylesheet
```

The table of contents is derived from `SECTIONS` in
`src/content/methodology.tsx`, so adding a section automatically adds its
sidebar entry.

## Illustrations

Each of the 14 diagrams is a hand-built, animated SVG component
(`Illu01`–`Illu14`) drawn from shared primitives in
`src/components/illustrations/primitives.tsx`. Diagram animations are limited to
`opacity`, `pathLength`, and geometry attributes, because animating `x`/`y` on
SVG elements writes the attribute rather than a transform.

## Build

```bash
npm run build
npm run preview
```
