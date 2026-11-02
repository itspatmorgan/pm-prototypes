/** @studio-id h5rcnczvz946868v */
import { useCallback, useEffect, useRef, useState } from 'react';
import { LabPage } from '@/systems/website/components/lab-page';
import { PixelWaveText, enablePixelHover, pixelWave, resetPixelWave } from '@/systems/website/components/pixel-wave-text';
import { Shell } from '../_components/Shell';

// Recreates itspatmorgan.com/lab/pixel-wave. Words come from the site's src/content/lab/pixel-wave.mdx.
export default function PixelWave() {
  const textRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const cleanup = useRef<() => void>(() => {});

  const play = useCallback((delay: number) => {
    const container = textRef.current;
    if (!container) return;
    cleanup.current();
    setPlaying(true);
    resetPixelWave(container);
    const cancelWave = pixelWave(container, delay);
    let disableHover = () => {};
    const done = window.setTimeout(() => {
      disableHover = enablePixelHover(container);
      setPlaying(false);
    }, delay + 5000);
    cleanup.current = () => {
      cancelWave();
      window.clearTimeout(done);
      disableHover();
    };
  }, []);

  useEffect(() => {
    play(250);
    return () => cleanup.current();
  }, [play]);

  return (
    <Shell current="lab">
    <LabPage title="Pixel Wave" description="A split-flap text animation built from Geist Pixel and Geist Sans.">
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="grid gap-8">
          <div className="texture-bg relative flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
            <PixelWaveText
              ref={textRef}
              text="A tactile text reveal for crafted interfaces."
              as="p"
              wave="demo"
              className="max-w-3xl text-4xl leading-tight font-medium tracking-tight sm:text-6xl"
            />
            <button
              type="button"
              aria-label="Play"
              disabled={playing}
              onClick={() => play(0)}
              className="absolute right-3 bottom-3 flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:opacity-40"
            >
              <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden>
                <path d="M0 0l8 5-8 5V0z" />
              </svg>
            </button>
          </div>
          <div className="site-prose mb-6">
            <p>
              Pixel Wave explores text interactions built from Geist Pixel and Geist Sans. In this demo, each character starts in a pixel typeface,
              cycles through a few glyphs, then settles into Geist Sans.
            </p>
            <p>The effect is intentionally small: a tactile moment that gives the interface a little craft without turning the page into an animation showcase.</p>
            <p>
              On the home page, the headline and closing tagline appear immediately in Geist Sans. Hovering brings the nearby characters back into their
              pixel form, keeping the effect interactive without replaying an introduction as you navigate.
            </p>
          </div>
        </div>
      </section>
    </LabPage>
    </Shell>
  );
}
