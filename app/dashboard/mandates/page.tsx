"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface MandateItem {
  id: string;
  title: string;
  category: string;
  riskTier: "Tier 1 (Low)" | "Tier 2 (Moderate)" | "Tier 3 (Aggressive)" | "Tier 4 (Institutional)";
  targetYield: string;
  allocatedCapital: string;
  status: "Active" | "Under Review" | "Completed" | "Pending Calibration";
  issuedDate: string;
}

const mockMandates: MandateItem[] = [
  {
    id: "1",
    title: "Gamma Exposure & L3 Order Book Arbitrage",
    category: "Quantitative Strategy",
    riskTier: "Tier 3 (Aggressive)",
    targetYield: "18.4% YTD",
    allocatedCapital: "$376,670",
    status: "Active",
    issuedDate: "12 Mar 2026",
  },
  {
    id: "2",
    title: "Institutional Forex Liquidity Spread",
    category: "Macro FX",
    riskTier: "Tier 2 (Moderate)",
    targetYield: "12.1% YTD",
    allocatedCapital: "$120,727",
    status: "Active",
    issuedDate: "04 May 2026",
  },
  {
    id: "3",
    title: "Delta Neutral Digital Asset Reserve",
    category: "Digital Assets",
    riskTier: "Tier 4 (Institutional)",
    targetYield: "24.6% YTD",
    allocatedCapital: "$169,018",
    status: "Active",
    issuedDate: "18 Jun 2026",
  },
  {
    id: "4",
    title: "S&P 500 Downside Put Option Overlay",
    category: "Risk Hedging",
    riskTier: "Tier 1 (Low)",
    targetYield: "-0.5% YTD",
    allocatedCapital: "$71,670",
    status: "Under Review",
    issuedDate: "10 Aug 2026",
  },
];

export default function MandatesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const statuses = ["All", "Active", "Under Review", "Completed", "Pending Calibration"];

  const filteredMandates = mockMandates.filter((item) => {
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Verification Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Governance & Strategy Allocations
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Verified Mandates
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/mandates/verify"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            <Icon icon="boxicons:seal-check-filled" className="w-4 h-4" />
            <span>Verify Mandate Hash</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Active Mandates Deployed</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-[#059669] mt-2">
            3 / 4
          </div>
          <p className="text-[11.5px] text-emerald-600 font-medium mt-1">Within optimal governance parameters</p>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Average Portfolio Yield</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-slate-900 mt-2">
            +13.6%
          </div>
          <p className="text-[11.5px] text-emerald-600 font-medium mt-1">Outperforming benchmark index by 4.2%</p>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Compliance Audit Status</p>
          <div className="font-thicccboi text-[28px] sm:text-[34px] text-emerald-600 mt-2">
            Verified Level A
          </div>
          <p className="text-[11.5px] text-slate-400 mt-1">Last telemetry check: Today, 04:00 WAT</p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-[20px] border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedStatus === status
                  ? "bg-[#059669] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon icon="lucide:search" className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search mandates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[12.5px] text-slate-900 focus:outline-none focus:border-[#059669] transition-colors"
          />
        </div>
      </div>

      {/* Mandates List Table */}
      <div className="bg-white rounded-[22px] border border-emerald-100 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-mazzard text-[16px] text-[#0A1A32]">Mandate Allocations</h3>
          <span className="text-[12px] text-slate-400 font-mono">Showing {filteredMandates.length} records</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredMandates.length > 0 ? (
            filteredMandates.map((item) => (
              <div
                key={item.id}
                className="px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-[14px] bg-emerald-50 flex items-center justify-center flex-shrink-0 text-[#059669] shadow-xs">
                    <Icon icon="boxicons:seal-check-filled" className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[14px] font-medium text-slate-900 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10.5px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 mt-0.5">
                      Risk Tier: <span className="text-slate-700 font-medium">{item.riskTier}</span> · Issued: {item.issuedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <p className="text-[14px] font-thicccboi text-slate-900">
                      {item.allocatedCapital}
                    </p>
                    <p className="text-[11.5px] font-semibold text-emerald-600 mt-0.5">
                      Target Yield: {item.targetYield}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                      item.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : item.status === "Under Review"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-slate-400 text-[13px]">No mandates found matching your search parameters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}