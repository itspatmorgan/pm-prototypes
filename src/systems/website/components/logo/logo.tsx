import { cn } from '#studio/runtime';

// The site's four-pixel mark (braille P), ported from itspatmorgan.com's src/components/layout/Logo.astro.
// Styles live in styles/theme.css under .website-theme .logo-root.
type LogoProps = {
  className?: string;
  /** cycle: pixels pulse on hover. sidebar-toggle: pixels preview a rail collapsing or expanding. */
  interaction?: 'cycle' | 'sidebar-toggle';
  /** container: hover any ancestor with data-logo-cycle-trigger instead of the mark itself. */
  trigger?: 'self' | 'container';
  toggleDirection?: 'collapse' | 'expand';
};

function Logo({ className, interaction = 'cycle', trigger = 'self', toggleDirection = 'collapse' }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      height="28"
      width="28"
      role="img"
      aria-label="Patrick Morgan"
      className={cn('logo-root', `logo-${interaction}`, `logo-trigger-${trigger}`, interaction === 'sidebar-toggle' && 'is-interaction-ready', className)}
      data-toggle-direction={interaction === 'sidebar-toggle' ? toggleDirection : undefined}
    >
      <rect className="logo-bg" width="28" height="28" rx="6.2" />
      <rect className="logo-pixel logo-pixel-1" x="8" y="4.5" width="5" height="5" rx="0.6" />
      <rect className="logo-pixel logo-pixel-2" x="15" y="4.5" width="5" height="5" rx="0.6" />
      <rect className="logo-pixel logo-pixel-3" x="8" y="11.5" width="5" height="5" rx="0.6" />
      <rect className="logo-pixel logo-pixel-4" x="8" y="18.5" width="5" height="5" rx="0.6" />
    </svg>
  );
}

export { Logo, type LogoProps };
