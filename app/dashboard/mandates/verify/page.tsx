"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface VerificationResult {
  mandateId: string;
  strategyTitle: string;
  riskTier: string;
  allocatedAmount: string;
  complianceLevel: string;
  issuer: string;
  timestamp: string;
}

export default function VerifyMandatePage() {
  const [hashInput, setHashInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hashInput.trim()) return;

    setIsVerifying(true);
    setErrorMsg("");
    setVerificationResult(null);

    // Simulate cryptographic hash verification lookup
    setTimeout(() => {
      setIsVerifying(false);
      if (hashInput.trim().length < 8) {
        setErrorMsg("Invalid cryptographic hash format. Mandate hash must be at least 8 characters.");
      } else {
        setVerificationResult({
          mandateId: hashInput.trim().toUpperCase(),
          strategyTitle: "Gamma Exposure & L3 Order Book Arbitrage",
          riskTier: "Tier 3 (Aggressive)",
          allocatedAmount: "$376,670.00",
          complianceLevel: "Level A (Fully Verified)",
          issuer: "cannontravels Prime Brokerage Core",
          timestamp: "2026-08-31 16:45:10 WAT",
        });
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Cryptographic Integrity & Compliance
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Verify Mandate Hash
          </h2>
        </div>

        <Link
          href="/dashboard/mandates"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[13px] font-medium transition-all shadow-xs cursor-pointer"
        >
          <Icon icon="lucide:arrow-left" className="w-4 h-4" />
          <span>Back to Mandates</span>
        </Link>
      </div>

      {/* Verification Input Card */}
      <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-emerald-100 shadow-xs">
        <div className="max-w-xl mb-6">
          <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Enter Mandate Hash or Reference Code</h3>
          <p className="text-[12.5px] text-slate-500 mt-1">
            Input the unique cryptographic signature or allocation hash to authenticate governance compliance and active deployment status.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Icon icon="lucide:shield-check" className="w-5 h-5" />
              </span>
              <input
                type="text"
                required
                placeholder="e.g. MND-9842-X7Q9"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-[14px] border border-slate-200 text-[14px] font-mono text-slate-900 focus:outline-none focus:border-[#059669] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-[14px] bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[13.5px] font-medium transition-all shadow-sm shadow-emerald-500/20 cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify Hash</span>
                  <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-[12px] text-[12.5px] text-amber-800 flex items-center gap-2">
              <Icon icon="lucide:alert-circle" className="w-4 h-4 flex-shrink-0 text-amber-600" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>
      </div>

      {/* Verification Result Display */}
      {verificationResult && (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center">
                <Icon icon="boxicons:seal-check-filled" className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-mazzard text-[16px] text-slate-900">Mandate Successfully Verified</h4>
                <p className="text-[11.5px] text-emerald-600 font-medium">Cryptographic signature is authentic and active</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11.5px] font-medium font-mono">
              {verificationResult.mandateId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-[13px]">
            <div className="space-y-1 bg-slate-50 p-4 rounded-[16px]">
              <span className="text-slate-400 text-[11.5px] uppercase tracking-wider">Strategy Title</span>
              <p className="font-medium text-slate-900">{verificationResult.strategyTitle}</p>
            </div>

            <div className="space-y-1 bg-slate-50 p-4 rounded-[16px]">
              <span className="text-slate-400 text-[11.5px] uppercase tracking-wider">Risk Tier Governance</span>
              <p className="font-medium text-slate-900">{verificationResult.riskTier}</p>
            </div>

            <div className="space-y-1 bg-slate-50 p-4 rounded-[16px]">
              <span className="text-slate-400 text-[11.5px] uppercase tracking-wider">Allocated Capital</span>
              <p className="font-medium text-[#059669] font-thicccboi text-[18px]">{verificationResult.allocatedAmount}</p>
            </div>

            <div className="space-y-1 bg-slate-50 p-4 rounded-[16px]">
              <span className="text-slate-400 text-[11.5px] uppercase tracking-wider">Compliance Status</span>
              <p className="font-medium text-slate-900">{verificationResult.complianceLevel}</p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11.5px] text-slate-400 border-t border-slate-100">
            <span>Issuer: {verificationResult.issuer}</span>
            <span>Timestamp: {verificationResult.timestamp}</span>
          </div>
        </div>
      )}
    </div>
  );
}