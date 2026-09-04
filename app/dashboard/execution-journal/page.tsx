"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

interface ExecutionLog {
  id: string;
  asset: string;
  action: "BUY" | "SELL" | "REBALANCE" | "HEDGE";
  amount: string;
  executionPrice: string;
  timestamp: string;
  status: "Executed" | "Pending" | "Cancelled";
  notes: string;
}

const mockExecutionLogs: ExecutionLog[] = [
  {
    id: "LOG-9821",
    asset: "BTC/USD",
    action: "BUY",
    amount: "0.45 BTC",
    executionPrice: "$68,450.00",
    timestamp: "31 Aug 2026, 14:22 WAT",
    status: "Executed",
    notes: "Delta neutral adjustment via automated order book rebalancing.",
  },
  {
    id: "LOG-9820",
    asset: "EUR/USD",
    action: "BUY",
    amount: "40,000 Units",
    executionPrice: "$1.0875",
    timestamp: "30 Aug 2026, 09:15 WAT",
    status: "Executed",
    notes: "Liquidity desk spread accumulation following macro interest rate announcement.",
  },
  {
    id: "LOG-9819",
    asset: "S&P 500",
    action: "HEDGE",
    amount: "50 Shares",
    executionPrice: "$5,465.00",
    timestamp: "29 Aug 2026, 16:00 WAT",
    status: "Executed",
    notes: "Downside put option overlay activated to cap equity drawdown risk.",
  },
  {
    id: "LOG-9818",
    asset: "UST-10Y",
    action: "REBALANCE",
    amount: "15 Units",
    executionPrice: "$1,004.80",
    timestamp: "28 Aug 2026, 11:40 WAT",
    status: "Executed",
    notes: "Yield curve adjustment for fixed income risk target allocation.",
  },
];

export default function ExecutionJournalPage() {
  const [logs, setLogs] = useState<ExecutionLog[]>(mockExecutionLogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetInput, setAssetInput] = useState("");
  const [actionInput, setActionInput] = useState<"BUY" | "SELL" | "REBALANCE" | "HEDGE">("BUY");
  const [amountInput, setAmountInput] = useState("");
  const [notesInput, setNotesInput] = useState("");

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetInput || !amountInput) return;

    const newLog: ExecutionLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      asset: assetInput.toUpperCase(),
      action: actionInput,
      amount: amountInput,
      executionPrice: "$--.--",
      timestamp: "Just now",
      status: "Executed",
      notes: notesInput || "Manual strategy execution entry.",
    };

    setLogs([newLog, ...logs]);
    setAssetInput("");
    setAmountInput("");
    setNotesInput("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-normal">
            Automated & Manual Trade Logging
          </p>
          <h2 className="font-mazzard text-[26px] sm:text-[32px] text-[#0A1A32] tracking-tight mt-0.5">
            Execution Journal
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-[13px] font-medium transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
        >
          <Icon icon="lucide:plus" className="w-4 h-4" />
          <span>Log Manual Execution</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Total Executions (30D)</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-[#059669] mt-2">
            42
          </div>
          <p className="text-[11.5px] text-emerald-600 font-medium mt-1">100% fill rate across desks</p>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Automated vs Manual</p>
          <div className="font-thicccboi text-[32px] sm:text-[40px] text-slate-900 mt-2">
            88% / 12%
          </div>
          <p className="text-[11.5px] text-slate-400 mt-1">Algorithmic routing prioritized</p>
        </div>

        <div className="bg-white rounded-[22px] p-5 sm:p-6 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <p className="text-[12.5px] text-slate-500">Slippage Average</p>
          <div className="font-thicccboi text-[28px] sm:text-[34px] text-slate-900 mt-2">
            0.012%
          </div>
          <p className="text-[11.5px] text-emerald-600 font-medium mt-1">Optimal execution efficiency</p>
        </div>
      </div>

      {/* Execution Logs List */}
      <div className="bg-white rounded-[22px] border border-emerald-100 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-mazzard text-[16px] text-[#0A1A32]">Trade Execution History</h3>
          <span className="text-[12px] text-slate-400 font-mono">Real-time audit log</span>
        </div>

        <div className="divide-y divide-slate-100">
          {logs.map((log) => (
            <div
              key={log.id}
              className="px-6 py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-xs ${
                    log.action === "BUY"
                      ? "bg-emerald-50 text-emerald-700"
                      : log.action === "SELL"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {log.action}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-medium text-slate-900 truncate">
                      {log.asset} — {log.amount}
                    </h4>
                    <span className="text-[10.5px] text-slate-400 font-mono">
                      {log.id}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-500 mt-0.5 truncate">
                    {log.notes}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <p className="text-[14px] font-thicccboi text-slate-900">
                    {log.executionPrice}
                  </p>
                  <p className="text-[11.5px] text-slate-400 mt-0.5">
                    {log.timestamp}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mazzard text-[18px] text-[#0A1A32]">Log Execution Entry</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <Icon icon="lucide:x" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-1">Asset Ticker</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SOL/USD"
                    value={assetInput}
                    onChange={(e) => setAssetInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-700 mb-1">Action Type</label>
                  <select
                    value={actionInput}
                    onChange={(e) => setActionInput(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 bg-white focus:outline-none focus:border-[#059669]"
                  >
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                    <option value="REBALANCE">REBALANCE</option>
                    <option value="HEDGE">HEDGE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">Position Size / Amount</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 25.5 SOL"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-[12px] border border-slate-200 text-[13.5px] text-slate-900 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">Execution Notes</label>
                <textarea
                  rows={3}
                  placeholder="Rationale or market conditions..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
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
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}