import { ClerkProvider as OriginClerkProvider } from "@clerk/nextjs";

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <OriginClerkProvider>{children}</OriginClerkProvider>;
};

export default ClerkProvider;
