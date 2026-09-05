// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Icon } from "@iconify/react";
// import { api } from "@/lib/api";

// export default function DelegatedPaymentPage() {
//   const params = useParams();
//   const trackingCode = params.trackingCode;

//   const [bookingData, setBookingData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPaying, setIsPaying] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchDelegatedBooking = async () => {
//       try {
//         const response = await api.get(`/bookings/delegated/${trackingCode}`);
//         setBookingData(response.data.data);
//       } catch (err: any) {
//         setErrorMessage(err.response?.data?.message || "Invalid or expired payment link.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (trackingCode) fetchDelegatedBooking();
//   }, [trackingCode]);

//   const handleProcessPayment = async () => {
//     setIsPaying(true);
//     setErrorMessage("");

//     try {
//       // Simulate payment gateway settlement (or connect Stripe/Paystack endpoint here)
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setIsSuccess(true);
//     } catch (err) {
//       setErrorMessage("Payment settlement failed. Please try again.");
//     } finally {
//       setIsPaying(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center">
//         <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
//       </div>
//     );
//   }

//   if (errorMessage && !bookingData) {
//     return (
//       <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
//         <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4">
//           <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
//             !
//           </div>
//           <h2 className="text-xl font-bold text-slate-900">Payment Link Unavailable</h2>
//           <p className="text-sm text-slate-600">{errorMessage}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
//         <div>
//           <span className="text-[#DC2626] font-mono text-xs uppercase tracking-wider font-bold bg-red-950/60 px-3 py-1 rounded-full border border-red-900/40">
//             Secure Sponsor Settlement
//           </span>
//           <h1 className="text-2xl font-black tracking-tight mt-3">Flight Payment Request</h1>
//           <p className="text-sm text-slate-400 mt-1">
//             You have been requested by <strong className="text-white">{bookingData.passenger.name}</strong> to sponsor their flight itinerary.
//           </p>
//         </div>

//         {isSuccess ? (
//           <div className="p-6 bg-emerald-950/50 border border-emerald-800/50 rounded-2xl text-center space-y-3 animate-in fade-in">
//             <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
//               ✓
//             </div>
//             <h3 className="font-bold text-lg text-emerald-300">Payment Successful!</h3>
//             <p className="text-xs text-emerald-400/80">
//               The ticket has been fully issued and the passenger&apos;s itinerary has been confirmed.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-4 space-y-3 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Flight Route</span>
//                 <span className="font-bold">{bookingData.origin} → {bookingData.destination}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Flight Number</span>
//                 <span className="font-bold text-[#DC2626]">{bookingData.flightNumber}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-slate-400">Departure</span>
//                 <span className="font-bold">{new Date(bookingData.departureTime).toLocaleDateString()}</span>
//               </div>
//               <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
//                 <span className="text-slate-300 font-medium">Total Amount</span>
//                 <span className="text-2xl font-black text-white">${bookingData.amount} {bookingData.currency}</span>
//               </div>
//             </div>

//             <button
//               onClick={handleProcessPayment}
//               disabled={isPaying}
//               className="w-full py-4 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-base rounded-full shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
//             >
//               {isPaying ? (
//                 <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <>
//                   <span>Pay ${bookingData.amount} Now</span>
//                   <Icon icon="lucide:arrow-right" className="w-5 h-5" />
//                 </>
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { api } from "@/lib/api";

export default function DelegatedPaymentPage() {
  const params = useParams();
  const trackingCode = params.trackingCode;

  const [bookingData, setBookingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDelegatedBooking = async () => {
      try {
        const response = await api.get(`/bookings/delegated/${trackingCode}`);
        setBookingData(response.data.data);
      } catch (err: any) {
        setErrorMessage(err.response?.data?.message || "Invalid or expired payment link.");
      } finally {
        setIsLoading(false);
      }
    };
    if (trackingCode) fetchDelegatedBooking();
  }, [trackingCode]);

  const handleProcessPayment = async () => {
    setIsPaying(true);
    setErrorMessage("");

    try {
      // Hit backend payment initialization endpoint for delegated bookings
      const response = await api.post("/payments/initialize-delegated", {
        trackingCode
      });

      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        setErrorMessage("Could not generate payment gateway link.");
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || "Payment settlement failed. Please try again.");
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (errorMessage && !bookingData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-900">Payment Link Unavailable</h2>
          <p className="text-sm text-slate-600">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <span className="text-[#DC2626] font-mono text-xs uppercase tracking-wider font-bold bg-red-950/60 px-3 py-1 rounded-full border border-red-900/40">
            Secure Sponsor Settlement
          </span>
          <h1 className="text-2xl font-black tracking-tight mt-3">Flight Payment Request</h1>
          <p className="text-sm text-slate-400 mt-1">
            You have been requested by <strong className="text-white">{bookingData.passenger.name}</strong> to sponsor their flight itinerary.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Flight Route</span>
              <span className="font-bold">{bookingData.origin} → {bookingData.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Flight Number</span>
              <span className="font-bold text-[#DC2626]">{bookingData.flightNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Departure</span>
              <span className="font-bold">{new Date(bookingData.departureTime).toLocaleDateString()}</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-slate-300 font-medium">Total Amount</span>
              <span className="text-2xl font-black text-white">${bookingData.amount} {bookingData.currency}</span>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-400 font-medium text-center">{errorMessage}</p>
          )}

          <button
            onClick={handleProcessPayment}
            disabled={isPaying}
            className="w-full py-4 bg-[#DC2626] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-bold text-base rounded-full shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isPaying ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Proceed to Secure Payment (${bookingData.amount})</span>
                <Icon icon="lucide:arrow-right" className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}