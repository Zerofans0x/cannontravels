
"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

import AuthHeroCard from "@/components/auth/AuthHeroCard";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "traveler@example.com";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, idx) => {
      newCode[idx] = char;
    });
    setCode(newCode);

    const nextIdx = Math.min(pastedData.length, 5);
    inputRefs.current[nextIdx]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await api.post("/auth/verify-email", {
        email: emailParam,
        code: fullCode,
      });

      if (data.tokens?.accessToken) {
        localStorage.setItem("accessToken", data.tokens.accessToken);
      }

      setSuccessMessage("Account verified successfully! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await api.post("/auth/resend-verification", { email: emailParam });
      setSuccessMessage("A new verification code has been sent to your inbox.");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to resend verification code.");
    }
  };

  return (
    <div className="pb-10 sm:pb-16">
      {/* Step / Progress Indicator Bars */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-6 max-w-[280px]">
        <div className="h-1.5 rounded-full bg-[#DC2626]" />
        <div className="h-1.5 rounded-full bg-slate-200" />
        <div className="h-1.5 rounded-full bg-slate-200" />
        <div className="h-1.5 rounded-full bg-slate-200" />
      </div>

      {/* Header */}
      <div>
        <h2 className="font-mazzard text-[28px] sm:text-[34px] lg:text-[38px] text-[#0A1A32] font-black tracking-tight leading-tight">
          Check your inbox
        </h2>
        <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-[14px] text-slate-600 font-medium leading-relaxed">
          We sent a 6-digit code to <span className="text-slate-800 font-bold">{emailParam}</span>
          <br />
          Enter it below to secure your flight account.
        </p>
      </div>

      {errorMessage && (
        <div className="mt-4 p-2.5 sm:p-3 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-600 text-[11.5px] sm:text-[12.5px] flex items-center gap-2 animate-in fade-in">
          <Icon icon="lucide:alert-circle" className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="mt-4 p-2.5 sm:p-3 rounded-[14px] bg-red-50 border border-red-200 text-red-700 text-[11.5px] sm:text-[12.5px] flex items-center gap-2 animate-in fade-in font-medium">
          <Icon icon="lucide:check-circle-2" className="w-4 h-4 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* OTP Code Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* 6-Digit Code Inputs */}
        <div className="grid grid-cols-6 gap-2 sm:gap-2.5 w-full">
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={idx === 0 ? handlePaste : undefined}
              className="w-full aspect-square text-center text-[24px] sm:text-[28px] font-bold bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0A1A32] rounded-[16px] sm:rounded-[18px] border-[1.5px] border-slate-200 focus:border-[#DC2626] focus:ring-4 focus:ring-red-500/15 outline-none transition-all cursor-text shadow-xs"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 sm:py-4 px-6 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-[15px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-md shadow-red-600/20"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Verify</span>
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Resend & Change Email Links */}
      <div className="mt-6 text-[13px] sm:text-[13.5px] text-slate-600 space-y-1 text-left font-medium">
        <p>
          Didn&apos;t get it?{" "}
          <button
            type="button"
            onClick={handleResendCode}
            className="text-slate-800 hover:text-[#DC2626] font-bold cursor-pointer underline"
          >
            resend code
          </button>
        </p>
        <p>
          Wrong email?{" "}
          <Link
            href="/register"
            className="text-[#DC2626] hover:underline font-bold"
          >
            Go back and change it
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    if (diff > 40 && !isSheetOpen) {
      setIsSheetOpen(true);
    }
    setTouchStartY(null);
  };

  return (
    <main className="relative min-h-screen w-full bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 h-screen overflow-hidden">
      {/* Desktop View: Split 2-Column */}
      <div className="hidden lg:grid w-full h-full max-w-[1400px] mx-auto grid-cols-12 gap-12 items-center p-8">
        <AuthHeroCard
          illustrationSrc="/images/auth/auth.gif"
          illustrationPosition="-translate-y-16"
          illustrationPositionMobile="-translate-y-14"
          illustrationWidth="w-[420px]"
          cardWidth="w-[750px]"
          imagesWidth="w-full sm:w-[420px] -translate-y-10 lg:-translate-y-14"
          showBlurOverlay={false}
          title={
            <>
              Airspace Security <br />
              <span className="text-[#DC2626]">For Your Bookings</span>
            </>
          }
          subtitle="Verify your email address to secure your account and unlock instant PNR ticket issuance and delegated payment portals."
        />

        <div className="col-span-6 flex items-center justify-start pl-10 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
          <div className="w-full max-w-[420px] mx-0 flex flex-col justify-center py-8 my-auto">
            <Suspense fallback={<div className="py-10 text-center text-slate-500 font-medium">Loading verification context...</div>}>
              <VerifyEmailForm />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Mobile View: Hero Background with Swipe-up Bottom Sheet Overlay */}
      <div
        className="lg:hidden relative w-full h-full p-3 sm:p-4 pb-0 flex flex-col justify-between overflow-hidden bg-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Background Hero Card */}
        <div className="absolute inset-3 sm:inset-4 bottom-0 z-0">
          <AuthHeroCard
            illustrationSrc="/images/auth/verify-email-img.png"
            illustrationPosition="-translate-y-14"
            illustrationWidth="w-[420px]"
            cardWidth="w-full"
            imagesWidth="w-full sm:w-[420px] -translate-y-10 lg:-translate-y-14"
            showBlurOverlay={false}
            title={
              <>
                Airspace Security <br />
                <span className="text-[#DC2626]">For Your Bookings</span>
              </>
            }
            subtitle="Verify your email address to secure your account and unlock instant PNR ticket issuance and delegated payment portals."
          />
        </div>

        {/* Floating Bottom Swipe-up Prompt (Visible when sheet is closed) */}
        {!isSheetOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setIsSheetOpen(true)}
            className="absolute bottom-5 left-0 right-0 z-10 flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md shadow-md border border-slate-200 text-[#DC2626] text-[12px] font-bold animate-bounce">
              <Icon icon="lucide:chevron-up" className="w-4 h-4" />
              <span>Swipe up to verify email</span>
            </div>
          </motion.div>
        )}

        {/* Dim Backdrop when sheet is open */}
        <AnimatePresence>
          {isSheetOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
              className="absolute inset-0 bg-black/25 backdrop-blur-[2px] z-20 cursor-pointer"
            />
          )}
        </AnimatePresence>

        {/* Swipe-up Bottom Sheet */}
        <AnimatePresence>
          {isSheetOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 80 || info.velocity.y > 300) {
                  setIsSheetOpen(false);
                }
              }}
              className="relative z-30 mt-auto w-full bg-white rounded-t-[32px] sm:rounded-t-[36px] shadow-[0_-16px_48px_rgba(220,38,38,0.15)] px-6 pt-3.5 pb-12 sm:pb-20 max-h-[85vh] overflow-y-auto touch-pan-y"
            >
              {/* Drag Handle */}
              <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing" />

              {/* Form Content */}
              <div className="w-full max-w-[360px] mx-auto">
                <Suspense fallback={<div className="py-10 text-center text-slate-500 font-medium">Loading verification context...</div>}>
                  <VerifyEmailForm />
                </Suspense>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}