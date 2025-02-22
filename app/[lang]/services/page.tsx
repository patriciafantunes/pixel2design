
import { getServicesData } from '@/lib/sanity/queries/services';
import { Service } from '@/types/homepage'
import { Lang } from '@/types/lang'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const servicesData: Service[] = await getServicesData(lang); 

  if(!servicesData) return <p>Loading...</p>

  return (
    <div>
      <h1>Services</h1>
    </div>
  );
}
