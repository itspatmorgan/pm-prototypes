/** @studio-id 3cegn0h89zan3v8g */
import { CaseStudyPage, Slide, slideCopy } from '@/systems/website/components/case-study';
import { AdeJobs, AutoAccepted, AutomationConfig, HeroRule, JobReview, MessageDetail } from '@/systems/website/components/sublime';
import { Shell } from '../_components/Shell';
import { project } from '../_data/projects';

// Recreates itspatmorgan.com/work/sublime-agents. Words come from the case study's caseStudy block.
const { title, caseStudy } = project('sublime-agents');
const slide = (id: string) => slideCopy(caseStudy!.slides, id);

export default function SublimeAgents() {
  return (
    <Shell current="work" template="showcase">
      <CaseStudyPage title={title} caseStudy={caseStudy!} product="sb" hero={<HeroRule />}>
        <Slide {...slide('problem')}>
          <MessageDetail variant="gap" />
        </Slide>
        <Slide {...slide('bet')}>
          <JobReview />
        </Slide>
        <Slide {...slide('handoff')}>
          <MessageDetail variant="handoff" />
        </Slide>
        <Slide {...slide('evidence')}>
          <AutoAccepted />
        </Slide>
        <Slide {...slide('limits')}>
          <AutomationConfig />
        </Slide>
        <Slide {...slide('outcome')}>
          <AdeJobs />
        </Slide>
      </CaseStudyPage>
    </Shell>
  );
}
