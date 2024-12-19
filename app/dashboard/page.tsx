"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/theme-switcher";
import { CaltoDay } from "@/components/dashboard/calories-to-day";
import { Nutrients } from "@/components/dashboard/nutrients";
// ?  Librarie


export default function Page() {
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="ml-auto px-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Responsive Grid Layout */}
          <div className="grid gap-4 gird-cols-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2 lg:col-span-1">
              <CaltoDay />
            </div>
            <div className="col-span-2 lg:col-span-2 ">
              <Nutrients />
            </div>
          </div>
          {/* Background Section */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
