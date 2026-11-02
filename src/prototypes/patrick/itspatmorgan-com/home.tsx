/** @studio-id k62efqd419gm2pww */
import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon, Mail01Icon } from '@/systems/website/libraries/icons';
import { SiteLink, social } from '@/systems/website/components/site-shell';
import { PixelWaveText, dissolvePixelWave, enablePixelHover } from '@/systems/website/components/pixel-wave-text';
import { ProjectCard, ProjectVisual } from '@/systems/website/components/project-card';
import { SectionHeader } from '@/systems/website/components/section-header';
import { PrintPhoto } from '@/systems/website/components/print-photo';
import { KindWords } from '@/systems/website/components/kind-words';
import { LabCard } from '@/systems/website/components/lab-card';
import { UAMark } from '@/systems/website/components/generative-art';
import { useDark, useReduced } from '@/systems/website/components/theme-hooks';
import { Shell, inlineLink, showcaseShell } from './_components/Shell';
import { project, projects } from './_data/projects';
import { posts } from './_data/writing';
import { commendations, communityPhotos, featuredCommunityCommendations } from './_data/community';
import { homeLabOrder } from './_data/lab';
import { collageCutout, paperDark, paperLight, profileAvatar, profileLivingRoom } from './_data/images';
import styles from './_components/home.module.css';

// Recreates itspatmorgan.com's home page (src/pages/index.astro), showcase template.
const heroHeadline = 'Patrick is a designer who builds.';
const heroIntro = "I've been a strategist, developer, designer, and writer — sometimes all at once.";
const heroIntroDetail = 'The through line is my compulsion to turn ideas into useful, well-crafted things.';

const homeSection = `${showcaseShell} py-12 sm:py-14 lg:py-16`;
const homeFirstSection = `${showcaseShell} pt-5 pb-12 sm:pt-10 sm:pb-14 lg:pt-10 lg:pb-16`;
const photoTilts = ['rotate-[-2deg]', 'rotate-[1.5deg]', 'rotate-[-1deg]', 'rotate-[2deg]'];
// The homepage's writing list drops a title's closing aside, like "(And That's Okay)", so each title fits on one line.
const shortTitle = (title: string) => title.replace(/\s*\([^)]*\)$/, '');
const monthYear = (date: string) => new Date(date).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', year: 'numeric' });

