"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface RiskMetricCard {
  title: string;
  value: string;
  change: string;
  status: "Optimal" | "Caution" | "Critical";
  description: string;
}

const riskTelemetryMetrics: RiskMetricCard[] = [
  {
    title: "Value at Risk (95% 1D)",
    value: "$14,487.30",
    change: "-0.8% vs 30D avg",
    status: "Optimal",
    description: "Maximum expected portfolio loss over a 1-day horizon at a 95% confidence interval.",
  },
  {
    title: "Current Drawdown",
    value: "3.2%",
    change: "Max Cap: 10.0%",
    status: "Optimal",
    description: "Distance from peak Net Asset Value (NAV). Well within institutional risk limits.",
  },
  {
    title: "Sharpe Ratio (Annualized)",
    value: "2.41",
    change: "+0.18 this month",
    status: "Optimal",
    description: "Excess return per unit of deviation risk relative to the risk-free benchmark.",
  },
  {
    title: "Portfolio Beta",
    value: "0.84",
    change: "Defensive posture",
    description: "Sensitivity relative to the broader benchmark index (S&P 500 / Crypto Aggregate).",
    status: "Optimal",
  },
];

export default function RiskCalculatorPage() {
  const [portfolioValue, setPortfolioValue] = useState("482910");
  const [confidenceLevel, setConfidenceLevel] = useState("95");
  const [timeHorizon, setTimeHorizon] = useState("1");
  const [calculatedVaR, setCalculatedVaR] = useState<number | null>(null);

  const handleCalculateVaR = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(portfolioValue) || 0;
    const conf = parseFloat(confidenceLevel) || 95;
    const days = parseFloat(timeHorizon) || 1;

    // Parametric VaR estimation simulation (assuming 15% annualized volatility)
    const dailyVol = 0.15 / Math.sqrt(252);
    const zScore = conf === 99 ? 2.33 : conf === 95 ? 1.645 : 1.28;
    const varResult = val * dailyVol * zScore * Math.sqrt(days);

    setCalculatedVaR(varResult);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Real-Time Governance & Volatility Engine
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Risk Telemetry & Analytics
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12.5px] font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Risk Status: Fully Compliant</span>
        </div>
      </div>

      {/* 4 Risk Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {riskTelemetryMetrics.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-slate-500 font-medium">{item.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                  {item.status}
                </span>
              </div>
              <div className="font-thicccboi text-[30px] sm:text-[36px] text-[#0A1A32] mt-2">
                {item.value}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <p className="text-[11px] text-slate-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive VaR Calculator Tool */}
      <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-emerald-100 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Parametric Value at Risk (VaR) Engine</h3>
            <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
              Calculate downside exposure threshold based on current Net Asset Value, confidence intervals, and standard asset volatility assumptions.
            </p>
          </div>

          <form onSubmit={handleCalculateVaR} className="space-y-4 pt-2">
            <div>
              <label className="block text-[12px] font-medium text-slate-700 mb-1">
                Portfolio Valuation ($ USD)
              </label>
              <input
                type="number"
                value={portfolioValue}
                onChange={(e) => setPortfolioValue(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">
                  Confidence Interval
                </label>
                <select
                  value={confidenceLevel}
                  onChange={(e) => setConfidenceLevel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 bg-white focus:outline-none focus:border-[#059669]"
                >
                  <option value="90">90% Confidence</option>
                  <option value="95">95% Confidence</option>
                  <option value="99">99% Confidence</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">
                  Time Horizon (Days)
                </label>
                <select
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 bg-white focus:outline-none focus:border-[#059669]"
                >
                  <option value="1">1 Day</option>
                  <option value="5">5 Days (Weekly)</option>
                  <option value="30">30 Days (Monthly)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-[12px] bg-[#059669] hover:bg-[#047857] text-white text-[13.5px] font-medium transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
            >
              Compute VaR Telemetry
            </button>
          </form>
        </div>

        <div className="lg:col-span-6 bg-slate-50 rounded-[20px] p-6 sm:p-8 flex flex-col justify-center items-center text-center border border-slate-100">
          <p className="text-[12.5px] text-slate-500 font-medium">Estimated Downside Exposure (VaR)</p>
          <div className="font-thicccboi text-[38px] sm:text-[48px] text-[#059669] my-3">
            {calculatedVaR !== null
              ? `$${calculatedVaR.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : "$14,487.30"}
          </div>
          <p className="text-[12px] text-slate-500 max-w-xs leading-normal">
            There is a <span className="font-semibold text-slate-800">{100 - parseInt(confidenceLevel)}% probability</span> that portfolio losses will exceed this amount over the selected time horizon under normal market volatility.
          </p>
        </div>
      </div>
    </div>
  );
}