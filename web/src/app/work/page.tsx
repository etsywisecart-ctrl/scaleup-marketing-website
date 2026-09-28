import type { Metadata } from "next";
import WorkHero from "@/components/work/WorkHero";
import WorkGallery from "@/components/work/WorkGallery";
import WorkNumbers from "@/components/work/WorkNumbers";
import ClientLogos from "@/components/ClientLogos";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected ecommerce stores, AI platforms, POS systems and software we've designed, built and scaled for clients — with the real numbers behind them.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <WorkGallery />
      <WorkNumbers />
      <ClientLogos />
      <CtaBand />
    </>
  );
}
