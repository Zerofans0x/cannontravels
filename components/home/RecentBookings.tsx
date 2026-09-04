// components/home/RecentBookings.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function RecentBookings() {
  const recentBookings = [
    { route: "Paris (CDG) → New York (JFK)", code: "TRK-8812", status: "PAID BY THIRD-PARTY", amount: "$850.00", date: "Today, 08:24 AM" },
    { route: "London (LHR) → Dubai (DXB)", code: "TRK-4029", status: "PAID (SELF)", amount: "$720.00", date: "Today, 06:10 AM" },
    { route: "Frankfurt (FRA) → Los Angeles (LAX)", code: "TRK-1092", status: "PAID BY THIRD-PARTY", amount: "$1,140.00", date: "Yesterday, 11:45 PM" },
    { route: "Amsterdam (AMS) → Miami (MIA)", code: "TRK-5541", status: "PAID (SELF)", amount: "$930.00", date: "Yesterday, 04:30 PM" },
  ];

  return (
    <section className="w-full bg-slate-900 text-white py-20 sm:py-28 relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              LIVE CLEARANCE LOG
            </span>
            <h2 className="font-mazzard text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-3">
              Verified Flight Clearances <br />
              <span className="text-red-500">& Delegated Sponsorships</span>
            </h2>
          </motion.div>
          <p className="text-slate-400 text-sm max-w-sm">
            Real-time tracking of global passenger checkouts, instant PNR issuance, and authorized sponsor payments.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4"
        >
          {recentBookings.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-red-500/50 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
                  <Icon icon="solar:plain-bold-duotone" className="w-6 h-6 rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">{item.code}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{item.route}</h3>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-700/60">
                <span className={`px-3 py-1.5 text-xs font-mono font-bold rounded-full ${
                  item.status.includes("THIRD-PARTY") 
                    ? "bg-amber-500/10 border border-amber-500/30 text-amber-400" 
                    : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                }`}>
                  {item.status}
                </span>
                <span className="font-mono font-black text-white text-lg sm:text-xl">{item.amount}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}