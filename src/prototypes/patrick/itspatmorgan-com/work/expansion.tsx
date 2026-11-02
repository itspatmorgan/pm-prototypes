/** @studio-id k0epf20a0r8zpa1e */
import { CaseStudyPage, Slide, slideCopy } from '@/systems/website/components/case-study';
import { AgentFlow, Dashboards, HeroBotSignals, Kits, RuleEditor, SignalChain, ThreePieces } from '@/systems/website/components/expansion';
import { Shell } from '../_components/Shell';
import { project } from '../_data/projects';

// Recreates itspatmorgan.com/work/expansion. Words come from the case study's caseStudy block.
const { title, caseStudy } = project('expansion');
const slide = (id: string) => slideCopy(caseStudy!.slides, id);

export default function Expansion() {
  return (
    <Shell current="work" template="showcase">
      <CaseStudyPage title={title} caseStudy={caseStudy!} product="xp" hero={<HeroBotSignals />}>
        <Slide {...slide('problem')}>
          <RuleEditor />
        </Slide>
        <Slide {...slide('bet')}>
          <ThreePieces />
        </Slide>
        <Slide {...slide('mapping')}>
          <AgentFlow />
        </Slide>
        <Slide {...slide('response')}>
          <SignalChain />
        </Slide>
        <Slide {...slide('monitoring')}>
          <Dashboards />
        </Slide>
        <Slide {...slide('outcome')}>
          <Kits />
        </Slide>
      </CaseStudyPage>
    </Shell>
  );
}
