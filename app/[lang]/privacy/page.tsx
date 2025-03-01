import { getSystemData } from '@/lib/sanity/queries/system';
import {PortableText} from '@portabletext/react'
import { SystemPages } from '@/types/system'
import { Lang } from '@/types/lang'
import { richText } from '@/components/richText'



export default async function Privacy({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const systemData: SystemPages[] = await getSystemData(lang); 
  const privacy = systemData.find(({ key }) => key === "privacy");
  if(!privacy) return <p>Loading...</p>

  return (
    <div className="bg-white pt-8 pb-16">
      <div className="container">
        <h2 className="font-[family-name:var(--font-jersey10)] text-6xl text-rose-red">{privacy.title}</h2>
        <PortableText value={privacy.content} components={richText} />
      </div>
    </div>
    
  );
}