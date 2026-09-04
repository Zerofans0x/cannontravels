// components/shared/Cta.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Cta() {
  return (
    <section className="w-full py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-[1460px] sm:mx-auto px-6 sm:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full sm:rounded-[48px] overflow-hidden flex flex-col sm:flex-row items-center sm:min-h-[600px] lg:min-h-[650px] shadow-[0_4px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100/80 bg-slate-50"
        >
          {/* Desktop Background Image */}
          <div className="hidden sm:block absolute inset-0 z-0">
            <Image
              src="/images/home-cta-flight.png" // Update image source to a flight/travel image
              alt="Book your next journey"
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover object-right md:object-center opacity-90"
              priority
            />
          </div>

          {/* Mobile Top Illustration */}
          <div className="block sm:hidden w-full pt-8 pb-4 flex items-center justify-center relative z-10">
            <Image
              src="/images/cta-flight-mobile.png"
              alt="Book your next journey"
              width={360}
              height={360}
              className="w-full h-auto object-contain rounded-tl-[32px]"
              priority
            />
          </div>

          {/* Content layered on top */}
          <div className="relative z-10 w-full sm:w-[55%] xl:w-1/2 flex flex-col p-6 sm:p-14 lg:p-20 pb-10 sm:bg-white/90 sm:backdrop-blur-md h-full justify-center">
            <span className="text-[12px] font-bold tracking-widest text-[#DC2626] uppercase mb-2">
              START EXPLORING TODAY
            </span>
            <h2 className="font-mazzard text-[32px] sm:text-[36px] lg:text-[40px] text-[#111827] leading-[1.1] tracking-tight font-black">
              Stop waiting. <br className="block sm:hidden" />
              Start flying. <br />
              <span className="text-[#DC2626]">Book your journey.</span>
            </h2>
            <div className="mt-4 text-[13px] sm:text-[14px] text-slate-600 font-medium leading-[1.5]">
              <p>Join thousands of travelers flying securely across the globe using our real-time telemetry and delegated payment engine.</p>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Link
                href="/flights"
                className="inline-flex items-center justify-center px-7 py-3.5 text-[14px] sm:text-[15px] font-bold rounded-full transition-colors duration-200 shadow-md shadow-red-600/20 bg-[#DC2626] text-white hover:bg-[#B91C1C] whitespace-nowrap"
              >
                Search Flights
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-7 py-3.5 text-[14px] sm:text-[15px] font-bold rounded-full transition-colors duration-200 border-[1.5px] border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 whitespace-nowrap"
              >
                Create Account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}