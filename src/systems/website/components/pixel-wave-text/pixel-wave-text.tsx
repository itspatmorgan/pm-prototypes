import { forwardRef, type CSSProperties, type ElementType } from 'react';
import { animate } from 'motion';

// Text that dissolves between Geist Pixel and Geist Sans, ported from itspatmorgan.com's
// src/components/PixelWaveText.astro and src/scripts/pixel-wave.ts.
type PixelWaveTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  wave?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  /** Start in Geist Sans instead of Geist Pixel. */
  initialSans?: boolean;
};

const PixelWaveText = forwardRef<HTMLElement, PixelWaveTextProps>(function PixelWaveText(
  { text, as: Tag = 'span', className, wave, style, ariaLabel = text, initialSans = false },
  ref,
) {
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={className} aria-label={ariaLabel} data-pixel-wave={wave} style={style}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap" style={wi < words.length - 1 ? { marginRight: '0.25em' } : undefined}>
          {word.split('').map((char, ci) => (
            <span key={ci} className="relative inline-block" data-pw-char>
              <span className="invisible">{char}</span>
              <span className="absolute inset-0 font-pixel" style={initialSans ? { opacity: 0 } : undefined} data-pw-pixel>{char}</span>
              <span className="absolute inset-0" data-pw-sans style={{ opacity: initialSans ? 1 : 0 }}>{char}</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
});

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/** Reveal the original letters with the pixel-to-sans dissolve. */
function dissolvePixelWave(container: HTMLElement, lineIndex = 0) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  container.querySelectorAll<HTMLElement>('[data-pw-char]').forEach((character, i) => {
    const pixel = character.querySelector<HTMLElement>('[data-pw-pixel]');
    const sans = character.querySelector<HTMLElement>('[data-pw-sans]');
    if (!pixel || !sans) return;
    pixel.style.opacity = reducedMotion ? '0' : '1';
    sans.style.opacity = reducedMotion ? '1' : '0';
    if (reducedMotion) return;
    const delay = 0.15 + lineIndex * 0.2 + i * 0.025;
    animate(pixel, { opacity: [1, 0] }, { duration: 0.35, delay });
    animate(sans, { opacity: [0, 1] }, { duration: 0.35, delay });
  });
  if (!reducedMotion) {
    setTimeout(() => { if (container.isConnected) enablePixelHover(container); }, 1500);
  }
}

/** Split-flap entrance: each character cycles through three pixel glyphs, then settles in sans. Returns a cancel function. */
function pixelWave(container: HTMLElement, delay: number) {
  const timers: ReturnType<typeof setTimeout>[] = [];
  const intervals: ReturnType<typeof setInterval>[] = [];
  container.querySelectorAll<HTMLElement>('[data-pw-char]').forEach((wrapper, i) => {
    const pixel = wrapper.querySelector<HTMLElement>('[data-pw-pixel]');
    const sans = wrapper.querySelector<HTMLElement>('[data-pw-sans]');
    if (!pixel || !sans) return;
    const originalChar = sans.textContent || '';
    if (originalChar.trim() === '') return;
    let flips = 0;
    timers.push(setTimeout(() => {
      const interval = setInterval(() => {
        pixel.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        flips++;
        if (flips >= 3) {
          clearInterval(interval);
          pixel.textContent = originalChar;
          animate(pixel, { opacity: [1, 0] }, { duration: 0.3 });
          animate(sans, { opacity: [0, 1] }, { duration: 0.3 });
        }
      }, 80);
      intervals.push(interval);
    }, delay + i * 80));
  });
  return () => { timers.forEach(clearTimeout); intervals.forEach(clearInterval); };
}

/** Characters near the cursor flip back to pixel type. Returns a cleanup function. */
function enablePixelHover(container: HTMLElement) {
  if (container.dataset.pixelHoverReady === 'true') return () => {};
  container.dataset.pixelHoverReady = 'true';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const layers = Array.from(container.querySelectorAll<HTMLElement>('[data-pw-char]')).map(wrapper => {
    const pixel = wrapper.querySelector<HTMLElement>('[data-pw-pixel]')!;
    const sans = wrapper.querySelector<HTMLElement>('[data-pw-sans]')!;
    pixel.style.transition = 'opacity 0.25s ease-out';
    sans.style.transition = 'opacity 0.25s ease-out';
    return { wrapper, pixel, sans };
  });
  const RADIUS = 120;
  const handleMove = (e: MouseEvent) => {
    if (reduced.matches) return;
    for (const { wrapper, pixel, sans } of layers) {
      const rect = wrapper.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
      const intensity = dist < RADIUS ? 1 - dist / RADIUS : 0;
      pixel.style.opacity = String(intensity);
      sans.style.opacity = String(1 - intensity);
    }
  };
  const handleLeave = () => {
    for (const { pixel, sans } of layers) {
      pixel.style.opacity = '0';
      sans.style.opacity = '1';
    }
  };
  reduced.addEventListener('change', handleLeave);
  container.addEventListener('mousemove', handleMove);
  container.addEventListener('mouseleave', handleLeave);
  return () => {
    reduced.removeEventListener('change', handleLeave);
    container.removeEventListener('mousemove', handleMove);
    container.removeEventListener('mouseleave', handleLeave);
    delete container.dataset.pixelHoverReady;
  };
}

export { PixelWaveText, dissolvePixelWave, pixelWave, enablePixelHover, type PixelWaveTextProps };
