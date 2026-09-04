
"use client";

import { motion } from "framer-motion";

export default function OurStory() {
  const storyItems = [
    {
      title: "Founded in 2023.",
      description:
        "Started as a specialized aviation logistics desk supporting corporate teams with cross-border flight bookings and secure payment workflows.",
    },
    {
      title: "Expanded operations in 2025.",
      description:
        "Introduced delegated third-party payments, allowing sponsors worldwide to clear travel tickets without creating accounts.",
    },
    {
      title: "Evolved into CannonTravels (2026).",
      description:
        "Relaunched with live WebSocket telemetry tracking, instant PNR airline issuance, and an optimized Red & White booking dashboard.",
    },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="hidden lg:block lg:col-span-6" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-6 max-w-xl"
        >
          <h2 className="font-mazzard text-3xl sm:text-4xl lg:text-[40px] text-[#0f172a] tracking-tight mb-8 font-black">
            Our story
          </h2>

          <div className="space-y-6 sm:space-y-7 text-[14px] sm:text-[15px] leading-relaxed text-slate-600 font-medium">
            {storyItems.map((item, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
              >
                <span className="font-bold text-[#0f172a]">{item.title}</span>{" "}
                {item.description}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}