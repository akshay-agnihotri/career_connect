"use client";
import {
  IconChevronsDown,
  IconLogin2,
  IconLogout2,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { isSignedIn, user } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isSignedIn ? (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.firstName ?? "User Avatar"}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.firstName}
                    </span>
                    <span className="truncate text-xs">
                      {user?.emailAddresses[0]?.emailAddress}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Image
                    src={"/anonymous-avatar.svg"}
                    alt="Anonymous User"
                    className="h-9 w-9 rounded-lg aspect-square"
                    width={30}
                    height={30}
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Anonymous User
                    </span>
                    <span className="truncate text-xs">
                      AnonymousUserEmail@gmail.com
                    </span>
                  </div>
                </div>
              )}
              <IconChevronsDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              {isSignedIn ? (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.firstName ?? "User Avatar"}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.firstName}
                    </span>
                    <span className="truncate text-xs">
                      {user?.emailAddresses[0]?.emailAddress}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Image
                    src={"/anonymous-avatar.svg"}
                    alt="Anonymous User"
                    className="h-9 w-9 rounded-lg aspect-square"
                    width={30}
                    height={30}
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Anonymous User
                    </span>
                    <span className="truncate text-xs">
                      AnonymousUserEmail@gmail.com
                    </span>
                  </div>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/user-profile" className="flex items-center gap-2">
                  <IconUserCircle />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/user-settings/notifications"
                  className="flex items-center gap-2"
                >
                  <IconSettings />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {isSignedIn ? (
                <SignOutButton>
                  <div className="w-full flex items-center">
                    <IconLogout2 className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </div>
                </SignOutButton>
              ) : (
                <SignInButton>
                  <div className="w-full flex items-center">
                    <IconLogin2 className="mr-2 h-4 w-4" />
                    <span>Sign in</span>
                  </div>
                </SignInButton>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
