---
title: Website curation
description: Source, decisions, and next steps for the Website system.
---

## Source

itspatmorgan.com, the sibling checkout at `~/Developer/itspatmorgan.com` (commit `4280189`, 2026-11-01). An Astro 7 site with Tailwind 4, shadcn base-nova on Base UI, Hugeicons, and Motion.

## Decisions

- Marketing was renamed to Website and rebuilt from the site; its sample prototype, Design Studio Marketing, was deleted at Patrick's request.
- Website is the studio's default and only system. The Product starter, Parker's sample prototypes and profile, and the archived Lab prototypes were deleted on 2026-11-01; git history keeps them.
- Tokens are copied exactly from the site. Utility steps are limited to those the site uses.
- The Lab experiments (Pattern Engine, Pixel Mark, Pixel Wave) are views in the itspatmorgan.com prototype's `lab/`, inside the site shell as on the site. They began as separate prototypes and moved in on 2026-11-01 so the whole site is one workspace.
- The site's pages share one prototype, itspatmorgan.com, one view per page, on the `SiteShell` component. About and Work are built, with real content.
- Work's case study cards show each case study's share card where the site shows its live opening demo, until the demos are ported.

- Every page of the site has a view in the itspatmorgan.com prototype: Home, About, Work, the four case studies, Design Studio, Writing (all 27 articles listed) and one article template shown with a five-article sample covering every hero generator, theme, and prose pattern, Lab and its three experiments, Community, and Colophon. Content is a snapshot made by [sync-from-site](../skills/sync-from-site/SKILL.md).
- Project cards show each case study's live opening demo, as on the site.

## Next

1. Review each page against the live site in light, dark, and at 390px, and record differences.
2. Decide which visual-system pieces to formalize next: section rhythm and widths (showcase and reading), the print and texture treatments, and the case study stage.
