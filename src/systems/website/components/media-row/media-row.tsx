// A row for a newsletter, talk, or article elsewhere: cover, title, one line of detail, and an outbound arrow.
// If the cover can't load, the source's name shows in its place.
type MediaRowProps = { href: string; image: string; alt: string; fallback: string; title: string; sub: string };

function MediaRow({ href, image, alt, fallback, title, sub }: MediaRowProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/media flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5 sm:gap-5 dark:hover:shadow-black/20"
    >
      <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-40">
        <span className="absolute inset-0 grid place-items-center text-sm font-medium text-muted-foreground" aria-hidden="true">
          {fallback}
        </span>
        <img src={image} alt={alt} loading="lazy" onError={event => event.currentTarget.remove()} className="relative h-full w-full object-cover" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-base font-semibold tracking-tight">{title}</span>
        <span className="text-sm text-muted-foreground">{sub}</span>
      </span>
      <span className="ml-auto pr-2 text-muted-foreground transition-colors group-hover/media:text-foreground" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export { MediaRow, type MediaRowProps };
