"use client";

import * as React from "react";
import {
  History,
  Utensils,
  Frame,
  Map,
  PieChart,
  Settings,
  Loader,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const initialData = {
  user: {
    user_name : "Loading...",
    user_displayName : "Loading...",
    user_pictureUrl : "https://media.discordapp.net/attachments/983457126758375534/1320647909351489547/0460CC2E-01BB-4958-B1E2-F95AE93D4C4E.png?ex=676a5cb6&is=67690b36&hm=ed79eb96b40dd5c41cd4d7be26d093237ece209da63c6e3e9b69559005338518&=&format=webp&quality=lossless&width=683&height=683",
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
      url: "/dashboard/history",
      icon: History,
      isActive: false,
      items: [
        {
          title: "ประวัติการกิน",
          url: "/dashboard/history",
        },
        {
          title: "ประวัติการกินทั้งหมด",
          url: "/dashboard/history/history_all",
        },
      ],
    },
    {
      title: "ตั้งค่า",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "ตั้งค่าทั่วไป",
          url: "/dashboard/setting",
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
};

export function AppSidebar({
  userData,
  ...props
}: { userData: any } & React.ComponentProps<typeof Sidebar> ) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    if (userData && userData.length > 0) {
      setData((prevData) => ({
        ...prevData,
        user: { ...prevData.user, ...userData[0] },
      }));
      setLoading(false);
    }
   
  }, [userData]);

  if (loading) {
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
    );
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}   />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
