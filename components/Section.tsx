import Image from "next/image";
import Services from "./Services";
import Packs from "./Packs";
import { BgAnimation } from "./BgAnimation";
import { Section as SectionType } from "@/types/homepage";
import { Lang } from "@/types/lang";

export default function Section({ section, index, lang }: { section: SectionType; index: number; lang: Lang }) {
  return (
    <div className={`relative text-center py-16 ${section.key === "about" ? "bg-white text-dark-purple" : "text-white"}`}>
      {index === 0 && <BgAnimation />}
      <div className="container">
        <h2 className={`font-[family-name:var(--font-jersey10)] text-7xl/14 md:text-8xl/18 mb-2 ${section.key === "about" ? "text-royal-purple" : "text-white text-glow"}`}>
          <span className="block text-3xl md:text-4xl">{section.preTitle}</span>
          {section.title}
        </h2>
        <p className={`mb-10 max-w-lg mx-auto ${section.key === "hero" ? "font-[family-name:var(--font-josefinsans)] text-2xl mt-2" : ""}`}>
          {section.description}
        </p>

        {section.services && <Services services={section.services} lang={lang} />}
        {section.packs && <Packs packs={section.packs} />}
        
        {(section?.ctaSlug?.current || section?.anchor) && (
          <a
            className="relative bg-rose-red py-2 px-5 inline-block font-[family-name:var(--font-jersey10)] text-off-white text-3xl rounded-sm shadow-[0px_4px_10px_0px_#270C36] mt-10"
            href={`/${lang}${section?.ctaSlug?.current ? `/${section.ctaSlug.current}` : ""}${section?.anchor ? `#${section.anchor}` : ""}`}
          >
            {section.ctaText}
          </a>
        )}
      </div>
    </div>
  );
}
