/** @studio-id 5k7d858db9jy6286 */
import { useEffect, useMemo, useState } from 'react';
import { Link } from '@module/prototypes';
import { Button } from '@/systems/website/components/button';
import { brailleString, cellFor, cleanText } from './_components/braille';
import { Field, PlayIcon, Segmented, Switch } from './_components/controls';
import { CONTAINERS, DOT_SHAPES, FINISHES, finishById } from './_components/finishes';
import { Mark } from './_components/Mark';
import { MOTIONS, motionById } from './_components/motion';
import type { MarkSpec } from './_components/render';
import { DEFAULTS, loadSettings, saveSettings, type Settings } from './_components/settings';
import { BACKDROPS, FORMATS, downloadPng, downloadSvg, recordVideo, svgOf, videoType } from './_components/share';
import { Stage } from './_components/Stage';

const SUGGESTIONS = ['p', 'pm', 'hi', 'lab', 'ua'];

function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  useEffect(() => saveSettings(settings), [settings]);
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => setSettings(s => ({ ...s, [key]: value }));
  return [settings, set, setSettings] as const;
}

const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];

export default function Maker() {
  const [s, set, setAll] = useSettings();
  const [playing, setPlaying] = useState(true);
  const [replay, setReplay] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const text = cleanText(s.text) || 'p';
  const finish = finishById(s.finish);
  const mark: MarkSpec = useMemo(
    () => ({ text, finish, dot: s.dot, container: s.container, ghost: s.ghost, layout: s.layout }),
    [text, finish, s.dot, s.container, s.ghost, s.layout],
  );
  const card = useMemo(() => ({ format: s.format, backdrop: s.backdrop, caption: s.caption }), [s.format, s.backdrop, s.caption]);
  const motion = motionById(s.motion);
  const canRecord = typeof window !== 'undefined' && videoType() !== null;
  const single = [...text].length === 1;

  const surprise = () =>
    setAll(prev => ({
      ...prev,
      finish: pick(FINISHES).id,
      dot: pick(DOT_SHAPES).id,
      container: pick(CONTAINERS.filter(c => c.id !== 'none')).id,
      ghost: Math.random() < 0.4,
      motion: pick(MOTIONS.filter(m => m.id !== 'still')).id,
    }));

  const run = async (label: string, job: () => Promise<void>) => {
    setBusy(label);
    try {
      await job();
    } catch (error) {
      console.error(error);
    } finally {
      setBusy(null);
    }
  };

  const copySvg = async () => {
    try {
      await navigator.clipboard.writeText(svgOf(mark));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      downloadSvg(mark, card);
    }
  };

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="mx-auto max-w-5xl px-6 pt-12 pb-10 sm:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="mb-3 text-4xl font-medium tracking-tight">Braille Pixel Marks</h1>
            <p className="text-lg text-muted-foreground">
              Type a few letters and each becomes a braille cell, drawn with the site’s four-pixel mark. Style it like an app icon, set it moving, and
              take it with you.
            </p>
          </div>
          <nav className="flex gap-4 font-mono text-sm text-muted-foreground">
            <Link to="icon-set" className="transition-colors hover:text-foreground">
              Icon set
            </Link>
            <Link to="motion" className="transition-colors hover:text-foreground">
              Motion
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)] gap-10 px-6 pb-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
        <section className="lg:sticky lg:top-6 lg:self-start" aria-label="Preview">
          <Stage mark={mark} card={card} motion={s.motion} playing={playing} replay={replay} />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={playing ? 'Pause' : 'Play'}
                disabled={s.motion === 'still'}
                onClick={() => {
                  setPlaying(p => !p);
                  setReplay(r => r + 1);
                }}
              >
                <PlayIcon playing={playing && s.motion !== 'still'} />
              </Button>
              <p className="min-w-0 truncate text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{motion.name}.</span> {motion.note}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
            <Button onClick={() => run('png', () => downloadPng(mark, card, s.motion))} disabled={!!busy}>
              {busy === 'png' ? 'Saving…' : 'Download PNG'}
            </Button>
            {canRecord && (
              <Button
                variant="outline"
                disabled={!!busy || s.motion === 'still'}
                onClick={() => run('video', () => recordVideo(mark, card, s.motion, p => setBusy(`video:${Math.round(p * 100)}`)))}
              >
                {busy?.startsWith('video') ? `Recording ${busy.split(':')[1] ?? 0}%` : 'Record video'}
              </Button>
            )}
            <Button variant="outline" onClick={() => downloadSvg(mark, card)} disabled={!!busy}>
              Download SVG
            </Button>
            <Button variant="ghost" onClick={copySvg} disabled={!!busy}>
              {copied ? 'Copied' : 'Copy SVG'}
            </Button>
          </div>
        </section>

        <section className="grid content-start gap-8" aria-label="Controls">
          <Field label="Letters" hint={<span className="text-sm tracking-[0.2em]" aria-label="In braille">{brailleString(text)}</span>}>
            <input
              value={s.text}
              maxLength={8}
              onChange={e => set('text', e.target.value)}
              spellCheck={false}
              aria-label="Letters"
              className="h-10 rounded-lg border border-border bg-background px-3 font-mono text-base tracking-wide outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            />
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map(word => (
                <button
                  key={word}
                  type="button"
                  onClick={() => set('text', word)}
                  className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  {word.toUpperCase()}
                </button>
              ))}
            </div>
            {[...s.text].some(ch => cellFor(ch) === null) && (
              <p className="text-xs text-muted-foreground">Up to four letters, digits or braille characters. Others are skipped.</p>
            )}
          </Field>

          {!single && (
            <Field label="Layout">
              <Segmented
                label="Layout"
                value={s.layout}
                onChange={v => set('layout', v)}
                options={[
                  { id: 'lockup', name: 'Lockup' },
                  { id: 'tile', name: 'One tile' },
                ]}
              />
            </Field>
          )}

          <Field label="Finish" hint={finish.name}>
            {(['plain', 'bold'] as const).map(group => (
              <div key={group} className="grid gap-2">
                <span className="text-xs text-muted-foreground">{group === 'plain' ? 'Plain' : 'Bold'}</span>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7">
                  {FINISHES.filter(f => f.group === group).map(f => (
                    <FinishSwatch key={f.id} mark={mark} finishId={f.id} name={f.name} selected={f.id === finish.id} onSelect={() => set('finish', f.id)} />
                  ))}
                </div>
              </div>
            ))}
          </Field>

          <div className="grid gap-6">
            <Field label="Pixels">
              <Segmented label="Pixels" value={s.dot} options={DOT_SHAPES} onChange={v => set('dot', v)} />
            </Field>
            <Field label="Container">
              <Segmented label="Container" value={s.container} options={CONTAINERS} onChange={v => set('container', v)} />
            </Field>
          </div>
          <Switch label="Show the unraised dots" checked={s.ghost} onChange={v => set('ghost', v)} />

          <Field label="Motion">
            <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Motion">
              {MOTIONS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={m.id === s.motion}
                  onClick={() => {
                    set('motion', m.id);
                    setPlaying(true);
                    setReplay(r => r + 1);
                  }}
                  className={
                    m.id === s.motion
                      ? 'h-8 rounded-md bg-foreground text-[0.8rem] font-medium text-background'
                      : 'h-8 rounded-md border border-border text-[0.8rem] font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground'
                  }
                >
                  {m.name}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid gap-6 border-t border-border pt-8">
            <Field label="Share card" hint={FORMATS.find(f => f.id === s.format)?.size}>
              <Segmented label="Format" value={s.format} options={FORMATS} onChange={v => set('format', v)} />
            </Field>
            <Field label="Backdrop">
              <Segmented label="Backdrop" value={s.backdrop} options={BACKDROPS} onChange={v => set('backdrop', v)} disabled={s.format === 'icon'} />
            </Field>
            <Switch label="Caption" checked={s.caption && s.format !== 'icon'} onChange={v => set('caption', v)} />
          </div>

          <div className="flex gap-2 border-t border-border pt-8">
            <Button variant="secondary" onClick={surprise}>
              Surprise me
            </Button>
            <Button variant="ghost" onClick={() => setAll(DEFAULTS)}>
              Reset
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function FinishSwatch({ mark, finishId, name, selected, onSelect }: { mark: MarkSpec; finishId: string; name: string; selected: boolean; onSelect: () => void }) {
  const spec = useMemo(() => ({ ...mark, text: [...mark.text][0] ?? 'p', layout: 'tile' as const, finish: finishById(finishId) }), [mark, finishId]);
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={name}
      title={name}
      onClick={onSelect}
      className={
        selected
          ? 'rounded-[0.7rem] p-0.5 ring-2 ring-foreground ring-offset-2 ring-offset-background outline-none'
          : 'rounded-[0.7rem] p-0.5 transition-transform duration-200 outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring'
      }
    >
      <Mark spec={spec} className="w-full" />
    </button>
  );
}
