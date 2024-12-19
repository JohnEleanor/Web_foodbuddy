"use client"

import * as React from "react"
import {
  AudioWaveform,
  History,
  BookOpen,
  Utensils,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
   
  },
  teams: [
   
    {
      name: "Food Buddy.",
      logo: Utensils,
      plan: "ตัวช่วยในการกินของคุณ",
      url: "/dashboard",
    },
  ],
  navMain: [
    {
      title: "ประวัติการกิน",
      url: "#",
      icon: History,
      isActive: false,
      items: [
        {
          title: "ประวัติการกินทั้งหมด",
          url: "#",
        },
        {
          title: "ประวัติการกิน",
          url: "#",
        },
        
      ],
    },
    {
      title: "ตั้งค่า",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "อัพเดทน้ำทั่วไป",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
