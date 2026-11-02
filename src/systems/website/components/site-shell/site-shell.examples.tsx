import { PageHeader, SiteShell } from './site-shell';
export const Reading = () => (
  <SiteShell current="about">
    <PageHeader title="Page title" lead="The lead: one or two sentences under the title." />
    <section className="mx-auto max-w-3xl px-6 pb-24 text-base leading-relaxed text-muted-foreground">Reading content sits on the 720px column.</section>
  </SiteShell>
);
export const Showcase = () => (
  <SiteShell current="home" template="showcase">
    <section className="mx-auto w-full max-w-[1136px] px-6 py-16 sm:px-8 lg:px-14">
      <div className="flex min-h-48 items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground">Showcase content: 1024px inside a 1136px shell.</div>
    </section>
  </SiteShell>
);
