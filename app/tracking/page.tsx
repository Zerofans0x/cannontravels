// app/tracking/page.tsx
"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [isLiveActive, setIsLiveActive] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      setIsLiveActive(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <Navbar />

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-6 sm:px-10 py-12 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-widest px-3 py-1 bg-red-50 rounded-full border border-red-100 font-bold">
            Real-Time WebSocket Telemetry
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Live Passenger Flight Tracking</h1>
          <p className="text-slate-600 text-sm font-medium">Enter your secure tracking code (e.g., A4F89B) to initialize real-time flight telemetry monitoring.</p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-3 max-w-md mx-auto">
          <input 
            type="text"
            placeholder="Enter Tracking Code"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-mono uppercase tracking-wider outline-none focus:border-[#DC2626]"
          />
          <button type="submit" className="px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl shadow-md shadow-red-600/20 transition-all">
            Track Live
          </button>
        </form>

        {isLiveActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-xs text-emerald-400 font-bold">CONNECTED: TRACK_{trackingCode}</span>
              </div>
              <span className="font-mono text-xs text-slate-400">SECURE SSL SOCKET</span>
            </div>

            <div className="h-64 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
              <Icon icon="solar:radar-bold-duotone" className="w-16 h-16 text-[#DC2626] animate-pulse mb-3" />
              <p className="text-white font-bold text-sm">Streaming Live Flight Coordinates...</p>
              <p className="text-slate-400 text-xs font-mono mt-1">Altitude: 38,000 FT • Speed: 885 KM/H</p>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}