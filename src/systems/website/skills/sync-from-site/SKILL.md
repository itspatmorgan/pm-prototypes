---
name: sync-from-site
description: "Refresh the Website system and the itspatmorgan.com prototype from the live site's repository: content, the shared kit pin, and page styles. Use when the site has changed and the workspace should catch up."
---

# Sync from the site

The source is the itspatmorgan.com checkout beside this studio (`../itspatmorgan.com`). Set `SITE=<path>` to use another. The scripts live in `scripts/sync-from-site/` at the repository root, because Studio treats every script inside a system folder as browser code. Read [Library](../../context/library.md) for what was ported and how before changing anything.

## Content

Run `node scripts/sync-from-site/snapshot.mjs`. It rewrites `src/prototypes/patrick/itspatmorgan-com/_data/` from the site's content collections and `src/data/`: projects and case study copy, articles (every listing, with bodies rendered by remark-gfm only for the `ARTICLE_SAMPLE` list in the script), Lab entries, community, commendations, media, the Design Studio agent guide, and the images they use, copied into the prototype's `assets/site/`.

The `_data/` modules are generated; edit the script, not its output. Words a page writes inline (About, Colophon, Design Studio) are not synced: compare them with the site's page by hand.

## Case study demos

The scene player, every case study and Design Studio demo, and the theme hooks come from `@itspatmorgan/kit`: move the kit's pinned commit in `package.json` and run `pnpm install` (see the Shared kit section in [Library](../../context/library.md)). Nothing is copied by hand. If a demo needs a change for Studio, make it in the site's `packages/kit`, where the tests check Studio's TypeScript and CSS rules.

The pieces still ported by hand are the site's Astro components rewritten in React (`StudioQuote`, `StudioPress`, `StudioLesson`, the shared site pieces) and page-level stylesheets such as `styles/site/ds-landing.css`. For a changed page stylesheet, run `node scripts/sync-from-site/scope-css.mjs <site css> styles/site/<name>.css`. It scopes every selector to `.website-theme`, maps `.dark` to the theme boundary's dark mode, prefixes keyframes, and wraps sibling selectors in `:is()` for Studio's scope check. Then run `pnpm check` and the TypeScript build.

## Verify

Open the changed pages in the itspatmorgan.com prototype in light and dark and at 390px. Compare them with the live site, and record new adaptations in the library record.
