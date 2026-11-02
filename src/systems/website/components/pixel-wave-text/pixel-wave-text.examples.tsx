import { useEffect, useRef } from 'react';
import { PixelWaveText, enablePixelHover } from './pixel-wave-text';
export const Pixel = () => <PixelWaveText text="Pixel type" className="text-4xl font-medium tracking-tight" />;
export const HoverToPixelate = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? enablePixelHover(ref.current) : undefined), []);
  return <PixelWaveText ref={ref} as="p" text="Hover near these words." initialSans className="text-4xl font-medium tracking-tight" />;
};
