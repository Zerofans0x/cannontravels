"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutRoadmap() {
  const roadmapSteps = [
    { step: "01", title: "Route Selection", desc: "Choose global origin and destination hubs." },
    { step: "02", title: "Delegated Checkout", desc: "Optionally send secure payment links to sponsors." },
    { step: "03", title: "Instant PNR Issuance", desc: "Automated airline e-ticket confirmation upon clearance." },
    { step: "04", title: "Live Telemetry Tracking", desc: "Monitor real-time GPS coordinates and ETA post-booking." },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 py-16 sm:py-24 bg-slate-50 rounded-3xl my-8 border border-slate-100">
      <div className="mb-12 sm:mb-16">
        <span className="text-xs font-bold text-[#DC2626] uppercase tracking-widest">DEPLOYMENT PIPELINE</span>
        <h2 className="font-mazzard text-3xl sm:text-4xl lg:text-[40px] text-[#0f172a] tracking-tight font-black mt-2">
          The Flight & Payment Roadmap
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {roadmapSteps.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3"
          >
            <span className="text-2xl font-black font-mono text-[#DC2626]">{item.step}</span>
            <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}