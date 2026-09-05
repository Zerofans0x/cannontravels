

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ upcomingFlights: 0, completedTrips: 0, pendingPayments: 0 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [trackingCodeInput, setTrackingCodeInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard/overview");
        setStats(response.data.stats);
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error("Failed to load dashboard metrics", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleTrackFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCodeInput.trim()) return;
    router.push(`/dashboard/track/${trackingCodeInput.trim()}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Quick Stats / Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Icon icon="lucide:plane-takeoff" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Upcoming Flights</p>
            <p className="text-2xl font-black text-slate-900">{isLoading ? "..." : stats.upcomingFlights}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Icon icon="lucide:check-circle" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Completed Trips</p>
            <p className="text-2xl font-black text-slate-900">{isLoading ? "..." : stats.completedTrips}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Icon icon="lucide:clock" className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Pending Payments</p>
            <p className="text-2xl font-black text-slate-900">{isLoading ? "..." : stats.pendingPayments}</p>
          </div>
        </div>
      </div>

      {/* Main Action Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active PNR / Bookings List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Active Bookings (PNR)</h3>
            <Link href="/dashboard/flights" className="text-sm font-bold text-[#DC2626] hover:underline">
              Book New Flight →
            </Link>
          </div>

          {isLoading ? (
            <div className="p-16 flex items-center justify-center">
              <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex-1 p-10 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50">
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100">
                <Icon icon="lucide:ticket-dashed" className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">No active trips found</h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                  You don't have any upcoming flights. Search our global inventory to issue a new PNR or generate a delegated payment link.
                </p>
              </div>
              <Link 
                href="/dashboard/flights" 
                className="mt-2 px-6 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-full text-sm transition-all"
              >
                Search Flights
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-x-auto">
              {bookings.map((booking) => (
                <div key={booking._id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {booking.bookingReference}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        booking.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {booking.origin} → {booking.destination} ({booking.flightNumber})
                    </h4>
                    <p className="text-xs text-slate-500">
                      Departure: {new Date(booking.departureTime).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {booking.trackingCode && (
                      <Link 
                        href={`/dashboard/track/${booking.trackingCode}`}
                        className="px-3 py-2 bg-red-50 hover:bg-red-100 text-[#DC2626] font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Icon icon="lucide:radar" className="w-4 h-4" />
                        <span>Track Live</span>
                      </Link>
                    )}
                    <span className="font-black text-slate-900 text-sm">${booking.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delegated Links & Real-Time Flight Telemetry */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-md">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/20 rounded-full blur-xl pointer-events-none"></div>
            <Icon icon="lucide:link" className="w-8 h-8 text-[#DC2626] mb-4" />
            <h3 className="font-bold text-lg mb-1">Delegated Payments</h3>
            <p className="text-slate-400 text-sm mb-5">
              Review and manage payment links generated for third-party sponsors.
            </p>
            <Link 
              href="/dashboard/delegated"
              className="block text-center w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition-colors border border-white/10"
            >
              View Links
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-1">Flight Telemetry</h3>
            <p className="text-slate-500 text-sm mb-4">
              Enter a passenger tracking ID to monitor real-time location via Socket.io.
            </p>
            <form onSubmit={handleTrackFlight} className="flex items-center gap-2">
              <input 
                type="text" 
                value={trackingCodeInput}
                onChange={(e) => setTrackingCodeInput(e.target.value)}
                placeholder="e.g. TRK-992..." 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium outline-none focus:border-[#DC2626]"
                required
              />
              <button type="submit" className="w-10 h-10 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl flex items-center justify-center transition-colors cursor-pointer">
                <Icon icon="lucide:arrow-right" className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}