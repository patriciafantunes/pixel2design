import { getSystemData } from '@/lib/sanity/queries/system';
import { PortableText } from '@portabletext/react';
import { SystemPages } from '@/types/system'
import { richText } from '@/components/richText'
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
    <div className="bg-white py-16">
      <div className="container">
        <h2 className="font-[family-name:var(--font-jersey10)] text-6xl text-rose-red">{terms.title}</h2>
        <PortableText value={terms.content} components={richText} />
      </div>
    </div>
  );
}
