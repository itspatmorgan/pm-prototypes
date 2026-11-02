import type { SystemIntro } from '#studio/system';
export default {
  summary: "itspatmorgan.com's tokens, type, icons, and motion, for prototyping the site and its Lab experiments.",
  overview: {
    starter: false,
    guidance: 'Design principles and styling rules from the site, plus a record of what was ported and how.',
    code: 'The site\'s shell, Button, pixel-mark Logo, Lab page, and Pixel wave text, with Tabs and Tooltip, styled by its warm OKLCH palette, Geist, Hugeicons, and motion tokens.',
    curation: {
      stage: 'components',
      summary: 'Foundations and the site shell ported from itspatmorgan.com; the Labs, About, and Work are built as prototypes.',
      nextStep: 'Build the Home page in the itspatmorgan.com prototype.',
      sources: [{ label: 'itspatmorgan.com', url: 'https://itspatmorgan.com' }],
      record: 'curation.md',
    },
  },
} satisfies SystemIntro;
