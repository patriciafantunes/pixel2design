import Section from "@/components/Section";
import ContactSection from "@/components/ContactSection";
import { getHomepageData } from "@/lib/sanity/queries/homepage";
import { getFormData } from "@/lib/sanity/queries/contactForm";
import { Homepage, ContactSection as ContactData } from "@/types/homepage";
import { Lang } from "@/types/lang";
import { Pages } from "@/types/pages";
import { getMeta } from "@/lib/sanity/queries/meta";
import { i18n } from "../../i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }> ;
}) {
  const { lang } = await params; // 'params' já resolvido aqui

  const metadata = await getMeta(lang || i18n.defaultLocale, "homepage");

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

export default async function Home({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const homepageData: Homepage = await getHomepageData(lang || i18n.defaultLocale);
  const contactFormData: ContactData = await getFormData(lang || i18n.defaultLocale);

  if (!homepageData) return <p>Loading...</p>;

  return (
    <div>
      <div className="bg-gradient">
        {homepageData.sections.map((section, index) => (
          <Section key={index} section={section} index={index} lang={lang || i18n.defaultLocale} />
        ))}
      </div>
      <ContactSection contactFormData={contactFormData} />
    </div>
  );
}