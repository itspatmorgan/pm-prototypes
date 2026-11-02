// Words and links for the Work page, copied from itspatmorgan.com's src/data/experience.ts, src/data/media.ts,
// and the frontmatter in src/content/projects/ (2026-11-01). Draft case studies are left out, as on the site.
import sublimeAgents from '../assets/work/work-sublime-agents.jpg';
import designStudio from '../assets/work/work-design-studio.jpg';
import queryLanguage from '../assets/work/work-query-language.jpg';
import expansion from '../assets/work/work-expansion.jpg';
import unknownArtsBanner from '../assets/work/banner.webp';

export type Project = { slug: string; title: string; image: string };

// The site shows each case study's opening demo here. Until those demos are ported, the cards use each case study's share card.
export const projects: Record<string, Project> = {
  'sublime-agents': { slug: 'sublime-agents', title: 'Giving a security agent the right amount of control', image: sublimeAgents },
  'design-studio': { slug: 'design-studio', title: 'Building a design environment for people and agents', image: designStudio },
  'query-language': { slug: 'query-language', title: 'Making a complex query language approachable', image: queryLanguage },
  expansion: { slug: 'expansion', title: 'Expanding a security platform for a new use case', image: expansion },
};

export type Role = { company: string; url?: string; role: string; dateRange: string; summary?: string; projects?: string[] };

export const roles: Role[] = [
  {
    company: 'Sublime Security',
    url: 'https://sublime.security',
    role: 'Staff Product Designer',
    dateRange: '2025–Now',
    summary:
      'Sublime makes agentic email security. I joined as its first individual contributor product designer, and my focus is its AI agents, which triage threats and write new detections. I also built Design Studio, the tool the product team uses to prototype.',
    projects: ['sublime-agents', 'design-studio'],
  },
  {
    company: 'JupiterOne',
    url: 'https://www.jupiterone.com',
    role: 'Lead Product Designer',
    dateRange: '2022–2023',
    summary:
      "JupiterOne helps security teams search everything in their cloud. As lead designer, I made its query language approachable, cutting a new customer's time to their first saved query from 21 days to 1, and helped roll out a new design system.",
    projects: ['query-language'],
  },
  {
    company: 'Signal Sciences / Fastly',
    url: 'https://www.fastly.com',
    role: 'Senior Product Designer',
    dateRange: '2019–2021',
    summary:
      'Signal Sciences, bought by Fastly in 2020, protects websites and APIs from attacks. I designed how customers write firewall rules, set rate limits and stop bots.',
    projects: ['expansion', 'vision'],
  },
  {
    company: 'Tenable',
    url: 'https://www.tenable.com',
    role: 'Product Designer',
    dateRange: '2017–2018',
    summary:
      'Tenable helps companies measure their exposure to cyber attacks. I designed its reporting and data visualization: the dashboards and reports customers used to understand their risk.',
  },
  {
    company: 'American Express',
    url: 'https://www.americanexpress.com',
    role: 'Design Engineer',
    dateRange: '2013–2016',
    summary:
      "At American Express, I worked on the Serve platform, which powered three products: Amex Serve, Walmart Bluebird and Target REDcard. I led prototyping in code as part of the design process and delivered the platform's front-end code.",
  },
  {
    company: 'Leo Burnett',
    url: 'https://leoburnett.com',
    role: 'Brand Strategist',
    dateRange: '2012–2013',
    summary:
      "At the ad agency Leo Burnett, I wrote brand strategy for Allstate, MillerCoors and Sprint, grounded in consumer research. It's where I learned to start from the audience.",
  },
];

// The newsletter first, Patrick's numbers as of 2026-10-30, then the talks. The launch post stays in the Design Studio case study only.
export const writingAndTalks = [
  {
    image: unknownArtsBanner,
    alt: 'Unknown Arts collage: a figure on a mountain ridge pointing toward a bird in flight',
    fallback: 'Unknown Arts',
    title: 'Unknown Arts newsletter',
    sub: '200+ essays · 7,700+ subscribers · 800k views',
    href: 'https://www.unknownarts.com',
  },
  {
    image: 'https://i.ytimg.com/vi/628c4YuxAEM/maxresdefault.jpg',
    alt: 'Dive Club episode cover: building an agent-agnostic prototyping platform',
    fallback: 'Dive Club',
    title: 'Dive Club interview',
    sub: 'Podcast · Aug 2026',
    href: 'https://www.youtube.com/watch?v=628c4YuxAEM',
  },
  {
    image: 'https://d2426xcxuh3ht5.cloudfront.net/f9OPHTgQSIKMI3CQ7KfX_Duo%20Instructor%20-%20theme%20a.jpg',
    alt: 'Maven lesson cover: Build your own AI design sandbox, with Patrick Morgan and Xinran Ma',
    fallback: 'Maven',
    title: 'Maven Lightning Lesson',
    sub: 'With Xinran Ma · 600+ registered',
    href: 'https://maven.com/p/0e87f2/build-your-own-ai-design-sandbox',
  },
  {
    image:
      'https://substackcdn.com/image/fetch/$s_!U9Xk!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F486da4eb-32cf-4981-92f0-3a13033f8f53_1350x1080.jpeg',
    alt: "Cover of Xinran Ma's Design with AI article on Design Studio",
    fallback: 'Design with AI',
    title: 'Design with AI article',
    sub: 'By Xinran Ma · Oct 2026',
    href: 'https://designwithai.substack.com/p/design-studio',
  },
];

export const toolkit = [
  { label: 'Design', skills: ['Product design', 'Interaction design', 'Systems design', 'Design systems', 'Prototyping in code', 'User research', 'Figma'] },
  { label: 'Coding agents', skills: ['Claude Code', 'Codex', 'Cursor'] },
  { label: 'This site', skills: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Cloudflare'] },
  {
    label: 'Design Studio',
    skills: ['React', 'TypeScript', 'Vite', 'TanStack Router', 'Tailwind CSS', 'shadcn/ui and Base UI', 'Mermaid', 'Excalidraw', 'CodeMirror', 'MDX', 'Playwright'],
  },
];
