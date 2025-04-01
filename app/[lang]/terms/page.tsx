import { getSystemData } from '@/lib/sanity/queries/system';
import { PortableText } from '@portabletext/react';
import { SystemPages } from '@/types/system'
import { richText } from '@/components/richText'
import { Lang } from '@/types/lang'
import { getMeta } from "@/lib/sanity/queries/meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }> ;
}) {
  const { lang } = await params; // 'params' já resolvido aqui

  const metadata = await getMeta(lang, "terms");

  return {
    metadataBase: new URL('https://pixel2design.pt/pt'),
    alternates: {
      canonical: '/',
      languages: {
        'pt-PT': '/pt',
        'en-EN': '/en',
      },
    },
    title: metadata?.title || "Pixel2Design",
    description: metadata?.metadescription || "Pixel2Design",
    openGraph: {
      title: metadata?.metatitle || "Pixel2Design",
      description: metadata?.metadescription || "Pixel2Design",
      images: metadata?.ogImage ? [metadata.ogImage] : [],
    },
  };
}


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
    <div className="bg-white pt-8 pb-16">
      <div className="container">
        <h2 className="font-[family-name:var(--font-jersey10)] text-6xl text-rose-red">{terms.title}</h2>
        <PortableText value={terms.content} components={richText} />
      </div>
    </div>
  );
}
