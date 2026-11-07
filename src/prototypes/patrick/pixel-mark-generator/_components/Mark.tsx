import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { frameAt, motionById, type MotionId } from './motion';
import { cellsOf, markBox, renderMark, type MarkSpec } from './render';

/** True when the viewer asks for less motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

type MarkProps = {
  spec: MarkSpec;
  motion?: MotionId;
  /** Plays the motion in a loop. Off shows the mark at rest. */
  playing?: boolean;
  /** Restarts the loop when it changes. */
  replay?: number;
  className?: string;
  title?: string;
};

/** A live pixel mark. It fills its box at the mark's own aspect ratio. */
export function Mark({ spec, motion = 'still', playing = false, replay = 0, className, title }: MarkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = `m${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const reduced = useReducedMotion();
  const cells = useMemo(() => cellsOf(spec.text), [spec.text]);
  const animate = playing && motion !== 'still' && !reduced;
  const { width, height } = markBox(spec);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!animate) {
      node.innerHTML = renderMark(spec, frameAt('still', cells, 0), { id, title });
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      node.innerHTML = renderMark(spec, frameAt(motion, cells, now - start), { id, title });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spec, cells, motion, animate, id, title, replay]);

  return <div ref={ref} className={className} style={{ aspectRatio: `${width} / ${height}` }} />;
}

export { motionById };

/** A mark that folds into one pixel when closed and expands into its letter when open, for disclosure controls. */
export function FoldMark({ spec, open, className }: { spec: MarkSpec; open: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = `f${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const reduced = useReducedMotion();
  const cells = useMemo(() => cellsOf(spec.text), [spec.text]);
  const shown = useRef(open);
  const { width, height } = markBox(spec);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Times inside the Fold motion: open at rest, closing, closed, opening.
    const [from, to] = open ? [1300, 1950] : [300, 1000];
    const changed = shown.current !== open;
    shown.current = open;
    if (!changed || reduced) {
      node.innerHTML = renderMark(spec, frameAt('fold', cells, open ? 0 : 900), { id });
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(to, from + (now - start));
      node.innerHTML = renderMark(spec, frameAt('fold', cells, t), { id });
      if (t < to) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, spec, cells, id, reduced]);

  return <div ref={ref} className={className} style={{ aspectRatio: `${width} / ${height}` }} aria-hidden />;
}
