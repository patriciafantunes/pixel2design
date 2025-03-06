import Section from "@/components/Section";
import ContactSection from "@/components/ContactSection";
import { getHomepageData } from "@/lib/sanity/queries/homepage";
import { getFormData } from "@/lib/sanity/queries/contactForm";
import { Homepage, ContactSection as ContactData } from "@/types/homepage";
import { Lang } from "@/types/lang";

export default async function Home({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const homepageData: Homepage = await getHomepageData(lang);
  const contactFormData: ContactData = await getFormData(lang);

  if (!homepageData) return <p>Loading...</p>;

  return (
    <div>
      <div className="bg-gradient">
        {homepageData.sections.map((section, index) => (
          <Section key={index} section={section} index={index} lang={lang} />
        ))}
      </div>
      <ContactSection contactFormData={contactFormData} />
    </div>
  );
}
