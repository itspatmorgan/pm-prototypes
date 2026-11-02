/** @studio-id gyyeb4xfc7b5880n */
import { PageHeader } from '@/systems/website/components/site-shell';
import { ProjectCard } from '@/systems/website/components/project-card';
import { MediaRow } from '@/systems/website/components/media-row';
import { Shell } from '../_components/Shell';
import { roles, toolkit } from '../_components/work-data';
import { projects } from '../_data/projects';
import { mediaFeatures } from '../_data/community';
import { unknownArtsBanner } from '../_data/images';

// Recreates itspatmorgan.com/work (src/pages/work/index.astro), reading template.
// The newsletter first, Patrick's numbers as of 2026-10-30, then the talks. The launch post stays in the Design Studio case study only.
const writingAndTalks = [
  {
    image: unknownArtsBanner,
    alt: 'Unknown Arts collage: a figure on a mountain ridge pointing toward a bird in flight',
    fallback: 'Unknown Arts',
    title: 'Unknown Arts newsletter',
    sub: '200+ essays · 7,700+ subscribers · 800k views',
    href: 'https://www.unknownarts.com',
  },
  ...mediaFeatures.filter(item => item.title !== 'Design Studio open-source launch'),
];

export default function Work() {
  return (
    <Shell current="work">
      <PageHeader title="Work" lead="14+ years moving between strategy, design, and code." />

      <section className="mx-auto max-w-3xl px-6">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Career</h2>
        <div className="relative">
          <div className="absolute top-2 bottom-0 left-[5px] w-px bg-border" />
          {roles.map(role => {
            const roleProjects = (role.projects ?? []).flatMap(slug => projects.filter(p => p.id === slug));
            return (
              <div key={role.company} className="relative mb-14 pl-8 last:mb-0">
                <div className="absolute top-[5px] left-0 size-3 rounded-full border border-border bg-background" />
                <div className="mb-4 font-mono text-sm text-muted-foreground">{role.dateRange}</div>
                <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                  <a href={role.url} target="_blank" rel="noopener noreferrer" className="text-lg leading-snug font-semibold transition-colors hover:text-accent sm:text-xl">
                    {role.company}
                  </a>
                  <span className="text-base text-muted-foreground">{role.role}</span>
                </div>
                {role.summary && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{role.summary}</p>}
                {roleProjects.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {roleProjects.map(project => (
                      <ProjectCard key={project.id} slug={project.id} title={project.title} image={project.image} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-20">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Writing and talks</h2>
        <ul className="grid gap-3">
          {writingAndTalks.map(item => (
            <li key={item.title}>
              <MediaRow {...item} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-20 pb-24">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Toolkit</h2>
        <div className="flex flex-col gap-5">
          {toolkit.map(({ label, skills }) => (
            <div key={label}>
              <h3 className="mb-1 text-base font-semibold tracking-tight">{label}</h3>
              <p className="text-base leading-relaxed text-foreground/70">{skills.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
