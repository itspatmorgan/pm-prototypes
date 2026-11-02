import { useEffect, useRef } from 'react';
import { SiteLink } from '../site-shell';
import { Logo } from '../logo';
import { PixelWaveText, pixelWave, resetPixelWave, resolvePixelWave } from '../pixel-wave-text';
import { GenerativePatternSurface } from '../generative-art';
import { useDark } from '../theme-hooks';

// A Lab experiment card with a live preview, ported from itspatmorgan.com's src/components/lab/LabCard.astro,
// LabPreview.astro, and src/scripts/lab-previews.ts.

const flowField = { type: 'flow-field', seed: 256, density: 200, steps: 120, scale: 280, curl: 40, strokeWidth: 1.2 } as const;
const patternEngineDark = { ...flowField, opacity: 78, color: 'copper' } as const;
const patternEngineLight = { ...flowField, opacity: 52, color: 'bronze' } as const;
const patternEngineMotion = { mode: 'ambient', speed: 18, intensity: 22 } as const;

function PatternEnginePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const dark = useDark(ref);
  const config = dark ? patternEngineDark : patternEngineLight;
  return (
    <div ref={ref} className={`absolute inset-0 ${dark ? 'bg-[#1a1816]' : 'bg-[#f5f1ec]'}`}>
      <GenerativePatternSurface name={`lab-pattern-engine-${dark ? 'dark' : 'light'}`} config={config} lightConfig={config} motion={patternEngineMotion} duration={2400} className={`absolute inset-0 ${dark ? 'opacity-90' : ''}`} />
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${dark ? 'from-[#1a1816]/70' : 'from-[#f5f1ec]/60'}`} />
      <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-foreground/45">
        <span>Flow field</span>
        <span className="text-foreground/25">seed 256</span>
        <span className="text-foreground/25">curl 40°</span>
        <span className="text-foreground/25">ambient</span>
      </div>
    </div>
  );
}

function PixelWavePreview() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = ref.current;
    const card = container?.closest('a');
    if (!container || !card) return;
    resolvePixelWave(container);
    let animating = false;
    let cancel = () => {};
    const replay = () => {
      if (animating) return;
      animating = true;
      resetPixelWave(container);
      cancel = pixelWave(container, 0);
      const chars = container.querySelectorAll('[data-pw-char]').length;
      window.setTimeout(() => (animating = false), chars * 80 + 700);
    };
    card.addEventListener('pointerenter', replay);
    return () => {
      card.removeEventListener('pointerenter', replay);
      cancel();
    };
  }, []);
  return (
    <div className="flex h-full items-center justify-center bg-background px-6 text-center">
      <PixelWaveText ref={ref} text="Pixel Wave Animation" as="p" className="max-w-md text-3xl leading-tight font-medium tracking-tight sm:text-4xl" />
      <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

function LabPreview({ preview, title }: { preview: string; title: string }) {
  return (
    <div className="texture-bg relative aspect-[1200/630] overflow-hidden bg-card">
      {preview === 'pattern-engine' ? (
        <PatternEnginePreview />
      ) : preview === 'pixel-wave' ? (
        <PixelWavePreview />
      ) : preview === 'pixel-mark' ? (
        <div className="flex h-full items-center justify-center bg-background">
          <Logo trigger="container" className="h-[72px] w-[72px]" />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center px-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
        </div>
      )}
    </div>
  );
}

type LabCardProps = { title: string; description: string; href: string; preview: string; headingLevel?: 'h2' | 'h3' };

function LabCard({ title, description, href, preview, headingLevel: Heading = 'h2' }: LabCardProps) {
  return (
    <SiteLink href={href} className="group block">
      <article
        data-logo-cycle-trigger
        className="h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:shadow-black/5 dark:group-hover:shadow-black/20"
      >
        <LabPreview preview={preview} title={title} />
        <div className="p-4">
          <Heading className="mb-2 text-base font-semibold tracking-tight">{title}</Heading>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </article>
    </SiteLink>
  );
}

export { LabCard, LabPreview, type LabCardProps };
