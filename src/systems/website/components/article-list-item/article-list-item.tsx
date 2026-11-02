import { SiteLink } from '../site-shell';

// One article in the Writing list: date, title, and description, with the site's accent edge on hover.
type ArticleListItemProps = { id: string; title: string; description: string; publishedDate: string; image?: string; theme?: string; headingLevel?: 'h2' | 'h3' };

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });

function ArticleListItem({ id, title, description, publishedDate, image, headingLevel: Heading = 'h2' }: ArticleListItemProps) {
  return (
    <SiteLink href={`/writing/${id}`} className="article-item group -mx-3 block rounded-lg p-3 transition-all duration-200 ease-out hover:scale-[1.01] hover:bg-muted/50">
      <article className="flex gap-5">
        {image && (
          <div className="hidden shrink-0 overflow-hidden rounded-lg border border-border sm:block sm:w-36 md:w-44">
            <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <time dateTime={publishedDate} className="mb-2 font-mono text-xs text-muted-foreground">
            {formatDate(publishedDate)}
          </time>
          <Heading className="mb-1 text-base font-semibold tracking-tight">{title}</Heading>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </article>
    </SiteLink>
  );
}

export { ArticleListItem, type ArticleListItemProps };
