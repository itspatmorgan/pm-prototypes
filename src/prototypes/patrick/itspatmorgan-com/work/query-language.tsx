/** @studio-id 8zcm0j7qhf8kya40 */
import { CaseStudyPage, Slide, slideCopy } from '@/systems/website/components/case-study';
import { FigmaFlow, QueryBuilderDemo, QueryNaturalLanguage, QuerySearchBlank, QuerySentence } from '@/systems/website/components/query-builder';
import { Shell } from '../_components/Shell';
import { project } from '../_data/projects';

// Recreates itspatmorgan.com/work/query-language. Words come from the case study's caseStudy block.
const { title, caseStudy } = project('query-language');
const slide = (id: string) => slideCopy(caseStudy!.slides, id);
const days = Array.from({ length: 21 }, (_, day) => day);

export default function QueryLanguage() {
  return (
    <Shell current="work" template="showcase">
      <CaseStudyPage title={title} caseStudy={caseStudy!} hero={<QueryBuilderDemo />}>
        <Slide {...slide('problem')}>
          <QuerySearchBlank />
        </Slide>
        <Slide {...slide('insight')}>
          <QuerySentence />
        </Slide>
        <Slide {...slide('explore')}>
          <FigmaFlow sequence="select" />
        </Slide>
        <Slide {...slide('filtering')}>
          <FigmaFlow sequence="filter" />
        </Slide>
        <Slide {...slide('relationships')}>
          <FigmaFlow sequence="direction" />
        </Slide>
        <Slide {...slide('outcome')}>
          <figure className="qb-days" aria-label="Average days from data integration to a first custom query: 21 before the builder, 1 after">
            <div className="qb-days-row">
              <span className="qb-days-label">Before</span>
              <span className="qb-days-track" aria-hidden="true">
                {days.map(day => (
                  <i key={day} />
                ))}
              </span>
              <span className="qb-days-value">21 days</span>
            </div>
            <div className="qb-days-row qb-days-after">
              <span className="qb-days-label">After</span>
              <span className="qb-days-track" aria-hidden="true">
                {days.map(day => (
                  <i key={day} className={day ? 'qb-day-saved' : undefined} />
                ))}
              </span>
              <span className="qb-days-value">1 day</span>
            </div>
          </figure>
          <blockquote className="qb-quote">
            <p>“The real gap between them and J1 is around ease of use… We really like the query builder for that exact reason.”</p>
            <footer>Genesis, shared by JupiterOne’s CRO</footer>
          </blockquote>
        </Slide>
        <Slide {...slide('today')}>
          <QueryNaturalLanguage />
        </Slide>
      </CaseStudyPage>
    </Shell>
  );
}
