"use client";

import React from "react";
import { motion } from "framer-motion";

const AUDIENCE_CARDS = [
  { title: "Individual Passengers", desc: "Book direct flights with instant PNR confirmation and self-checkout." },
  { title: "Sponsored Travelers", desc: "Request third-party payment links for family, friends, or corporate sponsors." },
  { title: "Corporate & Agencies", desc: "Pay for employee travel without needing individual passenger account logins." },
];

export default function WhoItsFor() {
  return (
    <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="text-xs font-bold text-red-600 tracking-wider uppercase">WHO IT&apos;S FOR</span>
        <h2 className="font-mazzard text-[36px] sm:text-[44px] text-slate-900 font-black leading-[1.1] tracking-tight mt-2">
          Designed for every <span className="text-red-600">travel scenario</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {AUDIENCE_CARDS.map((card, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:border-red-200 transition-colors">
            <span className="text-red-600 font-mono font-bold text-xs uppercase">0{idx + 1}</span>
            <h3 className="text-xl font-bold text-slate-900 mt-4">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}