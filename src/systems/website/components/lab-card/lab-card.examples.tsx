import { LabCard } from './lab-card';
export const Grid = () => (
  <div className="grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3">
    <LabCard title="Pattern Engine" description="A deterministic pattern generator for writing, publishing, and site visuals." href="/lab/pattern-engine" preview="pattern-engine" headingLevel="h3" />
    <LabCard title="Pixel Wave" description="A split-flap text animation built from Geist Pixel and Geist Sans." href="/lab/pixel-wave" preview="pixel-wave" headingLevel="h3" />
    <LabCard title="Pixel Mark" description="The site logo mark — scale, variants, and interaction states." href="/lab/pixel-mark" preview="pixel-mark" headingLevel="h3" />
  </div>
);
