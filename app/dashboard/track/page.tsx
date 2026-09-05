"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function TrackAndTraceHubPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [trackingInput, setTrackingInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await api.get("/dashboard/overview");
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error("Failed to load user bookings for tracking", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserBookings();
  }, []);

  const handleManualTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    router.push(`/dashboard/track/${trackingInput.trim()}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-wider font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Airspace Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Track & Trace Radar
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Monitor real-time airplane coordinates, ground speed, and heading vectors via live WebSocket telemetry streams.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manual Code Lookup Card */}
        <div className="md:col-span-1 bg-slate-900 text-white p-6 rounded-3xl shadow-md space-y-4">
          <div className="w-12 h-12 bg-red-500/20 text-[#DC2626] rounded-2xl flex items-center justify-center">
            <Icon icon="lucide:radar" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Direct Tracking Lookup</h3>
            <p className="text-slate-400 text-xs mt-1">
              Have a tracking token or PNR token? Enter it below to launch live radar tracking.
            </p>
          </div>

          <form onSubmit={handleManualTrack} className="space-y-3 pt-2">
            <input 
              type="text" 
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="e.g. TRK-992..." 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none focus:border-[#DC2626]"
              required
            />
            <button 
              type="submit" 
              className="w-full py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Launch Radar</span>
              <Icon icon="lucide:arrow-right" className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Active Trackable Flights List */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Your Trackable Flight Segments</h3>
          
          {isLoading ? (
            <div className="py-20 flex items-center justify-center">
              <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : bookings.filter(b => b.trackingCode).length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-full shadow-xs flex items-center justify-center mx-auto text-slate-400">
                <Icon icon="lucide:plane-off" className="w-6 h-6" />
              </div>
              <p className="text-slate-600 font-bold text-sm">No active tracking tokens found</p>
              <p className="text-slate-400 text-xs max-w-xs mx-auto">
                Complete a booking or generate a flight itinerary to initialize live telemetry tracking tokens.
              </p>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-slate-100">
              {bookings.filter(b => b.trackingCode).map((booking) => (
                <div key={booking._id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {booking.flightNumber}
                      </span>
                      <span className="text-xs font-mono text-slate-400">PNR: {booking.bookingReference}</span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm">
                      {booking.origin} → {booking.destination}
                    </p>
                  </div>

                  <Link 
                    href={`/dashboard/track/${booking.trackingCode}`}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Icon icon="lucide:radar" className="w-4 h-4" />
                    <span>Open Radar</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}