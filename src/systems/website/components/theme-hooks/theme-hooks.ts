// The hooks every interactive piece shares: the page's theme, the visitor's motion setting and the phone breakpoint. They come
// from @itspatmorgan/kit, so the site and the studio answer the same way. Use these rather than reading the DOM or a media query.
export { useDark, useIsomorphicLayoutEffect, usePhone, useReduced } from '@itspatmorgan/kit/hooks';
