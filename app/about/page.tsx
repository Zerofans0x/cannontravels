import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import AboutRoadmap from "@/components/about/AboutRoadmap";
import AboutMission from "@/components/about/AboutMission";
import Cta from "@/components/shared/Cta";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "About Us | CannonTravels",
  description:
    "We built the platform we needed to exist. Learn about the story, mission, and flight telemetry roadmap behind CannonTravels.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <main className="flex-1 flex flex-col">
        <AboutHero />
        <OurStory />
        <AboutRoadmap />
        <AboutMission />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}