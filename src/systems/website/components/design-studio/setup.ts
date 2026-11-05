import asset0 from '../../assets/images/site/logos/cloudflare.svg';
import asset2 from '../../assets/images/site/logos/netlify.svg';
import asset5 from '../../assets/images/site/logos/vercel.svg';
export const setupGuide = 'https://github.com/itspatmorgan/design-studio/blob/v0.1.3/src/platform/context/installing.md';
export const publishingGuide = 'https://github.com/itspatmorgan/design-studio/blob/main/src/platform/context/publishing.md';

// Examples of agent harnesses, from the kit with their logos (the StudioAsk scene shows them too).
export { agentHarnesses } from '@itspatmorgan/kit/design-studio/harnesses';

export const publishingHosts = [
  { title: 'Vercel', logo: asset5 },
  { title: 'Netlify', logo: asset2 },
  { title: 'Cloudflare', logo: asset0 },
];

// One installation procedure, whether the person or their agent performs it.
export const installationPrompt = `Install Design Studio from release v0.1.3 using ${setupGuide}. Use the repository installation guide without a plugin installer. Help me choose a folder, preserve existing files, and verify the running preview. Then help me open the Design Studio folder in my agent harness.`;
export const configurationPrompt = 'Read AGENTS.md and help me configure my Design Studio. Start with the included examples and show me the running preview.';
export const publishingPrompt = "Help me publish my Design Studio with [hosting service] so [audience] can explore it. Follow my Design Studio's publishing instructions and guide me through setting up hosting. Review what will be shared and verify the published link.";
