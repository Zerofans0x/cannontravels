"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function FlightSchedulePage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get("/flights/schedule");
        setFlights(response.data.flights || []);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Failed to load flight schedule timetable.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-wider font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Global Timetable
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Flight Schedule & Operations
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            View upcoming flight departures, route frequencies, aircraft assignments, and operational statuses.
          </p>
        </div>
        <Link
          href="/dashboard/flights"
          className="px-6 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/25 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Icon icon="lucide:plus" className="w-4 h-4" />
          <span>Book Flight</span>
        </Link>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm flex items-center gap-2">
          <Icon icon="lucide:alert-circle" className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Schedule Table */}
      {isLoading ? (
        <div className="py-24 flex items-center justify-center">
          <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : flights.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-red-50 text-[#DC2626] rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            ✈
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No scheduled flights available</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              There are currently no active flight schedules populated in the database.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-mono text-slate-500">
                  <th className="p-4 sm:px-6 font-bold">Flight No.</th>
                  <th className="p-4 sm:px-6 font-bold">Route</th>
                  <th className="p-4 sm:px-6 font-bold">Departure Time</th>
                  <th className="p-4 sm:px-6 font-bold">Airline</th>
                  <th className="p-4 sm:px-6 font-bold">Status</th>
                  <th className="p-4 sm:px-6 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {flights.map((flight: any) => (
                  <tr key={flight._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:px-6 font-mono font-bold text-[#DC2626]">
                      {flight.flightNo}
                    </td>
                    <td className="p-4 sm:px-6">
                      <span className="font-bold text-slate-900">{flight.origin} → {flight.destination}</span>
                      <span className="text-xs text-slate-400 block">{flight.originCity} to {flight.destinationCity}</span>
                    </td>
                    <td className="p-4 sm:px-6 font-medium text-slate-700">
                      {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'Scheduled Daily'}
                    </td>
                    <td className="p-4 sm:px-6 font-medium text-slate-600">
                      {flight.airline || 'CannonAir Global'}
                    </td>
                    <td className="p-4 sm:px-6">
                      <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        On Time
                      </span>
                    </td>
                    <td className="p-4 sm:px-6 text-right">
                      <Link
                        href={`/dashboard/flights/${flight._id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-all"
                      >
                        <span>Book</span>
                        <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}