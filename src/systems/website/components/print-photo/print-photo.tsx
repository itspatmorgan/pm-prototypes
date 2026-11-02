import type { ReactNode } from 'react';
import { cn } from '#studio/runtime';

// A photo printed on white stock with a deep bottom margin, tilted a little: the About, Community, and Home hero photos.
type PrintPhotoProps = {
  src: string;
  alt: string;
  /** A rotate utility, such as rotate-[-1.5deg]. Prints straighten on hover. */
  tilt?: string;
  /** aspect-square (default) or aspect-[4/3]. */
  aspect?: string;
  /** object-position for the crop, such as object-[8%_50%]. */
  position?: string;
  className?: string;
  children?: ReactNode;
};

function PrintPhoto({ src, alt, tilt = 'rotate-[-1.5deg]', aspect = 'aspect-square', position, className, children }: PrintPhotoProps) {
  return (
    <figure
      className={cn(
        'bg-white p-2 pb-7 shadow-xl shadow-black/15 transition-transform duration-300 hover:scale-[1.02] hover:rotate-0 dark:bg-[#20201e] dark:shadow-black/40',
        tilt,
        className,
      )}
    >
      <div className={cn('overflow-hidden bg-muted', aspect)}>
        <img src={src} alt={alt} loading="lazy" className={cn('block h-full w-full object-cover', position)} />
      </div>
      {children}
    </figure>
  );
}

export { PrintPhoto, type PrintPhotoProps };
