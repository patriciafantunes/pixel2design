import Image from "next/image";
import { Service } from "@/types/homepage";
import { Lang } from "@/types/lang";

export default function Services({ services, lang }: { services: Service[]; lang: Lang }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {services.map((service, index) => (
        <div className="mt-8" key={index}>
          <a href={`/${lang}/services#${service.key}`} title={`Go to ${service.title}`}>
            <div className="relative w-fit m-auto">
              <Image className="peer hover:scale-110 transition duration-400 ease-in-out max-h-[180px] h-auto w-[180px] object-contain mx-auto" src={service.image} width={180} height={180} alt={service.title} />
              {/* Add any additional styling/effects */}
            </div>
          </a>
          <p className="font-[family-name:var(--font-jersey10)] text-glow text-4xl mt-4">{service.title}</p>
          <p>{service.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
