/** @studio-id w64qbzswk4qvj50n */
import { LabPage, LabSection } from '@/systems/website/components/lab-page';
import { Logo } from '@/systems/website/components/logo';
import { MarkStates, MarkVariants, NavSwitcherStates, ScaleStrip } from '../_components/pixel-mark/MarkStates';
import { Shell } from '../_components/Shell';

// Recreates itspatmorgan.com/lab/pixel-mark. Words come from the site's src/content/lab/pixel-mark.mdx.
export default function PixelMark() {
  return (
    <Shell current="lab">
    <LabPage
      title="Pixel Mark"
      description="The site logo mark — scale, variants, and interaction states."
      intro={
        <>
          <p>
            Originally, I wanted to use a blocky version of my first initial, P, but{' '}
            <a href="https://www.google.com/search?q=pandora+radio+logo">Pandora Radio</a> already has that territory pretty well covered.
          </p>
          <p>
            So I started looking for a mark that could still carry the initial while fitting the site’s emerging visual language: lightly pixelated,
            generative, and a little abstract. I landed on this four-pixel pattern, which maps to the braille letter P.
          </p>
          <p>
            It felt like the right bridge: personal without being literal, simple enough to work at small sizes, and flexible enough to animate,
            shift, or become part of more interactive moments over time.
          </p>
        </>
      }
    >
      <section>
        <div className="mx-auto max-w-3xl px-6 pb-16">
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-border bg-card" data-logo-cycle-trigger>
            <Logo trigger="container" className="h-24 w-24" />
          </div>
        </div>
      </section>
      <LabSection title="Scale"><ScaleStrip /></LabSection>
      <LabSection title="Variants"><MarkVariants /></LabSection>
      <LabSection title="Interaction states"><MarkStates /></LabSection>
      <LabSection title="Navigation switcher" description="The sidebar uses the mark as a compact control. Its hover state previews whether the rail will collapse or expand.">
        <NavSwitcherStates />
      </LabSection>
    </LabPage>
    </Shell>
  );
}
