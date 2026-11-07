/** @studio-id zkbdcbmn14z8sez4 */
import { useMemo, useState } from 'react';
import { Link, useNavigate } from '@module/prototypes';
import { Button } from '@/systems/website/components/button';
import { ALPHABET, brailleChar, cellFor } from './_components/braille';
import { CONTAINERS, DOT_SHAPES, FINISHES, finishById, type Container, type DotShape } from './_components/finishes';
import { Mark } from './_components/Mark';
import { MOTIONS, type MotionId } from './_components/motion';
import type { MarkSpec } from './_components/render';
import { saveSettings } from './_components/settings';

type Icon = { letter: string; finish: string; dot: DotShape; container: Container; ghost: boolean; motion: MotionId };

const MOVING = MOTIONS.filter(m => m.id !== 'still').map(m => m.id);

/** A seeded mix of finishes and shapes, so a shuffle can be repeated. */
function mix(seed: number, letters: string[], mode: 'mixed' | 'plain' | 'bold'): Icon[] {
  let state = seed * 9301 + 49297;
  const rand = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  const pool = FINISHES.filter(f => mode === 'mixed' || f.group === mode);
  const dots: DotShape[] = mode === 'plain' ? ['pixel'] : DOT_SHAPES.map(d => d.id);
  return letters.map((letter, i) => ({
    letter,
    finish: pool[(i + Math.floor(rand() * pool.length)) % pool.length].id,
    dot: letter === 'p' ? 'pixel' : dots[Math.floor(rand() * dots.length)],
    container: mode === 'plain' ? 'rounded' : (['rounded', 'squircle', 'squircle', 'circle'] as Container[])[Math.floor(rand() * 4)],
    ghost: rand() < 0.3,
    motion: MOVING[Math.floor(rand() * MOVING.length)],
  }));
}

const HOME = ALPHABET.filter(l => !'pmua'.includes(l));
const DOCK = ['p', 'm', 'u', 'a'];

function specOf(icon: Icon): MarkSpec {
  return { text: icon.letter, finish: finishById(icon.finish), dot: icon.dot, container: icon.container, ghost: icon.ghost, layout: 'tile' };
}

