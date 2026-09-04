import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FaqComponent from "@/components/shared/Faq"; 

export default function FaqPage() {
  return (
    <div className="w-full flex flex-col bg-white text-slate-900 min-h-screen">
      <Navbar />
      <div className="py-12">
        <FaqComponent />
      </div>
      <Footer />
    </div>
  );
}