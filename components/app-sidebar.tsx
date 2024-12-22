"use client"

import * as React from "react"
import {
  History,
  Utensils,
  Frame,
  Map,
  PieChart,
  Settings,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
  user: {
    // name: "shadcn",
    // email: "m@example.com",
    // avatar: "https://github.com/shadcn.png",
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

export function AppSidebar({ userData, ...props }: {userData : any} & React.ComponentProps<typeof Sidebar>) {
  if (userData.length <= 0){
    console.log("User data not found")
  }else {
    data.user = { ...data.user, ...userData[0] }
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
