import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import Academy from "@/components/Academy";
import Results from "@/components/Results";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/data/content";
import { faqSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <ClientLogos />
      <Services />
      <Academy />
      <Results />
      <WhyUs />
      <Testimonials />
      <Faq />
      <CtaBand />
      <Contact />
    </>
  );
}
