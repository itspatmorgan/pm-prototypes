---
title: Case study scenes
description: The scene player, stages, and motion behind every case study demo and project card visual.
source: From @itspatmorgan/kit (itspatmorgan.com's packages/kit/src/case-study/); CaseStudyPage ports the site's layout.
---

## When to use

Every case study demo plays inside `SceneFrame` with `useScene`, `Screens`, `Pointer`, and the `Zoom` helpers. Project card visuals use `ProjectCardStage` and `useDemoLoop`. Timing comes from `EASE`, `travelTime`, and the hold constants in `motion.ts`, mirroring the `--motion-*` tokens.

Use these to build a new demo. The product folders (Sublime, Query builder, Expansion, Design Studio, Studio case) hold the finished scenes.
