---
title: Lab page
description: The page frame for a Lab experiment, with its titled sections.
source: Ported from itspatmorgan.com's src/layouts/LabLayout.astro, without the site sidebar and footer.
---

## When to use

Inside `SiteShell`, wrap each Lab page in `LabPage` with the title and description from its Lab entry. Put the entry's introduction in `intro`, and the experiment in children. Use `LabSection` for each titled part of the demo, with an optional `description`.

The "← Lab" link is a `SiteLink` to `/lab`, so it follows the prototype's own pages. The sidebar, header, and footer come from `SiteShell`.
