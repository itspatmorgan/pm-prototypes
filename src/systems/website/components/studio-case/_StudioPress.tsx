import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon, PlayIcon } from '@hugeicons/core-free-icons';
import { mediaFeatures, type MediaFeature } from './media';

// Where Design Studio was seen outside Sublime, shown as the media itself. A cover that can't load falls back to the source's
// name on a quiet fill. Ported from itspatmorgan.com's StudioPress.astro; the case study shows the videos and the launch post.
export default function StudioPress({ items = mediaFeatures.filter(item => item.kind !== 'article') }: { items?: MediaFeature[] }) {
  return (
    <ul className="sc-press">
      {items.map(item => (
        <li key={item.title}>
          <a href={item.href} target="_blank" rel="noopener noreferrer">
            <span className="sc-press-media">
              <span className="sc-press-fallback" aria-hidden="true">
                {item.fallback}
              </span>
              <img src={item.image} alt={item.alt} loading="lazy" onError={event => event.currentTarget.remove()} />
              {item.kind !== 'article' && (
                <span className="sc-press-play" aria-hidden="true">
                  <HugeiconsIcon icon={PlayIcon} size={18} strokeWidth={1.8} />
                </span>
              )}
            </span>
            <span className="sc-press-text">
              <span className="sc-press-title">
                {item.title}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.8} />
              </span>
              <span className="sc-press-sub">{item.sub}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
