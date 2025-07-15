"use client";
import { Home, Inbox, LogOut, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { routePath } from "@/utils/routes";
import useToggleModal from "@/hooks/useToggle";
import LogoutModal from "../modal/logout-modal";
import { useLogoutMutation } from "@/redux/services/auth/authApi";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: routePath.MAIN.OVERVIEW,
    icon: Home,
  },
  {
    title: "Users",
    url: routePath.MAIN.USERS.INDEX,
    icon: Inbox,
  },
  {
    title: "Settings",
    url: routePath.MAIN.SETTINGS.INDEX,
    icon: Settings,
  },
];

export function AppSidebar() {
  const { isOpen, toggleOpen, toggleClose } = useToggleModal(false);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = () => {
    logout({});
  };
  return (
    <>
      <Sidebar>
        <SidebarHeader className="mt-5 mx-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <Image
                src="/logo.svg"
                alt="logo"
                width={60}
                height={60}
                priority
                className="mx-auto"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="mx-2">
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu className="mb-3 mx-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                variant={"default"}
                onClick={toggleOpen}
                className="rounded-[5px] cursor-pointer h-[46px] text-center py-[11px] px-2.5 flex items-center gap-x-1.5 text-red-01 hover:bg-red-01/5"
              >
                <LogOut className="text-destructive" />
                <p className="text-xs font-medium">Logout</p>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <LogoutModal
        show={isOpen}
        handleClose={toggleClose}
        handleLogout={handleLogout}
        loading={isLoading}
      />
    </>
  );
}
