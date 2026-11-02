---
title: Site shell
description: The itspatmorgan.com frame, with its sidebar, phone navigation, page header, and footer.
source: Ported from itspatmorgan.com's src/layouts/PageLayout.astro and src/components/layout/.
---

## When to use

Wrap every site page in `SiteShell`. Set `current` to the page's nav item and `template` to `showcase` (home, case study stages, Design Studio) or `reading` (everything else). Reading pages start with `PageHeader`, which takes a `title` and `lead`.

Links default to the live site. In a prototype, pass `renderLink` so the nav moves between the prototype's own pages, using `Link` from `@module/prototypes`; keep the paths literal so renames repair them.

On desktop, the mark toggles the rail between expanded and collapsed, as on the site; the choice is remembered when storage allows. The theme toggle flips the surrounding theme boundary's color mode, standing in for the site's `.dark` class.
