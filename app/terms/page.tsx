

import type { Metadata } from "next";
import LegalContent from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Terms & Privacy | CannonTravels",
  description: "Terms of service and Privacy Policy for CannonTravels.",
};

export default function LegalPage() {
  return <LegalContent />;
}