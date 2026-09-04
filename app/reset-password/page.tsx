
"use client";

import { useState, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

import AuthHeroCard from "@/components/auth/AuthHeroCard";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = char;
    setCode(newCode);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
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

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Choose a strong password (minimum 8 characters)", color: "bg-slate-200" };

    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (pass.length < 8) {
      return { score: 1, label: "Weak — minimum 8 characters required", color: "bg-red-500" };
    }

    switch (score) {
      case 1:
        return { score: 1, label: "Weak password", color: "bg-red-500" };
      case 2:
        return { score: 2, label: "Fair — add uppercase, numbers or symbols", color: "bg-amber-500" };
      case 3:
        return { score: 3, label: "Good password", color: "bg-[#DC2626]" };
      case 4:
        return { score: 4, label: "Strong password", color: "bg-emerald-500" };
      default:
        return { score: 1, label: "Weak password", color: "bg-red-500" };
    }
  };

  const passwordStrength = getPasswordStrength(password);
  const isConfirmTyped = confirmPassword.length > 0;
  const isPasswordMatch = isConfirmTyped && password === confirmPassword;
  const isPasswordMismatch = isConfirmTyped && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email: emailParam,
        code: fullCode,
        password,
      });
      setIsSuccess(true);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to reset password. The code may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-10 sm:pb-16">
      <div>
        <h2 className="font-mazzard text-[28px] sm:text-[34px] lg:text-[38px] text-[#0A1A32] font-black tracking-tight leading-tight">
          Set new password
        </h2>
        <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-[14px] text-slate-600 font-medium leading-relaxed">
          Enter the 6-digit code sent to <span className="text-slate-800 font-bold">{emailParam || "your email"}</span> and choose a secure password.
        </p>
      </div>

      {isSuccess ? (
        <div className="mt-6 space-y-5">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-[13.5px] leading-relaxed font-medium">
            Your password has been successfully reset. You can now log into your account with your new credentials.
          </div>
          <Link
            href="/login"
            className="w-full py-3.5 sm:py-4 px-6 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-[15px] rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-red-600/20"
          >
            Proceed to Log in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMessage && (
            <div className="p-2.5 sm:p-3 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-600 text-[11.5px] sm:text-[12.5px] flex items-center gap-2 animate-in fade-in">
              <Icon icon="lucide:alert-circle" className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 6-Digit Code Inputs */}
          <div className="space-y-1">
            <label className="block text-[12.5px] sm:text-[13.5px] font-bold text-slate-700">
              Verification Code
            </label>
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
                  onChange={(e) => handleCodeChange(idx, e.target.value)}
                  onKeyDown={(e) => handleCodeKeyDown(idx, e)}
                  onPaste={idx === 0 ? handleCodePaste : undefined}
                  className="w-full aspect-square text-center text-[20px] sm:text-[24px] font-bold bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0A1A32] rounded-[14px] sm:rounded-[16px] border-[1.5px] border-slate-200 focus:border-[#DC2626] focus:ring-4 focus:ring-red-500/15 outline-none transition-all cursor-text shadow-xs"
                />
              ))}
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <label htmlFor="password" className="block text-[12.5px] sm:text-[13.5px] font-bold text-slate-700">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full px-3.5 sm:px-4 py-3 pr-11 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0f172a] placeholder-slate-400 rounded-[14px] sm:rounded-[18px] border border-slate-200 focus:border-[#DC2626] outline-none text-[13px] sm:text-[14.5px] transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-slate-900 transition-colors p-1 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon
                  icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                  className="w-4.5 h-4.5 text-slate-700"
                />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-[12.5px] sm:text-[13.5px] font-bold text-slate-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className={`w-full px-3.5 sm:px-4 py-3 pr-11 text-[#0f172a] placeholder-slate-400 rounded-[14px] sm:rounded-[18px] outline-none text-[13px] sm:text-[14.5px] transition-all font-medium ${
                  isPasswordMatch
                    ? "bg-slate-50 border border-emerald-400 focus:border-emerald-500"
                    : isPasswordMismatch
                    ? "bg-rose-50/50 border border-rose-300 focus:border-rose-400"
                    : "bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-[#DC2626]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-slate-900 transition-colors p-1 cursor-pointer"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                <Icon
                  icon={showConfirmPassword ? "lucide:eye-off" : "lucide:eye"}
                  className="w-4.5 h-4.5 text-slate-700"
                />
              </button>
            </div>

            {isPasswordMatch && (
              <p className="mt-1 text-[10.5px] sm:text-[11.5px] text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                <Icon icon="lucide:check-circle-2" className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                <span>Passwords match</span>
              </p>
            )}
            {isPasswordMismatch && (
              <p className="mt-1 text-[10.5px] sm:text-[11.5px] text-rose-500 font-bold flex items-center gap-1 animate-in fade-in">
                <Icon icon="lucide:alert-circle" className="w-3.5 h-3.5 flex-shrink-0 text-rose-500" />
                <span>Passwords do not match</span>
              </p>
            )}
          </div>

          <div className="pt-1">
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    !password
                      ? idx === 0
                        ? "bg-[#0f172a]"
                        : "bg-[#E2E8F0]"
                      : idx < passwordStrength.score
                      ? passwordStrength.color
                      : "bg-[#E2E8F0]"
                  }`}
                />
              ))}
            </div>
            <p className="mt-1.5 text-[11.5px] sm:text-[12.5px] text-slate-600 font-medium">
              {!password ? "Choose a strong password" : passwordStrength.label}
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 sm:py-4 px-6 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-[15px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-md shadow-red-600/20 mt-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Reset Password</span>
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
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
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
              Airspace Security <br />
              <span className="text-[#DC2626]">For Your Credentials</span>
            </>
          }
          subtitle="Update your password with cryptographic encryption to safeguard your flight bookings and delegated payments."
        />

        <div className="col-span-6 flex items-center justify-start pl-10 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
          <div className="w-full max-w-[420px] mx-0 flex flex-col justify-center py-8 my-auto">
            <Suspense fallback={<div className="py-10 text-center text-slate-500 font-medium">Loading reset parameters...</div>}>
              <ResetPasswordForm />
            </Suspense>
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
                Airspace Security <br />
                <span className="text-[#DC2626]">For Your Credentials</span>
              </>
            }
            subtitle="Update your password with cryptographic encryption to safeguard your flight bookings and delegated payments."
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
              <span>Swipe up to set new password</span>
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
              animate={{ y: "0%" }}
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
                <Suspense fallback={<div className="py-10 text-center text-slate-500 font-medium">Loading reset parameters...</div>}>
                  <ResetPasswordForm />
                </Suspense>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}