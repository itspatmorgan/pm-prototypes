import type { ReactNode } from 'react';
import { cn } from '#studio/runtime';

// A Lab experiment page, ported from itspatmorgan.com's src/layouts/LabLayout.astro:
// "← Lab", the title and description, optional intro prose, then the experiment.
type LabPageProps = {
  title: string;
  description: string;
  /** Words that introduce the experiment, rendered as prose under the description. */
  intro?: ReactNode;
  backHref?: string;
  children?: ReactNode;
};

function LabPage({ title, description, intro, backHref = 'https://itspatmorgan.com/lab', children }: LabPageProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <section className="mx-auto max-w-3xl px-6 pt-12 pb-12 sm:pt-24">
        <a href={backHref} className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Lab
        </a>
        <h1 className="mb-4 text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
        <p className={cn('max-w-xl text-lg text-muted-foreground', intro && 'mb-8')}>{description}</p>
        {intro && <div className="site-prose">{intro}</div>}
      </section>
      {children}
    </div>
  );
}

/** A titled section of a Lab page, on the reading column. */
function LabSection({ title, description, children }: { title?: string; description?: ReactNode; children: ReactNode }) {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        {title && (
          <div className={cn('mb-10', description && 'max-w-xl')}>
            <h2 className={cn('text-base font-semibold tracking-tight text-foreground', description && 'mb-3')}>{title}</h2>
            {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export { LabPage, LabSection, type LabPageProps };
