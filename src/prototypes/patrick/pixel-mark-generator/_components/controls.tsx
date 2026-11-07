import type { ReactNode } from 'react';
import { cn } from '#studio/runtime';

// Small controls for the generator, drawn with Website's tokens.

export function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint && <span className="font-mono text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

type Option<T extends string> = { id: T; name: string };

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn('flex rounded-lg border border-border bg-card p-0.5', disabled && 'opacity-50')}>
      {options.map(option => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(option.id)}
            className={cn(
              'h-7 min-w-0 flex-1 truncate rounded-md px-2 text-[0.8rem] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
              selected ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}

export function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex items-center justify-between gap-4 rounded-lg py-0.5 text-left text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span>{label}</span>
      <span className={cn('relative h-5 w-9 shrink-0 rounded-full transition-colors', checked ? 'bg-foreground' : 'bg-secondary')}>
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-background shadow-sm transition-transform duration-200 [transition-timing-function:var(--motion-ease-out)]',
            checked && 'translate-x-4',
          )}
        />
      </span>
    </button>
  );
}

export function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
      <rect x="1" y="0.5" width="3" height="9" rx="0.6" />
      <rect x="6" y="0.5" width="3" height="9" rx="0.6" />
    </svg>
  ) : (
    <svg width="9" height="10" viewBox="0 0 8 10" fill="currentColor" aria-hidden>
      <path d="M0 0l8 5-8 5V0z" />
    </svg>
  );
}
