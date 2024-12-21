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

// ?  Librarie


export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    try {
      if (userData.length <= 0) {
        const _userData = localStorage.getItem("Jay:userData");
        if (_userData) {
          const userData = JSON.parse(_userData);
          const data = await fetch(`/api/users/${userData.userId}`)
          // console.log(data.status)
          if (data.status == 200){
            const result = await data.json();
            if (result.message == "User found" && result.status == 200){
              setUserData(result.data);
              setIsLoading(false)
            }else {
              toast.error(result.message +" Status : "+ result.status.toString())
              router.push('/');
            }
          }else {
            console.log("Error")
            toast.error("Server error")
            router.push('/');
          }
            
         
        }else {
          toast.error("User data not found")
          router.push('/');
        }
      
      }else {
        setIsLoading(false)
        toast.success("User data found")
      }
    } catch (error) {
      console.error("Error fetching user data:")
    }
      
  }

  useEffect(() => {
    
    getUserData();
    
  },[])
  
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
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            
            <div>
              <CaltoDay />
            </div>
            <div className="col-span-1 lg:col-span-2 md:col-span-2 ">
              <Nutrients />
            </div>
            
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/100 md:min-h-min">
         
          </div>
          
        </div>
        
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="col-span-2 lg:col-span-1">
              <CaltoDay />
            </div>
            <div className="col-span-2 lg:col-span-2 ">
              <Nutrients />
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div>
            {isLoading && (
              <div className="m-2">
                <Skeleton className="w-full h-[20px] my-2" />
                <Skeleton className="w-full h-[20px] my-2" />
                <Skeleton className="w-full h-[20px] my-2" />
                <Skeleton className="w-full h-[20px] my-2" />
                <Skeleton className="w-full h-[20px] my-2" />
                <Skeleton className="w-full h-[20px] my-2" />
              </div>
            )
            }
            {userData.map((user: any) => (
              <>
               <div key={user.user_lineId}>{user.user_lineId}</div>
               <div>{user.user_name}</div>
                <div>{user.user_weight}</div>
                <div>{user.user_height}</div>
                <div>{user.user_age}</div>
                <div>{user.user_bmi}</div>
                <div>{user.user_lifestyle}</div>
                <div>{user.user_target}</div>
                <div>{user.user_targetweight}</div>
                <div>{user.user_disease}</div>
                <div>{user.user_foodallery}</div>
                <div>{user.user_displayName}</div>
                <div>{user.user_lineId}</div>
                <div>{user.user_pictureUrl}</div>
                <div>{user.user_dailycalories}</div>
                <div><img src={user.user_pictureUrl}  /></div>
              </>
           
          ))}
            </div>
          </div>
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
