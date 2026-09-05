"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function FlightsInventoryPage() {
  const [origin, setOrigin] = useState("LOS");
  const [destination, setDestination] = useState("LHR");
  const [selectedCabin, setSelectedCabin] = useState("economy");
  const [date, setDate] = useState("2026-06-15");
  const [page, setPage] = useState(1);
  
  const [flights, setFlights] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFlights = async (targetPage = 1) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await api.get("/flights", {
        params: { origin, destination, date, page: targetPage, limit: 5 }
      });
      setFlights(response.data.flights || []);
      setTotalPages(response.data.totalPages || 1);
      setPage(response.data.currentPage || 1);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to fetch flight inventory.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights(1);
  }, [origin, destination, date]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-wider font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Global Inventory Live
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Secure PNR Flight Booking
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Select a route from verified international inventory. Check out instantly or issue a delegated payment link for a sponsor.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl">
          {["economy", "business", "first"].map((cabin) => (
            <button
              key={cabin}
              onClick={() => setSelectedCabin(cabin)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedCabin === cabin
                  ? "bg-[#DC2626] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cabin}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Origin Hub</label>
          <select 
            value={origin} 
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-[#DC2626]"
          >
            <option value="LOS">Lagos (LOS)</option>
            <option value="ABV">Abuja (ABV)</option>
            <option value="PHC">Port Harcourt (PHC)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Destination Hub</label>
          <select 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-[#DC2626]"
          >
            <option value="LHR">London Heathrow (LHR)</option>
            <option value="CDG">Paris (CDG)</option>
            <option value="FRA">Frankfurt (FRA)</option>
            <option value="JFK">New York (JFK)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Travel Date</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-[#DC2626]"
          />
        </div>

        <div className="flex items-end h-full pt-2 md:pt-5">
          <button 
            onClick={() => fetchFlights(1)}
            className="w-full py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon icon="solar:magnifer-bold" className="w-4 h-4" />
            <span>Search Inventory</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Flight Results List */}
      {isLoading ? (
        <div className="py-20 flex justify-center items-center">
          <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : flights.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <Icon icon="lucide:plane-off" className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-900 text-lg">No active flights found for this route</h3>
          <p className="text-slate-500 text-sm">Try tweaking your origin hub, destination, or date parameters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flights.map((flight: any, idx: number) => {
            const price = flight.pricing?.[selectedCabin] || flight.pricing?.economy || 0;
            return (
              <motion.div 
                key={flight._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-slate-200 hover:border-red-300 p-6 rounded-3xl shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1">
                    ✈
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#DC2626]">{flight.flightNo}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-mono text-slate-500">{flight.airline}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        {flight.availableSeats} seats left
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{flight.originCity} ({flight.origin}) → {flight.destinationCity} ({flight.destination})</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
                      <span>Departs: <strong className="text-slate-700">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span>
                      <span>Arrives: <strong className="text-slate-700">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span>
                      <span>Duration: <strong className="text-slate-700">{flight.duration}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">{selectedCabin} Class</span>
                    <span className="text-2xl font-black text-slate-900 block">${price}</span>
                  </div>
                  <Link 
                    href={`/dashboard/flights/${flight._id}?cabin=${selectedCabin}`}
                    className="px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Select & Checkout</span>
                    <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button
                onClick={() => fetchFlights(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Previous Page
              </button>
              
              <span className="text-xs font-mono font-medium text-slate-500">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => fetchFlights(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}