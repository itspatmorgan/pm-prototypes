---
title: Logo
description: The four-pixel mark, a braille P, with its hover interactions.
source: Ported from itspatmorgan.com's src/components/layout/Logo.astro.
---

## When to use

Use the mark in site chrome, such as the sidebar and mobile header, and wherever a lab explores it. Size it with `className` (it draws at 28px by default).

`interaction="cycle"` pulses the pixels on hover. Set `trigger="container"` and put `data-logo-cycle-trigger` on a surrounding card to start the cycle when that card is hovered. `interaction="sidebar-toggle"` previews the rail collapsing or expanding; choose the preview with `toggleDirection`.

Motion stops under reduced motion. See the Pixel Mark lab for scale, variants, and states.
