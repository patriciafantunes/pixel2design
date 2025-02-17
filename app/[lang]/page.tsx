
import ContactForm from "@/components/ContactForm";
import { getHomepageData } from '@/lib/sanity/queries/homepage';
import { Homepage } from '@/types/homepage'
import { Lang } from '@/types/lang'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = await params;
  const homepageData: Homepage = await getHomepageData(lang); 

  if(!homepageData) return <p>Loading...</p>
  return (
    <div>
      {homepageData.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
        </div>
      ))}

      <ContactForm />
    </div>
  );
}
