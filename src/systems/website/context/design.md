---
title: Website design
description: Principles and styling rules for itspatmorgan.com prototypes, from the site's own agent guidance.
---

Source: `agents/principles/design.md` and `agents/context/styling.md` in itspatmorgan.com. When they change, update this summary.

## Principles

1. **Show the real work.** Recreate shipped interfaces faithfully. No stand-ins, gray bars, or invented content.
2. **One point per surface.** A headline and the first visual should carry the point on their own.
3. **Emphasize by deemphasizing.** Warm, minimal, editorial. Neutral stages, the site's own type and color.
4. **Default it or design it.** Reuse Geist, the two page widths, and shared pieces. A new width, font, or one-off control needs a reason.
5. **Most advanced, yet acceptable.** Push craft inside familiar patterns.
6. **Every word earns its place.** Plain, specific, and true. Sentence case, no all-caps labels or eyebrows.
7. **Feel is part of the design.** Instant, quiet motion. Route motion under about 250ms. Respect reduced motion.
8. **The whole picture on every screen.** Phones at 390px and both themes are first-class.
9. **Polish what ships.** Exact values from the source, optical centering, balanced line breaks.

## Styling rules

- Use semantic tokens: `bg-background`, `bg-card`, `text-muted-foreground`, `border-border`, `hover:text-accent`.
- Type is Geist (`font-sans`) and Geist Mono (`font-mono`). Geist Pixel (`font-pixel`) is only for the pixel-to-sans dissolve.
- One radius scale from `--radius` (0.5rem).
- Use the `--motion-*` tokens instead of hand-written curves: travel and arrival for demos, ease-out for entrances, ease-out-quick for quick responses, ease-standard for small state changes.
- Section dividers use `border-t border-border`.
- Page widths: reading content is `max-w-3xl` with `px-6`; prose is limited to 65ch.
- Markdown prose uses the `.prose` class in the theme, not a typography plugin.
- No "hire me" or availability language. Never invent metrics, quotes, or dates.
