// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Icon } from "@iconify/react";
// import Navbar from "@/components/shared/Navbar";

// export default function Hero() {
//   const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "packages">("flights");
//   const [origin, setOrigin] = useState("CDG");
//   const [destination, setDestination] = useState("JFK");
//   const [isSearching, setIsSearching] = useState(false);
//   const [searchSuccess, setSearchSuccess] = useState(false);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSearching(true);
//     setSearchSuccess(false);
//     setTimeout(() => {
//       setIsSearching(false);
//       setSearchSuccess(true);
//     }, 1200);
//   };

//   return (
//     <section className="p-3 sm:p-6 lg:p-8 bg-[#F8FAFC]">
//       <div className="relative isolate w-full bg-white rounded-[24px] sm:rounded-2xl overflow-hidden min-h-[860px] lg:h-[calc(100vh-64px)] flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        
//         {/* Soft Realistic Gradients (Red/Rose & Clean White) */}
//         <div className="absolute inset-0 -z-10 pointer-events-none rounded-2xl overflow-hidden">
//           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
//           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-50 rounded-full blur-3xl opacity-60 -translate-x-1/4 translate-y-1/4" />
//         </div>

//         <Navbar />

//         {/* Hero Main Content */}
//         <div className="w-full px-4 sm:px-10 lg:px-14 pt-2 pb-10 lg:pt-4 lg:pb-12 flex-1 flex flex-col justify-end lg:justify-center">
          
//           <div className="grid grid-cols-1 lg:grid-cols-13 items-center lg:items-start px-2 sm:px-8 mt-12 gap-y-12 lg:gap-y-0">
            
//             {/* Left Content Column (Marketing Copy) */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
//               className="lg:col-span-5 z-10 pt-1"
//             >
//               <div className="relative">
//                 <span className="inline-block py-1.5 px-3 rounded-full bg-red-50 text-red-600 font-semibold text-[11px] tracking-widest uppercase mb-5 border border-red-100">
//                   World-Class Travel Engine
//                 </span>
                
//                 <h1 className="font-mazzard text-[38px] sm:text-5xl lg:text-[54px] text-[#0f172a] leading-[1.08] tracking-tight font-black">
//                   Book Global <br />
//                   Flights With <br />
//                   <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent inline-block">
//                     Absolute Precision
//                   </span>
//                 </h1>
//               </div>

//               <p className="mt-4 sm:mt-5 text-slate-600 text-[13.5px] sm:text-[15px] max-w-md leading-relaxed font-normal">
//                 One secure platform to book European and global flights, delegate third-party payments, and track live passenger itineraries.
//               </p>

//               {/* Action Buttons */}
//               <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4 sm:gap-5">
//                 <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
//                   <Link
//                     href="/flights"
//                     className="px-7 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium text-[14px] sm:text-[15px] rounded-full shadow-md shadow-red-600/20 transition-all inline-flex items-center justify-center cursor-pointer whitespace-nowrap"
//                   >
//                     Start Booking
//                   </Link>
//                 </motion.div>

//                 <button
//                   type="button"
//                   className="inline-flex items-center gap-3 font-medium group cursor-pointer text-slate-900 hover:text-[#DC2626] transition-colors duration-200"
//                 >
//                   <span className="w-10 h-10 sm:w-[46px] sm:h-[46px] rounded-full border-[2.5px] sm:border-[3px] border-slate-900 group-hover:border-[#DC2626] group-hover:scale-105 flex items-center justify-center transition-all duration-200 flex-shrink-0">
//                     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 group-hover:text-[#DC2626] translate-x-[2px] transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                       <polygon points="7 4 19 12 7 20 7 4"></polygon>
//                     </svg>
//                   </span>
//                   <span className="text-[14px] sm:text-[16px] text-slate-900 group-hover:text-[#DC2626] transition-colors duration-200 whitespace-nowrap">
//                     How tracking works
//                   </span>
//                 </button>
//               </div>

