// Motion for the mark, written as pure functions of time so live playback and exported video match frame for frame.
import { ALL_DOTS, ALPHABET, PERIMETER, PITCH, cellFor, dotSlot, type Dot } from './braille';

/** One of a cell's six dots at one moment. on: 0 hidden, 1 raised (above 1 overshoots). dx, dy: travel in tile units. */
export type DotState = { on: number; dx: number; dy: number };
export type Frame = DotState[][]; // [cell][dot index 0..5]

export type MotionId = 'still' | 'entrance' | 'pulse' | 'fold' | 'loader' | 'resolve' | 'decode' | 'wave' | 'scatter';

export const MOTIONS: { id: MotionId; name: string; note: string; duration: number }[] = [
  { id: 'still', name: 'Still', note: 'The mark at rest.', duration: 1 },
  { id: 'fold', name: 'Fold', note: 'Collapses into one pixel, then expands back out. Works as a disclosure toggle.', duration: 2400 },
  { id: 'scatter', name: 'Scatter', note: 'The pixels drift apart, then snap back into the letter.', duration: 2800 },
  { id: 'loader', name: 'Loader', note: 'A trail runs around the six dots, like a terminal spinner.', duration: 1200 },
  { id: 'resolve', name: 'Resolve', note: 'The loader spins, then settles into the letter.', duration: 3400 },
  { id: 'pulse', name: 'Pulse', note: 'The site’s hover cycle: each pixel blinks out and back in turn.', duration: 1430 },
  { id: 'entrance', name: 'Entrance', note: 'Pixels pop in one at a time, hold, then leave.', duration: 2800 },
  { id: 'decode', name: 'Decode', note: 'Each cell shuffles through letters before landing on its own.', duration: 3000 },
  { id: 'wave', name: 'Wave', note: 'A ripple lifts the pixels from left to right.', duration: 1800 },
];

export const motionById = (id: MotionId) => MOTIONS.find(m => m.id === id) ?? MOTIONS[0];

// ─── Easing ──────────────────────────────────────────────────────────────────

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const ax = 3 * x1 - 3 * x2 + 1, bx = 3 * x2 - 6 * x1, cx = 3 * x1;
  const ay = 3 * y1 - 3 * y2 + 1, by = 3 * y2 - 6 * y1, cy = 3 * y1;
  const x = (t: number) => ((ax * t + bx) * t + cx) * t;
  const y = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (p: number) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let t = p;
    for (let i = 0; i < 6; i++) {
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= (x(t) - p) / d;
    }
    return y(Math.min(1, Math.max(0, t)));
  };
}

// Curves from the site's motion tokens and its logo.
const travel = bezier(0.45, 0, 0.1, 1);
const arrival = bezier(0.25, 0.8, 0.25, 1);
const logo = bezier(0.16, 1, 0.3, 1);
const easeIn = bezier(0.55, 0, 1, 0.45);
const backOut = (p: number) => {
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  const c = 1.9;
  return 1 + (c + 1) * (p - 1) ** 3 + c * (p - 1) ** 2;
};

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const progress = (t: number, start: number, length: number) => clamp((t - start) / length);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// ─── Frames ──────────────────────────────────────────────────────────────────

const rest = (cells: Dot[][]): Frame => cells.map(cell => ALL_DOTS.map(d => ({ on: cell.includes(d) ? 1 : 0, dx: 0, dy: 0 })));

/** Raised dots of all cells in reading order, for staggering. */
function order(cells: Dot[][]) {
  const list: { c: number; d: Dot }[] = [];
  cells.forEach((cell, c) => [1, 4, 2, 5, 3, 6].forEach(d => cell.includes(d as Dot) && list.push({ c, d: d as Dot })));
  return list;
}

function loaderOn(k: number, head: number) {
  const dist = (((head - k) % 6) + 6) % 6;
  if (dist < 1) return 1;
  return clamp(1 - (dist - 1) / 2.4);
}

function loaderFrame(cells: Dot[][], t: number, period = 1200): Frame {
  return cells.map((_, c) => {
    const head = ((t - c * 140) / period) * 6;
    return ALL_DOTS.map(d => ({ on: loaderOn(PERIMETER.indexOf(d), head), dx: 0, dy: 0 }));
  });
}

