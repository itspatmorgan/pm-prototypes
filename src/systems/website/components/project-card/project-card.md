---
title: Project card
description: A case study card whose visual is the case study's own opening demo.
source: Ported from itspatmorgan.com's src/components/ProjectCard.astro and ProjectDemo.astro.
---

## When to use

Use compact cards in the Work timeline (title only) and on Home (with `showDescription`). Sublime agents, query language, expansion, and Design Studio show their live demo; any other case study passes a thumbnail `image`.

The demo sits in an inert frame with the link stretched over the card, so the whole card is one link and nothing inside takes focus. Hovering lifts the card and replays the demo from its first frame. A custom card around `ProjectVisual` needs `data-project-card` on its outer box for the replay to work.
