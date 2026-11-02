import avatar from '../../assets/images/site/brand/profile-picture.jpg';
import { KindWords } from './kind-words';
export const Column = () => (
  <div className="w-full max-w-3xl columns-1 gap-4 sm:columns-2">
    <KindWords quote="A short quote from someone in the community goes here." name="Patrick Morgan" role="Software Designer" image={avatar} />
    <KindWords quote="Quotes sit in balanced columns, so longer ones can run as long as they need to without leaving gaps." name="Patrick Morgan" role="Software Designer" image={avatar} />
  </div>
);
