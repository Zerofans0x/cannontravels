
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

import AuthHeroCard from "@/components/auth/AuthHeroCard";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Choose a strong password (minimum 8 characters)", color: "bg-slate-200", textColor: "text-slate-500" };

    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (pass.length < 8) {
      return { score: 1, label: "Weak — minimum 8 characters required", color: "bg-red-500", textColor: "text-red-500" };
    }

    switch (score) {
      case 1:
        return { score: 1, label: "Weak password", color: "bg-red-500", textColor: "text-red-500" };
      case 2:
        return { score: 2, label: "Fair — add uppercase, numbers or symbols", color: "bg-amber-500", textColor: "text-amber-600" };
      case 3:
        return { score: 3, label: "Good password", color: "bg-[#DC2626]", textColor: "text-[#DC2626]" };
      case 4:
        return { score: 4, label: "Strong password", color: "bg-emerald-500", textColor: "text-emerald-600" };
      default:
        return { score: 1, label: "Weak password", color: "bg-red-500", textColor: "text-red-500" };
    }
  };

  const passwordStrength = getPasswordStrength(password);
  const isConfirmTyped = confirmPassword.length > 0;
  const isPasswordMatch = isConfirmTyped && password === confirmPassword;
  const isPasswordMismatch = isConfirmTyped && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        intent: "traveler"
      });

      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Registration failed. Please try again.");
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

  const renderRegisterForm = () => (
    <>
      <div>
        <h2 className="font-mazzard text-[24px] sm:text-[32px] lg:text-[38px] text-[#0f172a] tracking-tight leading-none font-black">
          Create your account
        </h2>
        <p className="mt-1.5 sm:mt-2.5 text-[12px] sm:text-[13.5px] text-slate-600 font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#DC2626] hover:underline font-bold ml-0.5"
          >
            Log in
          </Link>
        </p>
      </div>

      {/* <div className="mt-3.5 sm:mt-4">
        <button
          type="button"
          className="w-full py-2.5 sm:py-3.5 px-5 bg-slate-50 hover:bg-slate-100 active:scale-[0.99] text-slate-800 font-bold text-[12.5px] sm:text-[14px] rounded-full transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-slate-200"
        >
          <svg
            className="w-4.5 h-4.5 text-black flex-shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinejoin="round"
          >
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          <span>Sign up with Google</span>
        </button>
      </div> */}

      <div className="flex items-center gap-3 my-3.5 sm:my-5">
        {/* <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[11px] sm:text-[12px] text-slate-400 font-bold">or with email</span>
        <div className="flex-1 h-px bg-slate-200" /> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3.5">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="space-y-1">
            <label
              htmlFor="firstName"
              className="block text-[11.5px] sm:text-[13px] font-bold text-slate-700"
            >
              First name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              required
              className="w-full px-3.5 sm:px-4 py-2 sm:py-3 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0f172a] placeholder-slate-400 rounded-[13px] sm:rounded-[16px] border border-slate-200 focus:border-[#DC2626] outline-none text-[12.5px] sm:text-[14px] transition-all font-medium"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="lastName"
              className="block text-[11.5px] sm:text-[13px] font-bold text-slate-700"
            >
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              required
              className="w-full px-3.5 sm:px-4 py-2 sm:py-3 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0f172a] placeholder-slate-400 rounded-[13px] sm:rounded-[16px] border border-slate-200 focus:border-[#DC2626] outline-none text-[12.5px] sm:text-[14px] transition-all font-medium"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-[11.5px] sm:text-[13px] font-bold text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-3.5 sm:px-4 py-2 sm:py-3 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0f172a] placeholder-slate-400 rounded-[13px] sm:rounded-[16px] border border-slate-200 focus:border-[#DC2626] outline-none text-[12.5px] sm:text-[14px] transition-all font-medium"
          />
        </div>

        {errorMessage && (
          <div className="p-2.5 sm:p-3 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-600 text-[11.5px] sm:text-[12.5px] flex items-center gap-2 animate-in fade-in">
            <Icon icon="lucide:alert-circle" className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-[12.5px] sm:text-[13.5px] font-bold text-slate-700"
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
              className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 pr-11 bg-slate-50 hover:bg-slate-100 focus:bg-white text-[#0f172a] placeholder-slate-400 rounded-[14px] sm:rounded-[16px] border border-slate-200 focus:border-[#DC2626] outline-none text-[13px] sm:text-[14px] transition-all font-medium"
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
          <label
            htmlFor="confirmPassword"
            className="block text-[12.5px] sm:text-[13.5px] font-bold text-slate-700"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter password"
              required
              className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 pr-11 text-[#0f172a] placeholder-slate-400 rounded-[14px] sm:rounded-[16px] outline-none text-[13px] sm:text-[14px] transition-all font-medium ${isPasswordMatch
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
                className={`h-2 rounded-full transition-all duration-300 ${!password
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

        <div className="space-y-2 pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded-sm border-slate-300 text-[#DC2626] focus:ring-0 cursor-pointer accent-[#DC2626]"
            />
            <span className="text-[11px] sm:text-[12px] text-slate-600 font-medium leading-tight">
              I agree to the{" "}
              <Link href="/terms" className="font-bold text-slate-900 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-bold text-slate-900 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={receiveUpdates}
              onChange={(e) => setReceiveUpdates(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded-sm border-slate-300 text-[#DC2626] focus:ring-0 cursor-pointer accent-[#DC2626]"
            />
            <span className="text-[11px] sm:text-[12px] text-slate-600 font-medium leading-tight">
              Send me flight telemetry updates and promotional routes (optional)
            </span>
          </label>
        </div>

        <div className="pt-2 sm:pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3.5 px-5 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-[13px] sm:text-[14.5px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 shadow-md shadow-red-600/20"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Create account</span>
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
        </div>
      </form>
    </>
  );

  return (
    <main className="relative min-h-screen w-full bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 h-screen overflow-hidden">
      <div className="hidden lg:grid w-full h-full max-w-[1400px] mx-auto grid-cols-12 gap-12 items-center p-8">
        <AuthHeroCard
          illustrationSrc="/images/auth/auth.gif"
          illustrationPosition=""
          illustrationPositionMobile=""
          illustrationWidth="w-[420px]"
          illustrationWidthMobile={260}
          cardWidth="w-[700px]"
          imagesWidth="w-[600px] -translate-y-14"
          showBlurOverlay={true}
          title={
            <>
              Seamless flight bookings for <br />
              <span className="text-[#DC2626]">global travelers & sponsors</span>
            </>
          }
          subtitle="Verify your email to secure your account and access instant PNR issuance and delegated payment portals."
        />

        <div className="col-span-6 flex items-center justify-start pl-10 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
          <div className="w-full max-w-[420px] mx-0 flex flex-col justify-center py-8 my-auto">
            {renderRegisterForm()}
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
            illustrationPosition=""
            illustrationPositionMobile=""
            illustrationWidth=""
            illustrationWidthMobile={260}
            cardWidth="w-full"
            imagesWidth="w-[650px] -translate-y-14"
            showBlurOverlay={true}
            title={
              <>
                Seamless flight bookings for <br />
                <span className="text-[#DC2626]">global travelers & sponsors</span>
              </>
            }
            subtitle="Verify your email to secure your account and access instant PNR issuance and delegated payment portals."
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
              <span>Swipe up to create account</span>
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
              className="relative z-30 mt-auto w-full bg-white rounded-t-[32px] sm:rounded-t-[36px] shadow-[0_-16px_48px_rgba(220,38,38,0.15)] px-5 pt-3 pb-6 max-h-[88vh] overflow-y-auto touch-pan-y"
            >
              <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 cursor-grab active:cursor-grabbing" />
              <div className="w-full max-w-[360px] mx-auto">
                {renderRegisterForm()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}