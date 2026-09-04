// components/flights/TrackingBadge.tsx
"use client";

import { Icon } from "@iconify/react";

interface TrackingBadgeProps {
  flightNumber?: string;
  status?: "On Time" | "Delayed" | "En Route" | "Landed";
  route?: string;
}

export default function TrackingBadge({
  flightNumber = "FL-892",
  status = "En Route",
  route = "JFK → LHR",
}: TrackingBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case "On Time":
      case "Landed":
        return "bg-emerald-500 text-white border-emerald-600";
      case "Delayed":
        return "bg-amber-500 text-white border-amber-600";
      case "En Route":
      default:
        return "bg-[#DC2626] text-white border-red-700";
    }
  };

  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-slate-200/80 text-[12.5px] font-bold text-slate-800 transition-all hover:scale-[1.02]">
      {/* Live Pulsing Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DC2626]"></span>
      </span>

      {/* Flight Info */}
      <div className="flex items-center gap-1.5">
        <span className="text-slate-900">{flightNumber}</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-600 font-medium">{route}</span>
      </div>

      {/* Status Badge */}
      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold border ${getStatusColor()}`}>
        {status}
      </span>
    </div>
  );
}