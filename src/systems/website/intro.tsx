import type { SystemIntro } from '#studio/system';
export default {
  summary: "itspatmorgan.com's tokens, type, icons, and motion, for prototyping the site and its Lab experiments.",
  overview: {
    starter: false,
    guidance: 'Design principles and styling rules from the site, plus a record of what was ported and how.',
    code: 'The site\'s shell, cards, generative art, case study scenes, and product demos, with Button, Badge, and the pixel-mark Logo, styled by its warm OKLCH palette, Geist, Hugeicons, and motion tokens.',
    curation: {
      stage: 'prototype',
      summary: 'Ported from itspatmorgan.com: foundations, shell, shared pieces, and demos. Every site page is a view in the itspatmorgan.com prototype.',
      nextStep: 'Review the pages against the live site, then formalize the next visual-system pieces.',
      sources: [{ label: 'itspatmorgan.com', url: 'https://itspatmorgan.com' }],
      record: 'curation.md',
    },
  },
} satisfies SystemIntro;
