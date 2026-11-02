// A quote from someone in the community, on the card texture, with their photo, name, and role.
type KindWordsProps = { quote: string; name: string; role: string; image: string };

function KindWords({ quote, name, role, image }: KindWordsProps) {
  return (
    <blockquote className="texture-bg mb-4 break-inside-avoid rounded-lg p-5">
      <p className="mb-4 font-mono text-[13px] leading-relaxed text-foreground">{quote}</p>
      <footer className="flex items-center gap-3">
        <img src={image} alt={name} loading="lazy" className="h-8 w-8 shrink-0 rounded-full object-cover" />
        <div>
          <p className="text-sm leading-tight font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </footer>
    </blockquote>
  );
}

export { KindWords, type KindWordsProps };
