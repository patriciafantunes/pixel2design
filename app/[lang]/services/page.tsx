
import Image from "next/image"
import packIcon from '@/public/pack-icon.png'
import { getServicesData } from '@/lib/sanity/queries/services';
import { Service } from '@/types/homepage'
import { Lang } from '@/types/lang'
import { GradientIcon } from '@/components/GradientIcon'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const servicesData: Service[] = await getServicesData(lang); 

  if(!servicesData) return <p>Loading...</p>

    console.log(servicesData);

  return (
    <>
      {servicesData.map((service, index) => (
        <div key={index} className={`py-16 ${index % 2 != 0 ? "bg-off-white" : "bg-white"}`}>
          <div className="container">
            <div className="columns-2 items-center mb-5">
              <div>
                <h2 className="font-[family-name:var(--font-jersey10)] text-6xl text-rose-red">{service.title}</h2>
                <h3 className="text-xl text-deep-indigo mb-5">{service.subtitle}</h3>
                <p>{service.description}</p>
              </div>
              <div className="ml-[10%] w-[70vw] h-[300px] flex items-center bg-linear-to-r from-royal-purple to-deep-indigo rounded-full">
                <Image className="h-[320px] ml-[5%]" src={service.image} width={320} height={320} alt={service.title} />
              </div>
            </div>
            
            <p>Recomended projects</p>
            {service.packs.map((pack, index) => (
              <div key={index}>
                <div className="flex items-center my-10 relative before:rounded-full before:w-1/2 before:-left-1/4 before:bg-linear-to-r before:from-royal-purple before:to-rose-red before:absolute before:-inset-1">
                  <Image className="w-15 mr-3 relative" src={packIcon} alt={pack.title} />
                  <h4 className="relative text-white text-2xl font-[family-name:var(--font-jersey10)]">{pack.title}</h4>
                </div>
                
                <div className="columns-2 gap-10">
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
      ))}
    </>
  );
}
