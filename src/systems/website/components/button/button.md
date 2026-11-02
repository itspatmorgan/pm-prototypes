---
title: Button
description: The site's shadcn base-nova button on Base UI.
docs: https://ui.shadcn.com/docs/components/base/button
source: Ported from itspatmorgan.com's src/components/ui/button.tsx.
---

## When to use

Use the default variant for the main action, outline or secondary for alternatives, and ghost for quiet toolbar actions. Destructive is for actions that remove something.

For navigation, use a plain anchor with `buttonVariants` to keep link semantics. Icons are Hugeicons children; mark trailing or leading icons with `data-icon="inline-end"` or `"inline-start"` to tighten the padding. Icon-only buttons need an `aria-label`.

Sizes are `xs`, `sm`, `default`, `lg`, and the square `icon`, `icon-xs`, `icon-sm`, and `icon-lg`.
