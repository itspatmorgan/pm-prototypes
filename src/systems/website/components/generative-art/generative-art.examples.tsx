import { GenerativePatternSurface } from './_GenerativePatternSurface';
import { LiveEditorialVisual } from './_LiveEditorialVisual';
import { UAMark } from './_UAMark';
export const ArticleHero = () => (
  <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-lg border border-border bg-card">
    <LiveEditorialVisual visual={{ background: 'warm-dark-gray', generator: { type: 'isoline', seed: 359, levels: 12, scale: 350, strokeWidth: 0.7, opacity: 75, color: 'copper' }, texture: 0, grain: 24 }} />
  </div>
);
export const AmbientSurface = () => (
  <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-lg bg-[#1a1816]">
    <GenerativePatternSurface name="example-flow" config={{ type: 'flow-field', seed: 256, density: 200, steps: 120, scale: 280, curl: 40, strokeWidth: 1.2, opacity: 78, color: 'copper' }} motion={{ mode: 'ambient', speed: 18, intensity: 22 }} duration={2400} className="absolute inset-0" />
  </div>
);
export const Mark = () => <div className="text-accent"><UAMark color="currentColor" height={32} /></div>;
