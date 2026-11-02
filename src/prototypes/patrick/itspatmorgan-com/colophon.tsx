/** @studio-id zwkxxbkcgma91bb2 */
import type { ReactNode } from 'react';
import { SiteLink } from '@/systems/website/components/site-shell';
import { Shell } from './_components/Shell';

// Recreates itspatmorgan.com/colophon (src/pages/colophon.astro), reading template.
const linkStyle = 'transition-colors hover:text-accent';
const sections: { title: string; rows: { label: string; href: string; body: ReactNode }[] }[] = [
  {
    title: "Stack",
    rows: [
      { label: "Astro v7", href: "https://astro.build/", body: "Framework. Ships zero JS by default; content collections enforce schema-validated frontmatter at build time." },
      { label: "Tailwind CSS v4", href: "https://tailwindcss.com/", body: "Styling. CSS custom properties for theming; OKLCH color tokens for perceptually-uniform light and dark palettes." },
      { label: "shadcn/ui", href: "https://ui.shadcn.com/", body: "Component library. Base-nova style, built on Radix UI primitives. Themed to match the site's warm, minimal aesthetic." },
      { label: "React", href: "https://react.dev/", body: "Used only where interactivity requires it — the theme toggle, the generative art surfaces, and the local time widget in the footer." },
    ],
  },
  {
    title: "AI agents",
    rows: [
      { label: "Claude Code", href: "https://claude.ai/code", body: "AI coding agent for interactive sessions — designing and building features collaboratively in the terminal." },
      { label: "OpenAI Codex", href: "https://openai.com/codex", body: "AI coding agent for autonomous background tasks — running longer agentic loops without occupying a terminal session." },
    ],
  },
  {
    title: "Infrastructure",
    rows: [
      { label: "Cloudflare Workers", href: "https://workers.cloudflare.com/", body: "Static hosting, with a preview link for every pull request." },
      { label: "GitHub Actions", href: "https://github.com/features/actions", body: <>Automated deployment on push to <code className="font-mono text-xs">main</code>.</> },
      { label: "GitHub Issues", href: "https://github.com/features/issues", body: "Task tracking. Every enhancement starts as an issue, gets a plan, ships on a feature branch, and merges via PR." },
    ],
  },
];

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function Colophon() {
  return (
    <Shell>
      <section className="mx-auto max-w-3xl px-6 pt-12 pb-16 sm:pt-24">
        <h1 className="mb-3 text-4xl font-medium tracking-tight sm:text-5xl">Colophon</h1>
        <p className="mb-16 text-base leading-relaxed text-muted-foreground">
          What this site is made of and how it gets built. The full story is in{' '}
          <SiteLink href="/writing/how-i-rebuilt-my-portfolio-with-claude-code" className="underline underline-offset-2 transition-colors hover:text-accent">
            How I Rebuilt My Portfolio With Claude Code
          </SiteLink>
          .
        </p>
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={section.title} className={i > 0 ? 'border-t border-border pt-12' : undefined}>
              <p className="mb-6 text-base font-semibold tracking-tight text-foreground">{section.title}</p>
              <dl className="space-y-5">
                {section.rows.map(row => (
                  <div key={row.label} className="grid grid-cols-[10rem_1fr] gap-4 text-sm sm:grid-cols-[12rem_1fr]">
                    <dt className="pt-0.5 font-mono text-xs text-muted-foreground">
                      <a href={row.href} {...external} className={linkStyle}>
                        {row.label}
                      </a>
                    </dt>
                    <dd className="leading-relaxed">{row.body}</dd>
                  </div>
                ))}
                {section.title === 'Stack' && (
                  <div className="grid grid-cols-[10rem_1fr] gap-4 text-sm sm:grid-cols-[12rem_1fr]">
                    <dt className="pt-0.5 font-mono text-xs text-muted-foreground">
                      <a href="https://vercel.com/font" {...external} className={linkStyle}>
                        Geist
                      </a>
                    </dt>
                    <dd className="leading-relaxed">
                      <a href="https://vercel.com/font" {...external} className={linkStyle}>Sans</a> for body,{' '}
                      <a href="https://vercel.com/font?type=mono" {...external} className={linkStyle}>Mono</a> for labels and code,{' '}
                      <a href="https://vercel.com/font?type=pixel" {...external} className={linkStyle}>Pixel</a> for the hero animation. All from Vercel.
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