//               {/* Package Features List */}
//               <div className="mt-10 lg:mt-24 space-y-2 text-[11px] sm:text-xs text-slate-600 font-medium">
//                 <div className="flex items-center gap-x-4 sm:gap-x-5">
//                   <span className="flex items-center gap-1.5 whitespace-nowrap">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" /> Real-time Tracking
//                   </span>
//                   <span className="flex items-center gap-1.5 whitespace-nowrap">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" /> Delegated Payments
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-x-4 sm:gap-x-5">
//                   <span className="flex items-center gap-1.5 whitespace-nowrap">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" /> Instant Confirmations
//                   </span>
//                   <span className="flex items-center gap-1.5 whitespace-nowrap">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" /> 24/7 Concierge Support
//                   </span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Interactive UI Column (Replacing the static image) */}
//             <div className="flex lg:col-span-8 relative justify-center lg:justify-end items-center w-full mt-6 lg:mt-0">
//               <div className="relative w-full max-w-[640px]">
                
//                 {/* Floating Realistic Widget 1: Flight Status */}
//                 <motion.div
//                   animate={{ y: [-4, 6, -4] }}
//                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//                   className="hidden md:flex absolute -left-12 top-10 z-30 bg-white p-4 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-slate-100 items-center gap-4"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
//                     <Icon icon="solar:plane-bold" className="w-5 h-5 rotate-45" />
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Flight AF022</p>
//                     <p className="text-sm font-bold text-slate-800">On Schedule • 04h 12m</p>
//                   </div>
//                 </motion.div>

//                 {/* Main Interactive Booking App Mockup */}
//                 <div className="relative z-20 w-full bg-white/60 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-white p-2">
//                   <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-sm border border-slate-100">
                    
//                     {/* Tab Switcher */}
//                     <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-6">
//                       {(["flights", "hotels", "cars"] as const).map((tab) => (
//                         <button
//                           key={tab}
//                           onClick={() => setActiveTab(tab)}
//                           className={`text-sm font-semibold capitalize pb-4 -mb-4 transition-all ${
//                             activeTab === tab
//                               ? "text-red-600 border-b-2 border-red-600"
//                               : "text-slate-400 hover:text-slate-700"
//                           }`}
//                         >
//                           {tab}
//                         </button>
//                       ))}
//                     </div>

//                     <form onSubmit={handleSearch} className="space-y-4">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         {/* Origin Input */}
//                         <div className="bg-slate-50 border border-slate-200 hover:border-red-300 transition-colors rounded-xl p-3 sm:p-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100">
//                           <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Leaving From</label>
//                           <select 
//                             value={origin} 
//                             onChange={(e) => setOrigin(e.target.value)}
//                             className="w-full bg-transparent text-slate-900 font-bold text-base outline-none mt-1 cursor-pointer appearance-none"
//                           >
//                             <option value="CDG">Paris (CDG)</option>
//                             <option value="LHR">London (LHR)</option>
//                             <option value="FRA">Frankfurt (FRA)</option>
//                             <option value="AMS">Amsterdam (AMS)</option>
//                           </select>
//                         </div>

//                         {/* Destination Input */}
//                         <div className="bg-slate-50 border border-slate-200 hover:border-red-300 transition-colors rounded-xl p-3 sm:p-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100">
//                           <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Going To</label>
//                           <select 
//                             value={destination} 
//                             onChange={(e) => setDestination(e.target.value)}
//                             className="w-full bg-transparent text-slate-900 font-bold text-base outline-none mt-1 cursor-pointer appearance-none"
//                           >
//                             <option value="JFK">New York (JFK)</option>
//                             <option value="DXB">Dubai (DXB)</option>
//                             <option value="LAX">Los Angeles (LAX)</option>
//                           </select>
//                         </div>
//                       </div>

//                       {/* Date Selectors (Visual Only) */}
//                       <div className="grid grid-cols-2 gap-4">
//                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4">
//                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Departure</label>
//                            <div className="text-slate-900 font-bold text-sm mt-1">Oct 14, 2026</div>
//                          </div>
//                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4">
//                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Return</label>
//                            <div className="text-slate-400 font-medium text-sm mt-1">Add Date</div>
//                          </div>
//                       </div>

//                       <button
//                         type="submit"
//                         disabled={isSearching}
//                         className="w-full mt-2 py-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-[15px] rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
//                       >
//                         {isSearching ? (
//                           <>
//                             <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                             <span>Finding best routes...</span>
//                           </>
//                         ) : (
//                           <>
//                             <Icon icon="solar:magnifer-bold" className="w-5 h-5" />
//                             <span>Search Flights</span>
//                           </>
//                         )}
//                       </button>
//                     </form>

