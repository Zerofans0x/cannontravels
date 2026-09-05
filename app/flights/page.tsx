
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function FlightsPage() {
  const router = useRouter();
  const [flightsList, setFlightsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDest, setSelectedDest] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get("/flights"); // Adjust to your backend endpoint for flight listings
        setFlightsList(response.data.data || []);
      } catch (err) {
        // Fallback default inventory if backend listing route is purely simulated
        setFlightsList([
          { _id: "f1", flightNumber: "AF 022", airline: "Air France", origin: "CDG", destination: "JFK", duration: "08h 15m", amount: 850, currency: "USD", type: "Direct" },
          { _id: "f2", flightNumber: "BA 177", airline: "British Airways", origin: "LHR", destination: "DXB", duration: "07h 20m", amount: 720, currency: "USD", type: "Direct" },
          { _id: "f3", flightNumber: "LH 400", airline: "Lufthansa", origin: "FRA", destination: "LAX", duration: "11h 45m", amount: 1140, currency: "USD", type: "Direct" },
          { _id: "f4", flightNumber: "KL 641", airline: "KLM Royal Dutch", origin: "AMS", destination: "MIA", duration: "10h 10m", amount: 930, currency: "USD", type: "1 Stop" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleBookFlight = async (flight: any) => {
    try {
      // Create a booking record in the backend and redirect to payment/ticket view
      const response = await api.post("/bookings", {
        flightNumber: flight.flightNumber,
        origin: flight.origin || selectedOrigin || "CDG",
        destination: flight.destination || selectedDest || "JFK",
        amount: flight.amount || 850,
        currency: flight.currency || "USD",
        departureTime: new Date(Date.now() + 86400000 * 2).toISOString() // 2 days from now
      });

      const bookingId = response.data.data._id;
      router.push(`/dashboard/bookings/${bookingId}`);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Failed to initialize flight booking.");
    }
  };

  const filteredFlights = flightsList.filter(f => {
    const matchesOrigin = selectedOrigin ? f.origin?.includes(selectedOrigin) : true;
    const matchesDest = selectedDest ? f.destination?.includes(selectedDest) : true;
    return matchesOrigin && matchesDest;
  });

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <Navbar />

      <main className="flex-1 max-w-[1260px] w-full mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 bg-red-50 rounded-full border border-red-100 font-bold inline-block">
            CannonTravels Global Inventory
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Explore & Book <span className="text-[#DC2626]">Global Flights</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            Search top European and international routes. Choose self-checkout or generate a secure delegated payment link for a third-party sponsor.
          </p>
        </motion.div>

        {errorMessage && (
          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs text-center font-medium">
            {errorMessage}
          </div>
        )}

        {/* Search Filter Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Origin Hub</label>
            <select 
              value={selectedOrigin} 
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 font-bold text-slate-800 outline-none text-sm"
            >
              <option value="">All Origins</option>
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
              className="w-full bg-white border border-slate-200 rounded-xl p-3 font-bold text-slate-800 outline-none text-sm"
            >
              <option value="">All Destinations</option>
              <option value="JFK">New York (JFK)</option>
              <option value="DXB">Dubai (DXB)</option>
              <option value="LAX">Los Angeles (LAX)</option>
              <option value="MIA">Miami (MIA)</option>
            </select>
          </div>

          <div className="flex items-end h-full pt-5 md:pt-0">
            <button 
              onClick={() => {}} 
              className="w-full py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Icon icon="solar:magnifer-bold" className="w-4 h-4" />
              <span>Filter Flights</span>
            </button>
          </div>
        </div>

        {/* Flights List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="py-20 text-center">
              <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin inline-block" />
            </div>
          ) : filteredFlights.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">No flights found matching your selected route.</div>
          ) : (
            filteredFlights.map((flight, idx) => (
              <motion.div 
                key={flight._id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-200 hover:border-red-300 p-6 rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-lg border border-red-100">
                    ✈
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#DC2626]">{flight.flightNumber}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-mono text-slate-500">{flight.airline}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {flight.origin || 'CDG'} → {flight.destination || 'JFK'}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-slate-500 block font-medium">Duration: {flight.duration}</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full inline-block mt-1">
                      {flight.type || 'Direct'}
                    </span>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <span className="text-2xl font-black text-slate-900 block">${flight.amount}</span>
                      <span className="text-[10px] text-slate-400 font-mono">USD</span>
                    </div>
                    <button
                      onClick={() => handleBookFlight(flight)}
                      className="px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md shadow-red-600/20 transition-all cursor-pointer whitespace-nowrap"
                    >
                      Book & Pay →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}