import type { SystemSpec } from '#studio/system';

// Website: itspatmorgan.com's tokens, type, icons, and motion, for prototyping the site and its labs.
export default {
  status: "active",
  role: 'prototype',
  label: "Website",
  themeClass: 'website-theme',
  styling: 'tailwind',
  colorModes: ['light', 'dark'],
  docs: 'warn',
  libraries: [
    {
      "kind": "source",
      "id": "tailwind",
      "label": "Tailwind CSS",
      "description": "Styling utilities and theme integration, supplied by Studio",
      "docs": "https://tailwindcss.com/docs"
    },
    {
      "kind": "source",
      "id": "shadcn",
      "label": "shadcn/ui",
      "description": "Component source and styles, as vendored by itspatmorgan.com",
      "docs": "https://ui.shadcn.com/docs"
    },
    {
      "kind": "package",
      "id": "base-ui",
      "label": "Base UI",
      "package": "@base-ui/react",
      "description": "Accessible component behavior",
      "docs": "https://base-ui.com/react/overview/quick-start"
    },
    {
      "kind": "package",
      "id": "hugeicons",
      "label": "Hugeicons",
      "package": "@hugeicons/react",
      "description": "Icon renderer and the free icon set, the site's only icon library",
      "entry": "libraries/icons.ts",
      "docs": "https://hugeicons.com/docs/integrations/react/quick-start",
      "assets": [
        "icons"
      ]
    },
    {
      "kind": "package",
      "id": "motion",
      "label": "Motion",
      "package": "motion",
      "description": "Animation for interactive pieces such as Pixel Wave",
      "entry": "libraries/motion.ts",
      "docs": "https://motion.dev/docs"
    },
    {
      "kind": "package",
      "id": "html-to-image",
      "label": "html-to-image",
      "package": "html-to-image",
      "description": "Image export for generators such as Pattern Engine",
      "entry": "libraries/html-to-image.ts",
      "docs": "https://github.com/bubkoo/html-to-image#readme"
    },
    {
      "kind": "package",
      "id": "geist",
      "label": "Geist",
      "package": "@fontsource-variable/geist",
      "description": "Body and heading typeface",
      "docs": "https://fontsource.org/fonts/geist",
      "assets": [
        "fonts"
      ]
    },
    {
      "kind": "package",
      "id": "geist-mono",
      "label": "Geist Mono",
      "package": "@fontsource-variable/geist-mono",
      "description": "Monospace typeface for labels and code",
      "docs": "https://fontsource.org/fonts/geist-mono",
      "assets": [
        "fonts"
      ]
    }
  ],
  origin: 'shadcn',
  studioId: "v4576ka1mbpbqdp1",
  renameReview: [],
} satisfies SystemSpec;
