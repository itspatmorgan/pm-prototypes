---
name: sync-from-site
description: "Refresh the Website system and the itspatmorgan.com prototype from the live site's repository: content, case study demos, and their styles. Use when the site has changed and the workspace should catch up."
---

# Sync from the site

The source is the itspatmorgan.com checkout beside this studio (`../itspatmorgan.com`). Set `SITE=<path>` to use another. The scripts live in `scripts/sync-from-site/` at the repository root, because Studio treats every script inside a system folder as browser code. Read [Library](../../context/library.md) for what was ported and how before changing anything.

## Content

Run `node scripts/sync-from-site/snapshot.mjs`. It rewrites `src/prototypes/patrick/itspatmorgan-com/_data/` from the site's content collections and `src/data/`: projects and case study copy, articles (every listing, with bodies rendered by remark-gfm only for the `ARTICLE_SAMPLE` list in the script), Lab entries, community, commendations, media, the Design Studio agent guide, and the images they use, copied into the prototype's `assets/site/`.

The `_data/` modules are generated; edit the script, not its output. Words a page writes inline (About, Colophon, Design Studio) are not synced: compare them with the site's page by hand.

## Case study demos

The scene player, the Sublime, query builder and expansion demos, and the theme hooks come from `@itspatmorgan/kit` instead: move the kit's pinned commit in `package.json` and run `pnpm install` (see the Shared kit section in [Library](../../context/library.md)). The steps below cover the folders not yet in the kit.

1. Run `python3 scripts/sync-from-site/port-demos.py [folder ...]` for the changed folders (`design-studio`, `studio-case`). It copies their code into `components/<folder>/`, prefixes each `.tsx` with `_`, rewrites site imports, and turns `/images/...` URLs into imports of copies in `assets/images/site/`.
2. For each changed stylesheet, run `node scripts/sync-from-site/scope-css.mjs <site css> styles/site/<name>.css`. It scopes every selector to `.website-theme`, maps `.dark` to the theme boundary's dark mode, prefixes keyframes, and wraps sibling selectors in `:is()` for Studio's scope check. A `url()` into `node_modules` needs a local asset by hand.
3. Reapply the hand repairs the script cannot make, listed under Adaptations in [Library](../../context/library.md): the `source-glyphs.json` copy, Studio's stricter unused-binding rules, and the `StudioQuote`, `StudioPress`, and `StudioLesson` React ports.
4. Run `pnpm check` and the TypeScript build. Add any token the check reports to `styles/theme.css` with Tailwind's default value, the value the site uses.

## Verify

Open the changed pages in the itspatmorgan.com prototype in light and dark and at 390px. Compare them with the live site, and record new adaptations in the library record.
