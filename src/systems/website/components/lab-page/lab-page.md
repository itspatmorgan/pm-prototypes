---
title: Lab page
description: The page frame for a Lab experiment, with its titled sections.
source: Ported from itspatmorgan.com's src/layouts/LabLayout.astro, without the site sidebar and footer.
---

## When to use

Wrap each Lab prototype in `LabPage` with the title and description from its Lab entry. Put the entry's introduction in `intro`, and the experiment in children. Use `LabSection` for each titled part of the demo, with an optional `description`.

The site's sidebar, mobile header, and footer are not part of this component yet.
