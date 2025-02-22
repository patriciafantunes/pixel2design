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

  	console.log(homepageData);

  return (
    <div>
      <div
      	className="bg-gradient">
      		{homepageData.sections.map((section, index) => (
      		<div className={`text-center py-16 ${section.key == "about" ? "bg-white text-dark-purple" : "text-white"}`}>
	          <div className="container" key={index}>

	            <h2 className={`font-[family-name:var(--font-jersey10)] text-6xl ${section.key == "about" ? "text-royal-purple" : "text-white"}`}><span className="block text-4xl">{section.preTitle}</span>{section.title}</h2>
	            <p className="mb-10">{section.description}</p>
	            {section.services != null &&
	              <div className="grid grid-cols-3 gap-x-12">
	                {section.services.map((service, index) => (
	                  <div key={index}>
	                    <img className="max-h-[200px] mx-auto" src={service.image} alt="" />
	                    <p>{service.title}</p>
	                    <p>{service.subtitle}</p>
	                  </div>
	                ))}
	              </div>
	            }
	            {section.packs != null &&
	              <div className="grid grid-cols-3 gap-x-12 gap-y-6">
	                {section.packs.map((pack, index) => (
	                  <div key={index}>
	                    <p>{pack.title}</p>
	                    <p><span className="font-bold">{pack.subtitle}</span>: {pack.description}</p>
	                  </div>
	                ))}
	              </div>
	            }
	            <a 
	            	className="bg-rose-red py-2 px-5 inline-block font-[family-name:var(--font-jersey10)] text-off-white text-3xl rounded-sm shadow-[0px_4px_10px_0px_#270C36] mt-10" 
	            	href={section.ctaLink}>{section.ctaText}</a>
	          </div>
          </div>
        ))}
      	</div>
      <ContactForm />
    </div>
  );
}
