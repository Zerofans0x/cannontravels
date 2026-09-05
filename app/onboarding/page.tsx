
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import AuthHeroCard from "@/components/auth/AuthHeroCard";
import { useAuth } from "@/context/AuthContext";

type TravelStyle = "leisure" | "corporate" | "frequent";
type CabinClass = "economy" | "business" | "first";
type GoalType = "savings" | "convenience" | "upgrades";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-3.5 h-3.5 flex-shrink-0"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 12.5L10.5 17.5L20 8" />
    </svg>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  const [step, setStep] = useState(2);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("leisure");
  const [cabinPreferences, setCabinPreferences] = useState<CabinClass[]>(["economy"]);
  const [goal, setGoal] = useState<GoalType>("savings");
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const toggleCabin = (cabin: CabinClass) => {
    if (cabinPreferences.includes(cabin)) {
      if (cabinPreferences.length > 1) {
        setCabinPreferences(cabinPreferences.filter((c) => c !== cabin));
      }
    } else {
      setCabinPreferences([...cabinPreferences, cabin]);
    }
  };

  const handleContinueFromStep = async () => {
    setErrorMessage("");
    if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setIsLoading(true);
      try {
        const styleMap = {
          leisure: "Leisure Explorer",
          corporate: "Corporate Business Traveler",
          frequent: "Frequent Flyer Elite"
        };
        
        const goalMap = {
          savings: "Best Price & Deals",
          convenience: "Seamless Scheduling & Fast-Track",
          upgrades: "Frequent Upgrades & Lounge Access"
        };

        const payload = {
          experienceLevel: styleMap[travelStyle],
          marketsOfInterest: cabinPreferences,
          primaryGoal: goal,
          riskTolerance: goalMap[goal],
          planTier: "standard-traveler"
        };

        await completeOnboarding(payload);
        router.push("/dashboard");
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Failed to finalize your travel profile.");
        setIsLoading(false);
      }
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

  const renderHeroForStep = (isMobile = false) => {
    if (step === 2) {
      return (
        <AuthHeroCard
          illustrationSrc="/images/auth/onboarding-one-img.png"
          illustrationPosition="-translate-y-16"
          illustrationPositionMobile="-translate-y-14"
          illustrationWidth="w-[720px]"
          illustrationWidthMobile={250}
          cardWidth={isMobile ? "w-full" : "w-[750px]"}
          showBlurOverlay={false}
          imagesWidth="w-full sm:w-[420px] -translate-y-10 lg:-translate-y-14"
          title={
            <>
              Personalized flight bookings <br />
              tailored to your <br />
              <span className="text-[#DC2626]">unique travel style.</span>
            </>
          }
          subtitle="Tell us how you explore the skies so we can customize your PNR dashboard and priority alerts."
        />
      );
    }

    if (step === 3) {
      return (
        <AuthHeroCard
          illustrationSrc="/images/auth/oboarding-two-img.png"
          illustrationPosition=""
          illustrationPositionMobile=""
          illustrationWidth=""
          illustrationWidthMobile={250}
          cardWidth={isMobile ? "w-full" : "w-[750px]"}
          imagesWidth="w-full sm:w-[420px] -translate-y-10 lg:-translate-y-14"
          showBlurOverlay={false}
          title={
            <>
              Cabin preferences & <br />
              <span className="text-[#DC2626]">preferred comfort tiers.</span>
            </>
          }
          subtitle="Select your preferred seating classes to instantly filter global flight inventories and fare classes."
        />
      );
    }

    return (
      <AuthHeroCard
        illustrationSrc="/images/auth/onboarding-three-img.png"
        illustrationPosition="-translate-y-12"
        illustrationPositionMobile="-translate-y-14"
        illustrationWidth="w-[420px]"
        illustrationWidthMobile={250}
        cardWidth={isMobile ? "w-full" : "w-[750px]"}
        imagesWidth="w-full sm:w-[420px] -translate-y-10 lg:-translate-y-14"
        bgColor="bg-slate-900"
        showBlurOverlay={false}
        showSocialProof={false}
        badge={
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-100 text-[#DC2626] font-bold text-[11px] uppercase tracking-wider">
            PROFILE CONFIGURED
          </span>
        }
        title={
          <>
            You&apos;re all set <br />
            <span className="text-[#DC2626]">Welcome aboard</span>
          </>
        }
        subtitle="Your flight operations dashboard is ready. Initializing live airspace telemetry and instant PNR issuance."
      />
    );
  };

  const renderOnboardingFlow = () => (
    <div className="pb-10 sm:pb-16">
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-6 max-w-[280px]">
        <div className={`h-1.5 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-[#0A111E]" : "bg-[#E2E8F0]"}`} />
        <div className={`h-1.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-[#0A111E]" : "bg-[#E2E8F0]"}`} />
        <div className={`h-1.5 rounded-full transition-colors duration-300 ${step >= 3 ? "bg-[#0A111E]" : "bg-[#E2E8F0]"}`} />
        <div className={`h-1.5 rounded-full transition-colors duration-300 ${step >= 4 ? "bg-[#0A111E]" : "bg-[#E2E8F0]"}`} />
      </div>

      {errorMessage && (
        <div className="mb-4 p-2.5 sm:p-3 rounded-[14px] bg-rose-50 border border-rose-200 text-rose-600 text-[11.5px] sm:text-[12.5px] flex items-center gap-2">
          <Icon icon="lucide:alert-circle" className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="font-mazzard text-[24px] sm:text-[34px] lg:text-[38px] text-[#0A1A32] font-black tracking-tight leading-tight">
              What is your primary travel style?
            </h2>
            <p className="mt-2.5 sm:mt-3 text-[12px] sm:text-[14px] text-slate-600 font-medium leading-relaxed">
              Help us understand your frequency and trip patterns for better recommendations.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
            <button
              type="button"
              onClick={() => setTravelStyle("leisure")}
              className={`w-full aspect-[1/1.14] p-2.5 sm:p-4 rounded-[26px] sm:rounded-[32px] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                travelStyle === "leisure"
                  ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-md shadow-red-600/20"
                  : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className={`text-[12px] sm:text-[15px] font-bold leading-tight ${travelStyle === "leisure" ? "text-white" : "text-[#0F172A]"}`}>
                Leisure
              </span>
              <span className={`mt-1 text-[10px] sm:text-[11px] leading-tight font-medium ${travelStyle === "leisure" ? "text-red-100" : "text-slate-500"}`}>
                Vacations & getaways
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTravelStyle("corporate")}
              className={`w-full aspect-[1/1.14] p-2.5 sm:p-4 rounded-[26px] sm:rounded-[32px] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                travelStyle === "corporate"
                  ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-md shadow-red-600/20"
                  : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className={`text-[12px] sm:text-[15px] font-bold leading-tight ${travelStyle === "corporate" ? "text-white" : "text-[#0F172A]"}`}>
                Corporate
              </span>
              <span className={`mt-1 text-[10px] sm:text-[11px] leading-tight font-medium ${travelStyle === "corporate" ? "text-red-100" : "text-slate-500"}`}>
                Business & client trips
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTravelStyle("frequent")}
              className={`w-full aspect-[1/1.14] p-2.5 sm:p-4 rounded-[26px] sm:rounded-[32px] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                travelStyle === "frequent"
                  ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-md shadow-red-600/20"
                  : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className={`text-[12px] sm:text-[15px] font-bold leading-tight ${travelStyle === "frequent" ? "text-white" : "text-[#0F172A]"}`}>
                Frequent Flyer
              </span>
              <span className={`mt-1 text-[10px] sm:text-[11px] leading-tight font-medium ${travelStyle === "frequent" ? "text-red-100" : "text-slate-500"}`}>
                Monthly globetrotter
              </span>
            </button>
          </div>

          <div className="p-4 sm:p-5 rounded-[22px] bg-slate-50 border border-slate-200 text-slate-700 text-[12px] sm:text-[13px] leading-relaxed font-medium">
            {travelStyle === "leisure" && (
              <p>
                <strong className="text-slate-900 font-bold">Leisure Explorer:</strong> Focused on finding scenic destinations, flexible hotel bundling, and cost-effective holiday flights.
              </p>
            )}
            {travelStyle === "corporate" && (
              <p>
                <strong className="text-slate-900 font-bold">Corporate Traveler:</strong> Tailored for rapid PNR issuance, priority ticket changes, expense reporting, and last-minute booking flexibility.
              </p>
            )}
            {travelStyle === "frequent" && (
              <p>
                <strong className="text-slate-900 font-bold">Frequent Flyer Elite:</strong> Optimized for biometric airport fast-track, lounge access vouchers, and automated delay protection.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleContinueFromStep}
            disabled={isLoading}
            className="w-full py-3.5 sm:py-4 px-6 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-[15px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-md shadow-red-600/20"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Continue</span>
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="14 6 20 12 14 18" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="font-mazzard text-[24px] sm:text-[34px] lg:text-[38px] text-[#0A1A32] font-black tracking-tight leading-tight">
              Preferred cabin classes
            </h2>
            <p className="mt-2.5 sm:mt-3 text-[12px] sm:text-[14px] text-slate-600 font-medium leading-relaxed">
              Select one or more cabin classes you typically book for your journeys.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
            <button
              type="button"
              onClick={() => toggleCabin("economy")}
              className={`w-full aspect-[1/1.08] p-3 sm:p-4 rounded-[26px] sm:rounded-[30px] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                cabinPreferences.includes("economy")
                  ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-md shadow-red-600/20"
                  : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className={`text-[12px] sm:text-[15.5px] font-bold leading-tight ${cabinPreferences.includes("economy") ? "text-white" : "text-[#0F172A]"}`}>
                Economy
              </span>
            </button>
            <button
              type="button"
              onClick={() => toggleCabin("business")}
              className={`w-full aspect-[1/1.08] p-3 sm:p-4 rounded-[26px] sm:rounded-[30px] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                cabinPreferences.includes("business")
                  ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-md shadow-red-600/20"
                  : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className={`text-[12px] sm:text-[15.5px] font-bold leading-tight ${cabinPreferences.includes("business") ? "text-white" : "text-[#0F172A]"}`}>
                Business
              </span>
            </button>
            <button
              type="button"
              onClick={() => toggleCabin("first")}
              className={`w-full aspect-[1/1.08] p-3 sm:p-4 rounded-[26px] sm:rounded-[30px] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                cabinPreferences.includes("first")
                  ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-md shadow-red-600/20"
                  : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span className={`text-[14px] sm:text-[15.5px] font-bold leading-tight ${cabinPreferences.includes("first") ? "text-white" : "text-[#0F172A]"}`}>
                First Class
              </span>
            </button>
          </div>

          <div className="pt-2">
            <span className="block text-[11.5px] sm:text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-2.5">
              PRIMARY BOOKING PRIORITY
            </span>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setGoal("savings")}
                className={`w-full py-3.5 sm:py-4 px-5 rounded-[16px] sm:rounded-[18px] text-left text-[13.5px] sm:text-[14px] font-bold transition-all cursor-pointer ${
                  goal === "savings"
                    ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Best prices & discount deals
              </button>
              <button
                type="button"
                onClick={() => setGoal("convenience")}
                className={`w-full py-3.5 sm:py-4 px-5 rounded-[16px] sm:rounded-[18px] text-left text-[13.5px] sm:text-[14px] font-bold transition-all cursor-pointer ${
                  goal === "convenience"
                    ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Seamless scheduling & fast-track boarding
              </button>
              <button
                type="button"
                onClick={() => setGoal("upgrades")}
                className={`w-full py-3.5 sm:py-4 px-5 rounded-[16px] sm:rounded-[18px] text-left text-[13.5px] sm:text-[14px] font-bold transition-all cursor-pointer ${
                  goal === "upgrades"
                    ? "bg-[#DC2626] text-white border border-[#B91C1C] shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Frequent cabin upgrades & lounge access
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="py-3.5 sm:py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[15px] rounded-full transition-all cursor-pointer"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleContinueFromStep}
              disabled={isLoading}
              className="flex-1 py-3.5 sm:py-4 px-6 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-[15px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-md shadow-red-600/20"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Continue</span>
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <polyline points="14 6 20 12 14 18" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-300">
          <div>
            <h2 className="font-mazzard text-[24px] sm:text-[32px] lg:text-[36px] text-[#0F172A] font-black tracking-tight leading-tight">
              Dashboard features preview
            </h2>
            <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13.5px] text-slate-600 font-medium leading-relaxed">
              Here is what you get access to right after setup completes.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            {[
              { id: 1, title: "Active PNR Dashboard", desc: "Instant visibility into upcoming flights, e-tickets, and boarding passes." },
              { id: 2, title: "Automated Flight Alerts", desc: "Real-time updates regarding gate changes, delays, and schedule adjustments." },
              { id: 3, title: "Luggage & Insurance", desc: "Track checked bags and manage travel protection seamlessly in one place." },
              { id: 4, title: "Priority Support Desk", desc: "24/7 dedicated concierge assistance for instant rescheduling and bookings." },
            ].map((item) => (
              <div key={item.id} className="p-3 sm:p-4 rounded-[16px] bg-slate-50 border border-slate-200 flex items-start gap-2.5 sm:gap-3">
                <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border-[1.5px] border-slate-700 text-slate-700 font-bold text-[10px] sm:text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.id}
                </div>
                <div>
                  <h4 className="font-bold text-[12.5px] sm:text-[14px] text-slate-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[11px] sm:text-[12px] text-slate-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="py-3 sm:py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[13.5px] sm:text-[15px] rounded-full transition-all cursor-pointer"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleContinueFromStep}
              disabled={isLoading}
              className="flex-1 py-3 sm:py-3.5 px-5 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-[13.5px] sm:text-[15px] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-md shadow-red-600/20"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Complete Setup & Launch</span>
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <polyline points="14 6 20 12 14 18" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 h-screen overflow-hidden">
      <main className="hidden lg:grid w-full h-full max-w-[1400px] mx-auto grid-cols-12 gap-12 items-center p-8">
        {renderHeroForStep(false)}
        <div className="col-span-6 flex items-center justify-start pl-10 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
          <div className="w-full max-w-[460px] mx-0 flex flex-col justify-center py-8 my-auto">
            {renderOnboardingFlow()}
          </div>
        </div>
      </main>

      <div
        className="lg:hidden relative w-full h-full p-3 sm:p-4 pb-0 flex flex-col justify-between overflow-hidden bg-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-3 sm:inset-4 bottom-0 z-0">
          {renderHeroForStep(true)}
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
              <span>Swipe up to continue</span>
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
              className="relative z-30 mt-auto w-full bg-white rounded-t-[32px] sm:rounded-t-[36px] shadow-[0_-16px_48px_rgba(220,38,38,0.15)] px-5 pt-3 pb-7 max-h-[85vh] overflow-y-auto touch-pan-y"
            >
              <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 cursor-grab active:cursor-grabbing" />
              <div className="w-full max-w-[400px] mx-auto">
                {renderOnboardingFlow()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}