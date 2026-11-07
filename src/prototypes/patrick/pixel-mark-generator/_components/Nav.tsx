import { Link } from '@module/prototypes';

const VIEWS = [
  { to: 'generator', name: 'Generator' },
  { to: 'icon-set', name: 'Icon set' },
  { to: 'motion', name: 'Motion' },
] as const;

export type View = (typeof VIEWS)[number]['to'];

/** The three views as tabs, the same on every page, so each one is a click from the others. */
export function Nav({ current }: { current: View }) {
  return (
    <nav aria-label="Pixel Mark Generator" className="mb-10 inline-flex rounded-lg border border-border bg-card p-0.5">
      {VIEWS.map(v =>
        v.to === current ? (
          <span key={v.to} aria-current="page" className="rounded-md bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm">
            {v.name}
          </span>
        ) : (
          <Link key={v.to} to={v.to} className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {v.name}
          </Link>
        ),
      )}
    </nav>
  );
}
