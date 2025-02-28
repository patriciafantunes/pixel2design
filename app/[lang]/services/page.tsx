
import Image from "next/image"
import packIcon from '@/public/pack-icon.png'
import { getServicesData } from '@/lib/sanity/queries/services';
import { getComponentsData } from '@/lib/sanity/queries/components';
import { Service, Component } from '@/types/homepage'
import { Lang } from '@/types/lang'
import { GradientIcon } from '@/components/GradientIcon';
import Link from 'next/link'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const servicesData: Service[] = await getServicesData(lang); 
  const componentsData: Component[] = await getComponentsData(lang); 

  if(!servicesData) return <p>Loading...</p>

    const otherServices = componentsData.find(({ key }) => key === "other-services");
    const hero = componentsData.find(({ key }) => key === "hero-services");
    const contact = componentsData.find(({ key }) => key === "contact-services");



  return (
    <>
      {hero != null &&
        <div className="bg-linear-to-br from-royal-purple via-deep-indigo to-deep-indigo">
          <div className="container text-center text-white py-10">
            <h2 className={`font-[family-name:var(--font-jersey10)] text-6xl`}><span className="block text-4xl">{hero.preTitle}</span>{hero.title}</h2>
            <p className="mb-10 max-w-lg mx-auto">{hero.description}</p>
          </div>
        </div>
      }
      {servicesData.map((service, index) => (
        service.key == "ongoing" 
        ? (
          <div key={index} className="bg-linear-to-b from-royal-purple to-deep-indigo to-70% text-center text-white">
            <div className="container py-16">
              <h2 className="font-[family-name:var(--font-jersey10)] text-6xl">{service.title}</h2>
              <h3 className="text-xl mb-5">{service.subtitle}</h3>
              <p className="max-w-xl mx-auto">{service.description}</p>
            </div>
            <div className="bg-linear-to-b md:bg-linear-to-r from-deep-indigo from-50% to-royal-purple to-50% py-10">
              <div className="container text-left">
              {/*<p>Recomended projects</p>*/}
              <div className="flex items-stretch justify-between flex-wrap">
                {service.packs.map((pack, index) => (
                  <div key={index} className={`w-[100%] pb-11 md:w-1/2 relative px-4 ${index == 0 ? "md:bg-deep-indigo z-10" : "md:bg-royal-purple"}`}>
                    <div className="flex items-center my-10 relative before:rounded-full before:w-100 md:before:w-125 before:-left-1/4 md:before:-left-2/3 lg:before:-left-1/3 before:bg-linear-to-r before:from-royal-purple before:to-rose-red before:absolute before:-inset-1">
                      <Image className="w-15 mr-3 relative" src={packIcon} alt={pack.title} />
                      <h4 className="relative text-white text-2xl font-[family-name:var(--font-jersey10)]">{pack.title}</h4>
                    </div>
                    
                    <div className="">
                      {pack.features.map((feature, index) => (
                        <div key={index} className="flex items-start justify-around mb-6">
                          <GradientIcon className="w-[20px] mr-3 mt-1 " path="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                          <p className="w-[90%]">{(feature.featurename != null) && <span className="block text-xl text-deep-indigo">{feature.featurename}</span>}{(feature.description != null) && feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
            
          </div>
        ) : (
          <div key={index} className={`py-16 overflow-hidden ${index % 2 != 0 ? "bg-off-white" : "bg-white"}`}>
            <div className="container">
              <div className="clumns-1 md:columns-2 items-center mb-5">
                <div>
                  <h2 className="font-[family-name:var(--font-jersey10)] text-6xl text-rose-red">{service.title}</h2>
                  <h3 className="text-xl text-deep-indigo mb-5">{service.subtitle}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="mx-auto md:ml-[10%] my-8 w-[220px] h-[220px] md:w-[70vw] md:h-[300px] flex items-center bg-linear-to-r from-royal-purple to-deep-indigo rounded-full">
                  <Image className="floating w-[90%] mb-9.5 md:mb-0 md:w-auto m-auto md:h-[320px] md:ml-[5%]" src={service.image} width={320} height={320} alt={service.title} />
                </div>
              </div>
              
              {/*<p>Recomended projects</p>*/}
              {service.packs.map((pack, index) => (
                <div key={index}>
                  <div className="flex items-center my-10 relative before:rounded-full before:w-100 lg:before:w-1/2 before:-left-1/4 before:bg-linear-to-r before:from-royal-purple before:to-rose-red before:absolute before:-inset-1">
                    <Image className="w-15 mr-3 relative" src={packIcon} alt={pack.title} />
                    <h4 className="relative text-white text-2xl font-[family-name:var(--font-jersey10)]">{pack.title}</h4>
                  </div>
                  
                  <div className="md:columns-2 gap-10">
                    {pack.features.map((feature, index) => (
                      <div key={index} className="flex items-start justify-around mb-6">
                        <GradientIcon className="w-[20px] mr-3 mt-1 " path="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        <p className="w-[90%]">{(feature.featurename != null) && <span className="block text-xl text-deep-indigo font-[family-name:var(--font-josefinsans)]">{feature.featurename}</span>}{(feature.description != null) && feature.description}</p>
                      </div>
                    ))}
                  </div>
                  
                </div>

              ))}
            </div>
          </div>
        )
      ))}
      {otherServices != null &&
        <div className="container text-center py-10">
          <h2 className={`font-[family-name:var(--font-jersey10)] text-6xl text-rose-red`}><span className="block text-4xl text-dark-purple">{otherServices.preTitle}</span>{otherServices.title}</h2>
          <p className="mb-10 max-w-lg mx-auto">{otherServices.description}</p>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-10">
            {otherServices.otherServices.map((service, index) => (
              <div key={index} className="pb-10">
                <GradientIcon className="h-20 m-auto mb-2" path={service.svg} viewBox={service.svgviewbox} />
                <h4 className="font-[family-name:var(--font-josefinsans)]">{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      }
      {contact != null &&
        <div className="bg-linear-to-br from-rose-red via-royal-purple to-deep-indigo">
          <div className="container text-center text-white py-10">
            <h2 className={`font-[family-name:var(--font-jersey10)] text-6xl`}><span className="block text-4xl">{contact.preTitle}</span>{contact.title}</h2>
            <p className="mb-10 max-w-lg mx-auto">{contact.description}</p>
            <Link
                className="bg-rose-red py-2 px-5 inline-block font-[family-name:var(--font-jersey10)] text-off-white text-3xl rounded-sm shadow-[0px_4px_10px_0px_#270C36] mt-10"
                href={`/${lang}${contact?.ctaSlug?.current ? `/${contact.ctaSlug.current}` : ""}${contact?.anchor ? `#${contact.anchor}` : ""}`}>
              {contact.ctaText}
            </Link>
        
          </div>
        </div>
      }
    </>
  );
}
