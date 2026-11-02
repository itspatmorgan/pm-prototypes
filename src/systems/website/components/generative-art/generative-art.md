---
title: Generative art
description: The deterministic pattern engine behind Lab previews, article heroes, and Pattern Engine.
source: Ported from itspatmorgan.com's src/lab/editorial-art/.
---

## When to use

Use `LiveEditorialVisual` for an article's hero, passing the article's `visual` settings. Use `GenerativePatternSurface` for a live pattern behind a card, such as the Pattern Engine Lab preview. `ArtCanvas` composes a full 1200×630 publishing image with type and the Unknown Arts mark, and `UAMark` is that mark alone.

Every pattern is deterministic: the same generator settings and seed always draw the same image. Five generators are available: flow field, dot grid, isoline, Voronoi, and strange attractor. Motion modes are static, reveal, and ambient, and all respect reduced motion.

Pattern Engine, the Lab prototype, is the editor for these settings.
