import { getSystemData } from '@/lib/sanity/queries/system';
import {PortableText} from '@portabletext/react'

import Image from "next/image"
import packIcon from '@/public/pack-icon.png'
import { getServicesData } from '@/lib/sanity/queries/services';
import { getComponentsData } from '@/lib/sanity/queries/components';
import { Service, Component } from '@/types/homepage'
import { Lang } from '@/types/lang'
import { GradientIcon } from '@/components/GradientIcon'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const systemData : any = await getSystemData(lang); 
  const terms = systemData.find(({ key }) => key === "terms");
  if(!terms) return <p>Loading...</p>


    console.log(terms);

  return (
    <div className="container">
    	<h2>{terms.title}</h2>
    	<PortableText value={terms.content} />
    </div>
  );
}
