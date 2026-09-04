"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface IntelligenceBrief {
  id: string;
  title: string;
  category: "Macro Quant" | "Digital Assets" | "Forex Liquidity" | "Equities Overlay";
  sentiment: "Bullish" | "Bearish" | "Neutral";
  summary: string;
  timestamp: string;
  author: string;
}

const mockIntelligenceBriefs: IntelligenceBrief[] = [
  {
    id: "BRIEF-01",
    title: "Gamma Exposure and L3 Order Book Imbalances on BTC Reserves",
    category: "Digital Assets",
    sentiment: "Bullish",
    summary: "Recent order book telemetry indicates significant dealer gamma pinning near the $68,000 strike, suggesting reduced downward volatility ahead of the weekly options expiry.",
    timestamp: "31 Aug 2026, 15:40 WAT",
    author: "Quant Desk Lead",
  },
  {
    id: "BRIEF-02",
    title: "EUR/USD Macro Spread and ECB Liquidity Inflows",
    category: "Forex Liquidity",
    sentiment: "Neutral",
    summary: "Interbank liquidity flow analysis shows stable yield differentials between UST and Bunds, keeping the EUR/USD pair range-bound within the 1.0820–1.0910 channel.",
    timestamp: "31 Aug 2026, 12:10 WAT",
    author: "Macro FX Strategist",
  },
  {
    id: "BRIEF-03",
    title: "S&P 500 Downside Volatility Protection & Put Overlay",
    category: "Equities Overlay",
    sentiment: "Bearish",
    summary: "Implied volatility smiles across index options indicate growing institutional demand for downside tail-risk hedges following recent macroeconomic employment prints.",
    timestamp: "30 Aug 2026, 17:30 WAT",
    author: "Risk Governance Committee",
  },
];

export default function MarketInsightPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Digital Assets", "Forex Liquidity", "Equities Overlay", "Macro Quant"];

  const filteredBriefs = mockIntelligenceBriefs.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Proprietary Research & Quantitative Insights
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Market Intelligence
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12.5px] font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Telemetry Feeds Active</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto bg-white p-3 rounded-[20px] border border-emerald-100 shadow-xs [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#059669] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Intelligence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredBriefs.map((brief) => (
          <div
            key={brief.id}
            className="bg-white rounded-[24px] p-6 sm:p-7 border border-emerald-100 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium font-mono">
                  {brief.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    brief.sentiment === "Bullish"
                      ? "bg-emerald-50 text-emerald-700"
                      : brief.sentiment === "Bearish"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {brief.sentiment}
                </span>
              </div>

              <h3 className="font-mazzard text-[18px] text-[#0A1A32] leading-snug">
                {brief.title}
              </h3>

              <p className="text-[13px] text-slate-600 leading-relaxed">
                {brief.summary}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[11.5px] text-slate-400">
              <span>Author: {brief.author}</span>
              <span>{brief.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}