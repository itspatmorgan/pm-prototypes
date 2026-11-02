import type { ReactNode } from 'react';
import { Link } from '@module/prototypes';
import { SiteShell, type NavKey, type RenderSiteLink } from '@/systems/website/components/site-shell';

// Pages built in this prototype link to each other; the rest still open on the live site.
// Keep the Link paths literal so Studio can repair them when a page is renamed.
const renderLink: RenderSiteLink = ({ to, ...props }) => {
  if (to === 'about') return <Link to="about" {...props} />;
  if (to === 'work') return <Link to="work" {...props} />;
  return <a href={`https://itspatmorgan.com${to === 'home' ? '/' : `/${to}`}`} {...props} />;
};

export function Shell({ current, template, children }: { current: NavKey; template?: 'showcase' | 'reading'; children: ReactNode }) {
  return (
    <SiteShell current={current} template={template} renderLink={renderLink}>
      {children}
    </SiteShell>
  );
}

export const inlineLink = 'text-foreground underline underline-offset-4 transition-colors hover:text-accent';
