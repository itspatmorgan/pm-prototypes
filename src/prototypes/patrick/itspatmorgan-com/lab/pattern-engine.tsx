/** @studio-id 5jhe26hn9xwqv00q */
import PatternEngineTool from '../_components/pattern-engine/PatternEngineTool';
import { Shell } from '../_components/Shell';

// Recreates itspatmorgan.com/lab/pattern-engine (src/pages/lab/pattern-engine.astro): the site shell without its footer, and the
// tool filling the screen beside the sidebar (below the 3.5rem phone header on phones).
// _components/pattern-engine/PatternEngineTool is the site's src/lab/editorial-art/index.tsx; the engine it edits lives in
// Website's generative-art component. Changes: package imports go through Website's libraries, and one timer ref is typed as
// a DOM number for Studio's Node-aware TypeScript.
export default function PatternEngine() {
  return (
    <Shell current="lab" footer={false}>
      <div className="min-w-0 [--pattern-engine-height:calc(100dvh-3.5rem)] md:[--pattern-engine-height:100dvh]">
        <div className="min-h-[var(--pattern-engine-height)]">
          <PatternEngineTool />
        </div>
      </div>
    </Shell>
  );
}
