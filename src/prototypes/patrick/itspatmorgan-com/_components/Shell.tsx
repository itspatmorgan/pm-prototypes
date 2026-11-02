import type { ReactNode } from 'react';
import { Link } from '@module/prototypes';
import { SiteShell, type NavKey, type RenderSiteLink } from '@/systems/website/components/site-shell';
import { sampledPosts } from '../_data/writing';

// Every site path resolves to a page in this prototype or the live site. Only the sampled articles
// have bodies here; the other articles open on the live site.
const sampled = new Set(sampledPosts.map(post => post.id));
// Keep the Link paths literal so Studio can repair them when a page is renamed.
const renderLink: RenderSiteLink = ({ href, ...props }) => {
  const [path, query = ''] = href.split('?');
  switch (path) {
    case '/':
      return <Link to="home" {...props} />;
    case '/about':
      return <Link to="about" {...props} />;
    case '/work':
      return <Link to="work/work" {...props} />;
    case '/work/sublime-agents':
      return <Link to="work/sublime-agents" {...props} />;
    case '/work/query-language':
      return <Link to="work/query-language" {...props} />;
    case '/work/expansion':
      return <Link to="work/expansion" {...props} />;
    case '/work/design-studio':
      return <Link to="work/design-studio" {...props} />;
    case '/design-studio':
      return <Link to="design-studio" {...props} />;
    case '/writing':
      return query ? <Link to={`writing/writing?${query}`} {...props} /> : <Link to="writing/writing" {...props} />;
    case '/lab':
      return <Link to="lab/lab" {...props} />;
    case '/lab/pattern-engine':
      return <Link to="lab/pattern-engine" {...props} />;
    case '/lab/pixel-mark':
      return <Link to="lab/pixel-mark" {...props} />;
    case '/lab/pixel-wave':
      return <Link to="lab/pixel-wave" {...props} />;
    case '/community':
      return <Link to="community" {...props} />;
    case '/colophon':
      return <Link to="colophon" {...props} />;
  }
  if (path.startsWith('/writing/') && sampled.has(path.slice('/writing/'.length)))
    return <Link to={`writing/article?article=${path.slice('/writing/'.length)}`} {...props} />;
  return <a href={`https://itspatmorgan.com${href}`} {...props} />;
};

export function Shell({ current, template, footer, children }: { current?: NavKey; template?: 'showcase' | 'reading'; footer?: boolean; children: ReactNode }) {
  return (
    <SiteShell current={current} template={template} footer={footer} renderLink={renderLink}>
      {children}
    </SiteShell>
  );
}

/** The showcase template's shell: 1024px of content in 1136px. */
export const showcaseShell = 'mx-auto w-full max-w-[1136px] px-6 sm:px-8 lg:px-14';
export const inlineLink = 'text-foreground underline underline-offset-4 transition-colors hover:text-accent';
