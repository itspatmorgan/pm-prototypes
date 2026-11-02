---
title: Theme hooks
description: useDark, useReduced, and usePhone, shared by every interactive piece.
source: Ported from itspatmorgan.com's src/lib/hooks.ts.
---

## When to use

Interactive pieces read the theme, reduced motion, and the phone breakpoint through these hooks, never through their own media queries or observers. This keeps every demo answering the same way.

`useDark` follows the nearest theme boundary's `data-color-mode`, which Studio sets and the site shell's theme toggle flips. The site itself watches `.dark` on `<html>`. Pass a ref when several themed areas share one page, such as a system documentation page.
