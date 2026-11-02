import { Badge } from './badge';
export const Variants = () => <div className="flex flex-wrap gap-2"><Badge>Default</Badge><Badge variant="secondary">Design</Badge><Badge variant="outline">Outline</Badge><Badge variant="destructive">Destructive</Badge></div>;
export const Theme = () => <Badge variant="secondary" className="font-mono text-xs">Systems Thinking</Badge>;
