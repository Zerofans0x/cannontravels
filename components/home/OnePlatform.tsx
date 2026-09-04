"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function OnePlatform() {
  return (
    <section className="w-full py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="w-full rounded-[32px] bg-white p-8 border border-slate-200/80 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-bold text-sm text-slate-800">CannonTravels Flight Console</span>
                </div>
                <span className="text-xs font-mono bg-red-50 text-red-600 font-bold px-3 py-1 rounded-full">ACTIVE SESSION</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Flight Reference</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">PNR: X7B9Q2</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">TICKET ISSUED</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Tracking Code</span>
                    <span className="font-mono font-bold text-red-600 text-sm">A4F89B</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">LIVE TELEMETRY</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-bold text-red-600 tracking-wider uppercase">ALL-IN-ONE ENGINE</span>
            <h2 className="font-mazzard text-[36px] sm:text-[42px] text-slate-900 font-black leading-[1.1] tracking-tight mt-3">
              Complete Control. <br />
              <span className="text-red-600">One Clean Interface.</span>
            </h2>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Manage flight reservations, send payment request links, and broadcast location coordinates to your third-party payers.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: "solar:plain-bold-duotone", text: "Global Flight Search & PNR Generation" },
                { icon: "solar:users-group-rounded-bold-duotone", text: "Third-Party Sponsor Payment Delegation" },
                { icon: "solar:radar-bold-duotone", text: "Real-Time WebSocket Geolocation Broadcasting" },
                { icon: "solar:shield-check-bold-duotone", text: "Encrypted Passenger Privacy & Masked Data" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 border-b border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <Icon icon={item.icon} className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}