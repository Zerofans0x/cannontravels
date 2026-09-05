

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { io, Socket } from "socket.io-client";
import { api } from "@/lib/api";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "https://cannontravels-backend.onrender.com";

export default function LiveFlightTrackingPage() {
  const params = useParams();
  const trackingCode = params.trackingCode as string;

  const [flightData, setFlightData] = useState<any>(null);
  const [telemetry, setTelemetry] = useState({ lat: 6.5244, lng: 3.3792, speed: 480, heading: 90 });
  const [pathHistory, setPathHistory] = useState<{ lat: number; lng: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let socket: Socket;

    const fetchInitialData = async () => {
      try {
        const response = await api.get(`/flights/telemetry/${trackingCode}`);
        setFlightData(response.data.data);
        if (response.data.data.liveLocation) {
          const initialLoc = response.data.data.liveLocation;
          setTelemetry(initialLoc);
          setPathHistory([{ lat: initialLoc.lat, lng: initialLoc.lng }]);
        }
      } catch (err: any) {
        setErrorMessage(err.response?.data?.message || "Could not establish flight radar telemetry.");
      } finally {
        setIsLoading(false);
      }
    };

    if (trackingCode) {
      fetchInitialData();

      socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        withCredentials: true
      });

      socket.on("connect", () => {
        setIsConnected(true);
        socket.emit("join_tracking_room", { trackingCode });
      });

      socket.on("passenger_location", (data) => {
        const newPoint = { lat: data.lat, lng: data.lng };
        setTelemetry({
          lat: data.lat,
          lng: data.lng,
          speed: data.speed || 480,
          heading: data.heading || 90
        });
        // Keep a rolling trail of coordinates to show movement path
        setPathHistory(prev => [...prev.slice(-15), newPoint]);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [trackingCode]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <span className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
        <p className="text-sm font-bold text-slate-500 font-mono tracking-wider">Acquiring Airspace Telemetry...</p>
      </div>
    );
  }

  if (errorMessage || !flightData) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
          <Icon icon="lucide:alert-circle" className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Telemetry Unavailable</h2>
        <p className="text-xs text-slate-600">{errorMessage || "Flight radar signal lost."}</p>
        <Link href="/dashboard" className="inline-block px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
          Return to Terminal
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-[#DC2626] bg-red-50 px-3 py-1 rounded-full border border-red-100 uppercase">
              Live Global Radar
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
              isConnected ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              {isConnected ? "Live Stream Connected" : "Connecting..."}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
            {flightData.origin} → {flightData.destination} ({flightData.flightNumber})
          </h1>
        </div>

        <Link href="/dashboard" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors">
          ← Back to Terminal
        </Link>
      </div>

      {/* Main Grid: Telemetry Stats & Live Globe Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Live Telemetry Metrics */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs text-slate-400 font-mono uppercase">Tracking Token</span>
              <span className="text-xs font-mono font-bold text-[#DC2626]">{trackingCode}</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 block font-mono uppercase">Ground Speed</span>
                <span className="text-3xl font-black text-white">{telemetry.speed} <span className="text-sm font-normal text-slate-400">knots</span></span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-mono uppercase">Heading Vector</span>
                <span className="text-3xl font-black text-white">{telemetry.heading}° <span className="text-sm font-normal text-slate-400">Cardinal</span></span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-mono uppercase">GPS Coordinates</span>
                <span className="text-sm font-mono font-bold text-emerald-400 block mt-1">
                  {telemetry.lat.toFixed(4)}° N, {telemetry.lng.toFixed(4)}° E
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Flight Manifest</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Passenger</span>
                <span className="font-bold text-slate-900">{flightData.passenger?.firstName} {flightData.passenger?.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PNR Reference</span>
                <span className="font-mono font-bold text-slate-900">{flightData.bookingReference}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Globe-Style Tactical Radar Map View */}
        <div className="lg:col-span-3 bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-xl relative min-h-[480px] lg:min-h-[580px] flex items-center justify-center p-6">
          
          {/* Globe Atmosphere Radial Gradient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>

          {/* Rotating Globe Grid Lines & Radar Sweep Ring */}
          <div className="absolute w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] rounded-full border border-slate-800/80 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-dashed border-red-600/20 animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border border-slate-700/50"></div>
            <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full border border-slate-700/40"></div>
            
            {/* Crosshairs */}
            <div className="absolute w-full h-px bg-slate-800/60"></div>
            <div className="absolute h-full w-px bg-slate-800/60"></div>
          </div>

          {/* Radar Sweep Beam Effect */}
          <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none overflow-hidden opacity-30 animate-[spin_8s_linear_infinite]">
            <div className="w-1/2 h-1/2 bg-gradient-to-tr from-red-600/40 to-transparent origin-bottom-right"></div>
          </div>

          {/* Trajectory / Flight Path Indicator Dots */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {pathHistory.map((pt, idx) => (
              <div 
                key={idx}
                className="absolute w-2 h-2 rounded-full bg-red-500/40 transition-all duration-500"
                style={{
                  transform: `translate(${(pt.lng - telemetry.lng) * 35}px, ${(telemetry.lat - pt.lat) * 35}px)`
                }}
              />
            ))}
          </div>

          {/* Airplane Marker Positioned via Live Coordinates */}
          <div className="relative z-10 flex flex-col items-center space-y-3 text-center">
            <div 
              className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-[#DC2626] flex items-center justify-center shadow-2xl shadow-red-600/60 transition-all duration-700 animate-pulse"
              style={{ transform: `rotate(${telemetry.heading}deg)` }}
            >
              <Icon icon="lucide:plane" className="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-4 py-2.5 rounded-2xl shadow-2xl">
              <p className="text-xs font-black text-white">{flightData.flightNumber} ({flightData.origin} → {flightData.destination})</p>
              <p className="text-[10px] font-mono text-emerald-400 mt-0.5">ALT: 36,000 FT • {telemetry.speed} KTS • LIVE GLOBE RADAR</p>
            </div>
          </div>

          {/* Tactical HUD Header Stamp */}
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>TACTICAL GLOBE FEED // SECURE PNR</span>
          </div>
        </div>

      </div>
    </div>
  );
}