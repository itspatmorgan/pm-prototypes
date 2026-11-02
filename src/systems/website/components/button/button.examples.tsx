import { ArrowRight01Icon, Loading03Icon, RefreshIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button, buttonVariants } from './button';
export const Variants = () => <div className="flex flex-wrap gap-3"><Button>Primary</Button><Button variant="outline">Outline</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Destructive</Button></div>;
export const Sizes = () => <div className="flex flex-wrap items-center gap-3"><Button size="xs">Extra small</Button><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large<HugeiconsIcon icon={ArrowRight01Icon} data-icon="inline-end" /></Button><Button size="icon" variant="outline" aria-label="Regenerate"><HugeiconsIcon icon={RefreshIcon} /></Button></div>;
export const States = () => <div className="flex flex-wrap gap-3"><Button disabled>Unavailable</Button><Button disabled aria-busy="true"><HugeiconsIcon icon={Loading03Icon} className="animate-spin" />Exporting</Button></div>;
export const Links = () => <div className="flex gap-4"><a href="https://itspatmorgan.com/lab" className={buttonVariants({ variant: 'link', size: 'sm' })}>Lab</a><a href="https://itspatmorgan.com/writing" className={buttonVariants({ variant: 'link', size: 'sm' })}>Writing</a></div>;
