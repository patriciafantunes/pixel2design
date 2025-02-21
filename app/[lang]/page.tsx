
import ContactForm from "@/components/ContactForm";
import { getHomepageData } from '@/lib/sanity/queries/homepage';
import { Homepage } from '@/types/homepage'
import { Lang } from '@/types/lang'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const homepageData: Homepage = await getHomepageData(lang); 

  if(!homepageData) return <p>Loading...</p>

  return (
    <div>
      {homepageData.sections.map((section, index) => (
        <div className="container text-center" key={index}>

          <h2 className="font-[family-name:var(--font-jersey10)] text-6xl"><span className="block text-4xl">{section.preTitle}</span>{section.title}</h2>
          <p>{section.description}</p>
          <a href={section.ctaLink}>{section.ctaText}</a>
          {section.services != null &&
            <div className="grid grid-cols-3 gap-x-12">
              {section.services.map((service, index) => (
                <div key={index}>
                  <img src={service.image} alt="" />
                  <p>{service.title}</p>
                  <p>{service.subtitle}</p>
                </div>
              ))}
            </div>
          }
          {section.packs != null &&
            <div className="grid grid-cols-3 gap-x-12">
              {section.packs.map((pack, index) => (
                <div key={index}>
                  <p>{pack.title}</p>
                  <p>{pack.subtitle}: {pack.description}</p>
                </div>
              ))}
            </div>
          }      
        </div>
      ))}

      <ContactForm />
    </div>
  );
}
