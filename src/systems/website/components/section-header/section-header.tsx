import { SiteLink } from '../site-shell';

// The heading row over each Home section: a title and a "View all →" link to its page.
function SectionHeader({ title, href, action = 'View all →' }: { title: string; href?: string; action?: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between">
      <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
      {href && <SiteLink href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{action}</SiteLink>}
    </div>
  );
}

export { SectionHeader };
