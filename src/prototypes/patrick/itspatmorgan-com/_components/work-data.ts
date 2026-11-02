// Words for the Work page's timeline and toolkit, copied from itspatmorgan.com's src/data/experience.ts and work/index.astro (2026-11-01).
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

export const toolkit = [
  { label: 'Design', skills: ['Product design', 'Interaction design', 'Systems design', 'Design systems', 'Prototyping in code', 'User research', 'Figma'] },
  { label: 'Coding agents', skills: ['Claude Code', 'Codex', 'Cursor'] },
  { label: 'This site', skills: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Cloudflare'] },
  {
    label: 'Design Studio',
    skills: ['React', 'TypeScript', 'Vite', 'TanStack Router', 'Tailwind CSS', 'shadcn/ui and Base UI', 'Mermaid', 'Excalidraw', 'CodeMirror', 'MDX', 'Playwright'],
  },
];
