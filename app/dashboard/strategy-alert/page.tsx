"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface StrategyAlert {
  id: string;
  title: string;
  triggerCondition: string;
  asset: string;
  severity: "Critical" | "Warning" | "Information";
  status: "Active" | "Triggered" | "Muted";
  createdAt: string;
}

const mockAlerts: StrategyAlert[] = [
  {
    id: "ALT-01",
    title: "Gamma Exposure Threshold Reached",
    triggerCondition: "Dealer gamma flipping negative below $67,500 BTC",
    asset: "BTC/USD",
    severity: "Critical",
    status: "Active",
    createdAt: "31 Aug 2026, 14:00 WAT",
  },
  {
    id: "ALT-02",
    title: "Forex Liquidity Spread Widening",
    triggerCondition: "EUR/USD spread exceeds 2.4 pips during NY open",
    asset: "EUR/USD",
    severity: "Warning",
    status: "Active",
    createdAt: "30 Aug 2026, 08:30 WAT",
  },
  {
    id: "ALT-03",
    title: "Portfolio Drawdown Cap Warning",
    triggerCondition: "Net drawdown approaches 5.0% threshold limit",
    asset: "ALL ASSETS",
    severity: "Critical",
    status: "Active",
    createdAt: "28 Aug 2026, 12:15 WAT",
  },
  {
    id: "ALT-04",
    title: "S&P 500 Put Overlay Rebalance",
    triggerCondition: "Delta exposure falls below -0.20 delta",
    asset: "SPX",
    severity: "Information",
    status: "Muted",
    createdAt: "25 Aug 2026, 16:45 WAT",
  },
];

export default function StrategyAlertsPage() {
  const [alerts, setAlerts] = useState<StrategyAlert[]>(mockAlerts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [assetInput, setAssetInput] = useState("");
  const [conditionInput, setConditionInput] = useState("");
  const [severityInput, setSeverityInput] = useState<"Critical" | "Warning" | "Information">("Warning");

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput || !assetInput || !conditionInput) return;

    const newAlert: StrategyAlert = {
      id: `ALT-${Math.floor(10 + Math.random() * 90)}`,
      title: titleInput,
      triggerCondition: conditionInput,
      asset: assetInput.toUpperCase(),
      severity: severityInput,
      status: "Active",
      createdAt: "Just now",
    };

    setAlerts([newAlert, ...alerts]);
    setTitleInput("");
    setAssetInput("");
    setConditionInput("");
    setIsModalOpen(false);
  };

  const toggleAlertStatus = (id: string) => {
    setAlerts(
      alerts.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Active" ? "Muted" : "Active" }
          : item
      )
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Real-Time Risk Triggers & Algorithmic Monitors
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Strategy Alerts
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
        >
          <Icon icon="lucide:plus" className="w-4 h-4" />
          <span>Create Custom Alert</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Active Monitors</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-[#059669] mt-2">
            {alerts.filter((a) => a.status === "Active").length}
          </div>
          <p className="text-[11.5px] text-emerald-600 font-medium mt-1">Telemetry triggers online</p>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Critical Risk Triggers</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-amber-600 mt-2">
            {alerts.filter((a) => a.severity === "Critical").length}
          </div>
          <p className="text-[11.5px] text-slate-400 mt-1">Monitored 24/7 by risk engine</p>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Notification Channel</p>
          <div className="font-thicccboi text-[26px] sm:text-[32px] text-slate-900 mt-2">
            Terminal & Webhook
          </div>
          <p className="text-[11.5px] text-emerald-600 font-medium mt-1">Instant telemetry dispatch</p>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-[22px] border border-emerald-100 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-mazzard text-[16px] text-[#0A1A32]">Configured Strategy Alerts</h3>
          <span className="text-[12px] text-slate-400 font-mono">Showing {alerts.length} rules</span>
        </div>

        <div className="divide-y divide-slate-100">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                    alert.severity === "Critical"
                      ? "bg-rose-50 text-rose-700"
                      : alert.severity === "Warning"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {alert.asset.split("/")[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-medium text-slate-900 truncate">
                      {alert.title}
                    </h4>
                    <span className="text-[10.5px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-500 mt-0.5 truncate">
                    Condition: <span className="text-slate-700 font-medium">{alert.triggerCondition}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                <span className="text-[12px] text-slate-400 font-mono">{alert.createdAt}</span>

                <button
                  type="button"
                  onClick={() => toggleAlertStatus(alert.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium cursor-pointer transition-colors ${
                    alert.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {alert.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Alert Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Configure Strategy Alert</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <Icon icon="lucide:x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">Alert Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liquidation Risk Warning"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-1">Asset Ticker</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BTC/USD"
                    value={assetInput}
                    onChange={(e) => setAssetInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-1">Severity</label>
                  <select
                    value={severityInput}
                    onChange={(e) => setSeverityInput(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 bg-white focus:outline-none focus:border-[#059669]"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Warning">Warning</option>
                    <option value="Information">Information</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">Trigger Condition</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Price drops below support level..."
                  value={conditionInput}
                  onChange={(e) => setConditionInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full text-slate-600 hover:bg-slate-100 text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
                >
                  Save Alert Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}