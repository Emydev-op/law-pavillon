import { AppSidebar } from "@/components/custom/app-sidebar";
import HeaderNav from "@/components/custom/header-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import Authenticated from "@/middleware/authenticated";
import { cookies } from "next/headers";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <Authenticated>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full bg-white-01">
          <HeaderNav />
          {children}
        </main>
      </SidebarProvider>
    </Authenticated>
  );
}

export default DashboardLayout;
