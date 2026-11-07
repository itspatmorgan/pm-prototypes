// Draws a mark as an SVG string. The live view, the thumbnails and every export use this one renderer.
import { ALL_DOTS, CELL_PITCH, PITCH, PIXEL, TILE, cellFor, dotSlot, type Dot } from './braille';
import type { Container, DotShape, Finish, Paint } from './finishes';
import type { Frame } from './motion';

export type Layout = 'tile' | 'lockup';

export type MarkSpec = {
  text: string;
  finish: Finish;
  dot: DotShape;
  container: Container;
  ghost: boolean;
  layout: Layout;
};

export function cellsOf(text: string): Dot[][] {
  const cells = [...text].map(ch => cellFor(ch) ?? []);
  return cells.length ? cells : [cellFor('p') ?? []];
}

/** The mark's own size in tile units: square for a tile, wider for a lockup of several letters. */
export function markBox(spec: Pick<MarkSpec, 'text' | 'layout'>) {
  const n = cellsOf(spec.text).length;
  const width = spec.layout === 'lockup' ? TILE + (n - 1) * CELL_PITCH : TILE;
  return { width, height: TILE };
}

function geometry(spec: MarkSpec) {
  const n = cellsOf(spec.text).length;
  const { width, height } = markBox(spec);
  const span = PITCH + (n - 1) * CELL_PITCH; // distance between the outer dot centers
  // A tile holds several letters by scaling them down; one letter keeps the site's exact geometry.
  const scale = spec.layout === 'lockup' || n === 1 ? 1 : Math.min(1, 15 / span);
  const center = (c: number, d: Dot): [number, number] => {
    const [col, row] = dotSlot(d);
    return [width / 2 + scale * (c * CELL_PITCH + col * PITCH - span / 2), height / 2 + scale * (row - 1) * PITCH];
  };
  return { width, height, scale, center };
}

const f = (n: number) => (Math.round(n * 1000) / 1000).toString();

function paintDef(id: string, paint: Paint): string {
  if (typeof paint === 'string') return '';
  const stops = paint.stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
  if (paint.kind === 'linear') {
    const a = (paint.angle * Math.PI) / 180;
    const sx = Math.sin(a) / 2, sy = Math.cos(a) / 2;
    return `<linearGradient id="${id}" x1="${f(0.5 - sx)}" y1="${f(0.5 + sy)}" x2="${f(0.5 + sx)}" y2="${f(0.5 - sy)}">${stops}</linearGradient>`;
  }
  return `<radialGradient id="${id}" cx="${paint.cx}" cy="${paint.cy}" r="${paint.r}">${stops}</radialGradient>`;
}
const paintRef = (id: string, paint: Paint) => (typeof paint === 'string' ? paint : `url(#${id})`);

/** A rectangle whose corners follow a superellipse, the continuous curve of app icon corners. */
function squirclePath(w: number, h: number): string {
  const r = Math.min(w, h) * 0.34;
  const k = 4.6; // superellipse exponent
  const steps = 10;
  const pts: string[] = [];
  const corner = (cx: number, cy: number, sx: number, sy: number, from: number) => {
    for (let i = 0; i <= steps; i++) {
      const th = ((from + (i / steps) * 90) * Math.PI) / 180;
      const c = Math.cos(th), s = Math.sin(th);
      const x = cx + sx * r * Math.sign(c) * Math.abs(c) ** (2 / k);
      const y = cy + sy * r * Math.sign(s) * Math.abs(s) ** (2 / k);
      pts.push(`${f(x)} ${f(y)}`);
    }
  };
  corner(w - r, r, 1, -1, 0); // top right, going counterclockwise in math terms = clockwise on screen
  corner(r, r, 1, -1, 90);
  corner(r, h - r, 1, -1, 180);
  corner(w - r, h - r, 1, -1, 270);
  return `M${pts.join('L')}Z`;
}

