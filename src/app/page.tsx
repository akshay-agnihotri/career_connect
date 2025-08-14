import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Home() {
  return (
    <>
      <SidebarProvider className="overflow-y-hidden">
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="items-center flex-row!">
            <SidebarTrigger />
            <span className="">
              <span className="text-xl text-nowrap">Carrer-Connect</span>
            </span>
          </SidebarHeader>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}
