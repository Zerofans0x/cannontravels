import type { Metadata } from "next";
import LegalContent from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Terms & Privacy | cannontravels",
  description: "Terms of service and Privacy Policy for cannontravels.",
};

export default function PrivacyPage() {
  return <LegalContent defaultTab="privacy" />;
}
