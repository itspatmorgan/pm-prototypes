// Convert one of itspatmorgan.com's global stylesheets into Website-scoped CSS.
// usage: node scripts/sync-from-site/scope-css.mjs <in.css> <out.css>
// - every selector is placed under .website-theme
// - html.dark / .dark / :root.dark become .website-theme[data-color-mode="dark"]
// - :root, html and body become the theme boundary itself
// - keyframes gain the website-theme- prefix, and their uses are renamed
// - package @imports are kept; relative url()s are rewritten for the new location
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const require = createRequire(path.join(ROOT, 'package.json'));
const postcss = require('postcss');

const [input, output] = process.argv.slice(2);
const THEME = '.website-theme';
const DARK = `${THEME}[data-color-mode="dark"]`;
const root = postcss.parse(fs.readFileSync(input, 'utf8'), { from: input });

const frames = new Map();
root.walkAtRules(/keyframes$/i, rule => {
  if (!rule.params.startsWith('website-theme-')) {
    frames.set(rule.params, `website-theme-${rule.params}`);
    rule.params = `website-theme-${rule.params}`;
  }
});

function scope(selector) {
  let s = selector.trim();
  const dark = /^(?::root|html)?\.dark(?=[\s.:[>+~]|$)|^:is\(html\.dark\)/;
  if (dark.test(s)) {
    s = s.replace(dark, '').trim();
    if (!s) return DARK;
    // A selector on the boundary itself (html.dark.foo) is rare; treat the rest as a descendant.
    return /^[>+~]/.test(s) ? `${DARK} ${s}` : `${DARK} ${s}`;
  }
  const rootLike = /^(?::root|html|body)(?=[\s.:[>+~]|$)/;
  if (rootLike.test(s)) {
    s = s.replace(rootLike, '').trim();
    return s ? `${THEME} ${s}` : THEME;
  }
  return `${THEME} ${s}`;
}

// Studio's scope check accepts only descendant and child combinators after the theme class. A sibling combinator
// inside the theme (.website-theme .a + .b) selects the same elements when wrapped in :is(), which keeps its specificity.
function wrapSiblings(selector) {
  for (const head of [DARK, THEME]) {
    if (!selector.startsWith(head + ' ')) continue;
    let rest = selector.slice(head.length + 1);
    if (!/(^|[^\\(])\s*[+~]\s*(?![^(]*\))/.test(rest)) return selector;
    const pseudo = rest.match(/(::[\w-]+(\([^)]*\))?)$/);
    if (pseudo) rest = rest.slice(0, -pseudo[1].length);
    return `${head} :is(${rest})${pseudo ? pseudo[1] : ''}`;
  }
  return selector;
}

root.walkRules(rule => {
  if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
  rule.selectors = rule.selectors.map(scope).map(wrapSiblings);
});

root.walkDecls(decl => {
  if (/^(animation|animation-name)$/.test(decl.prop))
    for (const [from, to] of frames)
      decl.value = decl.value.replace(new RegExp(`(^|[\\s,])${from}(?=$|[\\s,])`, 'g'), `$1${to}`);
  if (decl.value.includes('url(')) {
    // A url() into the site's node_modules can't resolve from the system; copy that file into assets/ and point at it by hand.
    if (decl.value.includes('node_modules/')) console.warn(`${input}: ${decl.value.slice(0, 120)} needs a local asset`);
  }
});

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(
  output,
  `/* Ported from itspatmorgan.com's ${path.relative(path.resolve(input, '../../..'), input)}, scoped to the Website theme. */\n` +
    root.toString(),
);
console.log(`${output}: ${frames.size} keyframes renamed`);
