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
import { NavUser } from "./nav-user";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="inset" className="overflow-hidden">
      <SidebarHeader className="p-0 pt-2">
        <Link href="/" className="flex flex-row items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="w-13 h-13 flex-shrink-0 min-w-13"
          />
          <span className="ml-2 font-bold text-xl text-nowrap">Career Connect</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
