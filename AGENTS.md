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

## Conventions

- Every slide's frontmatter is fenced with `---` above **and** below; `tahta-lint` catches the
  two failure modes (a shared `---` between blocks, a stray `---` after a body).
- Accent emphasis in `title` / `subtitle`: `<span class="accent2">word</span>` for flat accent
  color, `<em>word</em>` for italic accent. These fields are injected as HTML.
- Slidev strips HTML from the headmatter `title` when computing the browser title, so accent
  markup on the cover title is safe.
- Speaker notes are an HTML comment as the last block of a slide body.
- `pnpm prettier --write slides.md` (uses `prettier-plugin-slidev`).
