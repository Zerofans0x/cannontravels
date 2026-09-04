"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api"; 
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
    const fetchTerminalData = async () => {
      try {
        const response = await api.get('/psyche/terminal');
        setData(response.data.data);
      } catch (error: any) {
        console.error("Failed to fetch terminal data", error);
        if (error.response?.status === 401) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTerminalData();
  }, [router]);


  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#059669] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { hasActivePortfolio, user, metrics, strategy, positions } = data;

  // Active / dynamic investment portfolio stats
  const stats = hasActivePortfolio
    ? [
        { title: "Total Portfolio Value", value: `$${metrics.totalValue.toLocaleString()}`, subtitle: "+4.2% this week", hasArrow: true },
        { title: "Active Positions", value: metrics.activePositionsCount, subtitle: "3 liquidating soon", hasArrow: true },
        { title: "YTD Return", value: `${metrics.ytdReturn}%`, subtitle: "Outperforming benchmark", hasArrow: true },
        { title: "Sharpe Ratio", value: metrics.sharpeRatio, subtitle: "Optimal risk efficiency", hasArrow: true },
      ]
    : [
        { title: "Total Portfolio Value", value: "$0.00", subtitle: "No capital deployed", hasArrow: false },
        { title: "Active Positions", value: "0", subtitle: "Zero exposure", hasArrow: false },
        { title: "YTD Return", value: "0.0%", subtitle: "No historical data", hasArrow: false },
        { title: "Sharpe Ratio", value: "0.00", subtitle: "Uncalibrated", hasArrow: false },
      ];

  return (
    <div className="space-y-5 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Greeting & Risk Status Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Institutional Terminal Active
          </p>
          <h2 className="font-mazzard text-[24px] sm:text-[32px] lg:text-[36px] text-[#0A1A32] tracking-tight flex items-center gap-2 mt-0.5">
            <span>Welcome back, {user.firstName}</span>
            <Image
              src="/images/dashboard/dashboard-hand-wave.png"
              alt="Hand wave"
              width={32}
              height={32}
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
            />
          </h2>
        </div>

        {/* Risk Governance Pill */}
        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[11.5px] sm:text-[12.5px] text-emerald-700 font-medium border border-emerald-100 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Risk Cap: Optimal (3.2% Drawdown)</span>
        </div>
      </div>

      {/* 4 Metric Cards — 2x2 on Mobile, 4-Cols on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 border border-emerald-100 transition-all flex flex-col justify-between min-h-[125px] sm:min-h-[145px] relative group shadow-sm"
          >
            <div>
              <h3 className="text-[11.5px] sm:text-[13px] text-slate-500 font-normal truncate">
                {stat.title}
              </h3>
              <div className="font-thicccboi text-[28px] sm:text-[36px] lg:text-[40px] text-[#059669] leading-none mt-1.5 sm:mt-2">
                {stat.value}
              </div>
            </div>

            <div className="flex items-end justify-between gap-1 mt-2">
              <p className="text-[10px] sm:text-[11.5px] text-slate-400 truncate">
                {stat.subtitle}
              </p>

              {stat.hasArrow && (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-50 text-[#059669] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                  <Icon icon="lucide:arrow-up-right" className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Active Strategy Deployment Banner */}
      {hasActivePortfolio ? (
        <div className="bg-white rounded-[20px] sm:rounded-[26px] p-4 sm:p-5 lg:p-6 shadow-xs border border-emerald-100 flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {/* Thumbnail */}
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-[12px] sm:rounded-[14px] bg-emerald-50 flex items-center justify-center flex-shrink-0 text-[#059669] relative overflow-hidden">
              <Icon icon="lucide:activity" className="w-6 h-6" />
            </div>

            {/* Strategy Info */}
            <div className="min-w-0 flex-1">
              <p className="text-[11px] sm:text-[12px] text-slate-400 font-normal">
                Quantitative Pool · Tier 3 Mandate
              </p>
              <h3 className="font-mazzard text-[14px] sm:text-[17px] text-[#0A1A32] tracking-tight truncate mt-0.5">
                Gamma Exposure & L3 Order Book Arbitrage
              </h3>

              {/* Progress Track */}
              <div className="w-28 sm:w-48 lg:w-56 h-1 sm:h-1.5 rounded-full bg-slate-200 overflow-hidden mt-1.5">
                <div className="w-[78%] h-full bg-[#059669] rounded-full" />
              </div>
              <p className="text-[9.5px] sm:text-[10.5px] text-slate-400 mt-1 truncate">
                $376,670 allocated · 78% of max capacity
              </p>
            </div>
          </div>

          {/* Manage CTA Button */}
          <Link
            href="/dashboard/execution-journal"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4.5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[12.5px] sm:text-[13.5px] font-medium transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap flex-shrink-0 cursor-pointer"
          >
            <span>Manage Allocation</span>
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
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
          </Link>
        </div>
      ) : (
        /* Empty State Callout Card */
        <div className="bg-white rounded-[20px] sm:rounded-[26px] p-4.5 sm:p-7 shadow-xs border border-emerald-100 space-y-3 sm:space-y-4">
          <div>
            <h3 className="font-mazzard text-[16px] sm:text-[22px] text-[#0A1A32] tracking-tight">
              Initialize your first asset allocation?
            </h3>
            <p className="text-[11px] sm:text-[13.5px] text-slate-500 leading-relaxed mt-1 max-w-[650px]">
              Deploy capital into quantitative pools or configure custom risk parameters to start tracking portfolio performance.
            </p>
          </div>

          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[12px] sm:text-[13.5px] font-normal transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
          >
            <span>Configure Mandate</span>
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
          </Link>
        </div>
      )}

      {/* 2-Column Section: Active Positions & Valuation Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Active Positions */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center justify-between px-1 mb-3">
            <h3 className="font-mazzard text-[15px] sm:text-[16px] text-[#0A1A32]">
              Active Positions & Liquidity Pools
            </h3>
            <Link
              href="/dashboard/journal"
              className="text-[12px] text-slate-400 hover:text-[#059669] transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="flex-1 flex flex-col gap-2.5 sm:gap-3">
            {/* Position 1 */}
            <div className="bg-white rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 shadow-xs border border-emerald-100 flex items-center justify-between gap-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-emerald-50 flex items-center justify-center flex-shrink-0 text-[#059669] font-bold text-xs">
                  EUR
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] sm:text-[14px] text-slate-900 truncate font-medium">
                    EUR/USD Long Spread
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    Size: $120,000 · PnL: <span className="text-emerald-600 font-semibold">+$2,410 (+2.01%)</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium flex-shrink-0">
                Active
              </span>
            </div>

            {/* Position 2 */}
            <div className="bg-white rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 shadow-xs border border-emerald-100 flex items-center justify-between gap-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-emerald-50 flex items-center justify-center flex-shrink-0 text-[#059669] font-bold text-xs">
                  BTC
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] sm:text-[14px] text-slate-900 truncate font-medium">
                    BTC/USD Delta Neutral Hedge
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    Size: $185,000 · PnL: <span className="text-emerald-600 font-semibold">+$5,840 (+3.15%)</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium flex-shrink-0">
                Active
              </span>
            </div>

            {/* Position 3 */}
            <div className="bg-white rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 shadow-xs border border-emerald-100 flex items-center justify-between gap-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[12px] bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600 font-bold text-xs">
                  SPX
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] sm:text-[14px] text-slate-900 truncate font-medium">
                    S&P 500 Put Option Overlay
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    Size: $71,670 · PnL: <span className="text-amber-600 font-semibold">-$410 (-0.57%)</span>
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-medium flex-shrink-0">
                Hedging
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Portfolio Valuation Velocity Chart */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="px-1 mb-3">
            <h3 className="font-mazzard text-[15px] sm:text-[16px] text-[#0A1A32]">
              Portfolio Valuation Velocity — Last 7 Days
            </h3>
          </div>

          <div className="flex-1 bg-white rounded-[20px] sm:rounded-[22px] p-4 sm:p-6 shadow-xs border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-mazzard text-[15px] sm:text-[17px] text-[#0A1A32]">
                Net Asset Value (NAV)
              </h4>
              <button
                type="button"
                className="text-[11px] sm:text-[11.5px] text-slate-500 border border-slate-200/80 rounded-[8px] px-2.5 py-1 flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
              >
                <span>Weekly</span>
                <Icon icon="lucide:chevron-down" className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Interactive SVG Chart */}
            <div className="w-full pt-2">
              <div className="relative h-44 sm:h-48 w-full flex">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between font-thicccboi text-[11px] sm:text-[12px] text-slate-500 pr-3.5 select-none text-right min-w-[38px]">
                  <span className="leading-none -mt-1">$500k</span>
                  <span className="leading-none">$475k</span>
                  <span className="leading-none">$450k</span>
                  <span className="leading-none">$425k</span>
                  <span className="leading-none -mb-1">$400k</span>
                </div>

                {/* Chart Area with Grid and Paths */}
                <div className="relative flex-1 h-full">
                  {/* Grid: Horizontal lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full border-b border-[#F1F5F9]" />
                    <div className="w-full border-b border-[#F1F5F9]" />
                    <div className="w-full border-b border-[#F1F5F9]" />
                    <div className="w-full border-b border-[#F1F5F9]" />
                    <div className="w-full border-b border-[#F1F5F9]" />
                  </div>

                  {/* Grid: Vertical lines aligned with days */}
                  <div className="absolute inset-0 flex justify-between pointer-events-none">
                    <div className="h-full border-r border-[#F1F5F9]" />
                    <div className="h-full border-r border-[#F1F5F9]" />
                    <div className="h-full border-r border-[#F1F5F9]" />
                    <div className="h-full border-r border-[#F1F5F9]" />
                    <div className="h-full border-r border-[#F1F5F9]" />
                    <div className="h-full border-r border-[#F1F5F9]" />
                    <div className="h-full border-r border-[#F1F5F9]" />
                  </div>

                  {/* SVG Chart Line & Fill */}
                  <svg
                    viewBox="0 0 600 200"
                    preserveAspectRatio="none"
                    className="w-full h-full overflow-visible relative z-10"
                  >
                    <defs>
                      <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#059669" stopOpacity="0.88" />
                        <stop offset="35%" stopColor="#10b981" stopOpacity="0.55" />
                        <stop offset="70%" stopColor="#a7f3d0" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Area Fill */}
                    <path
                      d="M 0,140 L 100,120 L 200,90 L 290,60 L 370,80 L 455,40 L 530,25 L 600,15 L 600,200 L 0,200 Z"
                      fill="url(#portfolioGradient)"
                    />

                    {/* Bottom dashed baseline start */}
                    <line
                      x1="0"
                      y1="200"
                      x2="100"
                      y2="200"
                      stroke="#CBD5E1"
                      strokeWidth="1.5"
                      strokeDasharray="2.5 2.5"
                    />

                    {/* Left vertical dashed drop at Monday start */}
                    <line
                      x1="0"
                      y1="200"
                      x2="0"
                      y2="140"
                      stroke="#059669"
                      strokeWidth="1.8"
                      strokeDasharray="3 2.5"
                    />

                    {/* Main Chart Line */}
                    <path
                      d="M 0,140 L 100,120 L 200,90 L 290,60 L 370,80 L 455,40 L 530,25 L 600,15"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.2"
                    />
                  </svg>
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between pl-9 sm:pl-11 pr-0 mt-3 font-thicccboi text-[9px] sm:text-[11.5px] text-slate-500 select-none">
                <span className="text-center">
                  <span className="sm:hidden">Mon</span>
                  <span className="hidden sm:inline">Monday</span>
                </span>
                <span className="text-center">
                  <span className="sm:hidden">Tue</span>
                  <span className="hidden sm:inline">Tuesday</span>
                </span>
                <span className="text-center">
                  <span className="sm:hidden">Wed</span>
                  <span className="hidden sm:inline">Wednesday</span>
                </span>
                <span className="text-center">
                  <span className="sm:hidden">Thu</span>
                  <span className="hidden sm:inline">Thursday</span>
                </span>
                <span className="text-center">
                  <span className="sm:hidden">Fri</span>
                  <span className="hidden sm:inline">Friday</span>
                </span>
                <span className="text-center">
                  <span className="sm:hidden">Sat</span>
                  <span className="hidden sm:inline">Saturday</span>
                </span>
                <span className="text-center">
                  <span className="sm:hidden">Sun</span>
                  <span className="hidden sm:inline">Sunday</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}