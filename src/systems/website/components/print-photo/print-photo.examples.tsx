import texture from '../../assets/images/debut_light.png';
import { PrintPhoto } from './print-photo';
export const Row = () => (
  <div className="grid w-full max-w-xl grid-cols-3 gap-5 p-6">
    <PrintPhoto src={texture} alt="Paper texture" tilt="rotate-[-1.5deg]" />
    <PrintPhoto src={texture} alt="Paper texture" tilt="rotate-[1deg]" aspect="aspect-[4/3]" />
    <PrintPhoto src={texture} alt="Paper texture" tilt="rotate-[2deg]" />
  </div>
);
