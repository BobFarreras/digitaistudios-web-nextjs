// src/app/HomePageClient.js

"use client";

import { useState } from 'react';
import HeroSection from "@/components/sections/HeroSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import WebsitesSection from "@/components/sections/WebsitesSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import SocialSection from "@/components/sections/SocialSection";
import DemoModal from "@/components/sections/DemoModal";
import CookieConsentBanner from "@/components/sections/CookieConsentBanner";

const SectionDivider = () => <div className="section-divider"></div>;

export default function HomePageClient({ initialTestimonials }) {
  const [isDemoModalOpen, setDemoModalOpen] = useState(false);
  const openDemoModal = () => setDemoModalOpen(true);
  const closeDemoModal = () => setDemoModalOpen(false);

  // NOTA: La lògica de 'useEffect' per a 'scrollToId' es gestiona millor
  // des del component Navbar, com ja vam configurar.

  return (
    <>
      <HeroSection onOpenDemo={openDemoModal} />
      <SectionDivider />
      <BenefitsSection />
      <WebsitesSection onOpenDemo={openDemoModal} />
      <SectionDivider />
      <ComparisonSection />
      <SectionDivider />
      <TestimonialsSection initialTestimonials={initialTestimonials} />
      <SectionDivider />
      <ContactSection />
      <SocialSection />

      <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />
      <CookieConsentBanner />
    </>
  );
}