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

## Next

Recreate the site's page templates (home, about, work, writing, Lab index, case study, reading) as prototypes, which needs the sidebar, header, and page layouts ported as system components.
