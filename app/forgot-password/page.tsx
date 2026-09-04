
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

import AuthHeroCard from "@/components/auth/AuthHeroCard";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to send password reset instructions.");
    } finally {
      setIsLoading(false);
    }
  };

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

  const renderForgotForm = () => (
    <div className="pb-10 sm:pb-16">
      <div>
        <h2 className="font-mazzard text-[28px] sm:text-[34px] lg:text-[38px] text-[#0A1A32] font-black tracking-tight leading-tight">
          Reset password
        </h2>
        <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-[14px] text-slate-600 font-medium leading-relaxed">
          Enter your registered email address below and we&apos;ll send you instructions to reset your password.
        </p>
      </div>

      {errorMessage && (
        <div className="mt-4 p-2.5 sm:p-3 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-600 text-[11.5px] sm:text-[12.5px] flex items-center gap-2">
          <Icon icon="lucide:alert-circle" className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-[12.5px] sm:text-[13.5px] font-bold text-slate-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 sm:py-3.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0f172a] placeholder-slate-400 rounded-[14px] sm:rounded-[18px] border border-slate-200 focus:border-[#DC2626] outline-none text-[13px] sm:text-[14.5px] transition-all font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 sm:py-4 px-6 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-[15px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-md shadow-red-600/20"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Send Reset Instructions</span>
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

      <div className="mt-6 text-[13px] sm:text-[13.5px] text-slate-600 text-left font-medium">
        Remembered your password?{" "}
        <Link href="/login" className="text-[#DC2626] hover:underline font-bold">
          Log in here
        </Link>
      </div>
    </div>
  );

  return (
    <main className="relative min-h-screen w-full bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 h-screen overflow-hidden">
      <div className="hidden lg:grid w-full h-full max-w-[1400px] mx-auto grid-cols-12 gap-12 items-center p-8">
        <AuthHeroCard
          illustrationSrc="/images/auth/auth.gif"
          illustrationPosition="-translate-y-16"
          illustrationPositionMobile="-translate-y-14"
          illustrationWidth="w-[420px]"
          cardWidth="w-[750px]"
          imagesWidth="w-full sm:w-[360px] -translate-y-10 lg:-translate-y-12"
          showBlurOverlay={false}
          title={
            <>
              Secure recovery for <br />
              <span className="text-[#DC2626]">your flight dashboard</span>
            </>
          }
          subtitle="Regain swift access to your active PNR bookings, delegated sponsor links, and WebSocket telemetry."
        />

        <div className="col-span-6 flex items-center justify-start pl-10 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
          <div className="w-full max-w-[420px] mx-0 flex flex-col justify-center py-8 my-auto">
            {renderForgotForm()}
          </div>
        </div>
      </div>

      <div
        className="lg:hidden relative w-full h-full p-3 sm:p-4 pb-0 flex flex-col justify-between overflow-hidden bg-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-3 sm:inset-4 bottom-0 z-0">
          <AuthHeroCard
            illustrationSrc="/images/auth/auth.gif"
            illustrationPosition="-translate-y-14"
            illustrationWidth="w-[420px]"
            cardWidth="w-full"
            imagesWidth="w-full sm:w-[300px] -translate-y-24"
            showBlurOverlay={false}
            title={
              <>
                Secure recovery for <br />
                <span className="text-[#DC2626]">your flight dashboard</span>
              </>
            }
            subtitle="Regain swift access to your active PNR bookings, delegated sponsor links, and WebSocket telemetry."
          />
        </div>

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
              <span>Swipe up to reset password</span>
            </div>
          </motion.div>
        )}

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
              <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing" />
              <div className="w-full max-w-[360px] mx-auto">
                {renderForgotForm()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}