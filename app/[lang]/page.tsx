import ContactForm from "@/components/ContactForm";
import Image from "next/image"
import packIcon from '@/public/pack-icon.png'
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
      <div
      	className="bg-gradient">
      		{homepageData.sections.map((section, index) => (
      		<div key={index} className={`text-center py-16 ${section.key == "about" ? "bg-white text-dark-purple" : "text-white"}`}>
	          <div className="container" >

	            <h2 className={`font-[family-name:var(--font-jersey10)] text-6xl ${section.key == "about" ? "text-royal-purple" : "text-white text-glow"}`}><span className="block text-4xl">{section.preTitle}</span>{section.title}</h2>
	            <p className="mb-10 max-w-lg mx-auto">{section.description}</p>
	            {section.services != null &&
	              <div className="grid grid-cols-3 gap-x-12">
	                {section.services.map((service, index) => (
	                  <div key={index}>
	                    <Image className="max-h-[180px] mx-auto" src={service.image} width={180} height={180} alt="" />
	                    <p className="font-[family-name:var(--font-jersey10)] text-glow text-4xl mt-4">{service.title}</p>
	                    <p>{service.subtitle}</p>
	                  </div>
	                ))}
	              </div>
	            }
	            {section.packs != null &&
	              <div className="grid grid-cols-3 gap-x-12 gap-y-6">
	                {section.packs.map((pack, index) => (
	                  <div key={index}>
	                  	<Image className={`mx-auto w-[120px] mt-4 ${index % 2 == 0 || index == 0 ? "" : "rotate-45"}`} src={packIcon} alt="icon"/>
	                    <p className="font-[family-name:var(--font-jersey10)] text-glow text-2xl ">{pack.title}</p>
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
