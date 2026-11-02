import { useDark, usePhone, useReduced } from './theme-hooks';
export const CurrentValues = () => {
  const dark = useDark();
  const reduced = useReduced();
  const phone = usePhone();
  return <p className="font-mono text-sm text-muted-foreground">dark {String(dark)} · reduced motion {String(reduced)} · phone {String(phone)}</p>;
};
