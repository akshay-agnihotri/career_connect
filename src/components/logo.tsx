"use client";

import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

// Renders the logo only on mobile screens.
export const Logo = () => {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return (
    <Link href="/" className="text-xl text-nowrap font-bold font-lora">
      <span>Career Connect</span>
    </Link>
  );
};
