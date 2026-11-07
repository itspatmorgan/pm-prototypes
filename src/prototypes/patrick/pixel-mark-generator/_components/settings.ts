// The generator's saved settings. Other views write here to open a mark in the generator.
import type { Container, Depth, DotShape } from './finishes';
import type { MotionId } from './motion';
import type { Layout } from './render';
import type { Backdrop, Format } from './share';

export type Settings = {
  text: string;
  finish: string;
  dot: DotShape;
  container: Container;
  depth: Depth;
  ghost: boolean;
  layout: Layout;
  motion: MotionId;
  format: Format;
  backdrop: Backdrop;
  caption: boolean;
};

export const DEFAULTS: Settings = {
  text: 'p',
  finish: 'ink',
  dot: 'pixel',
  container: 'rounded',
  depth: 'flat',
  ghost: false,
  layout: 'lockup',
  motion: 'fold',
  format: 'square',
  backdrop: 'match',
  caption: true,
};

export const STORAGE_KEY = 'pixel-mark-generator:settings';

export function loadSettings(): Settings {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    return saved ? { ...DEFAULTS, ...saved } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function saveSettings(settings: Partial<Settings>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...loadSettings(), ...settings }));
  } catch {
    // Storage can be unavailable; the generator then opens with its defaults.
  }
}
