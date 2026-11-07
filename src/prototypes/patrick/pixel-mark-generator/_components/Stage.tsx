import { Mark } from './Mark';
import type { MotionId } from './motion';
import type { MarkSpec } from './render';
import { SITE_CREDIT, captionLines, cardLayout, stageColors, type CardSpec } from './share';

// The share card as it will export, laid out with the same numbers the canvas uses.
export function Stage({ mark, card, motion, playing, replay }: { mark: MarkSpec; card: CardSpec; motion: MotionId; playing: boolean; replay: number }) {
  const L = cardLayout(mark, card);
  const { stage, ink } = stageColors(mark.finish, card.backdrop);
  const icon = card.format === 'icon';
  const pct = (n: number, of: number) => `${(n / of) * 100}%`;
  // Card pixels in container-query units, so the caption scales with the preview.
  const cq = (px: number) => `${(px / L.width) * 100}cqw`;
  const [title, detail] = captionLines(mark.text);
  const m = 64 * L.unit;

  return (
    <div
      className="relative mx-auto overflow-hidden rounded-lg border border-border"
      style={{
        aspectRatio: `${L.width} / ${L.height}`,
        width: `min(100%, calc(68vh * ${L.width / L.height}))`,
        containerType: 'inline-size',
        background: icon ? 'repeating-conic-gradient(var(--secondary) 0 25%, var(--background) 0 50%) 0 0 / 20px 20px' : stage,
      }}
    >
      <div className="absolute" style={{ left: pct(L.markX, L.width), top: pct(L.markY, L.height), width: pct(L.markWidth, L.width) }}>
        <Mark spec={mark} motion={motion} playing={playing} replay={replay} title={`Braille ${mark.text.toUpperCase()}`} />
      </div>
      {card.caption && !icon && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between" style={{ padding: `0 ${cq(m)} ${cq(m)}`, color: ink }}>
          <div>
            <div className="font-medium" style={{ fontSize: cq(44 * L.unit), lineHeight: 1, marginBottom: cq(16 * L.unit) }}>
              {title}
            </div>
            <div className="font-mono opacity-60" style={{ fontSize: cq(24 * L.unit), lineHeight: 1 }}>
              {detail}
            </div>
          </div>
          <div className="font-mono opacity-60" style={{ fontSize: cq(24 * L.unit), lineHeight: 1 }}>
            {SITE_CREDIT}
          </div>
        </div>
      )}
    </div>
  );
}
