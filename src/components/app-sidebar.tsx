import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="inset" className="overflow-hidden">
      <SidebarHeader className="flex-row items-center text-xl text-nowrap font-bold font-lora!">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          className="w-12 h-12 flex-shrink-0 min-w-12"
        />
        <Link href="/">Career Connect</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>footer</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
