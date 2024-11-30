

"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Utensils, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// สร้าง schema ด้วย zod
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "คุณต้องกรอกชื่อ ตัวอักษรอย่างน้อย 2 ตัว",
  }),
  birthdate: z
    .date({
      required_error: "กรุณากรอกวันเกิด",
    })
    .max(new Date(), {
      message: "วันเกิดต้องไม่เกินวันที่ปัจจุบัน",
    }),
  age: z.number().min(1, {
    message: "อายุต้องมากกว่า 0",
  }),
  weight: z.string().min(1, {
    message: "น้ำหนักต้องมากกว่า 0",
  }),
  height: z.string().min(1, {
    message: "ส่วนสูงต้องมากกว่า 0",
  }),
  bmi: z
    .number()
    .min(1, {
      message: "BMI ต้องมากกว่า 0",
    })
    .optional(),
});

export default function InputForm() {
  const [step, setStep] = useState<number>(1); // ใช้ในการควบคุมขั้นตอนฟอร์ม
  const [bmi, setBmi] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ฟังก์ชันที่ถูกเรียกเมื่อกดปุ่ม "ถัดไป"
  const handleNextClick = async () => {
    setIsLoading(true); // เปิดการโหลด

    // จำลองการทำงานที่ต้องใช้เวลา (เช่นการเรียก API)
    setTimeout(() => {
      setIsLoading(false); // ปิดการโหลดหลังจาก 3 วินาที
      setStep(2); // ถ้าสำเร็จให้ไปขั้นตอนถัดไป
    }, 500);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      birthdate: new Date(),
      age: 0,
      weight: "",
      height: "",
      bmi: 0, // กำหนดค่า BMI เป็น 0 หรือ undefined
    },
  });

  // ฟังก์ชันคำนวณอายุ
  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // ฟังก์ชันคำนวณ BMI
  const calculateBmi = (weight: number, height: number) => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100; // แปลงส่วนสูงเป็นเมตร
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(Number(bmiValue)); // คำนวณ BMI และตั้งค่าใน state
      form.setValue("bmi", Number(bmiValue)); // ตั้งค่า BMI ในฟอร์ม
    } else {
      setBmi(undefined);
      form.setValue("bmi", 0); // ถ้าไม่มีข้อมูลที่ถูกต้อง ก็ให้ค่า BMI เป็น 0
    }
  };

  // ฟังก์ชันที่จะเรียกเมื่อมีการเลือกวันเกิด
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const calculatedAge = calculateAge(date);
      form.setValue("birthdate", date); // ตั้งค่าของ birthdate ในฟอร์ม
      form.setValue("age", calculatedAge); // ตั้งค่าอายุในฟอร์มโดยตรง
    }
  };

  // ฟังก์ชันที่เรียกเมื่อกรอกน้ำหนักหรือส่วนสูง
  const handleFieldChange = () => {
    const weight = parseFloat(form.watch("weight"));
    const height = parseFloat(form.watch("height"));
    calculateBmi(height, weight); // คำนวณ BMI เมื่อกรอกข้อมูลน้ำหนักและส่วนสูง
  };

  useEffect(() => {
    handleFieldChange(); // คำนวณ BMI เมื่อเริ่มต้น
  }, [
    form.watch("weight"),
    form.watch("height"),
    form.watch("birthdate"),
    form.watch("age"),
    step,
  ]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    handleNextClick(); // ทดสอบการโหลด

    
  }

  return (
    <div className="flex flex-2 flex-col gap-2 p-4 md:gap-8 md:p-8">
      <nav className="flex-col self-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Utensils className="h-6 w-6" />
      </nav>
      {step === 1 ? (
        <Card className="p-11 shadow-xl ">
          <CardTitle className="text-xl ">กรุณากรอกข้อมูลของคุณ</CardTitle>
            <CardDescription className="mb-5">
              กรุณากรอกข้อมูลของคุณเพื่อนำไปคำนวณเเละปรับปรุงสุขภาพของคุณ
            </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">ชื่อ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="น้องมุก"
                        className="shadow-md"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ชื่อนี้จะถูกแสดงในโปรไฟล์ของคุณ
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">วันเกิด</FormLabel>
                    <FormControl>
                      <div className="flex flex-col">
                        <DatePicker {...field} onChange={handleDateChange} />
                      </div>
                    </FormControl>
                    <FormDescription>กรุณากรอกวันเกิดของคุณ</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">อายุ</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="shadow-md"
                        {...field}
                        value={form.watch("age")}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>
                      ระบบจะใช้ข้อมูลนี้เพื่อปรับปรุงการแสดงผล
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">น้ำหนัก</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="shadow-md"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // ต้องเรียก field.onChange เพื่ออัปเดตค่าของฟอร์ม
                          handleFieldChange(); // คำนวณ BMI
                        }}
                      />
                    </FormControl>
                    <FormDescription>กรุณากรอกน้ำหนักของคุณ</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">ส่วนสูง</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="shadow-md"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // ต้องเรียก field.onChange เพื่ออัปเดตค่าของฟอร์ม
                          handleFieldChange(); // คำนวณ BMI
                        }}
                      />
                    </FormControl>
                    <FormDescription>กรุณากรอกส่วนสูงของคุณ</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bmi"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Alert>
                        <AlertDescription>
                          ค่า BMI ของคุณคือ:{" "}
                          <Badge>
                            {bmi ? bmi : "กรุณากรอกข้อมูลน้ำหนักและส่วนสูง"}
                          </Badge>
                        </AlertDescription>
                      </Alert>
                    </FormControl>
                    <FormDescription>
                      ระบบจะใช้ข้อมูลนี้เพื่อปรับปรุงการแสดงผล
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              <div className="grid grid-cols-1 gap-2">
                {isLoading ? (<Button disabled><Loader2 className="animate-spin mr-2"/>กรุณารอสักครู่...</Button>) : <Button className="btn">ถัดไป</Button>}
              </div>


            
            </form>
          </Form>
        </Card>
      ) : step === 2 ? (
      
        <Card className="p-11 shadow-xl">
          <CardTitle className="text-xl ">คุณมีไลฟ์สไตล์เเบบไหน</CardTitle>
            <CardDescription className="mb-5">
            กรุณากรอกข้อมูลของคุณเพื่อนำไปคำนวณเเละปรับปรุงสุขภาพของคุณ
            </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">ชื่อ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="น้องมุก"
                        className="shadow-md"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ชื่อนี้จะถูกแสดงในโปรไฟล์ของคุณ
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">วันเกิด</FormLabel>
                    <FormControl>
                      <div className="flex flex-col">
                        <DatePicker {...field} onChange={handleDateChange} />
                      </div>
                    </FormControl>
                    <FormDescription>กรุณากรอกวันเกิดของคุณ</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">อายุ</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="shadow-md"
                        {...field}
                        value={form.watch("age")}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>
                      ระบบจะใช้ข้อมูลนี้เพื่อปรับปรุงการแสดงผล
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">น้ำหนัก</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="shadow-md"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // ต้องเรียก field.onChange เพื่ออัปเดตค่าของฟอร์ม
                          handleFieldChange(); // คำนวณ BMI
                        }}
                      />
                    </FormControl>
                    <FormDescription>กรุณากรอกน้ำหนักของคุณ</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
          
             
              
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex " onClick={() => setStep(1)}>
            <ChevronLeft /> กลับ 
            </Button>
            <Button className="btn flex " onClick={() => setStep(3)}>
              ถัดไป <ChevronRight />
            </Button>
          </div>
              {/* {isLoading ? (<Button><Loader2 className="animate-spin mr-2"/>กรุณารอสักครู่...</Button>) : <Button className="btn">ถัดไป</Button>} */}


            
            </form>
          </Form>
        </Card>
      ) : null}
    </div>
  );
}
