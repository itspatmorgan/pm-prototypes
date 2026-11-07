// Finishes: how a mark is painted. Each one is a full look, like an app icon's art direction.
// Colors are fixed hex values, not theme tokens, so an exported asset looks the same in every theme.
// Plain finishes come from itspatmorgan.com's palette (warm ink, cream paper, gold accent).

export type Stop = [offset: number, color: string];
export type Paint = string | { kind: 'linear'; angle: number; stops: Stop[] } | { kind: 'radial'; cx: number; cy: number; r: number; stops: Stop[] };

export type Effect = 'none' | 'grain' | 'glow' | 'emboss' | 'grid' | 'riso' | 'gloss';

export type Finish = {
  id: string;
  name: string;
  group: 'plain' | 'bold';
  /** Container fill. */
  background: Paint;
  /** Raised dot fill. */
  dot: Paint;
  /** Color of the unraised dots when ghost dots are on. */
  ghost: string;
  /** A hairline around the container, for light finishes on light stages. */
  outline?: string;
  effect: Effect;
  /** Second ink for the riso overprint, or the glow color. */
  effectColor?: string;
  /** Draw dots as outlines instead of fills. */
  stroke?: boolean;
  /** The share card's backdrop when it matches the finish. */
  stage: string;
  /** Caption color on that backdrop. */
  stageInk: string;
};

// Site palette (itspatmorgan.com theme tokens, converted from OKLCH).
export const SITE = {
  ink: '#0e0a07',
  cream: '#faf8f5',
  card: '#f3f1ee',
  secondary: '#edebe7',
  secondaryInk: '#25211d',
  muted: '#68625e',
  gold: '#c99b5a',
  border: '#e1ddd8',
  night: '#15110d',
  nightInk: '#e8e4dd',
};

export const FINISHES: Finish[] = [
  {
    id: 'ink',
    name: 'Ink',
    group: 'plain',
    background: SITE.ink,
    dot: SITE.cream,
    ghost: 'rgba(250, 248, 245, 0.14)',
    effect: 'none',
    stage: SITE.card,
    stageInk: SITE.ink,
  },
  {
    id: 'paper',
    name: 'Paper',
    group: 'plain',
    background: SITE.cream,
    dot: SITE.ink,
    ghost: 'rgba(14, 10, 7, 0.08)',
    outline: SITE.border,
    effect: 'none',
    stage: SITE.secondary,
    stageInk: SITE.ink,
  },
  {
    id: 'soft',
    name: 'Soft',
    group: 'plain',
    background: SITE.secondary,
    dot: SITE.secondaryInk,
    ghost: 'rgba(37, 33, 29, 0.09)',
    effect: 'none',
    stage: SITE.cream,
    stageInk: SITE.ink,
  },
  {
    id: 'gold',
    name: 'Gold',
    group: 'plain',
    background: SITE.gold,
    dot: SITE.ink,
    ghost: 'rgba(14, 10, 7, 0.12)',
    effect: 'none',
    stage: '#efe4d3',
    stageInk: SITE.ink,
  },
  {
    id: 'night',
    name: 'Night',
    group: 'plain',
    background: SITE.night,
    dot: SITE.gold,
    ghost: 'rgba(201, 155, 90, 0.16)',
    effect: 'none',
    stage: SITE.ink,
    stageInk: SITE.nightInk,
  },
  {
    id: 'tactile',
    name: 'Tactile',
    group: 'bold',
    background: { kind: 'linear', angle: 160, stops: [[0, '#f8f4ed'], [1, '#e9e2d6']] },
    dot: { kind: 'radial', cx: 0.35, cy: 0.3, r: 0.9, stops: [[0, '#fffdf9'], [1, '#e7dfd2']] },
    ghost: 'rgba(120, 96, 70, 0.10)',
    effect: 'emboss',
    stage: '#e4ddd1',
    stageInk: '#3a3027',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    group: 'bold',
    background: { kind: 'linear', angle: 135, stops: [[0, '#ffc15e'], [0.55, '#ff7b54'], [1, '#e8436e']] },
    dot: '#fffaf2',
    ghost: 'rgba(255, 250, 242, 0.22)',
    effect: 'gloss',
    stage: '#2a1410',
    stageInk: '#ffe9d6',
  },
  {
    id: 'neon',
    name: 'Neon',
    group: 'bold',
    background: { kind: 'radial', cx: 0.5, cy: 0.35, r: 0.85, stops: [[0, '#1b1f16'], [1, '#07080a']] },
    dot: '#c6ff4d',
    ghost: 'rgba(198, 255, 77, 0.10)',
    effect: 'glow',
    effectColor: '#a6ff1a',
    stage: '#050607',
    stageInk: '#c6ff4d',
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    group: 'bold',
    background: { kind: 'linear', angle: 180, stops: [[0, '#2a5fe0'], [1, '#1d47b8']] },
    dot: '#ffffff',
    ghost: 'rgba(255, 255, 255, 0.28)',
    effect: 'grid',
    stroke: true,
    stage: '#e9eef9',
    stageInk: '#1d47b8',
  },
  {
    id: 'riso',
    name: 'Riso',
    group: 'bold',
    background: '#f4ecdd',
    dot: '#0078bf',
    ghost: 'rgba(0, 120, 191, 0.10)',
    effect: 'riso',
    effectColor: '#ff48b0',
    stage: '#f4ecdd',
    stageInk: '#0078bf',
  },
  {
    id: 'glass',
    name: 'Glass',
    group: 'bold',
    background: { kind: 'radial', cx: 0.3, cy: 0.2, r: 1.1, stops: [[0, '#b9f0ff'], [0.5, '#6f9dff'], [1, '#6b4dff']] },
    dot: 'rgba(255, 255, 255, 0.92)',
    ghost: 'rgba(255, 255, 255, 0.18)',
    effect: 'gloss',
    stage: '#0f1230',
    stageInk: '#cfe0ff',
  },
  {
    id: 'swiss',
    name: 'Swiss',
    group: 'bold',
    background: '#e2392b',
    dot: '#fbf6ee',
    ghost: 'rgba(251, 246, 238, 0.18)',
    effect: 'none',
    stage: '#fbf6ee',
    stageInk: '#e2392b',
  },
  {
    id: 'sand',
    name: 'Sand',
    group: 'bold',
    background: { kind: 'linear', angle: 150, stops: [[0, '#d9b47c'], [1, '#b8844a']] },
    dot: '#1c130c',
    ghost: 'rgba(28, 19, 12, 0.12)',
    effect: 'grain',
    stage: '#2a1d12',
    stageInk: '#ecd6b4',
  },
];

export const finishById = (id: string): Finish => FINISHES.find(f => f.id === id) ?? FINISHES[0];

export type DotShape = 'pixel' | 'soft' | 'round' | 'ring';
export const DOT_SHAPES: { id: DotShape; name: string }[] = [
  { id: 'pixel', name: 'Pixel' },
  { id: 'soft', name: 'Soft' },
  { id: 'round', name: 'Round' },
  { id: 'ring', name: 'Ring' },
];

export type Container = 'rounded' | 'squircle' | 'circle' | 'none';
export const CONTAINERS: { id: Container; name: string }[] = [
  { id: 'rounded', name: 'Rounded' },
  { id: 'squircle', name: 'Squircle' },
  { id: 'circle', name: 'Circle' },
  { id: 'none', name: 'None' },
];

/** First color of a paint, for swatches and fallbacks. */
export function paintColor(paint: Paint): string {
  return typeof paint === 'string' ? paint : paint.stops[0][1];
}
