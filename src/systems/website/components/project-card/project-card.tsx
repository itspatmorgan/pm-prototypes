import type { ReactNode } from 'react';
import { cn } from '#studio/runtime';
import { SiteLink } from '../site-shell';
import { Badge } from '../badge';
import SublimeCard from '@itspatmorgan/kit/sublime/SublimeCard';
import QueryCard from '@itspatmorgan/kit/query-builder/QueryCard';
import ExpansionCard from '@itspatmorgan/kit/expansion/ExpansionCard';
import StudioCard from '../design-studio/_StudioCard';

// A case study card, ported from itspatmorgan.com's src/components/ProjectCard.astro and ProjectDemo.astro.
// compact: the Work and Home grids, visual on top. full: a wide row with the visual beside the words.

type ProjectCardProps = {
  slug: string;
  title: string;
  description?: string;
  skills?: string[];
  /** A thumbnail, used when the case study has no live visual. */
  image?: string;
  variant?: 'compact' | 'full';
  /** Show the description under the title (Home's cards); Work's cards show the title alone. */
  showDescription?: boolean;
  index?: number;
};

const liveVisuals: Record<string, () => ReactNode> = {
  'sublime-agents': () => <SublimeCard />,
  'query-language': () => <QueryCard />,
  expansion: () => <ExpansionCard />,
  'design-studio': () => <StudioCard size="card" />,
};

/** The case study's opening demo, sized to a 16:9 card frame. Inert, so the card stays one link.
 *  `wide` draws Design Studio's larger composition for Home's full-width card, in normal flow. */
function ProjectVisual({ slug, wide = false }: { slug: string; wide?: boolean }) {
  if (wide && slug === 'design-studio')
    return (
      <div className="w-full" inert aria-hidden="true">
        <StudioCard />
      </div>
    );
  const visual = liveVisuals[slug];
  if (!visual) return null;
  return (
    <div className="absolute inset-0 overflow-hidden" inert aria-hidden="true">
      {visual()}
    </div>
  );
}

const hasLiveVisual = (slug: string) => slug in liveVisuals;

function ProjectCard({ slug, title, description, skills = [], image, variant = 'compact', showDescription = false, index = 0 }: ProjectCardProps) {
  const href = `/work/${slug}`;
  const live = hasLiveVisual(slug);

  if (variant === 'full') {
    return (
      <div className="group relative block" data-project-card>
        <SiteLink href={href} className="absolute inset-0 z-10 rounded-xl" aria-label={title} />
        <article className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/5 dark:group-hover:shadow-black/20">
          <div className={cn('flex flex-col', index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row')}>
            <div className="texture-bg relative aspect-video overflow-hidden md:w-[40%]">
              {live ? <ProjectVisual slug={slug} /> : image && <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />}
            </div>
            <div className="flex flex-1 flex-col justify-center p-6">
              <h3 className="mb-3 text-lg font-semibold tracking-tight">{title}</h3>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-[11px]">
                    {skill}
                  </Badge>
                ))}
              </div>
              {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
            </div>
          </div>
        </article>
      </div>
    );
  }

  const body = (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:shadow-black/5 dark:group-hover:shadow-black/20">
      <div className="texture-bg relative aspect-video shrink-0 overflow-hidden">
        {live ? <ProjectVisual slug={slug} /> : image && <img src={image} alt={title} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />}
      </div>
      <div className="flex flex-1 flex-col items-start p-4">
        <h3 className={showDescription ? 'mb-2 text-base font-semibold tracking-tight' : 'line-clamp-2 text-base leading-snug font-medium tracking-tight'}>{title}</h3>
        {showDescription && description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
      </div>
    </article>
  );

  // A live demo can hold links of its own, and a link can't sit inside another, so that card is a box with its link stretched over it.
  // data-project-card marks the box whose hover replays the visual (ProjectCardStage listens on it).
  return live ? (
    <div className="group relative flex h-full flex-col" data-project-card>
      <SiteLink href={href} className="absolute inset-0 z-10 rounded-xl" aria-label={title} />
      {body}
    </div>
  ) : (
    <SiteLink href={href} className="group flex h-full flex-col">
      {body}
    </SiteLink>
  );
}

export { ProjectCard, ProjectVisual, hasLiveVisual, type ProjectCardProps };
