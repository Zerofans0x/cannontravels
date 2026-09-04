
"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function LegalContent({ defaultTab = "terms" }: { defaultTab?: "terms" | "privacy" }) {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">(defaultTab);

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-14 pt-4 pb-16 sm:py-24">
        <h1 className="font-mazzard text-[32px] sm:text-[56px] text-[#0f172a] tracking-tight mb-8 sm:mb-12 font-black">
          {activeTab === "terms" ? "Terms of Service" : "Privacy Policy"}
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-3 sm:gap-5 mb-8 sm:mb-12">
          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className="flex flex-col items-center group cursor-pointer w-[100px] sm:w-[160px]"
          >
            <span
              className={`text-[15px] sm:text-[18px] font-bold transition-colors pb-2 sm:pb-3 ${
                activeTab === "terms"
                  ? "text-[#DC2626]"
                  : "text-slate-400 group-hover:text-slate-600"
              }`}
            >
              Terms
            </span>
            <div
              className={`w-full h-[3px] sm:h-[3.5px] rounded-full transition-all ${
                activeTab === "terms"
                  ? "bg-[#DC2626]"
                  : "bg-slate-200 group-hover:bg-slate-400"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("privacy")}
            className="flex flex-col items-center group cursor-pointer w-[100px] sm:w-[160px]"
          >
            <span
              className={`text-[15px] sm:text-[18px] font-bold transition-colors pb-2 sm:pb-3 ${
                activeTab === "privacy"
                  ? "text-[#DC2626]"
                  : "text-slate-400 group-hover:text-slate-600"
              }`}
            >
              Privacy
            </span>
            <div
              className={`w-full h-[3px] sm:h-[3.5px] rounded-full transition-all ${
                activeTab === "privacy"
                  ? "bg-[#DC2626]"
                  : "bg-slate-200 group-hover:bg-slate-400"
              }`}
            />
          </button>
        </div>

        {/* Content Box */}
        <div className="w-full max-w-[1000px] mx-auto bg-transparent sm:bg-slate-50 rounded-[32px] sm:rounded-[44px] p-0 sm:p-12 md:p-16 border border-slate-100">
          {activeTab === "terms" && (
            <div className="space-y-8 sm:space-y-12">
              <section>
                <h2 className="text-[#DC2626] text-[19px] sm:text-[26px] font-bold mb-3 sm:mb-4">
                  1. About CannonTravels Services
                </h2>
                <div className="text-[12.5px] sm:text-[14px] text-slate-700 leading-[1.65] sm:leading-relaxed space-y-3 sm:space-y-4 font-medium">
                  <p>
                    CannonTravels is a next-generation global flight booking and live telemetry platform that enables users to reserve international air travel, delegate payment obligations securely to third-party sponsors without account requirements, and monitor flight positioning via encrypted WebSockets.
                    Our services are built to ensure seamless ticketing, verified airline PNR issuance, and transparent itinerary management.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[#DC2626] text-[22px] sm:text-[26px] font-bold mb-4">
                  2. Delegated Third-Party Payments
                </h2>
                <div className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed space-y-4 font-medium">
                  <p>
                    When selecting our delegated payment option, you authorize CannonTravels to issue a secure transaction link to a designated sponsor. 
                    The sponsor acknowledges their responsibility for completing payment for the associated flight reservation. 
                    Tickets and PNR codes are finalized and dispatched only upon full clearance of funds.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[#DC2626] text-[22px] sm:text-[26px] font-bold mb-4">
                  3. Flight Telemetry & Live Tracking
                </h2>
                <div className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed space-y-4 font-medium">
                  <p>
                    Our platform broadcasts real-time GPS coordinates, altitude, speed, and ETA via encrypted data streams. 
                    Tracking codes are strictly confidential to the passenger and authorized sponsors. 
                    CannonTravels deploys robust encryption infrastructure, though users recognize that live airspace metrics depend on third-party aviation data providers.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[#DC2626] text-[22px] sm:text-[26px] font-bold mb-4">
                  4. Account Security & Responsibilities
                </h2>
                <div className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed space-y-4 font-medium">
                  <p>
                    Users must maintain the confidentiality of their account credentials and tracking links. 
                    CannonTravels is not liable for unauthorized access resulting from shared login credentials or leaked tracking tokens.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[#DC2626] text-[22px] sm:text-[26px] font-bold mb-4">
                  5. Cancellation & Ticketing Policies
                </h2>
                <div className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed space-y-4 font-medium">
                  <p>
                    All flight bookings are subject to the specific rules, cancellation guidelines, and baggage policies of the operating airline carrier. 
                    Refund requests must be initiated through our support desk and are governed by airline fare class conditions.
                  </p>
                </div>
              </section>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-12">
              <section>
                <h2 className="text-[#DC2626] text-[22px] sm:text-[26px] font-bold mb-4">
                  1. Information We Collect
                </h2>
                <div className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed space-y-4 font-medium">
                  <p>We collect essential information required to process flight reservations and telemetry tracking:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Passenger full names, passport details (where required by airlines), and contact info</li>
                    <li>Sponsor email addresses for delegated payment workflows</li>
                    <li>Encrypted authentication credentials</li>
                    <li>Live session metadata and telemetry connection logs</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-[#DC2626] text-[22px] sm:text-[26px] font-bold mb-4">
                  2. Use of Telemetry Data
                </h2>
                <div className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed space-y-4 font-medium">
                  <p>
                    Real-time location and flight tracking data are used solely to power your active itinerary dashboard and provide live updates to authorized tracking code holders. We never monetize or broadcast private passenger tracking links.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[#DC2626] text-[22px] sm:text-[26px] font-bold mb-4">
                  3. Data Protection & Security
                </h2>
                <div className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed space-y-4 font-medium">
                  <p>
                    CannonTravels utilizes enterprise-grade SSL encryption, secure token hashing, and strict database firewalls to safeguard all user data, payment transactions, and flight records.
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}