function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function frameAt(motion: MotionId, cells: Dot[][], time: number): Frame {
  const { duration } = motionById(motion);
  const t = motion === 'still' ? 0 : ((time % duration) + duration) % duration;
  const base = rest(cells);

  switch (motion) {
    case 'still':
      return base;

    case 'entrance': {
      const seq = order(cells);
      seq.forEach(({ c, d }, i) => {
        const pin = backOut(progress(t, 120 + i * 90, 420));
        const pout = easeIn(progress(t, 2250 + i * 45, 260));
        base[c][d - 1].on = pin * (1 - pout);
      });
      return base;
    }

    case 'pulse': {
      // itspatmorgan.com's logo cycle: 1.1s, 110ms between pixels, keyframes 0/18/42/66/100%.
      const seq = order(cells);
      seq.forEach(({ c, d }, i) => {
        const local = t - i * 110;
        const p = local < 0 ? 0 : (local % 1100) / 1100;
        let v = 1;
        if (p > 0.18 && p <= 0.42) v = 1 - logo((p - 0.18) / 0.24);
        else if (p > 0.42 && p <= 0.66) v = logo((p - 0.42) / 0.24);
        base[c][d - 1].on = v;
      });
      return base;
    }

    case 'fold': {
      cells.forEach((cell, c) => {
        if (!cell.length) return;
        // Every pixel travels to the middle of the cell and they stack into one.
        const [ac, ar] = [0.5, 1];
        const anchor = cell[0];
        cell.forEach(d => {
          const [col, row] = dotSlot(d);
          const tx = (ac - col) * PITCH, ty = (ar - row) * PITCH;
          const reach = Math.abs(ac - col) + Math.abs(ar - row);
          const close = travel(progress(t, 350 + c * 60 + (3 - reach) * 30, 420));
          const open = arrival(progress(t, 1350 + c * 60 + reach * 45, 460));
          const amount = close * (1 - open);
          const s = base[c][d - 1];
          s.dx = tx * amount;
          s.dy = ty * amount;
          // The stack shrinks a touch so it reads as one pixel, not a pile.
          s.on = d === anchor ? 1 - 0.1 * amount : 1 - 0.25 * amount;
        });
      });
      return base;
    }

    case 'loader':
      return loaderFrame(cells, t);

    case 'resolve': {
      const spin = loaderFrame(cells, t, 900);
      return base.map((cell, c) =>
        cell.map((s, i) => {
          const settle = arrival(progress(t, 1750 + c * 160, 520));
          const unsettle = easeIn(progress(t, 3050, 350));
          const p = settle * (1 - unsettle);
          const target = s.on ? 1 + 0.12 * Math.sin(Math.PI * progress(t, 1750 + c * 160, 520)) : 0;
          return { on: lerp(spin[c][i].on, target, p), dx: 0, dy: 0 };
        }),
      );
    }

    case 'decode': {
      return cells.map((cell, c) => {
        const settleAt = 950 + c * 320;
        if (t >= settleAt && t < 2650) {
          const p = backOut(progress(t, settleAt, 260));
          return ALL_DOTS.map(d => ({ on: cell.includes(d) ? 0.7 + 0.3 * p : 0, dx: 0, dy: 0 }));
        }
        if (t >= 2650) {
          const out = easeIn(progress(t, 2650 + c * 40, 250));
          return ALL_DOTS.map(d => ({ on: cell.includes(d) ? 1 - out : 0, dx: 0, dy: 0 }));
        }
        const step = Math.floor(t / 85);
        const letter = ALPHABET[Math.floor(hash(step * 7 + c * 131) * ALPHABET.length)];
        const pattern = cellFor(letter) ?? [];
        const flick = clamp(((t % 85) / 85) * 3);
        return ALL_DOTS.map(d => ({ on: pattern.includes(d) ? 0.55 + 0.45 * flick : 0, dx: 0, dy: 0 }));
      });
    }

    case 'scatter': {
      cells.forEach((cell, c) =>
        cell.forEach((d, i) => {
          const [col, row] = dotSlot(d);
          // Each pixel leaves along its own direction away from the cell's middle, with a little twist.
          const angle = Math.atan2(row - 1, col - 0.5) + (hash(c * 6 + d) - 0.5) * 1.4;
          const reach = 5 + hash(c * 6 + d + 50) * 4;
          const out = travel(progress(t, 300 + i * 40, 600));
          const back = arrival(progress(t, 1450 + i * 60, 620));
          const drift = Math.sin((t / 1000) * Math.PI * 1.5 + d) * 0.6 * out * (1 - back);
          const amount = out * (1 - back);
          const s = base[c][d - 1];
          s.dx = Math.cos(angle) * reach * amount + drift;
          s.dy = Math.sin(angle) * reach * amount - drift * 0.5;
          s.on = 1 - 0.45 * amount;
        }),
      );
      return base;
    }

    case 'wave': {
      cells.forEach((cell, c) =>
        cell.forEach(d => {
          const [col, row] = dotSlot(d);
          const phase = t / 1800 - (c * 2 + col + row * 0.6) / 9;
          const bump = Math.max(0, Math.sin(((phase % 1) + 1) % 1 * Math.PI * 2)) ** 2;
          const s = base[c][d - 1];
          s.dy = -1.8 * bump;
          s.on = 1 + 0.14 * bump;
        }),
      );
      return base;
    }
  }
}
