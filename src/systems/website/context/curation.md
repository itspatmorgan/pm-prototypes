---
title: Website curation
description: Source, decisions, and next steps for the Website system.
---

## Source

itspatmorgan.com, the sibling checkout at `~/Developer/itspatmorgan.com` (commit `4280189`, 2026-11-01). An Astro 7 site with Tailwind 4, shadcn base-nova on Base UI, Hugeicons, and Motion.

## Decisions

- Marketing was renamed to Website and rebuilt from the site; its sample prototype, Design Studio Marketing, was deleted at Patrick's request.
- Tokens are copied exactly from the site. Utility steps are limited to those the site uses.
- Each published Lab experiment is its own prototype in `src/prototypes/patrick/`: Pattern Engine, Pixel Mark, and Pixel Wave.
- The site's pages share one prototype, itspatmorgan.com, one view per page, on the `SiteShell` component. About and Work are built, with real content.
- Work's case study cards show each case study's share card where the site shows its live opening demo, until the demos are ported.

## Next

1. Home (showcase): hero, work cards, Design Studio module, writing, community, Lab cards, and closing line.
2. Writing index and an article, Lab index, Community, Design Studio, and Colophon.
3. The four case studies, each ported with its demos, like the Labs.
