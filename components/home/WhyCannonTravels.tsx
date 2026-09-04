"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const WHY_CARDS = [
  {
    icon: <Icon icon="solar:radar-bold-duotone" className="w-7 h-7" />,
    title: <>Real-Time <br /> Flight Telemetry.</>,
    description: "Monitor passenger flight status, speed, altitude, and estimated arrival in real time using encrypted tracking codes.",
  },
  {
    icon: <Icon icon="solar:card-send-bold-duotone" className="w-7 h-7" />,
    title: <>Delegated <br /> Sponsorship Links.</>,
    description: "Send a secure checkout link to a second party. Sponsors add their email and make payments without account registration.",
  },
  {
    icon: <Icon icon="solar:shield-check-bold-duotone" className="w-7 h-7" />,
    title: <>Verified <br /> Airline PNRs.</>,
    description: "Direct integration with major international carriers ensures immediate e-ticket issuance and airline confirmation.",
  },
];

export default function WhyCannonTravels() {
  return (
    <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
        <span className="text-[12px] font-bold tracking-[0.15em] text-red-600 uppercase">WHY CANNONTRAVELS?</span>
        <h2 className="font-mazzard text-[32px] sm:text-[44px] text-slate-900 font-black leading-[1.1] tracking-tight mt-3">
          Flight booking engineered <br />
          <span className="text-red-600">for complete freedom.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          Whether paying for yourself or delegating a ticket to family or a corporate sponsor, CannonTravels simplifies every step.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 sm:mt-16">
        {WHY_CARDS.map((card, idx) => (
          <div key={idx} className="flex flex-col rounded-[24px] overflow-hidden border border-slate-100 bg-slate-50 hover:shadow-md transition-shadow">
            <div className="p-6 pt-8">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-md text-white">
                {card.icon}
              </div>
            </div>
            <div className="bg-red-600 text-white p-6 pt-6 pb-8 flex-1 flex flex-col justify-start">
              <h3 className="text-xl font-bold leading-tight">{card.title}</h3>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed mt-3 font-normal">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}