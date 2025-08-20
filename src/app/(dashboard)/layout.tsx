import AppSidebar from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider className="overflow-y-hidden">
        <AppSidebar />
        <SidebarInset >
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default layout;
