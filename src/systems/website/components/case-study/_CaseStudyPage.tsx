import type { ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { SiteLink } from '../site-shell';

// A case study page, ported from itspatmorgan.com's src/layouts/CaseStudyLayout.astro and Slide.astro: "← Work", then the hero
// (company, title, subline, brief, and the hero visual), then one Slide per point. `product` is the demo's namespace class.

type CaseStudyCopy = {
  company: { name: string; logo: string };
  subline: string;
  brief: { when: string; role: string; team: string; outcome: string };
};

function CaseStudyPage({ title, caseStudy, product, actions, hero, children }: { title: string; caseStudy: CaseStudyCopy; product?: string; actions?: ReactNode; hero?: ReactNode; children?: ReactNode }) {
  const { company, subline, brief } = caseStudy;
  const rows: [string, string][] = [
    ['When', brief.when],
    ['Role', brief.role],
    ['Team', brief.team],
    ['Outcome', brief.outcome],
  ];
  return (
    <article className={product ? `cs-page ${product}` : 'cs-page'}>
      <nav className="cs-nav" aria-label="Case study navigation">
        <SiteLink href="/work">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          Work
        </SiteLink>
      </nav>
      <header className="cs-slide cs-hero">
        <p className="cs-company">
          <img src={company.logo} width={30} height={30} alt="" />
          {company.name}
        </p>
        <h1>{title}</h1>
        <p>{subline}</p>
        {actions}
        <dl className="cs-brief">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {hero}
      </header>
      {children}
    </article>
  );
}

/** One point per slide: a headline, at most one line of copy, then the visual. */
function Slide({ id, title, line, children }: { id: string; title: string; line?: string; children?: ReactNode }) {
  return (
    <section className="cs-slide" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
      {children}
    </section>
  );
}

/** One slide's props, from a case study's slide copy: <Slide {...slideCopy(slides, 'problem')}>. */
function slideCopy(slides: Record<string, { title: string; line?: string }>, id: string) {
  const words = slides[id];
  if (!words) throw new Error(`No slide "${id}" in this case study's copy`);
  return { id, ...words };
}

export { CaseStudyPage, Slide, slideCopy, type CaseStudyCopy };
