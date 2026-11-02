import { CaseStudyPage, Slide } from './_CaseStudyPage';
import texture from '../../assets/images/debut_light.png';
export const Page = () => (
  <CaseStudyPage title="A case study title in one line" caseStudy={{ company: { name: 'Company', logo: texture }, subline: 'One sentence on what Patrick did and for whom.', brief: { when: '2026', role: 'Role', team: 'Team', outcome: 'One concrete outcome' } }}>
    <Slide id="example-slide" title="Each slide makes one point" line="At most one line of copy, then the visual.">
      <div className="cs-stage texture-bg" style={{ minHeight: 160 }} />
    </Slide>
  </CaseStudyPage>
);
