/** @studio-id fz3vh69ngrtjt4y7 */
import { Fragment, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Copy01Icon,
  GithubIcon,
  HugeiconsIcon,
  Robot01Icon,
  UserIcon,
} from '@/systems/website/libraries/icons';
import { SiteLink, social } from '@/systems/website/components/site-shell';
import { buttonVariants } from '@/systems/website/components/button';
import { PixelWaveText, dissolvePixelWave, enablePixelHover } from '@/systems/website/components/pixel-wave-text';
import { Slide } from '@/systems/website/components/case-study';
import {
  StudioAsk,
  StudioDocs,
  StudioHero,
  StudioRange,
  StudioShare,
  StudioSystems,
  agentHarnesses,
  installationPrompt,
  publishingGuide,
  publishingPrompt,
  setupGuide,
} from '@/systems/website/components/design-studio';
import { StudioPress } from '@/systems/website/components/studio-case';
import { useReduced } from '@/systems/website/components/theme-hooks';
import { Shell } from './_components/Shell';
import { mediaFeatures } from './_data/community';
import { joeSalowitz, profileLivingRoom, signature } from './_data/images';
import { agentGuide } from './_data/design-studio-agent';

// Recreates itspatmorgan.com/design-studio (src/pages/design-studio.astro), showcase template, with its Human and Agent modes.
// Page styles are the Website system's styles/site/ds-landing.css.
const repository = 'https://github.com/itspatmorgan/design-studio';
const liveDemo = 'https://itspatmorgan.com/design-studio-demo/';
// Go deeper: the Dive Club interview, the Maven lesson and Xinran Ma's article, as the case study shows its press.
const learnMore = mediaFeatures.filter(item => item.title !== 'Design Studio open-source launch');

// Community tools that pair with Design Studio (checked against each project's own page, 2026-10-31).
const communityTools = [
  { name: 'DialKit', by: 'Josh Puckett', does: 'Live controls beside your interface for springs, easing, color and layout, so you tune a screen by feel and keep the values.', image: 'https://dialkit.dev/og.png', href: 'https://www.dialkit.dev/' },
  { name: 'Stageshow', by: 'Benji Taylor', does: 'A skill that has your agent build product UI demos, cursor walkthroughs and feature cards, then film them to check its work.', image: 'https://benji.org/media/stageshow/og.png', href: 'https://benji.org/stageshow' },
  { name: 'Skills for design engineers', by: 'Emil Kowalski', does: 'Skills to build, review and tune animation, test a UI with worst-case data, and make a web app feel native on a phone.', image: 'https://emilkowal.ski/skill/opengraph-image.jpg', href: 'https://emilkowal.ski/skill' },
];

const arrow = <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="shrink-0" />;

/** Copies text, showing a confirmation on the control for a moment. */
function useCopy(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const copy = async (text: string, done: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setStatus(done);
      window.setTimeout(() => setCopied(false), resetMs);
      return true;
    } catch {
      setStatus("Couldn't copy. Select and copy the text directly.");
      return false;
    }
  };
  return { copied, status, copy };
}

