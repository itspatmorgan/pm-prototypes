/** @studio-id 3v1yw3j261vr4kmv */
import type { CSSProperties } from 'react';
import PatternEngineTool from './_components/PatternEngineTool';

// Recreates itspatmorgan.com/lab/pattern-engine, without the site sidebar.
// _components/PatternEngineTool is the site's src/lab/editorial-art/index.tsx; the engine it edits lives in Website's
// generative-art component. Changes: package imports go through
// Website's libraries, and one timer ref is typed as a DOM number for Studio's Node-aware TypeScript.
export default function PatternEngine() {
  return (
    <main className="min-h-dvh min-w-0 bg-background text-foreground" style={{ '--pattern-engine-height': '100dvh' } as CSSProperties}>
      <PatternEngineTool />
    </main>
  );
}
