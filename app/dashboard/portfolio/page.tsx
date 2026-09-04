"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface PortfolioAsset {
  id: string;
  name: string;
  ticker: string;
  category: "Digital Assets" | "Forex" | "Equities" | "Fixed Income";
  holdings: string;
  avgPrice: string;
  currentPrice: string;
  marketValue: number;
  allocationPct: number;
  unrealizedPnL: string;
  isPositive: boolean;
}

const portfolioAssets: PortfolioAsset[] = [
  {
    id: "1",
    name: "Bitcoin Reserve Pool",
    ticker: "BTC",
    category: "Digital Assets",
    holdings: "2.45 BTC",
    avgPrice: "$62,400.00",
    currentPrice: "$68,980.00",
    marketValue: 169001.00,
    allocationPct: 35.0,
    unrealizedPnL: "+$16,114.50 (+10.5%)",
    isPositive: true,
  },
  {
    id: "2",
    name: "EUR/USD Liquidity Desk",
    ticker: "EURUSD",
    category: "Forex",
    holdings: "120,000 Units",
    avgPrice: "$1.0740",
    currentPrice: "$1.0890",
    marketValue: 130680.00,
    allocationPct: 27.0,
    unrealizedPnL: "+$1,800.00 (+1.4%)",
    isPositive: true,
  },
  {
    id: "3",
    name: "S&P 500 Index Hedged",
    ticker: "SPX",
    category: "Equities",
    holdings: "185 Shares",
    avgPrice: "$5,320.00",
    currentPrice: "$5,480.00",
    marketValue: 101380.00,
    allocationPct: 21.0,
    unrealizedPnL: "+$2,960.00 (+3.0%)",
    isPositive: true,
  },
  {
    id: "4",
    name: "US 10-Year Treasury Yield",
    ticker: "UST10Y",
    category: "Fixed Income",
    holdings: "80 Units",
    avgPrice: "$1,010.50",
    currentPrice: "$1,005.20",
    marketValue: 80416.00,
    allocationPct: 17.0,
    unrealizedPnL: "-$424.00 (-0.5%)",
    isPositive: false,
  },
];

export default function PortfolioPage() {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  const categories = ["All", "Digital Assets", "Forex", "Equities", "Fixed Income"];

  const filteredAssets = portfolioAssets.filter(
    (asset) => selectedTab === "All" || asset.category === selectedTab
  );

  const totalNAV = portfolioAssets.reduce((sum, item) => sum + item.marketValue, 0);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully simulated allocation of $${depositAmount} into liquidity reserves.`);
    setDepositAmount("");
    setIsDepositModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Prime Brokerage Allocation Engine
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Portfolio Management
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDepositModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            <Icon icon="lucide:plus" className="w-4 h-4" />
            <span>Deploy Capital</span>
          </button>
        </div>
      </div>

      {/* Portfolio Valuation Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Total Net Asset Value (NAV)</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-[#059669] mt-2">
            ${totalNAV.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <p className="text-[11.5px] text-emerald-600 font-medium mt-1">Real-time valuation synced</p>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Unrealized PnL (YTD)</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-slate-900 mt-2">
            +$20,734.50
          </div>
          <p className="text-[11.5px] text-emerald-600 font-medium mt-1">+4.5% overall return spread</p>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Risk Exposure Cap</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-slate-900 mt-2">
            78.4%
          </div>
          <p className="text-[11.5px] text-slate-400 mt-1">21.6% reserve liquidity unallocated</p>
        </div>
      </div>

      {/* Category Tabs & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-[20px] border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedTab(cat)}
              className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedTab === cat
                  ? "bg-[#059669] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-[12px] text-slate-400 px-3">
          Showing {filteredAssets.length} active asset classes
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-[22px] border border-emerald-100 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-mazzard text-[16px] text-[#0A1A32]">Allocated Holdings</h3>
          <span className="text-[12px] text-slate-400 font-mono">Synced w/ Terminal Telemetry</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-[14px] bg-emerald-50 flex items-center justify-center flex-shrink-0 text-[#059669] font-bold text-xs shadow-xs">
                  {asset.ticker}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-medium text-slate-900 truncate">
                      {asset.name}
                    </h4>
                    <span className="text-[10.5px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                      {asset.category}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Holdings: <span className="text-slate-700 font-medium">{asset.holdings}</span> · Avg Cost: {asset.avgPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <p className="text-[14px] font-thicccboi text-slate-900">
                    ${asset.marketValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`text-[11.5px] font-semibold mt-0.5 ${asset.isPositive ? "text-emerald-600" : "text-amber-600"}`}>
                    {asset.unrealizedPnL}
                  </p>
                </div>

                <div className="w-24 text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11.5px] font-medium font-mono">
                    {asset.allocationPct}% Allocation
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deploy Capital Modal */}
      {isDepositModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Deploy Capital into Pools</h3>
              <button
                type="button"
                onClick={() => setIsDepositModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <Icon icon="lucide:x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-[12.5px] font-medium text-slate-700 mb-1.5">
                  Allocation Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-[12px] border border-slate-200 text-[14px] text-slate-900 focus:outline-none focus:border-[#059669] transition-colors"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-[12px] text-[12px] text-emerald-800 leading-relaxed">
                Capital will be routed automatically through institutional risk parameters and distributed across active quantitative pools.
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDepositModalOpen(false)}
                  className="px-4 py-2 rounded-full text-slate-600 hover:bg-slate-100 text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
                >
                  Confirm Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}