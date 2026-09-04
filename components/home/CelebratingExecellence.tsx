"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CelebratingExcellence() {
  return (
    <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-14"
      >
        <span className="text-[12px] font-bold text-red-600 tracking-[0.15em] uppercase">VERIFIED JOURNEYS</span>
        <h2 className="font-mazzard text-[34px] sm:text-4xl lg:text-[44px] text-slate-900 font-black tracking-tight leading-[1.1] mt-2">
          Seamless Travel. <br />
          <span className="text-red-600">Sponsored Worldwide.</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal">
          See how passengers book European routes and track journeys with delegated payments.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Card */}
        <div className="md:col-span-2 relative h-[320px] sm:h-[380px] rounded-[24px] overflow-hidden group shadow-lg bg-slate-900">
          <Image
            src="/images/paris-flight.jpg" // Placeholder path
            alt="European Flight Experience"
            fill
            className="object-cover object-center opacity-75 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

          <div className="absolute top-5 left-5 z-20">
            <span className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-full shadow-md">
              Delegated Payment Verified
            </span>
          </div>

          <div className="absolute bottom-6 inset-x-6 z-20">
            <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
              Paris (CDG) → New York (JFK)
            </h3>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              &quot;My corporate sponsor paid for my transatlantic flight using CannonTravels&apos; secure payment link without needing an account. The live location tracking kept my team updated on arrival.&quot;
            </p>
          </div>
        </div>

        {/* Small Card */}
        <div className="relative h-[320px] sm:h-[380px] rounded-[24px] overflow-hidden group shadow-lg bg-slate-900">
          <Image
            src="/images/london-flight.jpg" // Placeholder path
            alt="London Route"
            fill
            className="object-cover object-center opacity-75 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

          <div className="absolute top-5 left-5 z-20">
            <span className="px-4 py-2 bg-white/90 text-slate-900 font-bold text-xs rounded-full shadow-md">
              London (LHR) → Dubai
            </span>
          </div>

          <div className="absolute bottom-6 inset-x-6 z-20">
            <h3 className="text-white text-lg font-bold">
              Instant Confirmations
            </h3>
            <p className="mt-1.5 text-slate-300 text-xs leading-relaxed">
              Zero delays on ticketing. Automated flight numbers and PNR reference codes dispatched upon payment authorization.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}