// components/shared/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0f172a] pt-16 sm:pt-20 pb-10 border-t border-slate-900">
      <div className="w-full max-w-[1260px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-12 sm:gap-16 md:gap-12">
          
          {/* Left Column - Logo and Description */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block flex items-center gap-2">
              {/* Replace with CannonTravels icon/logo */}
              <div className="w-8 h-8 bg-[#DC2626] rounded-lg flex items-center justify-center">
                 <span className="text-white font-black text-xl leading-none">C</span>
              </div>
              <span className="text-white font-black text-xl tracking-tight">CannonTravels</span>
            </Link>
            <p className="mt-5 sm:mt-6 text-slate-400 text-[12px] sm:text-[13px] leading-[1.7] sm:leading-[1.8] font-medium">
              A secure, high-precision flight booking <br />
              ecosystem for modern travelers and <br />
              global sponsors.
            </p>
          </div>

          {/* Right Columns - Links */}
          <div className="grid grid-cols-3 gap-6 sm:gap-16 md:gap-24">
            
            {/* Column 1 - Platform */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <h4 className="text-[#DC2626] text-[11px] sm:text-[12px] tracking-[0.08em] uppercase font-bold">
                Platform
              </h4>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <Link href="/flights" className="text-slate-300 hover:text-white text-[13px] sm:text-[14px] font-medium transition-colors">
                  Book Flights
                </Link>
                <Link href="/tracking" className="text-slate-300 hover:text-white text-[13px] sm:text-[14px] font-medium transition-colors">
                  Live Telemetry
                </Link>
                <Link href="/sponsorship" className="text-slate-300 hover:text-white text-[13px] sm:text-[14px] font-medium transition-colors">
                  Delegated Payments
                </Link>
              </div>
            </div>

            {/* Column 2 - Company */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <h4 className="text-[#DC2626] text-[11px] sm:text-[12px] tracking-[0.08em] uppercase font-bold">
                Company
              </h4>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <Link href="/about" className="text-slate-300 hover:text-white text-[13px] sm:text-[14px] font-medium transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="text-slate-300 hover:text-white text-[13px] sm:text-[14px] font-medium transition-colors">
                  Support Desk
                </Link>
                <Link href="/faq" className="text-slate-300 hover:text-white text-[13px] sm:text-[14px] font-medium transition-colors">
                  FAQ
                </Link>
              </div>
            </div>

            {/* Column 3 - Account */}
            <div className="flex flex-col gap-4 sm:gap-5">
              <h4 className="text-[#DC2626] text-[11px] sm:text-[12px] tracking-[0.08em] uppercase font-bold">
                Account
              </h4>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <Link href="/login" className="text-slate-300 hover:text-white text-[13px] sm:text-[14px] font-medium transition-colors">
                  Log in
                </Link>
                <Link href="/register" className="text-slate-300 hover:text-white text-[13px] sm:text-[14px] font-medium transition-colors">
                  Sign up
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <p className="text-slate-400 text-[12px] sm:text-[13px] font-medium">
            &copy; {new Date().getFullYear()} CannonTravels. Global Flight Engine.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-[12px] sm:text-[13px] font-medium">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-slate-600">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}