/** A long URL breaks evenly across lines instead of leaving its hyphen alone on one. */
function PromptText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(https:\/\/\S+?)(?=[.,]?(?:\s|$))/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="ds-url">
            {part.split(/(?<=\/)/).map((segment, j) => (
              <Fragment key={j}>
                {j > 0 && <wbr />}
                {segment}
              </Fragment>
            ))}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function PromptCard({ id, step, title, prompt, guide, guideLabel, tools, label }: { id: string; step: number; title: string; prompt: string; guide: string; guideLabel: string; tools: string; label: string }) {
  const promptRef = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);
  const { copied, copy } = useCopy();
  useLayoutEffect(() => {
    const el = promptRef.current;
    if (el) setLong(el.scrollHeight > el.clientHeight + 1);
  }, []);
  return (
    <li id={id} className="ds-step" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>
        <span className="ds-step-num" aria-hidden="true">
          {step}
        </span>
        {title}
      </h3>
      <div className={open ? 'ds-prompt-box is-open' : 'ds-prompt-box'}>
        <p ref={promptRef} className="ds-prompt">
          <PromptText text={prompt} />
        </p>
        {(long || open) && (
          <button type="button" className="ds-prompt-more" aria-expanded={open} onClick={() => setOpen(value => !value)}>
            {open ? 'Show less' : 'Show full prompt'}
          </button>
        )}
      </div>
      <div className="ds-step-foot">
        <button type="button" className={buttonVariants({ className: 'h-9 px-4' })} aria-label={label} onClick={() => copy(prompt, 'Prompt copied to clipboard.')}>
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
        <a href={guide}>
          {guideLabel} {arrow}
        </a>
      </div>
      <p className="ds-step-tools">{tools}</p>
    </li>
  );
}

