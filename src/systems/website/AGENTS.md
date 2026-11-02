# Website system instructions

This system prototypes itspatmorgan.com: its pages, page templates, and Lab experiments. Read [Design](context/design.md) for the site's principles and styling rules, and [Library](context/library.md) for what was ported from the site and how. [Curation](context/curation.md) records the source, decisions, and open gaps.

Use Website's components, Hugeicons through `libraries/icons`, and the theme tokens in `styles/theme.css`. Motion and image export come from `libraries/motion` and `libraries/html-to-image`. Do not add a second icon library or expand the token inventory without a reason. Keep Base UI popups in the shared themed portal container.

The live site at `../itspatmorgan.com` (a sibling checkout) is the source of truth. When porting from it, keep its values exactly and note any adaptation in the library record.
