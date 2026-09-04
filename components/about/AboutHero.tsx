"use client";

import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function AboutHero() {
  return (
    <section className="w-full flex flex-col bg-white text-slate-900 overflow-hidden">
      <Navbar />

      <div className="flex-1 max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-14 flex items-center pt-4 pb-16 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">
          
          {/* Illustration / Visual Card */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[560px] flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [-3, 4, -3] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center relative bg-slate-900 rounded-[32px] p-8 text-white shadow-xl border border-slate-800"
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#DC2626] rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                    <Icon icon="solar:radar-bold-duotone" className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold">CannonTravels Telemetry Core</h3>
                  <p className="text-xs text-slate-400 font-mono">LIVE AIRSPACE SOCKETS // TIER-1</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 lg:order-1 lg:col-span-6 flex flex-col items-start z-10 mt-2 lg:mt-0"
          >
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-red-50 text-[#DC2626] text-[12px] sm:text-[14px] tracking-[0.12em] uppercase mb-4 sm:mb-6 shadow-xs font-bold border border-red-100">
              OUR STORY
            </div>

            <h1 className="font-mazzard text-[36px] sm:text-[52px] lg:text-[60px] text-[#0f172a] leading-[1.08] tracking-tight font-black">
              We built <br />
              <span className="text-[#DC2626]">the flight engine</span> <br />
              we needed to exist
            </h1>

            <p className="mt-4 sm:mt-6 text-slate-600 text-[13px] sm:text-[15px] leading-relaxed max-w-[480px] font-medium">
              CannonTravels started from a shared frustration among frequent global travelers and sponsors; flight bookings lacked flexible third-party sponsorship tools and real-time tracking transparency.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}