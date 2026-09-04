"use client";

import { motion } from "framer-motion";

export default function AboutMission() {
  const missionCards = [
    {
      title: (
        <>
          Precision over <br /> flight delays
        </>
      ),
      description: "Instant PNR confirmation and reliable route scheduling beats guesswork every time.",
    },
    {
      title: (
        <>
          Clarity over <br /> hidden ticketing fees
        </>
      ),
      description: "We provide transparent pricing on every route with zero surprise surcharges.",
    },
    {
      title: (
        <>
          Security is <br /> non-negotiable
        </>
      ),
      description: "Encrypted WebSocket telemetry and secure third-party payment links protect every trip.",
    },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-2xl"
      >
        <span className="text-[12px] tracking-[0.15em] text-[#DC2626] uppercase font-bold">
          OUR MISSION
        </span>
        <h2 className="font-mazzard text-[32px] sm:text-[44px] lg:text-[48px] text-[#111827] leading-[1.1] tracking-tight mt-4 font-black">
          Global flight freedom, <br />
          <span className="text-[#DC2626]">not complicated booking barriers</span>
        </h2>
        <p className="mt-5 text-[14px] sm:text-[15px] text-slate-600 font-medium leading-[1.6] max-w-[580px]">
          We believe the travel ticketing industry suffers from clunky interfaces and rigid payment rules. 
          At CannonTravels, we empower passengers and sponsors through frictionless delegation and real-time tracking clarity.
        </p>
      </motion.div>

      <div className="flex justify-start sm:justify-end mt-10 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="flex flex-row md:grid md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-[1000px] overflow-x-auto scrollbar-hide -mx-6 px-6 sm:-mx-10 sm:px-10 md:mx-0 md:px-0 pb-4"
        >
          {missionCards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-[78vw] max-w-[270px] md:max-w-none md:w-auto flex-shrink-0 md:flex-shrink flex flex-col rounded-[28px] sm:rounded-[24px] overflow-hidden border border-slate-100/80 bg-slate-50 shadow-xs cursor-pointer"
            >
              <div className="h-[90px] sm:h-[130px] bg-red-50/40" />

              <div className="bg-[#DC2626] text-white p-6 pt-6 pb-7 sm:p-8 flex-1 flex flex-col justify-start min-h-[160px] sm:min-h-[190px]">
                <h3 className="text-[18px] sm:text-[20px] font-bold leading-[1.28] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-white/90 text-[13px] sm:text-[14px] leading-[1.55] mt-3 sm:mt-3.5 font-medium">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}