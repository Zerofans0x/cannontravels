// app/flights/page.tsx
"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function FlightsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("CDG");
  const [selectedDest, setSelectedDest] = useState("JFK");

  const flightsList = [
    { flightNo: "AF 022", airline: "Air France", route: "Paris (CDG) → New York (JFK)", duration: "08h 15m", price: "$850", type: "Direct" },
    { flightNo: "BA 177", airline: "British Airways", route: "London (LHR) → Dubai (DXB)", duration: "07h 20m", price: "$720", type: "Direct" },
    { flightNo: "LH 400", airline: "Lufthansa", route: "Frankfurt (FRA) → Los Angeles (LAX)", duration: "11h 45m", price: "$1,140", type: "Direct" },
    { flightNo: "KL 641", airline: "KLM Royal Dutch", route: "Amsterdam (AMS) → Miami (MIA)", duration: "10h 10m", price: "$930", type: "1 Stop" },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <Navbar />

      <main className="flex-1 max-w-[1260px] w-full mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-widest px-3 py-1 bg-red-50 rounded-full border border-red-100 font-bold">
            CannonTravels Global Inventory
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Explore & Book <span className="text-[#DC2626]">Global Flights</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Search top European and international routes. Choose self-checkout or generate a secure delegated payment link for a third-party sponsor.
          </p>
        </motion.div>

        {/* Search Filter Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Origin Hub</label>
            <select 
              value={selectedOrigin} 
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 font-bold text-slate-800 outline-none"
            >
              <option value="CDG">Paris (CDG)</option>
              <option value="LHR">London (LHR)</option>
              <option value="FRA">Frankfurt (FRA)</option>
              <option value="AMS">Amsterdam (AMS)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Destination</label>
            <select 
              value={selectedDest} 
              onChange={(e) => setSelectedDest(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 font-bold text-slate-800 outline-none"
            >
              <option value="JFK">New York (JFK)</option>
              <option value="DXB">Dubai (DXB)</option>
              <option value="LAX">Los Angeles (LAX)</option>
              <option value="MIA">Miami (MIA)</option>
            </select>
          </div>

          <div className="flex items-end h-full pt-5 md:pt-0">
            <button className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2">
              <Icon icon="solar:magnifer-bold" className="w-5 h-5" />
              <span>Filter Flights</span>
            </button>
          </div>
        </div>

        {/* Flights List */}
        <div className="space-y-4">
          {flightsList.map((flight, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-200 hover:border-red-300 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-lg">
                  ✈
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#DC2626]">{flight.flightNo}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-mono text-slate-500">{flight.airline}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{flight.route}</h3>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <span className="text-xs text-slate-500 block font-medium">Duration: {flight.duration}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{flight.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900 block">{flight.price}</span>
                  <a href={`/pay/TRK-${idx}992`} className="text-xs font-bold text-[#DC2626] hover:underline mt-1 inline-block">
                    Book or Delegate →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}