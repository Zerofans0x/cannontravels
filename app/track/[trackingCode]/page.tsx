"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { io, Socket } from "socket.io-client";
import { api } from "@/lib/api";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "https://cannontravels-backend.onrender.com";


export default function PublicFlightTrackingPage() {
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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <span className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
        <p className="text-sm font-bold text-slate-400 font-mono tracking-wider">Acquiring Public Airspace Telemetry...</p>
      </div>
    );
  }

  if (errorMessage || !flightData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl text-white">
          <div className="w-12 h-12 bg-rose-950 text-rose-500 rounded-2xl flex items-center justify-center mx-auto border border-rose-900/50">
            <Icon icon="lucide:alert-circle" className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black">Telemetry Unavailable</h2>
          <p className="text-xs text-slate-400">{errorMessage || "Flight radar signal lost or invalid code."}</p>
          <Link href="/" className="inline-block px-6 py-3 bg-[#DC2626] text-white font-bold text-xs rounded-full">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
      {/* Top Navigation / Status */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">✈</span>
          <span className="text-lg font-black tracking-tight">
            <span className="text-[#DC2626]">Cannon</span>Travels
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-2 border ${
            isConnected ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/50" : "bg-amber-950/60 text-amber-400 border-amber-800/50"
          }`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
            {isConnected ? "Live Stream Connected" : "Connecting..."}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-6 py-6 flex-1">
        
        {/* Left Telemetry Panel */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
            <div>
              <span className="text-[#DC2626] font-mono text-[10px] uppercase tracking-wider font-bold bg-red-950/60 px-2.5 py-1 rounded-full border border-red-900/40">
                Public Radar Feed
              </span>
              <h1 className="text-xl font-black tracking-tight mt-3">
                {flightData.origin} → {flightData.destination}
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">Flight: {flightData.flightNumber}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block font-mono uppercase">Ground Speed</span>
                <span className="text-3xl font-black text-white">{telemetry.speed} <span className="text-xs font-normal text-slate-400">knots</span></span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-mono uppercase">Heading Vector</span>
                <span className="text-3xl font-black text-white">{telemetry.heading}°</span>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-mono uppercase">GPS Coordinates</span>
                <span className="text-xs font-mono font-bold text-emerald-400 block mt-1">
                  {telemetry.lat.toFixed(4)}° N, {telemetry.lng.toFixed(4)}° E
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Flight Manifest</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Passenger</span>
                <span className="font-bold text-white">{flightData.passenger?.firstName} {flightData.passenger?.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">PNR Reference</span>
                <span className="font-mono font-bold text-white">{flightData.bookingReference}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Globe-Style Tactical Radar Map View */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative min-h-[480px] lg:min-h-[550px] flex items-center justify-center p-6">
          
          {/* Globe Atmosphere Radial Gradient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>

          {/* Rotating Globe Grid Rings & Crosshairs */}
          <div className="absolute w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full border border-slate-800/80 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-dashed border-red-600/20 animate-[spin_60s_linear_infinite]"></div>
            <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-slate-700/50"></div>
            <div className="absolute w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] rounded-full border border-slate-700/40"></div>
            
            <div className="absolute w-full h-px bg-slate-800/60"></div>
            <div className="absolute h-full w-px bg-slate-800/60"></div>
          </div>

          {/* Radar Sweep Beam Effect */}
          <div className="absolute w-[460px] h-[460px] rounded-full pointer-events-none overflow-hidden opacity-30 animate-[spin_8s_linear_infinite]">
            <div className="w-1/2 h-1/2 bg-gradient-to-tr from-red-600/40 to-transparent origin-bottom-right"></div>
          </div>

          {/* Trajectory Trail History Dots */}
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

            <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 px-4 py-2.5 rounded-2xl shadow-xl">
              <p className="text-xs font-black text-white">{flightData.flightNumber} ({flightData.origin} → {flightData.destination})</p>
              <p className="text-[10px] font-mono text-emerald-400 mt-0.5">ALT: 36,000 FT • {telemetry.speed} KTS • LIVE GLOBE RADAR</p>
            </div>
          </div>

          {/* Radar HUD Stamp */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>PUBLIC RADAR STREAM: SECURE TOKEN [{trackingCode}]</span>
          </div>
        </div>

      </main>

      <footer className="max-w-7xl mx-auto w-full text-center py-6 text-xs text-slate-500 border-t border-slate-800">
        CannonTravels Live Airspace Telemetry & Security Engine.
      </footer>
    </div>
  );
}