// Share cards and downloads: a still PNG, an SVG of the mark, and a looping video.
// Everything is drawn on a canvas from the same SVG the page shows.
import { cellFor } from './braille';
import { SITE, type Finish } from './finishes';
import { frameAt, motionById, type MotionId } from './motion';
import { cellsOf, markBox, renderMark, type MarkSpec } from './render';

export type Format = 'icon' | 'square' | 'wide' | 'story';
export const FORMATS: { id: Format; name: string; size: string }[] = [
  { id: 'square', name: 'Post', size: '1080 × 1080' },
  { id: 'wide', name: 'Wide', size: '1600 × 900' },
  { id: 'story', name: 'Story', size: '1080 × 1920' },
  { id: 'icon', name: 'Icon', size: '1024' },
];

export type Backdrop = 'match' | 'paper' | 'ink';
export const BACKDROPS: { id: Backdrop; name: string }[] = [
  { id: 'match', name: 'Match' },
  { id: 'paper', name: 'Paper' },
  { id: 'ink', name: 'Ink' },
];

export type CardSpec = { format: Format; backdrop: Backdrop; caption: boolean };

export function stageColors(finish: Finish, backdrop: Backdrop) {
  if (backdrop === 'paper') return { stage: SITE.card, ink: SITE.ink };
  if (backdrop === 'ink') return { stage: SITE.ink, ink: SITE.nightInk };
  return { stage: finish.stage, ink: finish.stageInk };
}

/** Pixel size of a card, and where the mark sits on it. Shared by the preview and the canvas. */
export function cardLayout(mark: MarkSpec, card: CardSpec) {
  const box = markBox(mark);
  const aspect = box.width / box.height;
  if (card.format === 'icon') {
    const height = 1024;
    return { width: Math.round(height * aspect), height, markWidth: Math.round(height * aspect), markX: 0, markY: 0, unit: height / 1080 };
  }
  const [width, height] = card.format === 'wide' ? [1600, 900] : card.format === 'story' ? [1080, 1920] : [1080, 1080];
  const short = Math.min(width, height);
  // Type scales with the narrower side, but a wide card keeps the square card's type size.
  const unit = Math.min(width, height * 1.2, 1080) / 1080;
  const markHeight = Math.min(short * 0.38, (width * 0.72) / aspect);
  const markWidth = markHeight * aspect;
  const lift = card.caption ? short * 0.02 : 0;
  return { width, height, markWidth, markX: (width - markWidth) / 2, markY: (height - markHeight) / 2 - lift, unit };
}

/** The words under the mark: the letters, then which dots are raised. */
export function captionLines(text: string): [string, string] {
  const letters = text.toUpperCase();
  if ([...text].length === 1) {
    const dots = cellFor(text) ?? [];
    return [letters, dots.length ? `Braille · dots ${dots.join(' ')}` : 'Braille'];
  }
  return [letters, `Braille · ${[...text].length} cells`];
}

export const SITE_CREDIT = 'itspatmorgan.com';

// ─── Canvas ──────────────────────────────────────────────────────────────────

