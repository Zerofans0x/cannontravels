// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { api } from "@/lib/api";

// export default function TicketViewPage() {
//   const params = useParams();
//   const router = useRouter();
//   const bookingId = params.id;

//   const [booking, setBooking] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const response = await api.get(`/bookings/my-bookings`);
//         const found = response.data.data.find((b: any) => b._id === bookingId);
//         if (found) {
//           setBooking(found);
//         } else {
//           setErrorMessage("Ticket itinerary not found.");
//         }
//       } catch (err) {
//         setErrorMessage("Failed to load ticket details.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (bookingId) fetchBookingDetails();
//   }, [bookingId]);

//   const handlePrintTicket = () => {
//     window.print();
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-[50vh] flex items-center justify-center">
//         <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
//       </div>
//     );
//   }

//   if (!booking) {
//     return (
//       <div className="max-w-xl mx-auto text-center py-20 space-y-4">
//         <h2 className="text-xl font-bold text-slate-800">{errorMessage || "Ticket not found."}</h2>
//         <Link href="/dashboard/bookings" className="inline-block px-6 py-3 bg-[#DC2626] text-white font-bold rounded-xl text-sm">
//           Return to Bookings
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto space-y-6 pb-12 print:p-0">
//       {/* Non-printing navigation header */}
//       <div className="flex items-center justify-between print:hidden">
//         <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
//           <Icon icon="lucide:arrow-left" className="w-4 h-4" />
//           <span>Back to Bookings</span>
//         </Link>

//         <button
//           onClick={handlePrintTicket}
//           className="px-5 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-2 cursor-pointer"
//         >
//           <Icon icon="lucide:printer" className="w-4 h-4" />
//           <span>Print / Save Ticket</span>
//         </button>
//       </div>

//       {/* Printable Boarding Pass Card */}
//       <div className="bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden print:shadow-none print:border-slate-400">
//         {/* Top Airline Banner */}
//         <div className="bg-[#1a0505] text-white p-6 sm:p-8 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <span className="text-2xl">✈</span>
//             <div>
//               <h1 className="text-xl font-black tracking-tight"><span className="text-[#DC2626]">Cannon</span>Travels</h1>
//               <p className="text-xs text-slate-400 font-mono uppercase">Official Electronic Flight Itinerary</p>
//             </div>
//           </div>
//           <div className="text-right">
//             <span className="text-xs text-slate-400 font-mono block uppercase">PNR Confirmation</span>
//             <span className="text-xl font-mono font-bold tracking-widest text-[#fca5a5]">{booking.bookingReference}</span>
//           </div>
//         </div>