const contactLinks = [
  { label: 'Email', href: `mailto:${'pm@itspatmorgan.com'}`, path: null },
  { label: 'LinkedIn', href: social.linkedin, path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'X', href: social.x, path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

function CurrentWork() {
  return (
    <>
      Right now, I'm designing agentic email security at{' '}
      <a href="https://sublime.security" target="_blank" rel="noopener noreferrer" className={inlineLink}>
        Sublime
      </a>
      , writing my newsletter{' '}
      <a href={social.newsletter} target="_blank" rel="noopener noreferrer" className={inlineLink}>
        Unknown Arts
      </a>
      , and building{' '}
      <SiteLink href="/design-studio" className={inlineLink}>
        Design Studio
      </SiteLink>
      , an open-source prototyping environment.
    </>
  );
}

function BuilderPortrait() {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label="Run builder mode portrait animation"
      onClick={() => {
        if (pressed) return;
        setPressed(true);
        window.setTimeout(() => setPressed(false), 3000);
      }}
      className={`${styles.builder} group/builder block cursor-cell bg-white p-2 pb-8 text-left shadow-2xl shadow-black/20 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:p-3 lg:pb-10 dark:bg-[#20201e] dark:shadow-black/50`}
    >
      <div className="relative h-52 w-52 overflow-hidden lg:h-64 lg:w-64 xl:h-72 xl:w-72">
        <img
          src={profileLivingRoom}
          alt="Patrick Morgan"
          className="block h-full w-full scale-[1.55] object-cover object-[43%_54%] transition duration-500 group-aria-pressed/builder:scale-[1.62] group-aria-pressed/builder:brightness-75 group-aria-pressed/builder:contrast-125 group-aria-pressed/builder:grayscale group-aria-pressed/builder:saturate-0 group-aria-pressed/builder:[image-rendering:pixelated]"
        />
        <div className={`${styles.builderGrid} pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-aria-pressed/builder:opacity-80`} aria-hidden="true" />
        <div className={`${styles.builderScanlines} pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-aria-pressed/builder:opacity-100`} aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[rgb(22_78_99/0)] transition-colors duration-500 group-aria-pressed/builder:bg-[rgb(22_78_99/0.25)]" aria-hidden="true" />
        <div className={`${styles.builderSweep} pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 opacity-0 transition-opacity duration-500 group-aria-pressed/builder:opacity-100`} aria-hidden="true" />
        <div className={`${styles.builderReadout} pointer-events-none absolute bottom-2 left-2 font-mono text-[11px] text-white/0 transition-colors duration-500 group-aria-pressed/builder:text-white/75`} aria-hidden="true">
          Developing...
        </div>
      </div>
    </button>
  );
}

/** Design Studio's wide case study card, beneath the two Work cards (StudioHomeModule.astro on the site). */
function StudioHomeModule() {
  const studio = project('design-studio');
  return (
    <div className="group relative">
      <SiteLink href="/work/design-studio" className="absolute inset-0 z-10 rounded-xl" aria-label={studio.title} />
      <article className="grid overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:shadow-black/5 motion-reduce:translate-y-0 motion-reduce:transition-none lg:grid-cols-[1fr_2fr] dark:group-hover:shadow-black/20">
        <div className="order-2 flex flex-col justify-center gap-4 p-4 lg:order-1 lg:p-8">
          <svg viewBox="0 0 30 30" className="h-8 w-8 text-foreground" aria-hidden="true">
            <rect x=".5" y=".5" width="29" height="29" rx="7" fill="var(--background)" stroke="var(--border)" />
            <g transform="translate(8.3 8) scale(.6)" fill="currentColor">
              <path d="M8.914 0H0V24H8.914V0Z" />
              <path d="M11.314 0H13.029C16.211 0 19.264 1.264 21.514 3.515C23.764 5.765 25.029 8.817 25.029 12C25.029 15.183 23.764 18.235 21.514 20.485C19.264 22.736 16.211 24 13.029 24H11.314V0Z" />
            </g>
          </svg>
          <div>
            <h3 className="mb-2 text-base font-semibold tracking-tight">{studio.title}</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{studio.summary}</p>
          </div>
        </div>
        <div className="texture-bg relative order-1 flex items-center overflow-hidden border-b border-border lg:order-2 lg:border-b-0 lg:border-l">
          <ProjectVisual slug="design-studio" wide />
        </div>
      </article>
    </div>
  );
}

function NewsletterCard({ dark }: { dark: boolean }) {
  return (
    <a href={social.newsletter} target="_blank" rel="noopener noreferrer" className="group block h-full" aria-label="Unknown Arts newsletter">
      <article className="h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:shadow-black/5 dark:group-hover:shadow-black/20">
        <div className={`${styles.newsletterPaper} relative h-full min-h-[260px] w-full overflow-hidden`} data-dark={dark} style={{ backgroundImage: `url(${dark ? paperDark : paperLight})` }}>
          <img src={collageCutout} alt="" width={1232} height={928} className={`${styles.newsletterCollage} pointer-events-none absolute max-w-none transition-transform duration-300 group-hover:scale-[1.03]`} />
          <div className="pointer-events-none absolute top-6 left-6 text-[#b38b6d] dark:text-[#f7ccab]">
            <UAMark color="currentColor" height={24} />
          </div>
          <div className={`${styles.newsletterText} pointer-events-none absolute right-6 bottom-6 left-6`}>
            <p className="text-2xl leading-none font-medium tracking-tight text-foreground sm:text-[1.75rem] dark:text-[#ede9e3]">Unknown Arts</p>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground dark:text-[#ede9e3]/70">Essays on how design, craft and building are changing with AI.</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground/80 dark:text-[#ede9e3]/55">200+ published · 7,700+ readers</p>
          </div>
        </div>
      </article>
    </a>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dark = useDark(rootRef);
  const reduced = useReduced();
  const mobileWave = useRef<HTMLElement>(null);
  const desktopWave = useRef<HTMLElement>(null);
  const ctaWave = useRef<HTMLElement>(null);

  // The hero dissolves from pixel type on the first home visit of a session; the closing line dissolves when it scrolls into view.
  useEffect(() => {
    const isMd = window.matchMedia('(min-width: 768px)').matches;
    const hero = (isMd ? desktopWave : mobileWave).current;
    const inactive = (isMd ? mobileWave : desktopWave).current;
    const cta = ctaWave.current;
    const cleanups: (() => void)[] = [];
    if (inactive) cleanups.push(enablePixelHover(inactive));
    if (reduced) {
      for (const wave of [hero, cta]) if (wave) cleanups.push(enablePixelHover(wave));
      return () => cleanups.forEach(clean => clean());
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem('pixelWaveSeen') === '1';
      sessionStorage.setItem('pixelWaveSeen', '1');
    } catch {
      /* unavailable */
    }
    if (hero) {
      if (seen) cleanups.push(enablePixelHover(hero));
      else dissolvePixelWave(hero);
    }
    let observer: IntersectionObserver | undefined;
    if (cta) {
      observer = new IntersectionObserver(
        entries => {
          if (!entries.some(entry => entry.isIntersecting)) return;
          observer?.disconnect();
          dissolvePixelWave(cta);
        },
        { threshold: 0.3 },
      );
      observer.observe(cta);
    }
    return () => {
      observer?.disconnect();
      cleanups.forEach(clean => clean());
    };
  }, [reduced]);

  const work = projects.filter(p => p.type === 'professional').slice(0, 2);
  const featured = featuredCommunityCommendations.map(name => commendations.find(c => c.name === name)).filter(c => c !== undefined);

  return (
    <Shell current="home" template="showcase">
      <div ref={rootRef}>
        <section className={`${showcaseShell} pt-0 pb-4 sm:pb-10 md:pt-16 lg:pt-16 lg:pb-14`}>
          <div className={`${styles.heroMobile} md:hidden`} data-dark={dark}>
            <div className={`${styles.photoField} mb-8`}>
              <div className="inline-block rotate-2 bg-white p-2 pb-5 shadow-xl shadow-black/15 transition-transform duration-300 hover:scale-[1.02] hover:rotate-0 dark:bg-[#20201e] dark:shadow-black/40">
                <div className="h-36 w-36 overflow-hidden">
                  <img src={profileAvatar} alt="Patrick Morgan" className="block h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <PixelWaveText ref={mobileWave} text={heroHeadline} as="h1" initialSans className="mb-7 max-w-[20rem] text-[2.05rem] leading-[1.08] font-medium tracking-tight" />
            <div className="mb-4 space-y-3 text-[15px] leading-relaxed">
              <p className="text-foreground/80">{heroIntro}</p>
              <p className="text-muted-foreground">
                <CurrentWork />
              </p>
            </div>
          </div>

          <div className={`${styles.heroDesktop} hidden md:flex md:items-center md:gap-10 lg:gap-14`} data-dark={dark}>
            <div className="min-w-0 flex-1">
              <PixelWaveText ref={desktopWave} text={heroHeadline} as="h1" initialSans className="mb-8 text-4xl leading-[1.2] font-medium tracking-tight lg:text-[2.6rem]" />
              <div className="max-w-xl space-y-4 text-base leading-relaxed xl:max-w-2xl">
                <p className="text-foreground/80">
                  {heroIntro} {heroIntroDetail}
                </p>
                <p className="text-muted-foreground">
                  <CurrentWork />
                </p>
              </div>
            </div>
            <div className="relative shrink-0 rotate-2 transition-transform duration-300 hover:scale-[1.02] hover:rotate-0">
              <BuilderPortrait />
            </div>
          </div>
        </section>

        <section className={homeFirstSection}>
          <SectionHeader title="Work" href="/work" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
            {work.map((p, i) => (
              <ProjectCard key={p.id} slug={p.id} title={p.title} description={p.summary ?? p.description} image={p.image} index={i} showDescription />
            ))}
          </div>
          <div className="mt-5 lg:mt-6">
            <StudioHomeModule />
          </div>
        </section>

        <section className={homeSection}>
          <SectionHeader title="Writing" href="/writing" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
            <NewsletterCard dark={dark} />
            <div className="flex flex-col divide-y divide-border">
              {posts.slice(0, 6).map(post => (
                <SiteLink key={post.id} href={`/writing/${post.id}`} className="group flex items-baseline justify-between gap-4 py-3 text-sm transition-colors hover:text-accent">
                  <span className="leading-snug font-medium">{shortTitle(post.title)}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">{monthYear(post.publishedDate)}</span>
                </SiteLink>
              ))}
            </div>
          </div>
        </section>

        <section className={homeSection}>
          <SectionHeader title="Community" href="/community" />
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {communityPhotos.map((photo, i) => (
              <PrintPhoto key={photo.alt} src={photo.src} alt={photo.alt} position={photo.position} tilt={photoTilts[i]} aspect="aspect-[4/3]" />
            ))}
          </div>
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {featured.map(c => (
              <KindWords key={c.name} {...c} />
            ))}
          </div>
        </section>

        <section className={`${homeSection} pb-20 sm:pb-24 lg:pb-28`}>
          <SectionHeader title="Lab" href="/lab" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {homeLabOrder.slice(0, 3).map(entry => (
              <div key={entry.slug} className="flex">
                <LabCard title={entry.title} description={entry.description} href={`/lab/${entry.slug}`} preview={entry.preview} headingLevel="h3" />
              </div>
            ))}
          </div>
        </section>

        <section className={`${showcaseShell} pt-2 pb-20 text-center sm:pb-24 lg:pb-28`}>
          <PixelWaveText ref={ctaWave} text="Let's craft a better future, together." as="p" initialSans className="text-3xl font-medium tracking-tight sm:text-4xl" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            {contactLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                {...(link.path ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.path ? (
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={link.path} />
                  </svg>
                ) : (
                  <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.75} className="shrink-0" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
