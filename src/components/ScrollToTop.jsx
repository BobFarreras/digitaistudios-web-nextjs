// src/components/ScrollToTop.jsx

"use client"; // NOU: Marquem el component com a Client Component perquè utilitza hooks.

import { useEffect } from "react";
import { usePathname } from 'next/navigation'; // CANVI: Importem el hook de Next.js

const ScrollToTop = () => {
  // CANVI: Obtenim la ruta actual amb usePathname.
  const { pathname, hash }  = usePathname();

  useEffect(() => {
    // Només fem scroll a dalt si NO hi ha hash
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;