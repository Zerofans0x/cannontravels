

"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || searchParams.get("reference");
  
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifiedBookingId, setVerifiedBookingId] = useState<string | null>(null);

  useEffect(() => {
    const verifyTransaction = async () => {
      const reference = searchParams.get("reference") || searchParams.get("orderId");
      if (!reference) {
        setStatus("error");
        setErrorMessage("No payment reference provided.");
        return;
      }

      try {
        const response = await api.post("/payments/verify", { reference, invoiceId: reference });
        setStatus("success");
        
        // ✅ FIXED: Safely grab the booking ID returned by your backend verify controller
        if (response.data?.bookingId) {
          setVerifiedBookingId(response.data.bookingId);
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(err.response?.data?.message || "Payment verification failed.");
      }
    };

    verifyTransaction();
  }, [searchParams]);

  return (
    <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-[32px] p-8 text-center shadow-xl">
      {status === "verifying" && (
        <div className="flex flex-col items-center space-y-4 py-8">
          <div className="w-12 h-12 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin" />
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Verifying Payment Settlement</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Confirming gateway clearance, securing your PNR seat, and activating airspace telemetry...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center space-y-5 py-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-red-50 text-[#DC2626] border border-red-100 rounded-full flex items-center justify-center shadow-sm">
            <Icon icon="lucide:check" className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Payment Confirmed
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-3">Itinerary Secured!</h2>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              Your flight ticket has been issued successfully. You can now view your Boarding Pass or return to your terminal dashboard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            {verifiedBookingId ? (
              <button
                onClick={() => router.push(`/dashboard/bookings/${verifiedBookingId}`)}
                className="flex-1 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs rounded-xl cursor-pointer shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Icon icon="lucide:ticket" className="w-4 h-4" />
                <span>View Ticket</span>
              </button>
            ) : (
              <button
                onClick={() => router.push("/dashboard/bookings")}
                className="flex-1 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs rounded-xl cursor-pointer shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Icon icon="lucide:ticket" className="w-4 h-4" />
                <span>My Bookings</span>
              </button>
            )}

            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-all"
            >
              Terminal Dashboard
            </button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center space-y-5 py-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 border border-rose-100 rounded-full flex items-center justify-center shadow-xs">
            <Icon icon="lucide:alert-circle" className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Settlement Pending</h2>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              {errorMessage}
            </p>
          </div>

          <div className="flex gap-3 w-full pt-2">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-all"
            >
              Check Again
            </button>
            <button
              onClick={() => router.push("/dashboard/bookings")}
              className="flex-1 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs rounded-xl cursor-pointer shadow-md shadow-red-600/20 transition-all"
            >
              View Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 sm:top-8 left-6 sm:left-12 lg:left-16 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">✈</span>
          <span className="text-lg font-black tracking-tight">
            <span className="text-[#DC2626]">Cannon</span>Travels
          </span>
        </Link>
      </div>

      <Suspense fallback={
        <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-[32px] p-8 text-center shadow-xl text-slate-900">
          <div className="flex flex-col items-center space-y-4 py-8">
            <div className="w-12 h-12 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin" />
            <h2 className="text-xl font-black text-slate-900">Loading session...</h2>
          </div>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}