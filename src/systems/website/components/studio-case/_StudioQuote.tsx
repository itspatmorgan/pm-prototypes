import { HugeiconsIcon } from '@hugeicons/react';
import { GitMergeIcon, Tick02Icon } from '@hugeicons/core-free-icons';

// A teammate's words, as a slide of their own: Joe's public quote of Patrick's launch post on X (2026-10), then Joe's own pull
// request going in, from the Studio repo's timeline. Ported from itspatmorgan.com's StudioQuote.astro.
export default function StudioQuote() {
  return (
    <section className="cs-slide sc-quote-slide" aria-label="Joe Salowitz on Design Studio">
      <figure className="sc-quote">
        <blockquote>“This isn’t just some little side project y’all — we have essentially replaced Figma with this at Sublime.”</blockquote>
        <figcaption>
          Joe Salowitz, Product Designer at Sublime,{' '}
          <a href="https://x.com/JoeSalowitz/status/2114915923283120187" target="_blank" rel="noopener noreferrer">
            on X
          </a>
        </figcaption>
      </figure>
      <ol className="sc-pr-log" aria-label="Joe's pull request to Design Studio">
        <li>
          <span className="sc-pr-dot is-ok">
            <HugeiconsIcon icon={Tick02Icon} size={13} strokeWidth={2.4} />
          </span>
          <span>
            <b>github-actions</b> <i>Bot</i> approved these changes
          </span>
        </li>
        <li>
          <span className="sc-pr-dot">
            <HugeiconsIcon icon={GitMergeIcon} size={14} strokeWidth={1.8} />
          </span>
          <span>
            <b>joesalowitz</b> enabled auto-merge (squash)
          </span>
        </li>
      </ol>
    </section>
  );
}
