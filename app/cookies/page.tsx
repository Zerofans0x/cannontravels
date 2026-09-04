
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Telemetry & Cookies Policy | CannonTravels",
  description: "Manage your telemetry and cookie preferences for the CannonTravels global flight and tracking platform.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900 overflow-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        {/* Container to align backgrounds and foregrounds */}
        <div className="relative w-full max-w-[900px] flex justify-center mt-8">

          {/* Background 404-single image */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] sm:w-full h-[400px] md:h-[500px] pointer-events-none z-0">
            <Image
              src="/images/404-single.png"
              alt="Background Pattern"
              fill
              className="object-contain object-top opacity-90"
              sizes="100vw"
            />
          </div>

          {/* Foreground Cookie Card */}
          <div className="relative z-10 w-full max-w-[500px] bg-white rounded-[36px] sm:rounded-[44px] pt-12 pb-16 px-8 sm:px-10 shadow-[0_20px_60px_-15px_rgba(220,38,38,0.1)] flex flex-col items-center min-h-[540px] border border-slate-100">
            {/* Cookie Image */}
            <div className="flex justify-center mb-8">
              <div className="relative w-[150px] h-[150px] sm:w-[170px] sm:h-[170px]">
                <Image
                  src="/images/cookies.png"
                  alt="Telemetry Icon"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 150px, 170px"
                />
              </div>
            </div>

            <h1 className="font-mazzard text-[26px] sm:text-[32px] text-[#0f172a] tracking-tight mb-5 text-center font-black">
              Telemetry & cookie governance
            </h1>

            <p className="text-[13.5px] sm:text-[14.5px] text-slate-600 font-medium leading-relaxed mb-10 text-center px-1">
              We deploy advanced telemetry cookies to optimize global flight bookings, monitor WebSocket security, and tailor our platform services to your travel itinerary.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-4 mb-10 mt-auto">
              <button
                type="button"
                className="flex-1 py-3.5 px-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-[14px] font-bold rounded-full transition-colors text-center shadow-md shadow-red-600/20 cursor-pointer"
              >
                Accept All
              </button>
              <button
                type="button"
                className="flex-1 py-3.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[14px] font-bold rounded-full transition-colors text-center cursor-pointer"
              >
                Reject Non-Essential
              </button>
            </div>

            <p className="text-[11px] sm:text-[11.5px] text-slate-400 font-medium leading-relaxed text-center mb-5">
              By selecting <span className="text-[#DC2626] font-bold">&quot;Accept All&quot;</span>, you consent to our use of cookies and live session telemetry. Preferences can be modified anytime.
            </p>

            <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-[11.5px] text-slate-400 font-medium">
              <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-slate-600 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}