async function loadSvg(svg: string): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally {
    // Decoded images keep their pixels after the URL is released.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

async function fontsReady() {
  await Promise.all([
    document.fonts.load('500 40px "Geist Variable"'),
    document.fonts.load('400 26px "Geist Mono Variable"'),
  ]).catch(() => undefined);
}

function drawCard(ctx: CanvasRenderingContext2D, mark: MarkSpec, card: CardSpec, art: HTMLImageElement, scale: number, transparent: boolean) {
  const L = cardLayout(mark, card);
  const box = markBox(mark);
  ctx.save();
  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, L.width, L.height);
  if (card.format !== 'icon' && !transparent) {
    ctx.fillStyle = stageColors(mark.finish, card.backdrop).stage;
    ctx.fillRect(0, 0, L.width, L.height);
  }
  ctx.drawImage(art, L.markX, L.markY, L.markWidth, (L.markWidth * box.height) / box.width);
  if (card.caption && card.format !== 'icon') {
    const { ink } = stageColors(mark.finish, card.backdrop);
    const u = L.unit;
    const m = 64 * u;
    const [title, detail] = captionLines(mark.text);
    ctx.fillStyle = ink;
    ctx.textBaseline = 'alphabetic';
    ctx.font = `500 ${44 * u}px "Geist Variable", system-ui, sans-serif`;
    ctx.fillText(title, m, L.height - m - 40 * u);
    ctx.globalAlpha = 0.62;
    ctx.font = `400 ${24 * u}px "Geist Mono Variable", ui-monospace, monospace`;
    ctx.fillText(detail, m, L.height - m);
    ctx.textAlign = 'right';
    ctx.fillText(SITE_CREDIT, L.width - m, L.height - m);
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
  }
  ctx.restore();
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function fileName(mark: MarkSpec, card: CardSpec, motion: MotionId, ext: string) {
  const text = [...mark.text].map(ch => (/[a-z0-9]/i.test(ch) ? ch.toLowerCase() : '')).join('') || 'mark';
  const parts = ['pixel-mark', text, mark.finish.id, card.format];
  if (ext !== 'png' && ext !== 'svg' && motion !== 'still') parts.push(motion);
  return `${parts.join('-')}.${ext}`;
}

export async function downloadPng(mark: MarkSpec, card: CardSpec, motion: MotionId) {
  await fontsReady();
  const L = cardLayout(mark, card);
  const scale = card.format === 'icon' ? 1 : 2;
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(L.width * scale);
  canvas.height = Math.round(L.height * scale);
  const art = await loadSvg(renderMark(mark, frameAt('still', cellsOf(mark.text), 0), { id: 'x', width: L.markWidth * scale }));
  drawCard(canvas.getContext('2d')!, mark, card, art, scale, false);
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));
  if (blob) download(blob, fileName(mark, card, motion, 'png'));
}

export function svgOf(mark: MarkSpec) {
  return renderMark(mark, frameAt('still', cellsOf(mark.text), 0), { id: 'pm', width: 1024, title: `Braille ${mark.text.toUpperCase()}` });
}

export function downloadSvg(mark: MarkSpec, card: CardSpec) {
  download(new Blob([svgOf(mark)], { type: 'image/svg+xml' }), fileName(mark, card, 'still', 'svg'));
}

/** The best video type this browser can record: MP4 where it can, WebM otherwise. */
export function videoType(): { mime: string; ext: string } | null {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const mime of ['video/mp4;codecs=avc1.42E01E', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm']) {
    if (MediaRecorder.isTypeSupported(mime)) return { mime, ext: mime.startsWith('video/mp4') ? 'mp4' : 'webm' };
  }
  return null;
}

/** Records the motion as a video of at least four seconds, a whole number of loops long. */
export async function recordVideo(mark: MarkSpec, card: CardSpec, motion: MotionId, onProgress: (p: number) => void) {
  const type = videoType();
  if (!type) throw new Error('This browser can’t record video.');
  await fontsReady();
  const L = cardLayout(mark, card);
  const canvas = document.createElement('canvas');
  canvas.width = L.width;
  canvas.height = L.height;
  const ctx = canvas.getContext('2d')!;
  const cells = cellsOf(mark.text);
  const { duration } = motionById(motion);
  const loops = motion === 'still' ? 1 : Math.max(1, Math.ceil(4000 / duration));
  const total = motion === 'still' ? 3000 : duration * loops;
  const fps = 30;
  const frames = Math.round((total / 1000) * fps);

  // Draw the first frame before recording starts, so the video never opens on a blank canvas.
  const first = await loadSvg(renderMark(mark, frameAt(motion, cells, 0), { id: 'v', width: L.markWidth }));
  drawCard(ctx, mark, card, first, 1, false);

  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType: type.mime, videoBitsPerSecond: 10_000_000 });
  const chunks: Blob[] = [];
  recorder.ondataavailable = e => e.data.size && chunks.push(e.data);
  const stopped = new Promise<void>(resolve => (recorder.onstop = () => resolve()));
  recorder.start();
  const start = performance.now();
  for (let i = 1; i <= frames; i++) {
    const t = (i / fps) * 1000;
    const art = await loadSvg(renderMark(mark, frameAt(motion, cells, t), { id: 'v', width: L.markWidth }));
    const wait = start + t - performance.now();
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
    drawCard(ctx, mark, card, art, 1, false);
    onProgress(i / frames);
  }
  recorder.stop();
  await stopped;
  stream.getTracks().forEach(track => track.stop());
  download(new Blob(chunks, { type: type.mime.split(';')[0] }), fileName(mark, card, motion, type.ext));
}
