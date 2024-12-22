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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { HistoryEat } from "@/components/dashboard/history-eat";

// ?  Librarie


export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    try {
      if (userData.length <= 0) {
        const _userData = localStorage.getItem("Jay:userData");
        if (_userData && userData.length <= 0){
          const userData = JSON.parse(_userData);
          const data = await fetch(`/api/users/${userData.userId}`)
          if (data.status == 200){
            const result = await data.json();
            if (result.message == "User found" && result.status == 200){
              console.log(result.data)
              setUserData(result.data);
              // toast.success("load user data success")
            }else {
              toast.error(result.message +" Status : "+ result.status.toString())
              router.push('/');
            }
          }else {
            console.log("Error")
            toast.error("Server error")
            router.push('/');
          }
            
         
        }
        else {
          toast.error("User data not found")
          router.push('/');
        }
      
      }else {
        // toast.success("User data found")
      }
    } catch (error) {
      console.error("Error fetching user data:")
    }
      
  }

  useEffect(() => {
    
    getUserData();
    
  },[userData])
  return (
    <SidebarProvider>
      <AppSidebar userData={userData}/>
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
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            
            <div>
              <CaltoDay />
            </div>
            <div className="col-span-1 lg:col-span-2 md:col-span-2 ">
              <Nutrients />
            </div>
            
          </div>
          <div className="min-h-[50vh]  flex-1 rounded-xl border md:min-h-min p-4 overflow-x-auto">
            <HistoryEat/>
          </div>
          <div className="min-h-[50vh] flex-1 rounded-xl border md:min-h-min p-4 overflow-x-auto">
            <HistoryEat/>
          </div>
          
        </div>
        
        
      </SidebarInset>
    </SidebarProvider>
  );
}
