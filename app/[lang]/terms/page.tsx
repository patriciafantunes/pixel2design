import { getSystemData } from '@/lib/sanity/queries/system';
import { PortableText } from '@portabletext/react';
import { SystemPages } from '@/types/system'
import { Lang } from '@/types/lang'


export default async function Terms({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const systemData: SystemPages[] = await getSystemData(lang); 
  const terms = systemData.find(({ key }) => key === "terms");
  if(!terms) return <p>Loading...</p>

  return (
    <div className="container">
    	<h2>{terms.title}</h2>
    	<PortableText value={terms.content} />
    </div>
  );
}
