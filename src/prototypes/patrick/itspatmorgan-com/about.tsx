/** @studio-id 5pr5zp2m6xkp1b30 */
import { PageHeader } from '@/systems/website/components/site-shell';
import { PrintPhoto } from '@/systems/website/components/print-photo';
import { Shell, inlineLink } from './_components/Shell';
import livingRoom from './assets/about/profile-living-room.jpg';
import dinner from './assets/about/personal-dinner.jpg';
import hollywood from './assets/about/personal-hollywood.jpg';
import airport from './assets/about/personal-airport.jpg';
import signature from './assets/about/patrick-signature.png';
import styles from './_components/about.module.css';

// Recreates itspatmorgan.com/about (src/pages/about.astro), reading template.
const photos = [
  { src: livingRoom, alt: 'Patrick sitting in a living room.', tilt: 'rotate-[-1.5deg]', offset: '' },
  { src: dinner, alt: 'Patrick smiling at an outdoor dinner.', tilt: 'rotate-[1deg]', offset: 'lg:mt-10' },
  { src: hollywood, alt: 'Patrick near the Hollywood sign.', tilt: 'rotate-[-1deg]', offset: 'lg:mt-3' },
  { src: airport, alt: 'Patrick in an airport while traveling.', tilt: 'rotate-[1.5deg]', offset: 'lg:mt-12' },
];

export default function About() {
  return (
    <Shell current="about">
      <PageHeader
        title={
          <>
            <span className="block">I've never been easy</span>
            <span className="block">to put in a box.</span>
          </>
        }
        lead="I'm a liberal arts kid who found his way through music, theater, advertising, code, design, writing, and a long-running fascination with making things."
      />

      <section className="pb-16">
        <div className={`${styles.carousel} flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:hidden`} aria-label="Personal photos">
          {photos.map(photo => (
            <PrintPhoto key={photo.alt} src={photo.src} alt={photo.alt} tilt={photo.tilt} className="w-[min(78vw,20rem)] shrink-0 snap-center" />
          ))}
        </div>
        <div className="mx-auto hidden max-w-5xl items-start gap-5 px-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {photos.map(photo => (
            <PrintPhoto key={photo.alt} src={photo.src} alt={photo.alt} tilt={photo.tilt} className={photo.offset} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>I grew up in a small town in central Pennsylvania called Hollidaysburg. Yes, it's real.</p>
          <p>
            I wasn't one of those kids with a clear plan for what I wanted to be, but what I did have was a pretty strong instinct for what made me feel alive. In
            high school, that was choir, a cappella, and musical theater. In college, it was philosophy, studying abroad in Spain and Chile, and performing music
            and theater whenever I could. Those experiences taught me to explore, think, make, and have some fun while I'm at it!
          </p>
          <p>
            Since then, my life has been less of a straight line and more of a series of intuitive turns. I went into advertising because I was curious about
            creativity and business. I left it because I wanted to be closer to building things. I learned to code because I wanted a practical craft that could
            open doors. I moved into design because I cared more about the outcome than how it was built.
          </p>
          <p>
            From the outside, that might look like a bunch of pivots. From the inside, it felt more like following the energy from one room to the next. I've moved
            cities, changed disciplines, been confused, been lucky, been humbled, and had to rebuild my confidence more than once. But the winding parts have usually
            been where the good material is.
          </p>
          <p>
            These days, I live in Los Angeles. I design software, write about creativity and technology, and keep trying to build a life where the different parts
            of me get to talk to each other.
          </p>
          <p>
            A lot of that thinking now lives in{' '}
            <a href="https://www.unknownarts.com" target="_blank" rel="noopener noreferrer" className={inlineLink}>
              Unknown Arts
            </a>
            , my newsletter about the evolving creative process in the age of AI. The name comes from the ancient story of Daedalus, who used his creativity to
            invent a way out of the labyrinth. I like that image because it feels close to the work I'm trying to do: looking for paths through today's creative
            maze and paying attention to what those paths reveal about the future.
          </p>
          <p>So, thanks for stopping by to my little corner of the Internet. I hope you find something here that sparks your curiosity.</p>
          <img src={signature} alt="Patrick" width={764} height={376} className="h-auto w-32 dark:invert" />
          <p className="pt-8">
            PS. If you want the longer version of my career story, I wrote about my{' '}
            <a href="https://www.unknownarts.com/p/my-pathless-path-into-technology" target="_blank" rel="noopener noreferrer" className={inlineLink}>
              pathless path into technology
            </a>
            .
          </p>
        </div>
      </section>
    </Shell>
  );
}