function containerShape(spec: MarkSpec, w: number, h: number, attrs: string): string {
  switch (spec.container) {
    case 'none':
      return '';
    case 'squircle':
      return `<path d="${squirclePath(w, h)}" ${attrs}/>`;
    case 'circle':
      return `<rect width="${w}" height="${h}" rx="${h / 2}" ${attrs}/>`;
    default:
      return `<rect width="${w}" height="${h}" rx="6.2" ${attrs}/>`;
  }
}

function dotShape(shape: DotShape, size: number, fill: string, stroke: boolean): string {
  const half = size / 2;
  const sw = size * 0.2;
  if (shape === 'ring' || shape === 'round') {
    const ring = shape === 'ring' || stroke;
    return ring
      ? `<circle r="${f(half - sw / 2)}" fill="none" stroke="${fill}" stroke-width="${f(sw)}"/>`
      : `<circle r="${f(half)}" fill="${fill}"/>`;
  }
  const rx = shape === 'soft' ? size * 0.32 : size * 0.12;
  return stroke
    ? `<rect x="${f(-half + sw / 2)}" y="${f(-half + sw / 2)}" width="${f(size - sw)}" height="${f(size - sw)}" rx="${f(rx)}" fill="none" stroke="${fill}" stroke-width="${f(sw)}"/>`
    : `<rect x="${f(-half)}" y="${f(-half)}" width="${f(size)}" height="${f(size)}" rx="${f(rx)}" fill="${fill}"/>`;
}

export type RenderOptions = {
  /** Unique per mark on the page, for gradient and filter ids. */
  id: string;
  /** Rendered width in pixels; height follows the mark's proportions. Omit to fill the parent. */
  width?: number;
  title?: string;
};

