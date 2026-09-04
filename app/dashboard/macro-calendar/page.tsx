"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface MacroEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: "High" | "Medium" | "Low";
  actual: string;
  forecast: string;
  previous: string;
}

const mockMacroEvents: MacroEvent[] = [
  {
    id: "1",
    time: "13:30 WAT",
    currency: "USD",
    event: "Non-Farm Employment Change (NFP)",
    impact: "High",
    actual: "142K",
    forecast: "165K",
    previous: "114K",
  },
  {
    id: "2",
    time: "13:30 WAT",
    currency: "USD",
    event: "Unemployment Rate",
    impact: "High",
    actual: "4.2%",
    forecast: "4.2%",
    previous: "4.3%",
  },
  {
    id: "3",
    time: "12:00 WAT",
    currency: "EUR",
    event: "Core Consumer Price Index (CPI) y/y",
    impact: "High",
    actual: "2.2%",
    forecast: "2.3%",
    previous: "2.6%",
  },
  {
    id: "4",
    time: "06:30 WAT",
    currency: "AUD",
    event: "RBA Rate Statement & Cash Rate",
    impact: "High",
    actual: "4.35%",
    forecast: "4.35%",
    previous: "4.35%",
  },
  {
    id: "5",
    time: "18:00 WAT",
    currency: "USD",
    event: "FOMC Member Speech",
    impact: "Medium",
    actual: "--",
    forecast: "--",
    previous: "--",
  },
];

export default function MacroCalendarPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("All");

  const currencies = ["All", "USD", "EUR", "GBP", "AUD", "JPY"];

  const filteredEvents = mockMacroEvents.filter(
    (item) => selectedCurrency === "All" || item.currency === selectedCurrency
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Global Economic Indicators & Central Bank Telemetry
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Macro Calendar
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-100 text-slate-700 text-[12.5px] font-medium shadow-xs">
          <Icon icon="lucide:calendar" className="w-4 h-4 text-[#059669]" />
          <span>Today: 31 August 2026</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto bg-white p-3 rounded-[20px] border border-emerald-100 shadow-xs [&::-webkit-scrollbar]:hidden">
        {currencies.map((curr) => (
          <button
            key={curr}
            type="button"
            onClick={() => setSelectedCurrency(curr)}
            className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${
              selectedCurrency === curr
                ? "bg-[#059669] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {curr} Currency
          </button>
        ))}
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-[22px] border border-emerald-100 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-mazzard text-[16px] text-[#0A1A32]">Scheduled Economic Releases</h3>
          <span className="text-[12px] text-slate-400 font-mono">Live Feed Active</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((item) => (
              <div
                key={item.id}
                className="px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-[14px] bg-emerald-50 flex items-center justify-center flex-shrink-0 text-[#059669] font-bold text-xs shadow-xs font-mono">
                    {item.currency}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[14px] font-medium text-slate-900 truncate">
                        {item.event}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.impact === "High"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 mt-0.5">
                      Release Time: <span className="text-slate-700 font-medium">{item.time}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 font-mono text-[12.5px]">
                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 text-[11px] block">Actual</span>
                    <span className="font-semibold text-slate-900">{item.actual}</span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 text-[11px] block">Forecast</span>
                    <span className="text-slate-700">{item.forecast}</span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-slate-400 text-[11px] block">Previous</span>
                    <span className="text-slate-700">{item.previous}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-400 text-[13px]">No macroeconomic releases scheduled for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}