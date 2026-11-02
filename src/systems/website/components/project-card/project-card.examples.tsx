import { ProjectCard } from './project-card';
export const Compact = () => (
  <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
    <ProjectCard slug="sublime-agents" title="Giving a security agent the right amount of control" />
    <ProjectCard slug="query-language" title="Making a complex query language approachable" />
  </div>
);
export const WithDescription = () => (
  <div className="grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2">
    <ProjectCard slug="expansion" title="Expanding a security platform for a new use case" description="At Signal Sciences, I shaped how a new bot defense SKU came to market by extending the platform instead of building a separate product." showDescription />
    <ProjectCard slug="design-studio" title="Building a design environment for people and agents" description="I designed and built Design Studio on my own: the environment where Sublime's product team and their agents prototype together." showDescription />
  </div>
);
