# cmu-digital-humanity-datavis

A [Slidev](https://sli.dev) deck for CMU Digital Humanity 2026, themed with
[tahta](https://github.com/zcag/tahta) (`notebook` variant). The whole deck is `slides.md`.

## Commands

```bash
pnpm dev              # serve + open
pnpm build            # static build
pnpm export           # PDF
npx tahta-lint slides.md   # validate frontmatter / slide fencing — run after editing slides.md
```

## Theme contract

Before writing or editing slides, read the theme's authoring contract:

@node_modules/slidev-theme-tahta/AGENTS.md

That is the copy for the **installed** version (`slidev-theme-tahta@^0.13.3`) — layouts,
frontmatter fields, components, and variants are version-specific. Prefer it over the
upstream <https://github.com/zcag/tahta/blob/main/packages/theme/AGENTS.md>, which tracks
`main` and may describe fields this install does not have. Re-read it after upgrading the theme.

For Slidev core features outside the theme (animations, code blocks, export options), see
`.agents/skills/slidev/`.

## Deliberate deviations from the theme contract

The theme contract opens with **"No CSS, `<style>`, grids, or layout HTML."** This deck breaks
that in two places, on purpose. Do not "fix" them back.

- **`style.css` (deck-wide type scale).** The deck is presented on a large screen and the
  theme's defaults run small for the room. Prefer overriding a `--fs-*` token; reach for a
  real rule only where the theme hardcodes a size and exposes no token (`.vs-head` is
  `1.25rem` in `styles/index.css`, `.vs-side ul` inherits with no size of its own). Note that
  raising `.slidev-layout`'s `font-size` moves markdown bodies but *not* the rem-based theme
  sizes — so a bump there can leave a heading smaller than the list beneath it.
- **Local components in `components/`.** Slidev auto-imports every `.vue` file there (no
  import statement needed), alongside the theme's own components. `<LogoRow>` exists because
  no tahta layout does "text left, logo flush right": `logos` renders lucide icons and text,
  not image files. This is the contract's own rule 6 — a body is a canvas when no layout fits.
  Prefer a small component over inline flex `div`s in `slides.md`; the markdown stays readable
  and the styling lives in one scoped block.

Everything else follows the contract: pick a layout, fill its frontmatter.

## Conventions

- Every slide's frontmatter is fenced with `---` above **and** below; `tahta-lint` catches the
  two failure modes (a shared `---` between blocks, a stray `---` after a body).
- Accent emphasis in `title` / `subtitle`: `<span class="accent2">word</span>` for flat accent
  color, `<em>word</em>` for italic accent. These fields are injected as HTML.
- Slidev strips HTML from the headmatter `title` when computing the browser title, so accent
  markup on the cover title is safe.
- Speaker notes are an HTML comment as the last block of a slide body.
- `pnpm prettier --write slides.md` (uses `prettier-plugin-slidev`).

## Adding an image

1. Put the file in `public/` (logos in `public/logos/`) and reference it from the root —
   `image: /shot.png`, `<img src="/logos/kmutt.svg">`. Never reference an external URL: the
   deck must render offline, at a venue, years from now.
2. Minify SVGs before committing:
   ```bash
   npx svgo --config svgo.config.mjs public/logos/new.svg   # ~55% on Inkscape exports
   ```
   The config disables `removeViewBox` — that plugin strips the `viewBox` when it matches
   `width`/`height`, which breaks an SVG whose size comes from CSS in an `<img>`.
3. **Add a row to the "Third-party material" table in `README.md`** for anything not authored
   here: path, source URL, and licence/trademark status. The deck ships under CC BY 4.0, and
   that grant must not appear to cover material we don't own. Check the source first — a
   Wikimedia Commons file page states its licence tag explicitly (institution logos are
   typically public domain by copyright *and* trademarked); an asset lifted from a company
   site usually states nothing, which is not the same as permission.
4. Verify in a browser, not just a thumbnail. A logo on the bio slide goes in a `<LogoRow>`,
   whose fixed-width box plus `object-fit: contain` keeps mismatched aspect ratios on one
   right-hand edge. Squat wordmarks need a smaller `height` prop than wide ones to carry the
   same optical weight — WeVis runs at `2.25rem` against the default `3.5rem`.