//         {/* Flight Core Info */}
//         <div className="p-6 sm:p-8 space-y-6">
//           <div className="grid grid-cols-3 gap-4 items-center border-b border-slate-100 pb-6">
//             <div>
//               <span className="text-xs text-slate-400 font-mono uppercase block">Origin</span>
//               <span className="text-2xl font-black text-slate-900">{booking.origin}</span>
//             </div>
//             <div className="text-center">
//               <span className="text-xs text-slate-400 font-mono uppercase block">Flight No</span>
//               <span className="text-lg font-bold text-[#DC2626]">{booking.flightNumber}</span>
//               <div className="w-full h-px bg-slate-200 my-2 relative">
//                 <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] text-slate-400">DIRECT</span>
//               </div>
//             </div>
//             <div className="text-right">
//               <span className="text-xs text-slate-400 font-mono uppercase block">Destination</span>
//               <span className="text-2xl font-black text-slate-900">{booking.destination}</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
//             <div>
//               <span className="text-xs text-slate-400 font-mono uppercase block">Departure Date</span>
//               <span className="font-bold text-slate-800">{new Date(booking.departureTime).toLocaleDateString()}</span>
//             </div>
//             <div>
//               <span className="text-xs text-slate-400 font-mono uppercase block">Departure Time</span>
//               <span className="font-bold text-slate-800">{new Date(booking.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//             </div>
//             <div>
//               <span className="text-xs text-slate-400 font-mono uppercase block">Payment Status</span>
//               <span className={`font-bold capitalize ${booking.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
//                 {booking.paymentStatus}
//               </span>
//             </div>
//             <div>
//               <span className="text-xs text-slate-400 font-mono uppercase block">Total Fare</span>
//               <span className="font-bold text-slate-900">${booking.amount} {booking.currency}</span>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bar */}
//         <div className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="text-xs text-slate-500">
//             <p className="font-bold text-slate-700">Biometric Fast-Track & Delay Shield Active</p>
//             <p>Present this PNR at the terminal boarding gate along with valid government ID.</p>
//           </div>
//           <div className="font-mono text-xs font-bold bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600">
//             TOKEN: {booking.trackingCode}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function TicketViewPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id;

  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // 1. Try reading from sessionStorage cache first
        const cached = sessionStorage.getItem(`ticket_${bookingId}`);
        if (cached) {
          setBooking(JSON.parse(cached));
          setIsLoading(false);
          return;
        }

        // 2. Fallback: fetch user bookings array
        const response = await api.get(`/bookings/my-bookings`);
        const found = response.data.data.find((b: any) => b._id === bookingId);
        if (found) {
          setBooking(found);
        } else {
          setErrorMessage("Ticket itinerary not found.");
        }
      } catch (err) {
        setErrorMessage("Failed to load ticket details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const handlePrintTicket = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">{errorMessage || "Ticket not found."}</h2>
        <Link href="/dashboard/bookings" className="inline-block px-6 py-3 bg-[#DC2626] text-white font-bold rounded-xl text-sm">
          Return to Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 print:p-0">
      {/* Non-printing navigation header */}
      <div className="flex items-center justify-between print:hidden">
        <Link href="/dashboard/bookings" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
          <Icon icon="lucide:arrow-left" className="w-4 h-4" />
          <span>Back to Bookings</span>
        </Link>

        <button
          onClick={handlePrintTicket}
          className="px-5 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="lucide:printer" className="w-4 h-4" />
          <span>Print / Save Ticket</span>
        </button>
      </div>

      {/* Printable Boarding Pass Card */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-lg overflow-hidden print:shadow-none print:border-slate-400">
        {/* Top Airline Banner */}
        <div className="bg-[#1a0505] text-white p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✈</span>
            <div>
              <h1 className="text-xl font-black tracking-tight"><span className="text-[#DC2626]">Cannon</span>Travels</h1>
              <p className="text-xs text-slate-400 font-mono uppercase">Official Electronic Flight Itinerary</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-mono block uppercase">PNR Confirmation</span>
            <span className="text-xl font-mono font-bold tracking-widest text-[#fca5a5]">{booking.bookingReference}</span>
          </div>
        </div>

        {/* Flight Core Info */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-3 gap-4 items-center border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs text-slate-400 font-mono uppercase block">Origin</span>
              <span className="text-2xl font-black text-slate-900">{booking.origin}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-slate-400 font-mono uppercase block">Flight No</span>
              <span className="text-lg font-bold text-[#DC2626]">{booking.flightNumber}</span>
              <div className="w-full h-px bg-slate-200 my-2 relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] text-slate-400">DIRECT</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono uppercase block">Destination</span>
              <span className="text-2xl font-black text-slate-900">{booking.destination}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-400 font-mono uppercase block">Departure Date</span>
              <span className="font-bold text-slate-800">{new Date(booking.departureTime).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono uppercase block">Departure Time</span>
              <span className="font-bold text-slate-800">{new Date(booking.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono uppercase block">Payment Status</span>
              <span className={`font-bold capitalize ${booking.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {booking.paymentStatus}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-mono uppercase block">Total Fare</span>
              <span className="font-bold text-slate-900">${booking.amount} {booking.currency}</span>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            <p className="font-bold text-slate-700">Biometric Fast-Track & Delay Shield Active</p>
            <p>Present this PNR at the terminal boarding gate along with valid government ID.</p>
          </div>
          <div className="font-mono text-xs font-bold bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600">
            TOKEN: {booking.trackingCode}
          </div>
        </div>
      </div>
    </div>
  );
}