---
title: Pixel wave text
description: Text that dissolves between Geist Pixel and Geist Sans.
source: Ported from itspatmorgan.com's src/components/PixelWaveText.astro and src/scripts/pixel-wave.ts.
---

## When to use

Use it for the home hero, the closing tagline, and the Pixel Wave lab, and nowhere else. The site reserves Geist Pixel for this effect.

`PixelWaveText` renders each character as stacked pixel and sans layers. Animate it with the exported helpers on its element: `pixelWave` for the split-flap entrance, `dissolvePixelWave` for the quick dissolve, and `enablePixelHover` to flip characters near the cursor back to pixel type. `pixelWave` and `enablePixelHover` return cleanup functions for React effects.

All three respect reduced motion.
