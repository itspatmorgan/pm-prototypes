/** @studio-id 8rzce2qzq1zkvh25 */
import { useEffect, useState } from 'react';
import { ArrowLeft01Icon, HugeiconsIcon } from '@/systems/website/libraries/icons';
import { SiteLink } from '@/systems/website/components/site-shell';
import { Badge } from '@/systems/website/components/badge';
import { LiveEditorialVisual } from '@/systems/website/components/generative-art';
import { Shell } from '../_components/Shell';
import { sampledPosts, type Post } from '../_data/writing';

// The article template (src/layouts/WritingLayout.astro), reading template, shown with a representative sample of articles.
// Links from the Writing list carry ?article=<id>, and the picker switches between the sampled articles here.

const generatorLabel = (type: string) => type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
function visualCaption(visual: NonNullable<Post['visual']>) {
  const g = visual.generator;
  const label = `${generatorLabel(g.type)} · seed ${g.seed}`;
  if (g.type === 'flow-field') return `${label} · density ${g.density} · scale ${g.scale}`;
  if (g.type === 'dot-grid') return `${label} · spacing ${g.spacing}px · size ${g.dotSize}%`;
  if (g.type === 'isoline') return `${label} · levels ${g.levels} · scale ${g.scale}`;
  if (g.type === 'voronoi') return `${label} · cells ${g.count} · jitter ${g.jitter}%`;
  return label;
}

/** Studio renders views in a preview frame, so the article named in the page's address is read from the top window. */
function requestedArticle() {
  for (const win of [window, window.top]) {
    try {
      const id = win && new URLSearchParams(win.location.search).get('article');
      if (id) return id;
    } catch {
      /* another origin */
    }
  }
  return null;
}

export default function Article() {
  const [id, setId] = useState(sampledPosts[0].id);
  useEffect(() => {
    const requested = requestedArticle();
    if (requested && sampledPosts.some(post => post.id === requested)) setId(requested);
  }, []);
  const post = sampledPosts.find(p => p.id === id) ?? sampledPosts[0];
  const date = new Date(post.publishedDate).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <Shell current="writing">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <SiteLink href="/writing" className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="h-4 w-4" />
            Writing
          </SiteLink>
          <label className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="shrink-0">Sample</span>
            <select value={post.id} onChange={event => setId(event.target.value)} className="min-w-0 truncate rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground">
              {sampledPosts.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <header className="mb-12">
          <h1 className="mb-3 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mb-5 text-lg leading-snug text-muted-foreground">{post.description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <time dateTime={post.publishedDate} className="font-mono text-sm text-muted-foreground">
              {date}
            </time>
            {post.theme && (
              <>
                <span className="h-3.5 w-px bg-border" aria-hidden="true" />
                <Badge variant="secondary" className="font-mono text-xs">
                  {post.theme}
                </Badge>
              </>
            )}
          </div>
        </header>

        {post.visual && (
          <figure className="mb-12">
            <div className="relative aspect-[1200/630] overflow-hidden rounded-lg border border-border bg-card">
              <LiveEditorialVisual key={post.id} visual={post.visual} />
            </div>
            <figcaption className="mt-2 font-mono text-xs text-muted-foreground">
              {visualCaption(post.visual)} · generated with the{' '}
              <SiteLink href="/lab/pattern-engine" className="underline underline-offset-4 transition-colors hover:text-foreground">
                Pattern Engine
              </SiteLink>
            </figcaption>
          </figure>
        )}

        <div className="site-prose" dangerouslySetInnerHTML={{ __html: post.html ?? '' }} />
      </article>
    </Shell>
  );
}
