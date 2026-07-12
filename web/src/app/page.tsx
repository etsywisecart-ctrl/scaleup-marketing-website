import Hero from "@/components/Hero";
import About from "@/components/About";
import ClientLogos from "@/components/ClientLogos";
import Services from "@/components/Services";
import Showreel from "@/components/Showreel";
import Academy from "@/components/Academy";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/data/content";
import { faqSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <About />
      <ClientLogos />
      <Services />
      <Showreel />
      <Academy />
      <Process />
      <WhyUs />
      <Results />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
