// Braille cells for the pixel mark. A cell has six dots in two columns:
//   1 4
//   2 5
//   3 6
// The site's mark is the letter P: dots 1, 2, 3 and 4.

export type Dot = 1 | 2 | 3 | 4 | 5 | 6;

export const ALL_DOTS: Dot[] = [1, 2, 3, 4, 5, 6];

/** Grade 1 (uncontracted) English braille. Digits use the letters a to j, as braille does after a number sign. */
const LETTERS: Record<string, Dot[]> = {
  a: [1],
  b: [1, 2],
  c: [1, 4],
  d: [1, 4, 5],
  e: [1, 5],
  f: [1, 2, 4],
  g: [1, 2, 4, 5],
  h: [1, 2, 5],
  i: [2, 4],
  j: [2, 4, 5],
  k: [1, 3],
  l: [1, 2, 3],
  m: [1, 3, 4],
  n: [1, 3, 4, 5],
  o: [1, 3, 5],
  p: [1, 2, 3, 4],
  q: [1, 2, 3, 4, 5],
  r: [1, 2, 3, 5],
  s: [2, 3, 4],
  t: [2, 3, 4, 5],
  u: [1, 3, 6],
  v: [1, 2, 3, 6],
  w: [2, 4, 5, 6],
  x: [1, 3, 4, 6],
  y: [1, 3, 4, 5, 6],
  z: [1, 3, 5, 6],
};

const DIGITS = 'jabcdefghi';
const PUNCTUATION: Record<string, Dot[]> = {
  '.': [2, 5, 6],
  ',': [2],
  '?': [2, 3, 6],
  '!': [2, 3, 5],
  "'": [3],
  '-': [3, 6],
  '#': [3, 4, 5, 6],
  ' ': [],
};

export const ALPHABET = Object.keys(LETTERS);

/** The dots raised for one character, or null when braille here has no cell for it. */
export function cellFor(char: string): Dot[] | null {
  const code = char.codePointAt(0) ?? 0;
  // Braille characters themselves (U+2800 to U+283F, the six-dot range) map straight to their dots.
  if (code >= 0x2800 && code <= 0x283f) return ALL_DOTS.filter(d => (code - 0x2800) & (1 << (d - 1)));
  const c = char.toLowerCase();
  if (c in LETTERS) return LETTERS[c];
  if (/[0-9]/.test(c)) return LETTERS[DIGITS[Number(c)]];
  if (c in PUNCTUATION) return PUNCTUATION[c];
  return null;
}

/** Keeps the characters braille can draw, up to a limit. */
export function cleanText(text: string, max = 4): string {
  return [...text]
    .filter(ch => cellFor(ch) !== null)
    .slice(0, max)
    .join('');
}

/** The Unicode braille character for a cell, such as ⠏ for P. */
export function brailleChar(dots: Dot[]): string {
  const bits = dots.reduce((sum, d) => sum + (1 << (d - 1)), 0);
  return String.fromCodePoint(0x2800 + bits);
}

export function brailleString(text: string): string {
  return [...text].map(ch => brailleChar(cellFor(ch) ?? [])).join('');
}

// ─── Geometry ────────────────────────────────────────────────────────────────
// Matches the site's Logo: a 28 unit tile, 5 unit pixels on a 7 unit pitch, centered at (14, 14).

export const TILE = 28;
export const PITCH = 7;
export const PIXEL = 5;
/** Distance between neighbouring cells in a lockup. Wider than the dot pitch, as printed braille is. */
export const CELL_PITCH = 16;

/** Column and row of a dot inside its cell, both 0-based. */
export function dotSlot(dot: Dot): [col: number, row: number] {
  return dot <= 3 ? [0, dot - 1] : [1, dot - 4];
}

/** The six positions clockwise from top left, for loaders that travel around the cell. */
export const PERIMETER: Dot[] = [1, 4, 5, 6, 3, 2];