export function renderMark(spec: MarkSpec, frame: Frame, { id, width, title }: RenderOptions): string {
  const { finish } = spec;
  const g = geometry(spec);
  const { width: w, height: h, scale } = g;
  const cells = cellsOf(spec.text);
  const size = PIXEL * scale;
  const boxed = spec.container !== 'none';
  const defs: string[] = [paintDef(`${id}-bg`, finish.background), paintDef(`${id}-dot`, finish.dot)];
  const layers: string[] = [];

  if (boxed) {
    defs.push(`<clipPath id="${id}-clip">${containerShape(spec, w, h, '')}</clipPath>`);
    layers.push(containerShape(spec, w, h, `fill="${paintRef(`${id}-bg`, finish.background)}"`));
  }

  // Surface effects, clipped to the container.
  if (boxed && (finish.effect === 'grain' || finish.effect === 'riso')) {
    defs.push(
      `<filter id="${id}-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="2" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 0.95"/></filter>`,
    );
    layers.push(`<rect width="${w}" height="${h}" filter="url(#${id}-grain)" opacity="${finish.effect === 'riso' ? 0.16 : 0.36}" clip-path="url(#${id}-clip)" style="mix-blend-mode:multiply"/>`);
  }
  if (boxed && finish.effect === 'grid') {
    defs.push(
      `<pattern id="${id}-grid" width="3.5" height="3.5" patternUnits="userSpaceOnUse"><path d="M3.5 0V3.5M0 3.5H3.5" fill="none" stroke="#fff" stroke-opacity="0.16" stroke-width="0.12"/></pattern>`,
    );
    layers.push(`<rect width="${w}" height="${h}" fill="url(#${id}-grid)" clip-path="url(#${id}-clip)"/>`);
  }

  // Ghost dots: the unraised positions of each cell, at rest.
  if (spec.ghost) {
    const ghosts = cells
      .flatMap((_, c) => ALL_DOTS.map(d => {
        const [x, y] = g.center(c, d);
        return `<g transform="translate(${f(x)} ${f(y)})">${dotShape(spec.dot, size, finish.ghost, !!finish.stroke)}</g>`;
      }))
      .join('');
    layers.push(`<g>${ghosts}</g>`);
  }

  // Raised dots.
  const dots = (fill: string, ox = 0, oy = 0) =>
    cells
      .flatMap((_, c) =>
        ALL_DOTS.map((d, i) => {
          const s = frame[c]?.[i];
          if (!s || s.on < 0.01) return '';
          const [x, y] = g.center(c, d);
          const opacity = Math.min(1, s.on * 1.8);
          return `<g transform="translate(${f(x + (s.dx + ox) * scale)} ${f(y + (s.dy + oy) * scale)}) scale(${f(s.on)})"${opacity < 1 ? ` opacity="${f(opacity)}"` : ''}>${dotShape(spec.dot, size, fill, !!finish.stroke)}</g>`;
        }),
      )
      .join('');

  const dotFill = paintRef(`${id}-dot`, finish.dot);
  if (finish.effect === 'riso') {
    // Two inks printed slightly out of register, the way a risograph lays down a second drum.
    layers.push(`<g style="mix-blend-mode:multiply" opacity="0.85">${dots(finish.effectColor ?? '#ff48b0', -0.85, -0.55)}</g>`);
    layers.push(`<g style="mix-blend-mode:multiply" opacity="0.82">${dots(dotFill, 0.45, 0.3)}</g>`);
  } else if (finish.effect === 'glow') {
    defs.push(
      `<filter id="${id}-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="${f(1.5 * scale)}" result="wide"/><feGaussianBlur in="SourceGraphic" stdDeviation="${f(0.45 * scale)}" result="tight"/><feMerge><feMergeNode in="wide"/><feMergeNode in="wide"/><feMergeNode in="tight"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`,
    );
    layers.push(`<g filter="url(#${id}-glow)">${dots(dotFill)}</g>`);
  } else if (finish.effect === 'emboss') {
    defs.push(
      `<filter id="${id}-emboss" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur in="SourceAlpha" stdDeviation="${f(0.42 * scale)}" result="b"/><feOffset in="b" dx="${f(0.42 * scale)}" dy="${f(0.62 * scale)}" result="o1"/><feFlood flood-color="#4a3420" flood-opacity="0.34"/><feComposite in2="o1" operator="in" result="shade"/><feOffset in="b" dx="${f(-0.32 * scale)}" dy="${f(-0.38 * scale)}" result="o2"/><feFlood flood-color="#ffffff" flood-opacity="0.95"/><feComposite in2="o2" operator="in" result="light"/><feMerge><feMergeNode in="shade"/><feMergeNode in="light"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`,
    );
    layers.push(`<g filter="url(#${id}-emboss)">${dots(dotFill)}</g>`);
  } else {
    layers.push(`<g>${dots(dotFill)}</g>`);
  }

  if (boxed && finish.effect === 'gloss') {
    defs.push(`<linearGradient id="${id}-gloss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.34"/><stop offset="0.48" stop-color="#fff" stop-opacity="0.06"/><stop offset="0.5" stop-color="#fff" stop-opacity="0"/></linearGradient>`);
    layers.push(`<rect width="${w}" height="${h}" fill="url(#${id}-gloss)" clip-path="url(#${id}-clip)"/>`);
  }

  if (boxed && finish.outline) {
    const inset = 0.3;
    const outline = { ...spec };
    const shape = containerShape(outline, w - inset * 2, h - inset * 2, `fill="none" stroke="${finish.outline}" stroke-width="${inset * 2}" transform="translate(${inset} ${inset})"`);
    layers.push(shape);
  }

  const size_ = width ? ` width="${f(width)}" height="${f((width * h) / w)}"` : ' width="100%" height="100%"';
  const label = title ? `<title>${title.replace(/[<&]/g, '')}</title>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"${size_} role="img"${title ? '' : ' aria-hidden="true"'}>${label}<defs>${defs.join('')}</defs>${layers.join('')}</svg>`;
}
