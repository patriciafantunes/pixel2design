import ContactForm from "./ContactForm";
import { ContactSection as ContactData } from "@/types/homepage";

export default function ContactSection({ contactFormData }: { contactFormData: ContactData }) {
  return (
    <div id="contact" className="relative overflow-hidden py-10 before:w-full before:h-full before:absolute before:bg-royal-purple/50 before:z-1 before:top-0">
      <video className="flex absolute w-full h-full object-cover right-0 top-0 w" autoPlay muted playsInline webkit-playsinline="true" loop width="100%" height="100%">
        <source src="/contacts-video.webm" type="video/webm" />
      </video>
      <div className="container relative z-10 flex justify-between flex-col md:flex-row items-center md:items-stretch">
        <div className="text-off-white flex flex-col justify-between text-center md:text-left">
          <div>
            <h2 className="font-[family-name:var(--font-jersey10)] text-6xl text-glow mb-1">{contactFormData.title}</h2>
            <p className="text-2xl mb-8 md:mb-0">{contactFormData.subtitle}</p>
          </div>
          <p className="mb-4 md:mb-0">{contactFormData.email}</p>
        </div>
        <ContactForm {...contactFormData} />
      </div>
    </div>
  );
}
