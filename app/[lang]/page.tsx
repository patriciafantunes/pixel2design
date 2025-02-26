import ContactForm from "@/components/ContactForm";
import { BgAnimation } from "@/components/BgAnimation"
import Image from "next/image"
import packIcon from '@/public/pack-icon.png';
import { getHomepageData } from '@/lib/sanity/queries/homepage';
import { getFormData } from '@/lib/sanity/queries/contactForm'
import { Homepage, ContactSection } from '@/types/homepage'
import { Lang } from '@/types/lang'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const homepageData: Homepage = await getHomepageData(lang); 
  const contactFormData: ContactSection = await getFormData(lang); 

  if(!homepageData) return <p>Loading...</p>

  return (
    <div>
      <div
      	className="bg-gradient">
      		{homepageData.sections.map((section, index) => (
      		<div key={index} className={`relative text-center py-16 ${section.key == "about" ? "bg-white text-dark-purple" : "text-white"}`}>
      			{index == 0 && <BgAnimation />}
	          <div className="container">
	            <h2 className={`font-[family-name:var(--font-jersey10)] text-7xl/14 md:text-8xl/18  mb-2 ${section.key == "about" ? "text-royal-purple" : "text-white text-glow"}`}><span className="block text-3xl md:text-4xl">{section.preTitle}</span>{section.title}</h2>
	            <p className={`mb-10 max-w-lg mx-auto ${section.key == "hero" ? "font-[family-name:var(--font-josefinsans)] text-2xl mt-2" : ""}`}>{section.description}</p>
	            {section.services != null &&
	              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
	                {section.services.map((service, index) => (
	                  <div className="mt-8" key={index}>
	                    <Image className="max-h-[180px] w-[180px] object-contain mx-auto" src={service.image} width={180} height={180} alt="" />
	                    <p className="font-[family-name:var(--font-jersey10)] text-glow text-4xl mt-4">{service.title}</p>
	                    <p>{service.subtitle}</p>
	                  </div>
	                ))}
	              </div>
	            }
	            {section.packs != null &&
	              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
	                {section.packs.map((pack, index) => (
	                  <div key={index} className="mb-4">
	                  	<Image className={`mx-auto w-[120px] ${index % 2 == 0 || index == 0 ? "" : "rotate-45"}`} src={packIcon} alt="icon"/>
	                    <p className="font-[family-name:var(--font-jersey10)] text-glow text-2xl ">{pack.title}</p>
	                    <p><span className="font-bold">{pack.subtitle}</span>: {pack.description}</p>
	                  </div>
	                ))}
	              </div>
	            }
	            {section?.ctaSlug?.current || section?.anchor &&
								<a 
		            	className="bg-rose-red py-2 px-5 inline-block font-[family-name:var(--font-jersey10)] text-off-white text-3xl rounded-sm shadow-[0px_4px_10px_0px_#270C36] mt-10" 
		            	href={`/${lang}${section?.ctaSlug?.current ? `/${section.ctaSlug.current}` : ""}${section?.anchor ? `#${section.anchor}` : ""}`}>{section.ctaText}</a>
	          
	          	}
	            </div>
          </div>
        ))}
      	</div>
      	<div id="contact" className="relative overflow-hidden py-10 before:w-full before:h-full before:absolute before:bg-royal-purple/50 before:z-1 before:top-0">
      		<video className="flex absolute w-full h-full object-cover right-0 top-0 w" autoPlay muted playsInline webkit-playsinline="true" loop width="100%" height="100%">         
				    <source src="/contacts-video.webm" type="video/webm"/>       
					</video>
	      	<div className="container relative z-10 flex justify-between flex-col md:flex-row items-center md:items-stretch">
	      		<div className="text-off-white flex flex-col justify-between text-center md:text-left">
	      			<div>
	      				<h2 className={`font-[family-name:var(--font-jersey10)] text-6xl text-glow mb-1`}>{contactFormData.title}</h2>
		      			<p className="text-2xl mb-8 md:mb-0">{contactFormData.subtitle}</p>
	      			</div>
		      		
		      		<p className="mb-4 md:mb-0">{contactFormData.email}</p>
	      		</div>
	      		<ContactForm {...contactFormData} />
	      	</div>
      	</div>
      	
    </div>
  );
}
