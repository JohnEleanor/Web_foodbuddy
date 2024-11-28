"use client";

// ? Libraries
import Image from "next/image";
import liff from "@line/liff";
import { useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'

// ? Components
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// ? Image assets
import LoginImage from "./assets/login_img.png";

// ? Pages


const initLiff = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_LINE_LIFF_ID) {
      // console.log("ENV is not defined");
      throw new Error("LIFF ID is not defined");
    }

    await liff.init({
      liffId: process.env.NEXT_PUBLIC_LINE_LIFF_ID,
    });
    console.log("LIFF initialized");
  } catch (error) {
    console.error("Failed to initialize LIFF:", error);
  }
};



export default function Home() {
  const router = useRouter()
  const handdleLogin = async () => {  
    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      const userProfile = await liff.getProfile() // pass the user's ID to your backend server
      console.log(userProfile); 
      router.push( '/dashboard', {
        scroll : false
      })
    }
  }

  useEffect(() => {
    initLiff();
  }, []);

  
  return (
    <>
      <div className="w-full lg:min-h-[1366px] lg:grid lg:grid-cols-2 xl:min-h-[980px]">
        <AspectRatio className="block">
          <Image src={LoginImage} alt="FoodBuddy" fill={true} />
        </AspectRatio>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">เข้าสู่ระบบ</h1>
              <p className="text-balance text-muted-foreground">
                กรุณาเข้าสู่ระบบด้วย Line เพื่อใช้ในการเก็บข้อมูล
              </p>
            </div>
            <div className="grid gap-4">
              <Button
                type="button"
                onClick={handdleLogin}
                className="bg-lime-600 w-full shadow-lg hover:bg-lime-500"
              >
                Login ด้วย Line Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
