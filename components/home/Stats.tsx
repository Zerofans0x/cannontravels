"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { label: "Active Travelers", value: "48,000+" },
    { label: "Global Routes Covered", value: "120+" },
    { label: "Delegated Sponsorships", value: "$12M+" },
    { label: "Telemetry Uptime", value: "99.99%" },
  ];

  return (
    <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-xs"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60">
          {stats.map((stat, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center text-center ${idx !== 0 ? "pt-6 sm:pt-0" : ""}`}>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-mono">
                {stat.value}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}