function ModeTabs({ mode, onChange }: { mode: 'human' | 'agent'; onChange: (mode: 'human' | 'agent') => void }) {
  const tabs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState<{ width: number; left: number } | null>(null);
  const index = mode === 'human' ? 0 : 1;
  useLayoutEffect(() => {
    const tab = tabs.current[index];
    if (tab) setIndicator({ width: tab.offsetWidth, left: tab.offsetLeft });
  }, [index]);
  const items: { key: 'human' | 'agent'; label: string; icon: typeof UserIcon; mono?: boolean }[] = [
    { key: 'human', label: 'Human', icon: UserIcon },
    { key: 'agent', label: 'Agent', icon: Robot01Icon, mono: true },
  ];
  return (
    <nav aria-label="Reading mode" role="tablist" className="relative isolate flex rounded-full border border-border p-1" data-studio-modes data-initialized={indicator ? 'true' : undefined}>
      <span className="mode-indicator" aria-hidden="true" style={indicator ? { width: indicator.width, transform: `translateX(${indicator.left}px)` } : undefined} />
      {items.map((item, i) => (
        <a
          key={item.key}
          ref={el => {
            tabs.current[i] = el;
          }}
          id={`studio-${item.key}-tab`}
          href={`#studio-${item.key}`}
          role="tab"
          aria-selected={mode === item.key}
          aria-label={item.label}
          title={item.label}
          onClick={event => {
            event.preventDefault();
            onChange(item.key);
          }}
          className={`mode-tab rounded-full px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${item.mono ? 'font-mono' : ''}`}
        >
          <span className="studio-mode-icon" aria-hidden="true">
            <HugeiconsIcon icon={item.icon} size={18} />
          </span>
          <span className="studio-control-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

function StudioMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" className={className} aria-hidden="true">
      <rect x=".5" y=".5" width="29" height="29" rx="7" fill="var(--background)" stroke="var(--border)" />
      <g transform="translate(8.3 8) scale(.6)" fill="currentColor">
        <path d="M8.914 0H0V24H8.914V0Z" />
        <path d="M11.314 0H13.029C16.211 0 19.264 1.264 21.514 3.515C23.764 5.765 25.029 8.817 25.029 12C25.029 15.183 23.764 18.235 21.514 20.485C19.264 22.736 16.211 24 13.029 24H11.314V0Z" />
      </g>
    </svg>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="studio-text-link">
      {children} {arrow}
    </a>
  );
}

export default function DesignStudio() {
  const [mode, setMode] = useState<'human' | 'agent'>('human');
  const reduced = useReduced();
  const headline = useRef<HTMLHeadingElement>(null);
  const hero = useCopy(2600);
  const agent = useCopy();

  // The headline dissolves from pixel type on the first visit of a session, one sweep across both lines, as the home hero does.
  useEffect(() => {
    const lines = Array.from(headline.current?.querySelectorAll<HTMLElement>('[data-pixel-wave]') ?? []);
    let seen = true;
    try {
      seen = Boolean(sessionStorage.getItem('studioWaveSeen'));
      sessionStorage.setItem('studioWaveSeen', '1');
    } catch {
      /* unavailable */
    }
    if (seen || reduced) {
      const cleanups = lines.map(line => enablePixelHover(line));
      return () => cleanups.forEach(clean => clean());
    }
    let before = 0;
    for (const line of lines) {
      dissolvePixelWave(line, before / 8);
      before += line.querySelectorAll('[data-pw-char]').length;
    }
  }, [reduced]);

  return (
    <Shell template="showcase">
      <div className="studio-page mx-auto w-full max-w-[1136px] px-6 sm:px-8 lg:px-14">
        <header className="studio-header flex items-center justify-between gap-6 pt-9 sm:pt-12">
          <SiteLink href="/design-studio" className="studio-brand flex shrink-0 items-center gap-3 font-medium tracking-tight" aria-label="Design Studio home — public beta, under active development">
            <StudioMark className="studio-mark text-foreground" />
            <span className="studio-brand-label flex items-center gap-2 whitespace-nowrap">
              <span className="studio-brand-name text-lg">Design Studio</span>
              <span className="studio-beta rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-xs leading-tight tracking-wide text-muted-foreground" title="Public beta · Under active development">
                Beta
              </span>
            </span>
          </SiteLink>
          <div className="studio-header-controls ml-auto flex shrink-0 items-center gap-4 sm:gap-6">
            <a href={repository} aria-label="View Design Studio on GitHub" title="View Design Studio on GitHub" className="studio-github inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              <span aria-hidden="true">
                <HugeiconsIcon icon={GithubIcon} size={20} />
              </span>
              <span className="studio-control-label">GitHub</span>
            </a>
            <ModeTabs mode={mode} onChange={setMode} />
          </div>
        </header>

        <div id="studio-human" role="tabpanel" aria-labelledby="studio-human-tab" hidden={mode !== 'human'} className="cs-page sc ds-landing">
          <header className="cs-slide cs-hero ds-hero" aria-labelledby="studio-title">
            <span className="lw-dots" aria-hidden="true" />
            <h1 id="studio-title" ref={headline}>
              <PixelWaveText text="Design with intent." wave="studio-headline" initialSans />
              <br />
              <PixelWaveText text="Build with an agent." wave="studio-headline" initialSans />
            </h1>
            <p>An open-source prototype sandbox for designers and product managers who build with agents.</p>
            <div className="sc-next ds-actions">
              <a
                href="#get-started"
                className="is-primary"
                onClick={async event => {
                  event.preventDefault();
                  if (!(await hero.copy(installationPrompt, 'Setup prompt copied. Paste it into your coding agent.'))) document.querySelector('#get-started')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <HugeiconsIcon icon={Copy01Icon} size={16} className="shrink-0" />
                <span data-copy-face>{hero.copied ? 'Copied. Paste it into your agent' : 'Copy setup prompt'}</span>
              </a>
              <a href={liveDemo}>
                <span className="ds-try">Try the live demo</span>
                <span className="ds-try-short">Live demo</span> {arrow}
              </a>
            </div>
            <p className="ds-works">
              Works with
              {agentHarnesses.map(harness => (
                <span key={harness.title} className="ds-harness">
                  <span className="hero-vendor-logo ds-logo" style={{ '--vendor-logo': `url(${harness.logo})` } as React.CSSProperties} aria-hidden="true" />
                  {harness.title}
                </span>
              ))}
            </p>
            <div className="ds-hero-studio">
              <StudioAsk />
            </div>
          </header>

          <Slide id="browse-title" title="One workspace for you and your agent" line="Context, flows, screens and canvases sit side by side. Your agent builds them, and you refine them in the same place.">
            <StudioHero />
          </Slide>

          <section className="cs-slide ds-proof" aria-label="Who uses Design Studio">
            <figure className="ds-quote">
              <blockquote>“We have essentially replaced Figma with this at Sublime.”</blockquote>
              <figcaption>
                <img className="ds-quote-face" src={joeSalowitz} alt="" width={40} height={40} loading="lazy" decoding="async" />
                <span>
                  <b>Joe Salowitz</b>
                  <span>
                    Product Designer at Sublime,{' '}
                    <a href="https://x.com/JoeSalowitz/status/2114915923283120187" target="_blank" rel="noopener noreferrer">
                      on X
                    </a>
                  </span>
                </span>
              </figcaption>
            </figure>
            <SiteLink href="/work/design-studio" className="ds-case-link">
              How Sublime’s product team uses it <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="shrink-0" />
            </SiteLink>
          </section>

          <Slide id="why-title" title="The flexibility of a one‑off, the truth of production" line="Design Studio builds with your product’s real components, so designs look true. It lives in its own repo, so you can explore freely.">
            <StudioRange />
          </Slide>

          <Slide id="systems-title" title="Define a system, then build with it" line="A system holds your theme, components and rules. Keep one for each job, like Product and Marketing, both on your brand. Each prototype names the system it builds with.">
            <div className="ds-square">
              <StudioSystems />
            </div>
          </Slide>

          <Slide id="context-title" title="Keep the thinking with the work" line="Briefs, decisions and open questions sit beside the prototype as Markdown. Your team reads them on the page, and your agent edits the same files.">
            <div className="ds-square">
              <StudioDocs />
            </div>
          </Slide>

          <section className="cs-slide ds-share" aria-labelledby="share-title">
            <h2 id="share-title">Share a lasting link with your team</h2>
            <p>
              Your agent publishes the Studio to your host and gives you one link. Your team opens it in any browser, with nothing to install.{' '}
              <a className="ds-inline-link" href={liveDemo}>
                See a published Studio {arrow}
              </a>
            </p>
            <StudioShare />
          </section>

          <section className="cs-slide ds-tools" aria-labelledby="tools-title">
            <h2 id="tools-title">A home for community-built design tools</h2>
            <p>Design Studio is a community project, built as a base for other people’s tools. Add a skill or library from the community, and your agent uses it in every prototype. A few that pair well:</p>
            <ul className="ds-tools-grid">
              {communityTools.map(tool => (
                <li key={tool.name}>
                  <a href={tool.href} className="ds-tool">
                    <span className="ds-tool-art">
                      <img src={tool.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="ds-tool-text">
                      <span className="ds-tool-name">
                        {tool.name} {arrow}
                      </span>
                      <span className="ds-tool-by">{tool.by}</span>
                      <span className="ds-tool-does">{tool.does}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section id="get-started" className="cs-slide ds-start" aria-labelledby="setup-title">
            <h2 id="setup-title">Get started with your agent</h2>
            <p>Two prompts: one runs the Studio on your computer, the other publishes a link your team can open.</p>
            <ol className="ds-start-grid">
              <PromptCard id="install" step={1} title="Install and run locally" prompt={installationPrompt} guide={setupGuide} guideLabel="Installation guide" tools="Agents like Claude Code, Codex and Cursor" label="Copy Design Studio installation prompt" />
              <PromptCard id="publish" step={2} title="Publish and share" prompt={publishingPrompt} guide={publishingGuide} guideLabel="Publishing guide" tools="Hosts like Cloudflare, Vercel and Netlify" label="Copy Design Studio publishing prompt" />
            </ol>
            <p className="ds-community">
              Built something? <a href="https://github.com/itspatmorgan/design-studio/discussions">Share it with the community on GitHub</a>, or tag <a href={social.x}>@itspatmorgan</a> on X.
            </p>
            <p className="sr-only" role="status" aria-live="polite">
              {hero.status}
            </p>
          </section>

          <section className="cs-slide ds-learn" aria-labelledby="learn-title">
            <h2 id="learn-title">Go deeper</h2>
            <p>An interview, a live lesson and an article on why Design Studio exists and how teams use it.</p>
            <StudioPress items={learnMore} />
          </section>

          <section className="ds-note" aria-labelledby="about-studio-title">
            <h2 id="about-studio-title" className="text-3xl font-medium tracking-tight sm:text-4xl">
              A note from the creator
            </h2>
            <div className="mt-8 grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14">
              <div className="creator-portrait-field relative isolate flex justify-center py-8 md:order-2 md:self-start md:py-0">
                <SiteLink
                  href="/about"
                  aria-label="About Patrick Morgan"
                  className="relative z-10 block shrink-0 rotate-2 bg-white p-2 pb-8 shadow-2xl shadow-black/20 transition-transform duration-300 hover:scale-[1.02] hover:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none lg:p-3 lg:pb-10 dark:bg-[#20201e] dark:shadow-black/50"
                >
                  <div className="h-52 w-52 overflow-hidden lg:h-64 lg:w-64 xl:h-72 xl:w-72">
                    <img src={profileLivingRoom} alt="Patrick Morgan" loading="lazy" className="block h-full w-full scale-[1.55] object-cover object-[43%_54%]" />
                  </div>
                </SiteLink>
              </div>
              <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground md:order-1">
                <p>Hello friend,</p>
                <p>Design Studio is something I’ve wanted to exist for years.</p>
                <p>
                  Over a decade ago, I started my tech career as a front-end developer embedded on a product design team. Prototyping and design technology have been central to my work ever since. This year, coding agents finally made it possible to build the environment I’d imagined and make that way of working accessible to more teams.
                </p>
                <p>
                  Design Studio carries years of thinking and experimentation, shaped by using early versions with my teammates at Sublime Security. Their support and our day-to-day product and marketing work helped make it what it is.
                </p>
                <p>
                  I’m sharing Design Studio freely and openly to help bring more good design into the world. I hope the community will make it better together.{' '}
                  <a href={repository} className="text-foreground underline underline-offset-4 transition-colors hover:text-accent">
                    Explore the code on GitHub
                  </a>
                  , adapt it, or contribute.
                </p>
                <p>I’d love to see what you build, hear what gets in your way, and help you make Design Studio fit your team.</p>
                <img src={signature} alt="Patrick Morgan" width={764} height={376} loading="lazy" className="h-auto w-32 dark:invert" />
                <nav aria-label="More about Design Studio" className="pt-3 text-foreground">
                  <TextLink href="https://www.unknownarts.com/p/build-a-design-os">Read the Design Studio story</TextLink>
                  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                    <li>
                      <TextLink href={social.x}>X profile</TextLink>
                    </li>
                    <li>
                      <TextLink href={social.newsletter}>Unknown Arts newsletter</TextLink>
                    </li>
                    <li>
                      <TextLink href={repository}>GitHub repo</TextLink>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        </div>

        <section id="studio-agent" role="tabpanel" aria-labelledby="studio-agent-tab" hidden={mode !== 'agent'} className="pt-16 pb-20 sm:pt-20 sm:pb-24">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Design Studio</h1>
          <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">A project brief and setup guide for your coding agent.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="button" className={buttonVariants({ variant: 'outline', size: 'sm' })} onClick={() => agent.copy(agentGuide, 'Guide copied to clipboard.')}>
              {agent.copied ? 'Copied' : 'Copy guide'}
            </button>
            <a href="https://itspatmorgan.com/design-studio/agent.txt" className="inline-flex items-center gap-2 text-sm text-foreground underline underline-offset-4 transition-colors hover:text-accent">
              Open plain text {arrow}
            </a>
          </div>
          <pre className="mt-8 rounded-xl border border-border bg-card p-5 font-mono text-xs leading-relaxed break-words whitespace-pre-wrap sm:p-8 sm:text-sm">
            <code>{agentGuide}</code>
          </pre>
          <p className="sr-only" role="status" aria-live="polite">
            {agent.status}
          </p>
        </section>
      </div>
    </Shell>
  );
}
