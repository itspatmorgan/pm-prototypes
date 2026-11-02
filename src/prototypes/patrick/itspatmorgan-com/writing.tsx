/** @studio-id j1bdd8ehwk2abnx4 */
import { useMemo, useState } from 'react';
import { PageHeader, social } from '@/systems/website/components/site-shell';
import { ArticleListItem } from '@/systems/website/components/article-list-item';
import { Shell, inlineLink } from './_components/Shell';
import { posts } from './_data/writing';

// Recreates itspatmorgan.com/writing (src/pages/writing/index.astro), reading template, with its theme filter.
const filterThemes = ['AI', 'Design', 'Systems Thinking', 'Creative Practice', 'Career'];
const chip =
  'rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground';

export default function Writing() {
  const [filter, setFilter] = useState('all');
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const post of posts) if (post.theme) map.set(post.theme, (map.get(post.theme) ?? 0) + 1);
    return map;
  }, []);
  const themes = filterThemes.filter(theme => counts.has(theme));

  return (
    <Shell current="writing">
      <PageHeader
        title="Writing"
        lead={
          <>
            A sample of articles focused on AI, design, and systems thinking. Subscribe to{' '}
            <a href={social.newsletter} target="_blank" rel="noopener noreferrer" className={inlineLink}>
              Unknown Arts
            </a>{' '}
            for my entire catalog of 200+ articles.
          </>
        }
      >
        <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter articles by theme">
          <button type="button" className={chip} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            All <span className="text-muted-foreground/70">{posts.length}</span>
          </button>
          {themes.map(theme => (
            <button key={theme} type="button" className={chip} aria-pressed={filter === theme} onClick={() => setFilter(theme)}>
              {theme} <span className="text-muted-foreground/70">{counts.get(theme)}</span>
            </button>
          ))}
        </div>
      </PageHeader>
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="flex flex-col gap-2">
          {posts
            .filter(post => filter === 'all' || post.theme === filter)
            .map(post => (
              <ArticleListItem key={post.id} id={post.id} title={post.title} description={post.description} publishedDate={post.publishedDate} theme={post.theme} />
            ))}
        </div>
      </section>
    </Shell>
  );
}
