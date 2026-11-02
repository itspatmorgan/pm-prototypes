/** @studio-id 9ybp1tbz8ywz1apa */
import { PageHeader } from '@/systems/website/components/site-shell';
import { LabCard } from '@/systems/website/components/lab-card';
import { Shell } from './_components/Shell';
import { labPageOrder } from './_data/lab';

// Recreates itspatmorgan.com/lab (src/pages/lab/index.astro), reading template. Each card opens its Lab prototype.
export default function Lab() {
  return (
    <Shell current="lab">
      <PageHeader title="Lab" lead="A gallery of tools, experiments, and interactions I've built." />
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {labPageOrder.map(entry => (
            <LabCard key={entry.slug} title={entry.title} description={entry.description} href={`/lab/${entry.slug}`} preview={entry.preview} />
          ))}
        </div>
      </section>
    </Shell>
  );
}
