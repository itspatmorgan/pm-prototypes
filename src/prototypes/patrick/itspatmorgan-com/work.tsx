/** @studio-id gyyeb4xfc7b5880n */
import { PageHeader } from '@/systems/website/components/site-shell';
import { Shell } from './_components/Shell';
import { projects, roles, toolkit, writingAndTalks, type Project } from './_components/work-data';

// Recreates itspatmorgan.com/work (src/pages/work/index.astro), reading template.
const cardHover = 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20';

function ProjectCard({ project }: { project: Project }) {
  return (
    <a href={`https://itspatmorgan.com/work/${project.slug}`} className="group flex h-full flex-col">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:shadow-black/5 dark:group-hover:shadow-black/20">
        <div className="texture-bg shrink-0 overflow-hidden">
          <img src={project.image} alt={project.title} className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        </div>
        <div className="flex flex-1 flex-col items-start p-4">
          <h3 className="line-clamp-2 text-base leading-snug font-medium tracking-tight">{project.title}</h3>
        </div>
      </article>
    </a>
  );
}

export default function Work() {
  return (
    <Shell current="work">
      <PageHeader title="Work" lead="14+ years moving between strategy, design, and code." />

      <section className="mx-auto max-w-3xl px-6">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight">Career</h2>
        <div className="relative">
          <div className="absolute top-2 bottom-0 left-[5px] w-px bg-border" />
          {roles.map(role => {
            const roleProjects = (role.projects ?? []).map(slug => projects[slug]).filter(Boolean);
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
                      <ProjectCard key={project.slug} project={project} />
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
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={`group/media flex items-center gap-4 rounded-xl border border-border bg-card p-3 sm:gap-5 ${cardHover}`}>
                <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-40">
                  <span className="absolute inset-0 grid place-items-center text-sm font-medium text-muted-foreground" aria-hidden="true">
                    {item.fallback}
                  </span>
                  <img src={item.image} alt={item.alt} loading="lazy" onError={event => event.currentTarget.remove()} className="relative h-full w-full object-cover" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-base font-semibold tracking-tight">{item.title}</span>
                  <span className="text-sm text-muted-foreground">{item.sub}</span>
                </span>
                <span className="ml-auto pr-2 text-muted-foreground transition-colors group-hover/media:text-foreground" aria-hidden="true">
                  ↗
                </span>
              </a>
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
