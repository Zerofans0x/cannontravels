"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface OutlookSection {
  id: string;
  quarter: string;
  title: string;
  macroTheme: string;
  assetClassOutlook: string;
  riskPosture: "Defensive" | "Neutral" | "Accumulation" | "Risk-On";
  author: string;
}

const mockOutlookReports: OutlookSection[] = [
  {
    id: "OUT-Q3-2026",
    quarter: "Q3 2026",
    title: "Global Liquidity Re-centering & Quantitative Volatility Compression",
    macroTheme: "Central banks balancing rate plateau against sustained growth, driving yield curve normalization across G10 economies.",
    assetClassOutlook: "Favorable for delta-neutral digital asset reserves and high-grade fixed income overlays. Equity allocations shifting toward downside protection.",
    riskPosture: "Accumulation",
    author: "cannontravels Investment Committee",
  },
  {
    id: "OUT-Q2-2026",
    quarter: "Q2 2026",
    title: "FX Spread Divergence and Interbank Liquidity Shifts",
    macroTheme: "Persistent inflation prints in European markets influencing ECB policy pacing and widening EUR/USD rate spreads.",
    assetClassOutlook: "Strong performance from institutional forex spread desks and short-duration macro currency baskets.",
    riskPosture: "Neutral",
    author: "Macro FX Strategy Desk",
  },
  {
    id: "OUT-Q1-2026",
    quarter: "Q1 2026",
    title: "Digital Asset Reserve Integration & Gamma Pinning Mechanics",
    macroTheme: "Institutional inflows stabilizing spot reserves while derivatives market dealers absorb directional gamma imbalances.",
    assetClassOutlook: "High risk-adjusted yield generation via automated order book market making and delta-neutral funding rate capture.",
    riskPosture: "Risk-On",
    author: "Quantitative Research Group",
  },
];

export default function WeeklyOutlookPage() {
  const [selectedQuarter, setSelectedQuarter] = useState<string>("Q3 2026");

  const quarters = ["Q3 2026", "Q2 2026", "Q1 2026"];

  const activeReport = mockOutlookReports.find((r) => r.quarter === selectedQuarter) || mockOutlookReports[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Macroeconomic Synthesis & Committee Briefs
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Institutional Outlook
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12.5px] font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Committee Consensus Active</span>
        </div>
      </div>

      {/* Quarter Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto bg-white p-3 rounded-[20px] border border-emerald-100 shadow-xs [&::-webkit-scrollbar]:hidden">
        {quarters.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setSelectedQuarter(q)}
            className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedQuarter === q
                ? "bg-[#059669] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {q} Outlook Report
          </button>
        ))}
      </div>

      {/* Main Report Display Card */}
      <div className="bg-white rounded-[24px] p-6 sm:p-10 border border-emerald-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11.5px] font-medium font-mono">
              {activeReport.quarter} Synthesis
            </span>
            <h3 className="font-mazzard text-[20px] sm:text-[24px] text-[#0A1A32] mt-2">
              {activeReport.title}
            </h3>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-[11.5px] text-slate-400 block">Recommended Posture</span>
            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[12px] font-semibold">
              {activeReport.riskPosture}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-slate-50 p-6 rounded-[18px] border border-slate-100 space-y-2">
            <h4 className="font-mazzard text-[15px] text-[#0A1A32] flex items-center gap-2">
              <Icon icon="lucide:globe" className="w-4 h-4 text-[#059669]" />
              <span>Macroeconomic Theme</span>
            </h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              {activeReport.macroTheme}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-[18px] border border-slate-100 space-y-2">
            <h4 className="font-mazzard text-[15px] text-[#0A1A32] flex items-center gap-2">
              <Icon icon="lucide:pie-chart" className="w-4 h-4 text-[#059669]" />
              <span>Asset Class Allocation Outlook</span>
            </h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">
              {activeReport.assetClassOutlook}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-400">
          <span>Published by: {activeReport.author}</span>
          <span className="font-mono">Classification: Restricted / Institutional Use Only</span>
        </div>
      </div>
    </div>
  );
}