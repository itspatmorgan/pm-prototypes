/** @studio-id xcpw8gbsxw48r4vh */
import { CaseStudyPage, Slide, slideCopy } from '@/systems/website/components/case-study';
import { StudioRange } from '@/systems/website/components/design-studio';
import { GalleryGrowth, Handoff, OpenStudio, RulesMap, ScopeCheck, StudioLesson, StudioPress, StudioQuote, Workspace } from '@/systems/website/components/studio-case';
import { SiteLink } from '@/systems/website/components/site-shell';
import { Shell } from '../_components/Shell';
import { project } from '../_data/projects';

// Recreates itspatmorgan.com/work/design-studio. Words come from the case study's caseStudy block.
const { title, caseStudy } = project('design-studio');
const slide = (id: string) => slideCopy(caseStudy!.slides, id);

export default function DesignStudioCaseStudy() {
  return (
    <Shell current="work" template="showcase">
      <CaseStudyPage
        title={title}
        caseStudy={caseStudy!}
        product="sc"
        actions={
          <nav className="sc-next sc-hero-links" aria-label="Design Studio">
            <SiteLink href="/design-studio" className="is-primary">
              Explore Design Studio
            </SiteLink>
            <a href="https://github.com/itspatmorgan/design-studio" target="_blank" rel="noopener noreferrer">
              Open source on GitHub
            </a>
          </nav>
        }
        hero={<Workspace />}
      >
        <Slide {...slide('bet')}>
          <StudioRange />
        </Slide>
        <Slide {...slide('adoption')}>
          <GalleryGrowth />
        </Slide>
        <Slide {...slide('agents')}>
          <RulesMap />
        </Slide>
        <Slide {...slide('scope')}>
          <ScopeCheck />
        </Slide>
        <StudioQuote />
        <Slide {...slide('handoff')}>
          <Handoff />
        </Slide>
        <Slide {...slide('press')}>
          <StudioPress />
        </Slide>
        <Slide {...slide('rebuild')}>
          <OpenStudio />
        </Slide>
        <Slide {...slide('lesson')}>
          <StudioLesson />
        </Slide>
      </CaseStudyPage>
    </Shell>
  );
}
