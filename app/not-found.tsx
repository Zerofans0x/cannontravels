
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-red-100 selection:text-red-900">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24">
        {/* 404 Graphic */}
        <div className="relative w-full max-w-[500px] h-[250px] sm:h-[300px] md:h-[350px] mb-8">
          <Image
            src="/images/404-group.png"
            alt="404 Page Not Found"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
        </div>
        
        {/* Text Content */}
        <h1 className="font-mazzard text-[28px] sm:text-[36px] md:text-[40px] text-[#0f172a] text-center tracking-tight mb-4 font-black">
          Oops, airspace route not found
        </h1>
        
        <p className="text-slate-600 text-[14px] sm:text-[15px] font-medium text-center max-w-[380px] leading-relaxed mb-8">
          We can&apos;t find the flight or page you are looking for. The tracking link may have expired or is incorrect.
        </p>
        
        {/* Call to Action Button */}
        <Link 
          href="/"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#DC2626] text-white rounded-full font-bold text-[14px] hover:bg-[#B91C1C] transition-all shadow-md shadow-red-600/20"
        >
          Return to Airspace Home
          <Icon icon="lucide:arrow-right" className="w-4 h-4" />
        </Link>
      </main>

      <Footer />
    </div>
  );
}