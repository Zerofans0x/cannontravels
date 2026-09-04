// app/page.tsx (Home)
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import CelebratingExcellence from "@/components/home/CelebratingExecellence";
import WhyCannonTravels from "@/components/home/WhyCannonTravels";
import OnePlatform from "@/components/home/OnePlatform";
import TrackingBadge from "@/components/home/TrackingBadge";
import WhoItsFor from "@/components/home/WhoItsFor";
import RecentBookings from "@/components/home/RecentBookings";
import Faq from "@/components/shared/Faq";
import Cta from "@/components/shared/Cta";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <main className="flex-1 flex flex-col">
        <Hero />
        <Stats />
        <CelebratingExcellence />
        <WhyCannonTravels />
        <OnePlatform />
        <TrackingBadge flightNumber="FL-892" status="En Route" route="JFK → LHR" />
        <WhoItsFor />
        <RecentBookings />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}