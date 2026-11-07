/** @studio-id 678vjx9adq67sdtn */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from '@module/prototypes';
import { ALPHABET, brailleChar, cellFor } from './_components/braille';
import { PlayIcon } from './_components/controls';
import { finishById } from './_components/finishes';
import { FoldMark, Mark, useReducedMotion } from './_components/Mark';
import { MOTIONS, type MotionId } from './_components/motion';
import { Nav } from './_components/Nav';
import type { MarkSpec } from './_components/render';
import { saveSettings } from './_components/settings';

const ink = (text = 'p', overrides: Partial<MarkSpec> = {}): MarkSpec => ({
  text,
  finish: finishById('ink'),
  dot: 'pixel',
  container: 'rounded',
  ghost: false,
  layout: 'lockup',
  ...overrides,
});

export default function Motion() {
  const reduced = useReducedMotion();
  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="mx-auto max-w-3xl px-6 pt-12 pb-12 sm:pt-16">
        <Nav current="motion" />
        <h1 className="mb-4 text-4xl font-medium tracking-tight">Motion</h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Six dots are enough to move with. The mark can fold away, spin while something loads, and settle back into a letter.
        </p>
        {reduced && <p className="mt-4 text-sm text-muted-foreground">Your system asks for reduced motion, so the marks here hold still.</p>}
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {MOTIONS.filter(m => m.id !== 'still').map(m => (
            <MotionCard key={m.id} motion={m.id} name={m.name} note={m.note} />
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-10 max-w-xl">
            <h2 className="mb-3 text-base font-semibold tracking-tight">In the interface</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">The same motion, put to work at the sizes it would actually ship at.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <UseCard label="Disclosure">
              <Disclosure />
            </UseCard>
            <UseCard label="Button loader">
              <SaveButton />
            </UseCard>
            <UseCard label="Page loader" wide>
              <PageLoader />
            </UseCard>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-10 max-w-xl">
            <h2 className="mb-3 text-base font-semibold tracking-tight">Why the loader works</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The classic terminal spinner is made of braille characters. Its last frame, {brailleChar([1, 2, 3, 4])}, is dots 1, 2, 3 and 4: the
              letter P. So the site’s mark was already hiding in a loading animation.
            </p>
          </div>
          <SpinnerStrip />
        </div>
      </section>
    </div>
  );
}

function MotionCard({ motion, name, note }: { motion: MotionId; name: string; note: string }) {
  const [replay, setReplay] = useState(0);
  const navigate = useNavigate();
  const spec = useMemo(() => ink(motion === 'decode' ? 'pm' : 'p'), [motion]);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex aspect-square items-center justify-center rounded-lg border border-border bg-card p-6">
        <Mark spec={spec} motion={motion} playing replay={replay} className={motion === 'decode' ? 'w-24' : 'w-16'} />
        <button
          type="button"
          aria-label={`Replay ${name}`}
          onClick={() => setReplay(r => r + 1)}
          className="absolute right-3 bottom-3 flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          <PlayIcon playing={false} />
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            saveSettings({ motion, text: spec.text });
            navigate('generator');
          }}
          className="text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          {name}
        </button>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

function UseCard({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={wide ? 'flex flex-col gap-4 sm:col-span-2' : 'flex flex-col gap-4'}>
      <div className="flex min-h-40 items-center justify-center rounded-lg border border-border bg-card p-6">{children}</div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function Disclosure() {
  const [open, setOpen] = useState(false);
  const spec = useMemo(() => ink('p', { finish: finishById('soft') }), []);
  return (
    <div className="w-full max-w-64 rounded-lg border border-border bg-background">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <FoldMark spec={spec} open={open} className="w-6 shrink-0" />
        The alphabet
      </button>
      <div className="grid transition-[grid-template-rows] duration-300 [transition-timing-function:var(--motion-ease-out)]" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <p className="px-3 pb-3 font-mono text-base leading-relaxed tracking-[0.2em] text-muted-foreground">
            {ALPHABET.map(l => brailleChar(cellFor(l) ?? [])).join('')}
          </p>
        </div>
      </div>
    </div>
  );
}

function SaveButton() {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const spec = useMemo(() => ink('p', { container: 'none', finish: { ...finishById('paper'), dot: 'currentColor' } }), []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const save = () => {
    if (state === 'saving') return;
    setState('saving');
    timer.current = setTimeout(() => {
      setState('saved');
      timer.current = setTimeout(() => setState('idle'), 1600);
    }, 2400);
  };
  return (
    <button
      type="button"
      onClick={save}
      className="inline-flex h-9 min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors"
    >
      {state === 'saving' && (
        <Mark spec={spec} motion="loader" playing className="w-4" />
      )}
      {state === 'idle' ? 'Save changes' : state === 'saving' ? 'Saving' : 'Saved'}
    </button>
  );
}

function PageLoader() {
  const [run, setRun] = useState(0);
  const spec = useMemo(() => ink('lab', { finish: finishById('soft') }), []);
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <Mark spec={spec} motion="resolve" playing replay={run} className="w-28" />
      <button type="button" onClick={() => setRun(r => r + 1)} className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
        Loading the lab
      </button>
    </div>
  );
}

/** The spinner's ten frames, drawn as marks, ending on P. */
function SpinnerStrip() {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  return (
    <div className="grid grid-cols-5 gap-4 sm:grid-cols-10">
      {frames.map((ch, i) => {
        const letter = ALPHABET.find(l => brailleChar(cellFor(l) ?? []) === ch);
        const last = i === frames.length - 1;
        return (
          <div key={ch} className="flex flex-col items-center gap-2">
            <Mark spec={ink(ch, { finish: finishById(last ? 'gold' : 'soft'), ghost: true })} className="w-full max-w-14" />
            <span className={last ? 'font-mono text-xs text-foreground' : 'font-mono text-xs text-muted-foreground'}>{letter ? letter.toUpperCase() : '·'}</span>
          </div>
        );
      })}
    </div>
  );
}
