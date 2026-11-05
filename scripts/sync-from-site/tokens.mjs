// Copy itspatmorgan.com's color and motion tokens from the shared kit into the Website system's theme.css.
//
// The kit (@itspatmorgan/kit, pinned in src/systems/website/package.json) ships studio/tokens.css, already scoped to
// .website-theme. Studio's Systems pages read tokens from the declarations written in theme.css itself, so the values are
// copied in rather than imported. Each kit token replaces the value of the same token in the matching theme.css rule
// (light or dark); a token theme.css lacks is added at the end of that rule. Everything else in theme.css is left alone.
//
// usage: node scripts/sync-from-site/tokens.mjs [--check]   (--check reports drift and exits 1 instead of writing)
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import postcss from 'postcss';

const ROOT = path.resolve(import.meta.dirname, '../..');
const SYSTEM = path.join(ROOT, 'src/systems/website');
const THEME = path.join(SYSTEM, 'styles/theme.css');
const SELECTORS = ['.website-theme', '.website-theme[data-color-mode="dark"]'];
const check = process.argv.includes('--check');

const kitFile = createRequire(path.join(SYSTEM, 'package.json')).resolve('@itspatmorgan/kit/studio/tokens.css');
const kit = postcss.parse(fs.readFileSync(kitFile, 'utf8'));
const theme = postcss.parse(fs.readFileSync(THEME, 'utf8'));
const rule = (root, selector) => root.nodes.find(node => node.type === 'rule' && node.selector === selector);

const drift = [];
for (const selector of SELECTORS) {
  const source = rule(kit, selector);
  const target = rule(theme, selector);
  if (!source) throw new Error(`The kit's tokens.css has no ${selector} rule`);
  if (!target) throw new Error(`theme.css has no top-level ${selector} rule`);
  source.walkDecls(decl => {
    const existing = target.nodes.find(node => node.type === 'decl' && node.prop === decl.prop);
    if (existing?.value === decl.value) return;
    drift.push(`${selector} ${decl.prop}: ${existing ? existing.value : '(missing)'} -> ${decl.value}`);
    if (existing) existing.value = decl.value;
    else target.append({ prop: decl.prop, value: decl.value });
  });
}

if (!drift.length) console.log('theme.css matches the kit tokens.');
else if (check) {
  console.error(
    `theme.css differs from the kit tokens:\n  ${drift.join('\n  ')}\nRun node scripts/sync-from-site/tokens.mjs to update it.`,
  );
  process.exit(1);
} else {
  fs.writeFileSync(THEME, theme.toString());
  console.log(`Updated ${drift.length} token${drift.length === 1 ? '' : 's'} in theme.css:\n  ${drift.join('\n  ')}`);
}
