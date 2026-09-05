"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function DelegatedPaymentsPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDelegatedRequests = async () => {
      try {
        const response = await api.get("/bookings/delegated-requests");
        setRequests(response.data.data || []);
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Failed to retrieve delegated payment requests.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDelegatedRequests();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-wider font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Sponsorship Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Delegated Payment Requests
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Review flight itineraries requested for your sponsorship, check settlement statuses, and clear pending payments.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-sm flex items-center gap-2">
          <Icon icon="lucide:alert-circle" className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Requests List */}
      {isLoading ? (
        <div className="py-24 flex items-center justify-center">
          <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-red-50 text-[#DC2626] rounded-2xl flex items-center justify-center mx-auto text-2xl font-bold">
            🤝
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No sponsorship requests found</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              You do not have any pending flight sponsorship requests assigned to your email address.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((reqItem: any, idx: number) => (
            <motion.div
              key={reqItem._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200 hover:border-red-300 p-6 rounded-3xl shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold text-lg flex-shrink-0 mt-1">
                  ✈
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      PNR: {reqItem.bookingReference}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-mono font-bold text-[#DC2626]">
                      {reqItem.flightNumber}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        reqItem.paymentStatus === "paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {reqItem.paymentStatus}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {reqItem.origin} → {reqItem.destination}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span>
                      Passenger:{" "}
                      <strong className="text-slate-700">
                        {reqItem.passenger?.firstName} {reqItem.passenger?.lastName}
                      </strong>
                    </span>
                    <span>
                      Departure:{" "}
                      <strong className="text-slate-700">
                        {new Date(reqItem.departureTime).toLocaleDateString()}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">Sponsorship Amount</span>
                  <span className="text-2xl font-black text-slate-900 block">
                    ${reqItem.amount} {reqItem.currency}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {reqItem.paymentStatus === "pending" ? (
                    <Link
                      href={`/pay/${reqItem.trackingCode}`}
                      className="px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5"
                    >
                      <span>Settle Payment</span>
                      <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                    </Link>
                  ) : (
                    <span className="px-5 py-3 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs rounded-xl">
                      Paid & Settled
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}