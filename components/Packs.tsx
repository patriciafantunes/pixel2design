import Image from "next/image";
import packIcon from '@/public/pack-icon.png';
import { Pack } from "@/types/homepage";

export default function Packs({ packs }: { packs: Pack[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
      {packs.map((pack, index) => (
        <div key={index} className="mb-4">
          <Image className={`mx-auto w-[120px] ${index % 2 === 0 || index === 0 ? "" : "rotate-45"}`} src={packIcon} alt="icon" />
          <p className="font-[family-name:var(--font-jersey10)] text-glow text-2xl">{pack.title}</p>
          <p>
            <span className="font-bold">{pack.subtitle}</span>: {pack.description}
          </p>
        </div>
      ))}
    </div>
  );
}
