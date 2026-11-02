import { Logo } from './logo';
export const Cycle = () => <div className="flex items-center gap-8"><Logo className="size-9" /><Logo className="h-24 w-24" /></div>;
export const ContainerTrigger = () => <div className="flex min-h-36 w-full items-center justify-center rounded-lg border border-border bg-card" data-logo-cycle-trigger><Logo trigger="container" className="h-24 w-24" /></div>;
export const SidebarToggle = () => <div className="flex items-center gap-6"><Logo interaction="sidebar-toggle" toggleDirection="collapse" className="size-9" /><Logo interaction="sidebar-toggle" toggleDirection="expand" className="size-9" /></div>;
