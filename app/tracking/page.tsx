

"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function TrackingPage() {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = trackingCode.trim().toUpperCase();
    if (cleanCode) {
      router.push(`/dashboard/track/${cleanCode}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <Navbar />

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-6 sm:px-10 py-16 space-y-10 flex flex-col justify-center">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 bg-red-50 rounded-full border border-red-100 font-bold inline-block">
            Real-Time WebSocket Telemetry
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Live Passenger Flight Tracking
          </h1>
          <p className="text-slate-600 text-sm font-medium leading-relaxed">
            Enter your secure tracking code or PNR token to initialize real-time global airspace monitoring and live globe telemetry.
          </p>
        </div>

        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Icon icon="lucide:search" className="w-4 h-4" />
            </span>
            <input 
              type="text"
              required
              placeholder="e.g. TRK-F63AC2"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-slate-900 font-mono uppercase text-sm tracking-wider outline-none focus:border-[#DC2626] transition-colors shadow-xs"
            />
          </div>
          <button 
            type="submit" 
            className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Launch Radar</span>
            <Icon icon="lucide:arrow-right" className="w-4 h-4" />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <Icon icon="lucide:globe" className="w-5 h-5 text-[#DC2626] mx-auto mb-2" />
            <h4 className="text-xs font-bold text-slate-900">Global Airspace Feed</h4>
            <p className="text-[11px] text-slate-500">Connected to live commercial telemetry.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <Icon icon="lucide:shield-check" className="w-5 h-5 text-[#DC2626] mx-auto mb-2" />
            <h4 className="text-xs font-bold text-slate-900">Secure PNR Vault</h4>
            <p className="text-[11px] text-slate-500">Unauthenticated sponsor viewing rooms.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <Icon icon="lucide:zap" className="w-5 h-5 text-[#DC2626] mx-auto mb-2" />
            <h4 className="text-xs font-bold text-slate-900">Instant Sockets</h4>
            <p className="text-[11px] text-slate-500">Real-time speed and heading updates.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}