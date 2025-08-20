"use client";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { ClerkProvider as OriginClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useIsDarkMode();
  return (
    <OriginClerkProvider
      appearance={
        isDarkMode
          ? {
              baseTheme: dark,
            }
          : undefined
      }
    >
      {children}
    </OriginClerkProvider>
  );
};

export default ClerkProvider;
