
"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: "Encrypted WebSocket Telemetry",
      description: "Real-time passenger location tracking and flight coordinates are broadcasted via secure SSL sockets, ensuring absolute privacy for travelers and sponsors.",
      icon: "solar:radar-bold-duotone",
    },
    {
      title: "Enterprise TLS & AES-256 Encryption",
      description: "All client accounts, itinerary records, and delegated payment configuration pathways are protected using military-grade encryption standards.",
      icon: "solar:shield-check-bold-duotone",
    },
    {
      title: "Mandatory Multi-Factor Authentication",
      description: "Enhanced account security enforced via strict Time-based One-Time Password (TOTP) verification for every sensitive dashboard action or booking modification.",
      icon: "solar:lock-password-bold-duotone",
    },
    {
      title: "Automated Airline PNR Verification",
      description: "Direct API integration with major international carriers guarantees immediate, tamper-proof electronic ticket issuance and payment settlement.",
      icon: "solar:check-read-bold-duotone",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-white text-slate-900 min-h-screen selection:bg-red-100 selection:text-red-900">
      <Navbar />

      <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-red-50 text-[#DC2626] text-[12px] sm:text-[14px] tracking-[0.12em] uppercase mb-4 font-bold border border-red-100">
            TIER-1 AIRSPACE SECURITY
          </span>
          <h1 className="font-mazzard text-[38px] sm:text-[52px] lg:text-[58px] text-[#0f172a] leading-[1.08] tracking-tight font-black">
            Uncompromising Security for <br />
            <span className="text-[#DC2626]">Flight Bookings & Telemetry</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-slate-600 text-[14px] sm:text-[16px] leading-relaxed font-medium">
            We deploy multi-layered encryption infrastructure designed to safeguard traveler data and secure third-party delegated payments against digital threats.
          </p>
        </motion.div>
      </section>

      <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 rounded-[32px] p-8 sm:p-10 border border-slate-200 hover:border-red-200 transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#DC2626] text-white flex items-center justify-center mb-6 shadow-md shadow-red-600/20">
                  <Icon icon={item.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-mazzard text-[22px] text-[#0f172a] tracking-tight font-bold">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-600 text-[14px] leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}