function AppIcon({ icon, label, onOpen }: { icon: Icon; label?: boolean; onOpen: (icon: Icon) => void }) {
  const [hover, setHover] = useState(false);
  const spec = useMemo(() => specOf(icon), [icon]);
  return (
    <button
      type="button"
      onClick={() => onOpen(icon)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={`Open ${icon.letter.toUpperCase()} in the maker`}
      className="group flex min-w-0 flex-col items-center gap-1 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <Mark
        spec={spec}
        motion={icon.motion}
        playing={hover}
        className="w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-transform duration-200 [transition-timing-function:var(--motion-ease-out-quick)] group-hover:scale-[1.06] group-active:scale-95"
      />
      {label && <span className="text-[0.62rem] leading-none font-medium text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">{icon.letter.toUpperCase()}</span>}
    </button>
  );
}

export default function IconSet() {
  const [seed, setSeed] = useState(4);
  const [mode, setMode] = useState<'mixed' | 'plain' | 'bold'>('mixed');
  const navigate = useNavigate();
  const home = useMemo(() => mix(seed, HOME, mode), [seed, mode]);
  const dock = useMemo(() => mix(seed + 17, DOCK, mode), [seed, mode]);

  const open = (icon: Icon) => {
    saveSettings({ text: icon.letter, finish: icon.finish, dot: icon.dot, container: icon.container, ghost: icon.ghost, motion: icon.motion, layout: 'tile' });
    navigate('maker');
  };

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="mx-auto max-w-5xl px-6 pt-12 pb-10 sm:pt-16">
        <Link to="maker" className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Maker
        </Link>
        <h1 className="mb-3 text-4xl font-medium tracking-tight">Icon set</h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          The alphabet as a home screen. Every icon is a braille letter in the site’s pixels, styled its own way. Hover one to see it move, or open it in
          the maker.
        </p>
      </header>

      <main className="mx-auto grid max-w-5xl gap-16 px-6 pb-24">
        <section className="grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
          <div className="mx-auto w-full max-w-[22rem]">
            <div className="rounded-[3.2rem] bg-[#0e0a07] p-2.5 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
              <div
                className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[2.7rem] px-5 pt-12 pb-3.5"
                style={{ background: 'radial-gradient(120% 70% at 20% 0%, #f2c58a 0%, #d9825a 38%, #6b3a52 72%, #241a2e 100%)' }}
              >
                <div className="absolute top-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" aria-hidden />
                <div className="mb-5 text-center text-white/95">
                  <div className="text-[2.9rem] leading-none font-medium tracking-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.15)]">9:41</div>
                  <div className="mt-1 font-mono text-[0.7rem] text-white/75">{[...'pixel'].map(ch => brailleChar(cellFor(ch) ?? [])).join('')}</div>
                </div>
                <div className="grid grid-cols-4 gap-x-5 gap-y-2.5">
                  {home.map(icon => (
                    <AppIcon key={icon.letter} icon={icon} label onOpen={open} />
                  ))}
                </div>
                <div className="mt-auto grid grid-cols-4 gap-5 rounded-[1.7rem] bg-white/20 px-3.5 py-3 backdrop-blur-sm">
                  {dock.map(icon => (
                    <AppIcon key={icon.letter} icon={icon} onOpen={open} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid max-w-md gap-6">
            <div className="site-prose">
              <p>
                The mark started as the braille letter P: four raised dots in a six-dot cell. Every other letter fits in the same cell, so the whole
                alphabet can share one construction and still read as a family.
              </p>
              <p>The dock spells the beginning of a name. The rest is the alphabet in order, minus those four.</p>
            </div>
            <div className="grid gap-3">
              <div role="radiogroup" aria-label="Finishes" className="flex w-fit rounded-lg border border-border bg-card p-0.5">
                {(['mixed', 'plain', 'bold'] as const).map(m => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={mode === m}
                    onClick={() => setMode(m)}
                    className={
                      mode === m
                        ? 'h-7 rounded-md bg-background px-3 text-[0.8rem] font-medium text-foreground shadow-sm'
                        : 'h-7 rounded-md px-3 text-[0.8rem] font-medium text-muted-foreground hover:text-foreground'
                    }
                  >
                    {m === 'mixed' ? 'Mixed' : m === 'plain' ? 'Plain' : 'Bold'}
                  </button>
                ))}
              </div>
              <div>
                <Button variant="outline" onClick={() => setSeed(s => s + 1)}>
                  Shuffle
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-16">
          <h2 className="mb-2 text-base font-semibold tracking-tight">Every finish</h2>
          <p className="mb-10 max-w-xl text-sm text-muted-foreground">The site’s P in each finish, from the plain ones taken from the site’s palette to the louder ones.</p>
          <div className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-5 lg:grid-cols-7">
            {FINISHES.map(f => (
              <FinishTile key={f.id} finishId={f.id} name={f.name} onOpen={open} />
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-16">
          <h2 className="mb-2 text-base font-semibold tracking-tight">Pixels and containers</h2>
          <p className="mb-10 max-w-xl text-sm text-muted-foreground">Four pixel shapes in four containers. Pixel in Rounded is the mark on the site today.</p>
          <div className="grid grid-cols-[auto_repeat(4,minmax(0,1fr))] items-center gap-x-4 gap-y-6 sm:gap-x-8">
            <span />
            {CONTAINERS.map(c => (
              <span key={c.id} className="text-center text-sm font-medium text-muted-foreground">
                {c.name}
              </span>
            ))}
            {DOT_SHAPES.map(d => (
              <ShapeRow key={d.id} dot={d.id} name={d.name} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function FinishTile({ finishId, name, onOpen }: { finishId: string; name: string; onOpen: (icon: Icon) => void }) {
  const icon = useMemo<Icon>(() => ({ letter: 'p', finish: finishId, dot: 'pixel', container: 'rounded', ghost: false, motion: 'pulse' }), [finishId]);
  const [hover, setHover] = useState(false);
  const spec = useMemo(() => specOf(icon), [icon]);
  return (
    <button
      type="button"
      onClick={() => onOpen(icon)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Mark spec={spec} motion="pulse" playing={hover} className="w-full max-w-24" />
      <span className="text-sm font-medium text-muted-foreground">{name}</span>
    </button>
  );
}

function ShapeRow({ dot, name }: { dot: DotShape; name: string }) {
  return (
    <>
      <span className="text-sm font-medium text-muted-foreground">{name}</span>
      {CONTAINERS.map(c => (
        <div key={c.id} className="flex justify-center">
          <Mark
            spec={{ text: 'p', finish: finishById(c.id === 'none' ? 'paper' : 'ink'), dot, container: c.id, ghost: true, layout: 'tile' }}
            className="w-full max-w-20"
          />
        </div>
      ))}
    </>
  );
}
