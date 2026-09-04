
"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

import AuthHeroCard from "@/components/auth/AuthHeroCard";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      await login({ email, password });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Invalid email or password.");
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

  const renderLoginForm = () => (
    <>
      <div className="mb-4 sm:mb-7">
        <h2 className="font-mazzard text-[26px] sm:text-[34px] lg:text-[40px] text-[#0f172a] tracking-tight leading-none font-black">
          Log in
        </h2>
        <p className="mt-2 text-[12px] sm:text-[13.5px] text-slate-600 font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[#DC2626] hover:underline font-bold transition-colors ml-0.5"
          >
            Create one free
          </Link>
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-2.5 sm:p-3 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-600 text-[11.5px] sm:text-[12.5px] flex items-center gap-2 animate-in fade-in">
          <Icon icon="lucide:alert-circle" className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="space-y-1 sm:space-y-1.5">
          <label
            htmlFor="email"
            className="block text-[12px] sm:text-[13.5px] font-bold text-slate-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2.5 sm:py-3.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0f172a] placeholder-slate-400 rounded-[14px] sm:rounded-[18px] border border-slate-200 focus:border-[#DC2626] outline-none text-[13px] sm:text-[14.5px] transition-all font-medium"
          />
        </div>

        <div className="space-y-1 sm:space-y-1.5">
          <label
            htmlFor="password"
            className="block text-[12px] sm:text-[13.5px] font-bold text-slate-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2.5 sm:py-3.5 pr-11 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0f172a] placeholder-slate-400 rounded-[14px] sm:rounded-[18px] border border-slate-200 focus:border-[#DC2626] outline-none text-[13px] sm:text-[14.5px] transition-all font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors p-1 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon
                icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                className="w-4 h-4 text-slate-600"
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-8.5 h-4.5 sm:w-9 sm:h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                rememberMe ? "bg-[#DC2626]" : "bg-slate-300"
              }`}
            >
              <div
                className={`bg-white w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shadow-xs transform transition-transform duration-200 ${
                  rememberMe ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-[11.5px] sm:text-[13px] text-slate-700 font-medium">
              Remember me
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-[11.5px] sm:text-[13px] text-slate-600 hover:text-[#DC2626] font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <div className="pt-2 sm:pt-4 space-y-2 sm:space-y-2.5">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3.5 px-5 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-[13px] sm:text-[14.5px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-md shadow-red-600/20"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Log in</span>
                <svg
                  className="w-3.5 h-3.5 text-white"
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

          {/* <button
            type="button"
            className="w-full py-2.5 sm:py-3 px-5 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-bold text-[12px] sm:text-[13.5px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
          >
            <span>or sign in with Google</span>
          </button> */}
        </div>
      </form>

      <p className="text-[10px] sm:text-[11.5px] text-slate-500 font-medium text-center mt-4 sm:mt-7 leading-relaxed max-w-[280px] sm:max-w-none mx-auto">
        By logging in you agree to our{" "}
        <Link href="/terms" className="hover:text-slate-900 underline underline-offset-2 font-bold">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="hover:text-slate-900 underline underline-offset-2 font-bold">
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );

  return (
    <main className="relative min-h-screen w-full bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 h-screen overflow-hidden">
      <div className="hidden lg:grid w-full h-full max-w-[1400px] mx-auto grid-cols-12 gap-12 items-center p-8">
        <AuthHeroCard
          tagline="Global Airspace Ecosystem"
          illustrationSrc="/images/auth/auth.gif"
          illustrationWidth="w-[420px]"
          illustrationWidthMobile={250}
          illustrationPosition=""
          illustrationPositionMobile=""
          cardWidth="w-[750px]"
          imagesWidth="w-[360px] -translate-y-12"
          illustrationObjectFit="contain"
          title={
            <>
              Welcome back. <br />
              <span className="text-[#DC2626]">Your flight desk is active.</span>
            </>
          }
          subtitle="Pick up exactly where you left off. Your PNR bookings, third-party sponsorships, and WebSocket telemetry — all secured."
          showBlurOverlay={false}
        />

        <div className="col-span-6 flex items-center justify-start pl-10 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
          <div className="w-full max-w-[420px] mx-0 flex flex-col justify-center py-8 my-auto">
            {renderLoginForm()}
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
            tagline="Global Airspace Ecosystem"
            illustrationSrc="/images/auth/auth.gif"
            illustrationWidth="w-[420px]"
            illustrationWidthMobile={250}
            illustrationPosition=""
            illustrationPositionMobile=""
            cardWidth="w-full"
            imagesWidth="w-[300px] -translate-y-24"
            illustrationObjectFit="contain"
            title={
              <>
                Welcome back. <br />
                <span className="text-[#DC2626]">Your flight desk is active.</span>
              </>
            }
            subtitle="Pick up exactly where you left off. Your PNR bookings, third-party sponsorships, and WebSocket telemetry — all secured."
            showBlurOverlay={false}
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
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-slate-200 text-[#DC2626] text-[12px] font-bold animate-bounce">
              <Icon icon="lucide:chevron-up" className="w-4 h-4" />
              <span>Swipe up to log in</span>
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
              className="relative z-30 mt-auto w-full bg-white rounded-t-[32px] sm:rounded-t-[36px] shadow-[0_-16px_48px_rgba(220,38,38,0.15)] px-6 pt-3 pb-7 max-h-[85vh] overflow-y-auto touch-pan-y"
            >
              <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing" />
              <div className="w-full max-w-[360px] mx-auto">
                {renderLoginForm()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}