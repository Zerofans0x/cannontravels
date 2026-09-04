

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
  const orderId = searchParams.get("orderId");
  
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyTransaction = async () => {
      if (!orderId) {
        setStatus("error");
        setErrorMessage("No order reference provided.");
        return;
      }

      try {
        await api.post("/payment/crypto/verify", { invoiceId: orderId });
        setStatus("success");
        
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (err: any) {
        console.error("Payment verification error:", err);
        setStatus("error");
        setErrorMessage(err.response?.data?.message || "Payment settlement is still pending confirmation.");
      }
    };

    verifyTransaction();
  }, [orderId, router]);

  return (
    <div className="w-full max-w-[440px] bg-[#ecfdf5] border border-emerald-200 rounded-[36px] p-8 text-center shadow-xl">
      {status === "verifying" && (
        <div className="flex flex-col items-center space-y-4 py-6">
          <div className="w-12 h-12 border-4 border-[#059669] border-t-transparent rounded-full animate-spin" />
          <h2 className="font-mazzard text-[22px] font-semibold text-[#0F172A]">Verifying settlement</h2>
          <p className="text-[13.5px] text-slate-600 leading-relaxed">
            Confirming blockchain telemetry and activating your institutional mandate...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center space-y-4 py-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-[#059669] text-white rounded-full flex items-center justify-center shadow-md">
            <Icon icon="lucide:check" className="w-8 h-8" />
          </div>
          <h2 className="font-mazzard text-[24px] font-semibold text-[#0F172A]">Mandate Activated</h2>
          <p className="text-[13.5px] text-slate-600 leading-relaxed">
            Payment successfully settled. Initializing your secure terminal workspace.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 w-full py-3.5 bg-[#047857] hover:bg-[#065f46] text-white font-medium rounded-full cursor-pointer shadow-sm transition-all"
          >
            Enter Terminal Dashboard
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center space-y-4 py-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center shadow-xs">
            <Icon icon="lucide:alert-circle" className="w-7 h-7" />
          </div>
          <h2 className="font-mazzard text-[24px] font-semibold text-[#0F172A]">Settlement Pending</h2>
          <p className="text-[13.5px] text-slate-600 leading-relaxed">
            {errorMessage}
          </p>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full cursor-pointer transition-all text-[14px]"
            >
              Check Again
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 py-3.5 bg-[#047857] hover:bg-[#065f46] text-white font-medium rounded-full cursor-pointer shadow-sm transition-all text-[14px]"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 sm:top-8 left-6 sm:left-12 lg:left-16 z-40">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="cannontravels" width={160} height={38} className="h-7 sm:h-8 w-auto object-contain" priority />
        </Link>
      </div>

      <Suspense fallback={
        <div className="w-full max-w-[440px] bg-[#ecfdf5] border border-emerald-200 rounded-[36px] p-8 text-center shadow-xl">
          <div className="flex flex-col items-center space-y-4 py-6">
            <div className="w-12 h-12 border-4 border-[#059669] border-t-transparent rounded-full animate-spin" />
            <h2 className="font-mazzard text-[22px] font-semibold text-[#0F172A]">Loading session...</h2>
          </div>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}