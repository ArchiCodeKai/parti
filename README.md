# PARTI

> An Atlas of Modern Architecture — a visually-driven encyclopedia that uses geometry itself to represent the structure of architectural knowledge.

[繁體中文](./README.zh-TW.md)

---

## Positioning

PARTI (an architectural term for the foundational concept of a design) is not a Wikipedia clone, not ArchDaily, not a ChatGPT wrapper.

It is a **curatorial encyclopedia from a former architect's perspective** — points, lines, planes, mathematical principles, and fluid motion woven through 200+ architects, buildings, movements, and books, organized as a navigable network rather than a flat article list.

## Core Features

- **4 entry points** — People · Buildings · Movements · Map
- **3 filters** — Era · School · Practice
- **Multi-view overviews** — mosaic wall (people), zoned timeline (buildings), narrative flow (movements), world map (geographic)
- **Bidirectional relationships** — each entry surfaces related entities even when not mentioned in body text
- **Three-tier search** — `Cmd+K` palette · Header search · `/explore` advanced filters
- **Minimal visual system** — Constructivism + isometric illustration + vermilion / black / off-white palette
- **"Hidden-until-Touched"** interaction model — UI stays still until intent is shown

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 · React 19 · TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion · Lenis |
| Visualization | D3 Delaunay · react-force-graph-2d · Mapbox GL |
| State | Zustand |
| Search | Fuse.js |

## Project Structure

```
docs/                    Internal design docs (Traditional Chinese)
  01-專案規劃/             Overview, features, tech, data model
  02-MVP規劃/              Versioning plan
  03-元件設計/             Card, RelatedList, CmdK, Animation specs
  04-頁面設計/             Landing + 4 category pages
  05-內容架構/             Entity schema, word-count rules, relation graph

src/
  app/                   Next.js App Router
  components/            UI components
  content/               Curated entity data
  design-reference/      Design system source of truth
  hooks/                 Custom React hooks
  lib/                   Utilities
  store/                 Zustand stores
  types/                 TypeScript definitions
```

## Local Development

```bash
npm install
npm run dev          # port 3737
npm run build
npm run type-check
npm run lint
```

Open <http://localhost:3737>.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=...   # https://mapbox.com
NEXT_PUBLIC_SITE_URL=...
```

## Roadmap

| Stage | Status |
|---|---|
| Content architecture & data model | In progress |
| Design system | In progress |
| MVP v1 — Landing + People | Planned |
| MVP v2 — Buildings + Movements + Map | Planned |
| Public beta | Planned |

## About

Built and curated by **ArchiCodeKai** — a former architect who codes. The editorial standards, content selection, design language, and information architecture are mine; each of the 200+ entries is hand-picked rather than scraped.

## License

- **Source code** — [MIT](./LICENSE)
- **Curated content** in `docs/` and `src/content/` — © 2026 ArchiCodeKai. All rights reserved.
