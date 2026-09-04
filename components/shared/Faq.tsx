// components/shared/Faq.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does third-party delegated payment work?",
    answer: "When booking a flight, select 'Pay for Me' and input your sponsor's email. We instantly generate a secure link containing the Flight ID and tracking code. The sponsor can confirm and pay directly without needing to create an account.",
  },
  {
    question: "How is my flight tracking data secured?",
    answer: "Security is our top priority. Our real-time WebSocket telemetry is encrypted. Only you and your designated sponsor (via their unique tracking code) can view your live GPS location, speed, and altitude.",
  },
  {
    question: "When do I receive my PNR and E-Ticket?",
    answer: "Instantly. As soon as a payment clears (whether self-paid or delegated), our engine integrates with global airlines to immediately issue your Passenger Name Record (PNR) and electronic ticket.",
  },
  {
    question: "Are there any hidden booking fees?",
    answer: "No. We believe in complete transparency. The exact price displayed during your flight search is the final amount charged, inclusive of standard taxes.",
  },
  {
    question: "Can I manage multiple delegated bookings?",
    answer: "Yes, your client dashboard allows you to track all active links sent to sponsors, see payment statuses in real-time, and monitor multiple active flights simultaneously.",
  },
  {
    question: "What happens if a sponsor doesn't pay in time?",
    answer: "Delegated payment links expire based on the airline's ticketing time limit (usually 24 hours). If it expires, the reservation is released, and you will need to re-book the flight.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12 py-20 sm:py-32">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left Column: Heading and Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full lg:w-[55%]"
        >
          <span className="text-[12px] font-bold tracking-widest text-[#DC2626] uppercase mb-2 block">SUPPORT & INFO</span>
          <h2 className="font-mazzard text-[36px] sm:text-[44px] lg:text-[48px] text-[#111827] leading-[1.1] tracking-tight mb-10 sm:mb-12 font-black">
            Got Questions? <br />
            <span className="text-[#DC2626]">{"We've Got Answers"}</span>
          </h2>

          <div className="w-full aspect-[4/4.5] bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden relative">
            <Image
              src="/images/flight-faq-img.png" // Update placeholder
              alt="Flight Booking FAQ Illustration"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Right Column: FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="w-full lg:w-[45%] flex flex-col lg:pl-12 pt-10 lg:pt-[100px]"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-slate-200 last:border-0 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`text-[15px] font-bold transition-colors duration-200 ${
                      isOpen ? "text-[#DC2626]" : "text-[#111827] hover:text-[#DC2626]"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`text-2xl font-light leading-none transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "text-[#DC2626]" : "text-[#111827]"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-8">
                        <p className="text-[13.5px] text-slate-600 font-medium leading-[1.7]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}