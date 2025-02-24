import { getSystemData } from '@/lib/sanity/queries/system';
import {PortableText} from '@portabletext/react'
import { SystemPages } from '@/types/system'
import { Lang } from '@/types/lang'

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
    <div className="container">
    	<h2>{privacy.title}</h2>
    	<PortableText value={privacy.content} />
    </div>
  );
}