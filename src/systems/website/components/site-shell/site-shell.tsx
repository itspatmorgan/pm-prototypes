import { useEffect, useRef, useState, type ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUpRight01Icon,
  Briefcase01Icon,
  Cancel01Icon,
  CanvasIcon,
  Globe02Icon,
  Home01Icon,
  Menu01Icon,
  Moon02Icon,
  Pen01Icon,
  Sun03Icon,
  TestTube01Icon,
  UserGroupIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { cn } from '#studio/runtime';
import { Logo } from '../logo';

// The itspatmorgan.com shell, ported from src/layouts/PageLayout.astro and src/components/layout/
// (Sidebar, Header, MobileNav, PageHeader, Footer). Sidebar styles live in styles/theme.css.

type NavKey = 'home' | 'about' | 'work' | 'design-studio' | 'writing' | 'lab' | 'community' | 'colophon';
type SiteLinkProps = { to: NavKey; className?: string; children: ReactNode; title?: string; 'aria-label'?: string; onClick?: () => void };
/** Renders a link to a site page. Prototypes pass their own, using Link from @module/prototypes. */
type RenderSiteLink = (props: SiteLinkProps) => ReactNode;

const SITE = 'https://itspatmorgan.com';
const siteHref: Record<NavKey, string> = {
  home: '/',
  about: '/about',
  work: '/work',
  'design-studio': '/design-studio',
  writing: '/writing',
  lab: '/lab',
  community: '/community',
  colophon: '/colophon',
};
const defaultLink: RenderSiteLink = ({ to, ...props }) => <a href={SITE + siteHref[to]} {...props} />;

const navItems: { key: NavKey; label: string; icon: typeof Home01Icon }[] = [
  { key: 'home', label: 'Home', icon: Home01Icon },
  { key: 'about', label: 'About', icon: UserIcon },
  { key: 'work', label: 'Work', icon: Briefcase01Icon },
  { key: 'design-studio', label: 'Design Studio', icon: CanvasIcon },
  { key: 'writing', label: 'Writing', icon: Pen01Icon },
  { key: 'lab', label: 'Lab', icon: TestTube01Icon },
  { key: 'community', label: 'Community', icon: UserGroupIcon },
];

const social = {
  newsletter: 'https://www.unknownarts.com',
  linkedin: 'https://www.linkedin.com/in/itspatmorgan',
  x: 'https://x.com/itspatmorgan',
  github: 'https://github.com/itspatmorgan',
};
const elsewhere = [
  { label: 'Substack', href: social.newsletter, path: 'M20.6 8.242H1.46V5.406H20.6v2.836zM1.46 10.812V24l9.6-5.55 9.54 5.55V10.812H1.46zM20.6 0H1.46v2.836H20.6V0z' },
  { label: 'LinkedIn', href: social.linkedin, path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'X', href: social.x, path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'GitHub', href: social.github, path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' },
];

function BrandIcon({ path }: { path: string }) {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function useLocalTime() {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit', hour12: true }));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/** The site toggles `.dark` on <html>. In Studio, flip the nearest theme boundary's color mode instead. */
function useThemeToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  const [dark, setDark] = useState(false);
  const boundary = () => ref.current?.closest<HTMLElement>('[data-color-mode]') ?? null;
  useEffect(() => setDark(boundary()?.dataset.colorMode === 'dark'), []);
  const toggle = () => {
    const el = boundary();
    if (!el) return;
    const next = el.dataset.colorMode === 'dark' ? 'light' : 'dark';
    el.dataset.colorMode = next;
    el.style.colorScheme = next;
    setDark(next === 'dark');
  };
  return { ref, dark, toggle, label: `Switch to ${dark ? 'light' : 'dark'} mode` };
}

function ThemeToggle({ className, size = 18 }: { className?: string; size?: number }) {
  const theme = useThemeToggle();
  return (
    <button ref={theme.ref} type="button" onClick={theme.toggle} aria-label={theme.label} title={theme.label} className={className}>
      <HugeiconsIcon icon={theme.dark ? Sun03Icon : Moon02Icon} size={size} />
    </button>
  );
}

function Sidebar({ current, renderLink }: { current?: NavKey; renderLink: RenderSiteLink }) {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return (localStorage.getItem('sidebar-collapsed') ?? 'true') === 'true';
    } catch {
      return true;
    }
  });
  const [linksOpen, setLinksOpen] = useState(false);
  const time = useLocalTime();

  const toggle = () => {
    setLinksOpen(false);
    setCollapsed(value => {
      try {
        localStorage.setItem('sidebar-collapsed', String(!value));
      } catch {
        /* unavailable */
      }
      return !value;
    });
  };

  useEffect(() => {
    if (!linksOpen) return;
    const close = () => setLinksOpen(false);
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close();
    document.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [linksOpen]);

  return (
    <aside className={cn('site-sidebar sticky top-0 z-30 hidden h-dvh shrink-0 flex-col border-r border-border bg-background md:flex', collapsed && 'is-collapsed')}>
      <div className="identity flex shrink-0 items-center gap-3 px-4 py-3">
        <button type="button" onClick={toggle} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" aria-label="Toggle sidebar" title={collapsed ? 'Expand navigation' : 'Collapse navigation'}>
          <Logo interaction="sidebar-toggle" toggleDirection={collapsed ? 'expand' : 'collapse'} className="h-8 w-8" />
        </button>
        <div className="identity-text min-w-0">
          <p className="text-sm leading-tight font-medium whitespace-nowrap">Patrick Morgan</p>
          <p className="mt-0.5 text-xs leading-tight whitespace-nowrap text-muted-foreground">Software Designer</p>
        </div>
      </div>

      <nav className="shrink-0 px-2 py-3" aria-label="Main navigation">
        <ul className="flex flex-col gap-0.5">
          {navItems.map(item => (
            <li key={item.key}>
              {renderLink({
                to: item.key,
                title: item.label,
                className: cn(
                  'nav-item flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors duration-200',
                  current === item.key ? 'is-active bg-secondary font-medium text-secondary-foreground' : 'text-muted-foreground hover:text-foreground',
                ),
                children: (
                  <>
                    <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.75} className="shrink-0" />
                    <span className="nav-text overflow-hidden whitespace-nowrap">{item.label}</span>
                  </>
                ),
              })}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1" />

      <div className="footer-controls relative shrink-0 px-4 py-3">
        <ul className="elsewhere-group -ml-1.5 flex items-center gap-1" inert={collapsed}>
          {elsewhere.map(item => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={item.label} className="elsewhere-item flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:text-foreground">
                <BrandIcon path={item.path} />
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="links-button h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground"
          aria-label="Links"
          aria-expanded={linksOpen}
          tabIndex={collapsed ? 0 : -1}
          onClick={event => {
            event.stopPropagation();
            setLinksOpen(open => !open);
          }}
        >
          <HugeiconsIcon icon={Globe02Icon} size={18} strokeWidth={1.75} />
        </button>
        <div className="bottom-strip mt-2 flex shrink-0 items-center justify-between">
          <div className="time-text font-mono text-xs whitespace-nowrap text-muted-foreground tabular-nums" aria-live="polite">
            LA&nbsp;&middot;&nbsp;{time}
          </div>
          <ThemeToggle className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground" />
        </div>
      </div>

      <div
        className={cn('links-panel fixed bottom-3 left-[4.5rem] w-44 rounded-lg border border-border bg-background p-1.5 shadow-lg transition-all duration-200', linksOpen ? 'is-open' : 'invisible')}
        aria-hidden={!linksOpen}
        inert={!linksOpen}
        onClick={event => event.stopPropagation()}
      >
        <p className="px-2 pt-1 pb-1.5 text-xs font-medium text-muted-foreground">Links</p>
        <ul>
          {elsewhere.map(item => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground">
                <BrandIcon path={item.path} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function MobileHeader({ renderLink, onOpenNav }: { renderLink: RenderSiteLink; onOpenNav: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        {renderLink({ to: 'home', 'aria-label': 'Home', className: 'block', children: <Logo /> })}
        <div className="flex items-center gap-1">
          <ThemeToggle size={16} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground" />
          <button type="button" onClick={onOpenNav} aria-label="Open navigation" className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileNav({ open, onClose, renderLink }: { open: boolean; onClose: () => void; renderLink: RenderSiteLink }) {
  if (!open) return null;
  return (
    <div className="site-mobile-nav fixed inset-0 z-[100] flex flex-col bg-background md:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        {renderLink({ to: 'home', 'aria-label': 'Home', className: 'block', onClick: onClose, children: <Logo /> })}
        <button type="button" onClick={onClose} aria-label="Close navigation" className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
          <HugeiconsIcon icon={Cancel01Icon} size={20} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col justify-center px-8" aria-label="Main navigation">
        <ul className="flex flex-col">
          {navItems.map(item => (
            <li key={item.key}>
              {renderLink({
                to: item.key,
                onClick: onClose,
                className: 'block border-b border-border/50 py-3 text-[1.65rem] leading-tight font-medium text-muted-foreground transition-colors last:border-0 hover:text-foreground active:text-foreground',
                children: item.label,
              })}
            </li>
          ))}
        </ul>
      </nav>
      <div className="shrink-0 border-t border-border px-8 py-6">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
          {elsewhere.map(item => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-1 text-base text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="h-3.5 w-3.5 shrink-0 opacity-50" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Template = 'showcase' | 'reading';

function SiteFooter({ template, renderLink }: { template: Template; renderLink: RenderSiteLink }) {
  const time = useLocalTime();
  return (
    <footer className="py-8 sm:py-10">
      <div className={cn('mx-auto flex w-full items-center justify-between', template === 'showcase' ? 'max-w-[1136px] px-6 sm:px-8 lg:px-14' : 'max-w-3xl px-6')}>
        {renderLink({ to: 'colophon', className: 'text-xs text-muted-foreground/70 transition-colors hover:text-foreground', children: 'Colophon' })}
        <div className="flex items-center gap-3 text-xs whitespace-nowrap text-muted-foreground/60">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="font-mono text-xs whitespace-nowrap text-muted-foreground tabular-nums md:hidden">LA&nbsp;&middot;&nbsp;{time}</span>
        </div>
      </div>
    </footer>
  );
}

type SiteShellProps = {
  /** The nav item for this page. */
  current?: NavKey;
  /** showcase: 1024px of content in a 1136px shell. reading: the 720px column. Sets the footer width. */
  template?: Template;
  renderLink?: RenderSiteLink;
  children: ReactNode;
};

/** The site frame: sidebar on desktop, header and full-screen nav on phones, and the footer. */
function SiteShell({ current, template = 'reading', renderLink = defaultLink, children }: SiteShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="site-shell min-h-dvh bg-background text-foreground">
      <MobileHeader renderLink={renderLink} onOpenNav={() => setNavOpen(true)} />
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} renderLink={renderLink} />
      <div className="md:flex md:min-h-dvh">
        <Sidebar current={current} renderLink={renderLink} />
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter template={template} renderLink={renderLink} />
        </div>
      </div>
    </div>
  );
}

/** The reading template's title block: one title size, lead and spacing for every 720px page. */
function PageHeader({ title, lead, className, children }: { title: ReactNode; lead?: ReactNode; className?: string; children?: ReactNode }) {
  return (
    <section className={cn('mx-auto max-w-3xl px-6 pt-12 pb-12 sm:pt-24', className)}>
      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>}
      {children}
    </section>
  );
}

export { SiteShell, PageHeader, social, type NavKey, type RenderSiteLink, type SiteLinkProps, type SiteShellProps };
