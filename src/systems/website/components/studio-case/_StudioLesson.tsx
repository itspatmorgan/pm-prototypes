// The lesson, drawn as what happened: a timeline from one folder to an open-source launch. Ported from itspatmorgan.com's
// StudioLesson.astro; dates are shown to the month.
const moments: [string, string, string, string?][] = [
  ['Jan 2026', 'One folder of screens', 'A place to try agent configuration ideas without building a new app each time.'],
  ['Mar 2026', 'Opens to the team, and becomes Design Studio', 'Each person gets a folder of their own to prototype in, and the name grows past product design.'],
  ['May 2026', 'Sublime’s own AI agent connects', 'Gimlet, the company’s internal agent, can search it and act in it from Slack.'],
  ['Jun 2026', 'The real components arrive', 'An agent ported Sublime’s production components one by one, so prototypes look like the product.'],
  ['Jul 2026', 'Canvases, and the first end-to-end workflow', 'A brief, flows in low fidelity, then high fidelity, side by side on a canvas, with comments right on the design.'],
  ['Aug 2026', 'Dive Club interview', 'Designers outside Sublime ask for their own.', 'https://www.youtube.com/watch?v=628c4YuxAEM'],
  ['Oct 2026', 'Open-source launch', 'More than 600 signed up for the Maven lesson.', 'https://maven.com/p/0e87f2/build-your-own-ai-design-sandbox'],
];

export default function StudioLesson() {
  return (
    <figure
      className="cs-stage texture-bg sc-lesson"
      aria-label="A timeline of Design Studio: January 2026, one folder of screens; March, it opens to the team and becomes Design Studio; May, Sublime's internal AI agent connects; June, the real product components arrive; July, canvases and the first end-to-end workflow; August, the Dive Club interview; October, the open-source launch"
    >
      <ol>
        {moments.map(([when, what, note, href]) => (
          <li key={when}>
            <small>{when}</small>
            <div>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <b>{what}</b>
                </a>
              ) : (
                <b>{what}</b>
              )}
              <p>{note}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