//                     {searchSuccess && (
//                       <motion.div 
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm flex items-center justify-between"
//                       >
//                         <span className="font-medium">Found 24 direct flights from {origin} to {destination}</span>
//                         <Link href="/flights" className="font-bold text-emerald-600 hover:text-emerald-700 underline">View</Link>
//                       </motion.div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Floating Realistic Widget 2: Security/Delegation */}
//                 <motion.div
//                   animate={{ y: [-3, 5, -3] }}
//                   transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//                   className="absolute -bottom-6 -right-4 lg:-right-12 z-30 bg-white p-4 pr-6 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center gap-3"
//                 >
//                   <div className="w-12 h-12 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center overflow-hidden">
//                      {/* Replace with your tracking icon/image */}
//                      <Icon icon="solar:shield-check-bold-duotone" className="w-6 h-6 text-[#DC2626]" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-bold text-slate-800 tracking-tight">Payment Delegated</p>
//                     <p className="text-[11px] text-slate-500 font-medium">Link sent to sponsor</p>
//                   </div>
//                 </motion.div>

//                 {/* Soft background glow effects behind the dashboard */}
//                 <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none z-10"></div>
//                 <div className="absolute -right-10 -top-10 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none z-10"></div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// components/home/Hero.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Navbar from "@/components/shared/Navbar";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "packages">("flights");
  const [origin, setOrigin] = useState("CDG");
  const [destination, setDestination] = useState("JFK");
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchSuccess(false);
    setTimeout(() => {
      setIsSearching(false);
      setSearchSuccess(true);
    }, 1200);
  };

  return (
    <section className="p-3 sm:p-6 lg:p-8 bg-[#F8FAFC]">
      <div className="relative isolate w-full bg-white rounded-[24px] sm:rounded-2xl overflow-hidden min-h-[860px] lg:h-[calc(100vh-64px)] flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        
        {/* Soft Realistic Gradients (Red/Rose & Clean White) */}
        <div className="absolute inset-0 -z-10 pointer-events-none rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-50 rounded-full blur-3xl opacity-60 -translate-x-1/4 translate-y-1/4" />
        </div>

        <Navbar />

        {/* Hero Main Content */}
        <div className="w-full px-4 sm:px-10 lg:px-14 pt-2 pb-10 lg:pt-4 lg:pb-12 flex-1 flex flex-col justify-end lg:justify-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-13 items-center lg:items-start px-2 sm:px-8 mt-12 gap-y-12 lg:gap-y-0">
            
            {/* Left Content Column (Marketing Copy) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:col-span-5 z-10 pt-1"
            >
              <div className="relative">
                <span className="inline-block py-1.5 px-3 rounded-full bg-red-50 text-red-600 font-semibold text-[11px] tracking-widest uppercase mb-5 border border-red-100">
                  World-Class Travel Engine
                </span>
                
                <h1 className="font-mazzard text-[38px] sm:text-5xl lg:text-[54px] text-[#0f172a] leading-[1.08] tracking-tight font-black">
                  Book Global <br />
                  Flights With <br />
                  <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent inline-block">
                    Absolute Precision
                  </span>
                </h1>
              </div>

              <p className="mt-4 sm:mt-5 text-slate-600 text-[13.5px] sm:text-[15px] max-w-md leading-relaxed font-normal">
                One secure platform to book European and global flights, delegate third-party payments, and track live passenger itineraries.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4 sm:gap-5">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/flights"
                    className="px-7 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-[14px] sm:text-[15px] rounded-full shadow-md shadow-red-600/20 transition-all inline-flex items-center justify-center cursor-pointer whitespace-nowrap"
                  >
                    Start Booking
                  </Link>
                </motion.div>

                <button
                  type="button"
                  className="inline-flex items-center gap-3 font-bold group cursor-pointer text-slate-900 hover:text-[#DC2626] transition-colors duration-200"
                >
                  <span className="w-10 h-10 sm:w-[46px] sm:h-[46px] rounded-full border-[2.5px] sm:border-[3px] border-slate-900 group-hover:border-[#DC2626] group-hover:scale-105 flex items-center justify-center transition-all duration-200 flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 group-hover:text-[#DC2626] translate-x-[2px] transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="7 4 19 12 7 20 7 4"></polygon>
                    </svg>
                  </span>
                  <span className="text-[14px] sm:text-[16px] text-slate-900 group-hover:text-[#DC2626] transition-colors duration-200 whitespace-nowrap">
                    How tracking works
                  </span>
                </button>
              </div>

              {/* Package Features List */}
              <div className="mt-10 lg:mt-24 space-y-2 text-[11px] sm:text-xs text-slate-600 font-bold">
                <div className="flex items-center gap-x-4 sm:gap-x-5">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" /> Real-time Tracking
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" /> Delegated Payments
                  </span>
                </div>
                <div className="flex items-center gap-x-4 sm:gap-x-5">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" /> Instant Confirmations
                  </span>
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] flex-shrink-0" /> 24/7 Concierge Support
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive UI Column */}
            <div className="flex lg:col-span-8 relative justify-center lg:justify-end items-center w-full mt-6 lg:mt-0">
              <div className="relative w-full max-w-[640px]">
                
                {/* Floating Realistic Widget 1: Flight Status */}
                <motion.div
                  animate={{ y: [-4, 6, -4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden md:flex absolute -left-12 top-10 z-30 bg-white p-4 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-slate-100 items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                    <Icon icon="solar:plane-bold" className="w-5 h-5 rotate-45" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Flight AF022</p>
                    <p className="text-sm font-bold text-slate-800">On Schedule • 04h 12m</p>
                  </div>
                </motion.div>

                {/* Main Interactive Booking App Mockup */}
                <div className="relative z-20 w-full bg-white/60 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-white p-2">
                  <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-sm border border-slate-100">
                    
                    {/* Tab Switcher */}
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-6">
                      {(["flights", "hotels", "packages"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`text-sm font-bold capitalize pb-4 -mb-4 transition-all ${
                            activeTab === tab
                              ? "text-red-600 border-b-2 border-red-600"
                              : "text-slate-400 hover:text-slate-700"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Origin Input */}
                        <div className="bg-slate-50 border border-slate-200 hover:border-red-300 transition-colors rounded-xl p-3 sm:p-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100">
                          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Leaving From</label>
                          <select 
                            value={origin} 
                            onChange={(e) => setOrigin(e.target.value)}
                            className="w-full bg-transparent text-slate-900 font-bold text-base outline-none mt-1 cursor-pointer appearance-none"
                          >
                            <option value="CDG">Paris (CDG)</option>
                            <option value="LHR">London (LHR)</option>
                            <option value="FRA">Frankfurt (FRA)</option>
                            <option value="AMS">Amsterdam (AMS)</option>
                          </select>
                        </div>

                        {/* Destination Input */}
                        <div className="bg-slate-50 border border-slate-200 hover:border-red-300 transition-colors rounded-xl p-3 sm:p-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100">
                          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Going To</label>
                          <select 
                            value={destination} 
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-transparent text-slate-900 font-bold text-base outline-none mt-1 cursor-pointer appearance-none"
                          >
                            <option value="JFK">New York (JFK)</option>
                            <option value="DXB">Dubai (DXB)</option>
                            <option value="LAX">Los Angeles (LAX)</option>
                          </select>
                        </div>
                      </div>

                      {/* Date Selectors */}
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4">
                           <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Departure</label>
                           <div className="text-slate-900 font-bold text-sm mt-1">Oct 14, 2026</div>
                         </div>
                         <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4">
                           <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">Return</label>
                           <div className="text-slate-400 font-bold text-sm mt-1">Add Date</div>
                         </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSearching}
                        className="w-full mt-2 py-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-[15px] rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        {isSearching ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Finding best routes...</span>
                          </>
                        ) : (
                          <>
                            <Icon icon="solar:magnifer-bold" className="w-5 h-5" />
                            <span>Search Flights</span>
                          </>
                        )}
                      </button>
                    </form>

                    {searchSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm flex items-center justify-between font-bold"
                      >
                        <span>Found 24 direct flights from {origin} to {destination}</span>
                        <Link href="/flights" className="text-emerald-600 hover:text-emerald-700 underline">View</Link>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Floating Realistic Widget 2: Security/Delegation */}
                <motion.div
                  animate={{ y: [-3, 5, -3] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-4 lg:-right-12 z-30 bg-white p-4 pr-6 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center overflow-hidden">
                     <Icon icon="solar:shield-check-bold-duotone" className="w-6 h-6 text-[#DC2626]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 tracking-tight">Payment Delegated</p>
                    <p className="text-[11px] text-slate-500 font-bold">Link sent to sponsor</p>
                  </div>
                </motion.div>

                {/* Soft background glow effects behind the dashboard */}
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none z-10"></div>
                <div className="absolute -right-10 -top-10 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none z-10"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}