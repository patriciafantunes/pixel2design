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
  const privacy = systemData.find(({ key }) => key === "privacy");
  if(!privacy) return <p>Loading...</p>


    console.log(privacy);

  return (
    <div className="container">
    	<h2>{privacy.title}</h2>
    	<PortableText value={privacy.content} />
    </div>
  );
}