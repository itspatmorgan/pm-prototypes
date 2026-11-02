/** @studio-id hdhbyagx12g00gsw */
import { PageHeader } from '@/systems/website/components/site-shell';
import { PrintPhoto } from '@/systems/website/components/print-photo';
import { KindWords } from '@/systems/website/components/kind-words';
import { Shell } from './_components/Shell';
import { commendations, communityPhotos, communityStory } from './_data/community';

// Recreates itspatmorgan.com/community (src/pages/community.astro), reading template.
const tilts = ['rotate-[-2deg]', 'rotate-[2deg]', 'rotate-[-1deg]', 'rotate-[1deg]'];

export default function Community() {
  return (
    <Shell current="community">
      <PageHeader title="Community" lead="Showing up for creative people through writing, events, and community." />

      {/* Photos break out of the reading column to the same width as the About page's. */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {communityPhotos.map((photo, i) => (
            <PrintPhoto key={photo.alt} src={photo.src} alt={photo.alt} position={photo.position} tilt={tilts[i]} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <p className="text-xl leading-snug font-semibold tracking-tight">{communityStory.heading}</p>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
          {communityStory.paragraphs.slice(0, 2).map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="mb-10">
          <h2 className="mb-3 text-xl leading-snug font-semibold tracking-tight">Kind words from the community.</h2>
          <p className="text-base leading-relaxed text-muted-foreground">A few notes from readers, event guests, and people in the design community.</p>
        </div>
        <div className="columns-1 gap-4 sm:columns-2">
          {commendations.map(c => (
            <KindWords key={c.name} {...c} />
          ))}
        </div>
      </section>
    </Shell>
  );
}
