// The hooks every interactive piece shares: the page's theme, the visitor's motion setting and the phone breakpoint, ported from
// itspatmorgan.com's src/lib/hooks.ts. Use these rather than reading the DOM or a media query in a component.
import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';

/** useLayoutEffect in the browser, useEffect on the server (where layout effects warn and never run). */
export const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** The theme boundary that sets this element's color mode. The site uses `.dark` on <html>; Studio sets `data-color-mode` on the system boundary. */
function themeBoundary(node?: Element | null): HTMLElement | null {
  return (node?.closest<HTMLElement>('[data-color-mode]') ?? document.querySelector<HTMLElement>('.website-theme[data-color-mode]')) || null;
}

/** Whether the page is in dark mode, following the theme switch. Pass a ref when several themed areas share a page. */
export function useDark(ref?: RefObject<Element | null>) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = themeBoundary(ref?.current);
    if (!root) return;
    const read = () => setDark(root.dataset.colorMode === 'dark');
    read();
    const watch = new MutationObserver(read);
    watch.observe(root, { attributes: true, attributeFilter: ['data-color-mode'] });
    return () => watch.disconnect();
  }, [ref]);
  return dark;
}

/** Whether the visitor asked for less motion. */
export function useReduced() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const on = () => setReduced(query.matches);
    query.addEventListener('change', on);
    return () => query.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Whether the page is phone-sized (640px or narrower). */
export function usePhone() {
  const [phone, setPhone] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia('(max-width: 640px)');
    const update = () => setPhone(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return phone;
}
