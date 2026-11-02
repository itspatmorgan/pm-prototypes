# Website system

Website supplies itspatmorgan.com's tokens, type, icons, motion, and shared pieces for prototyping the site. Components and their API pages live in `components/`; the theme lives in `styles/theme.css`; the Geist Pixel font and background textures live in `assets/`.

Read `AGENTS.md` when maintaining Website or working on a prototype assigned to it. Context includes [Design](context/design.md), [Library](context/library.md), and [Curation](context/curation.md).

Prototype assignment determines which system applies. The [Systems module](../../platform/modules/systems/README.md) owns assignment and boundary requirements.

`components.json` records the site's upstream shadcn choices (base-nova, Hugeicons). System folders are not independent CLI projects; follow the [Systems configuration contract](../../platform/modules/systems/README.md#structure) for isolated generation.
