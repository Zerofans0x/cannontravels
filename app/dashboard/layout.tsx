"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Terminal",
  "/dashboard/portfolio": "Portfolio Allocation",
  "/dashboard/mandates": "Verified Mandates",
  "/dashboard/mandates/verify": "Verify Mandate",
  "/dashboard/risk-telemetry": "Risk Telemetry",
  "/dashboard/execution-journal": "Execution Journal",
  "/dashboard/macro-calendar": "Macro Calendar",
  "/dashboard/market-intelligence": "Market Intelligence",
  "/dashboard/strategy-alert": "Strategy Alerts",
  "/dashboard/institutional-outlook": "Institutional Outlook",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const title = ROUTE_TITLES[pathname] || "Terminal";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col lg:flex-row antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <DashboardHeader
          title={title}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1500px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}