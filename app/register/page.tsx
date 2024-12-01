"use client";

// ? Libraries
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ? Libraries UI
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
import {
  Utensils,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Activity,
  FilePen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, MousePointerClick } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
    // activity: z.enum(["noactivity", "activity1", "activity2", "activity3", "activity4", "none"]).refine(value => value !== "none") {
    //   message : "กรุณาเลือกกิจกรรม"
    // },
    activity: z.enum(["noactivity", "activity1", "activity2", "activity3", "activity4", "none"],{
      message: "กรุณาเลือกกิจกรรม",  // ข้อความแจ้งเตือนเมื่อค่าเป็น 'none'
    })
    
});




const cards = [
  { id: 1, title: 'noactivity', description: 'ไม่ออกกำลังกาย / ทำงานนั่งโต๊ะ', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478061.png' },
  { id: 2, title: 'activity1', description: 'ออกกำลังกายเบาๆ (3-5 ครั้งต่อสัปดาห์)', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478060.png' },
  { id: 3, title: 'activity2', description: 'ออกกำลังกาย (3-5 ครั้งต่อสัปดาห์)', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478057.png' },
  { id: 4, title: 'activity3', description: 'ออกกำลังกาย (6-7 ครั้งต่อสัปดาห์)', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478058.png' },
  { id: 5, title: 'activity4', description: 'ออกกำลังกายทุกวัน (วันละ 2 เวลา)', imageUrl: 'https://cdn-icons-png.flaticon.com/512/6478/6478059.png' },
];

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

type ActivityType = z.infer<typeof FormSchema>["activity"];

export default function InputForm() {
  const [step, setStep] = useState<number>(1); // ใช้ในการควบคุมขั้นตอนฟอร์ม
  const [bmi, setBmi] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [goal, setGoal] = useState(200);
  const [userData, setUserData] = useState([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleSelectCard = (cardId: number, cardTitle : string) => {
   
    const card = cards.find((card) => card.title === cardTitle);
    if (card) {
      setSelectedCard(card.id);
      console.log(card.title);
      if (["noactivity", "activity1", "activity2", "activity3", "activity4"].includes(cardTitle)) {
        // form.setValue("activity", cardTitle); // ตั้งค่า activity เป็นชื่อของกิจกรรมที่เลือก
        form.setValue("activity", card.title as ActivityType);
      } else {
        console.error("กิจกรรมไม่ถูกต้อง");
      }
      console.log(form.getValues("activity"));
    }
  };



  const handleGoBack = () => {
    setStep(step - 1); // ลดขั้นตอนเมื่อกดย้อนกลับ
  };
  const handleGoNext = () => {
    setStep(step + 1); // เพิ่มขั้นตอนเมื่อกดถัดไป
  };

  // ฟังก์ชันเมื่อกรอกอายุ
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(e.target.value, 10);
    form.setValue("age", age); // อัปเดตอายุในฟอร์ม
  };

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      birthdate: new Date(),
      age: 0,
      weight: "",
      height: "",
      bmi: 0, // กำหนดค่า BMI เป็น 0 หรือ undefined
      activity : "none",
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

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const calculatedAge = calculateAge(date); // คำนวณอายุจากวันเกิด
      form.setValue("birthdate", date); // ตั้งค่าของวันเกิด
      form.setValue("age", calculatedAge); // ตั้งค่าของอายุในฟอร์ม
      form.watch("age");
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
  }, [form.watch("weight"), form.watch("height"), form.watch("age")]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { username, age, bmi, weight, height, activity } = data;

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{`
          username : ${username}
          age : ${age}
          bmi : ${bmi}
          weight : ${weight} 
          height : ${ height} 
          activity : ${activity}`}</code>
        </pre>
      ),
    });

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step === 1) {
        setStep(2);
      }else if (step === 2) {
        setStep(step + 1); 
      }
    }, 500);
  }

  return (
    <div className="flex flex-2 flex-col gap-2 p-4 justify-self-center xl:w-2/5 md:gap-8 md:p-8">
      <nav className="flex-col self-center gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Utensils className="h-6 w-6" />
      </nav>
      {step === 1 ? (
        <Card className="p-11 shadow-xl">
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
                        onChange={handleAgeChange} // เรียกใช้ฟังก์ชันที่คำนวณอายุ
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
              {form.formState.isValid ? (
                <div className="grid grid-cols-1 gap-2">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="animate-spin mr-2" />
                      กรุณารอสักครู่...
                    </Button>
                  ) : (
                      <Button className="btn" type="submit">
                        ถัดไป <ChevronRight />
                      </Button>
                  )}
                </div>
              ) : (
                
                 <div className="grid grid-cols-1 gap-2">
                  <Button className="btn" type="submit">
                    ต่อไป <ChevronRight />
                  </Button>
               </div>
              )}
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
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-1 gap-2">
                        {cards.map((card) => (
                         
                          <Card
                            key={card.id}
                            onClick={() => handleSelectCard(card.id, card.title)}
                            className={`cursor-pointer transition-all rounded-lg ${
                              selectedCard === card.id
                                ? "bg-green-500 text-white"
                                : "dark:bg-dark-bg border-2 border-gray-300 hover:bg-gray-300 dark:hover:bg-green-400 dark:hover:text-white"
                            }`}
                            onSelect={field.onChange}
                            defaultValue={field.value}
                          >
                            <CardHeader className="flex items-center space-x-4 p-4">
                              <div className="w-16 h-16 flex-shrink-0">
                                <img
                                  src={card.imageUrl}
                                  alt={card.title}
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex-1">
                                  <CardDescription
                                    className={`text-sm mt-2 ${
                                      selectedCard === card.id
                                        ? "text-white"
                                        : "text-gray-600 dark:text-gray-300"
                                    }`}
                                  >
                                    {card.description}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardFooter className="flex items-center">
                              {selectedCard === card.id && (
                                <p className="text-sm">เลือก</p>
                              )}
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription>
                      ระบบจะใช้ข้อมูลนี้เพื่อปรับปรุงการแสดงผล
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex "
                  onClick={() => setStep(step - 1)}
                >
                  <ChevronLeft /> กลับ
                </Button>
                {/* <Button className="btn flex " onClick={form.handleSubmit(onSubmit)}>
                  ถัดไป <ChevronRight />
                </Button> */}
                {isLoading ? (
                    <Button disabled>
                      <Loader2 className="animate-spin mr-2" />
                      กรุณารอสักครู่...
                    </Button>
                  ) : (
                      <Button className="btn" type="submit">
                        ถัดไป <ChevronRight />
                      </Button>
                  )}
              </div>

              {/* {form.formState.isValid ? (
                <div className="grid grid-cols-1 gap-2">
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="animate-spin mr-2" />
                      กรุณารอสักครู่...
                    </Button>
                  ) : (
                      <Button className="btn" type="submit">
                        ถัดไป <ChevronRight />
                      </Button>
                  )}
                </div>
              ) : (
                
                 <div className="grid grid-cols-1 gap-2">
                  <Button className="btn" type="submit" disabled>
                    กรอกข้อมูลยังไม่ครบ <ChevronRight />
                  </Button>
               </div>
              )} */}
              {/* {isLoading ? (<Button><Loader2 className="animate-spin mr-2"/>กรุณารอสักครู่...</Button>) : <Button className="btn">ถัดไป</Button>} */}
            </form>
          </Form>
        </Card>
      ) : step === 3 ? (
        <Card className="p-11 shadow-xl">
          <CardTitle className="text-xl ">เป้าหมายของคุณ</CardTitle>
          <CardDescription className="mb-5">
            กรุณากรอกข้อมูลของคุณเพื่อนำไปคำนวณเเละปรับปรุงสุขภาพของคุณ
          </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              {/* เนื้อหา */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex "
                  onClick={() => setStep(2)}
                >
                  <ChevronLeft /> กลับ
                </Button>
                <Button className="btn flex " onClick={() => setStep(4)}>
                  ถัดไป <ChevronRight />
                </Button>
              </div>
              {/* {isLoading ? (<Button><Loader2 className="animate-spin mr-2"/>กรุณารอสักครู่...</Button>) : <Button className="btn">ถัดไป</Button>} */}
            </form>
          </Form>
        </Card>
      ) : step === 4 ? (
        <Card className="p-11 shadow-xl">
          <CardTitle className="text-xl ">กรุณาตั้งเป้าหมายของคุณ</CardTitle>
          <CardDescription className="mb-5">
            กรุณากรอกข้อมูลของคุณเพื่อนำไปคำนวณเเละปรับปรุงสุขภาพของคุณ
          </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              {/* เนื้อหา */}
              <FormField
                control={form.control}
                name="bmi"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="grid justify-items-center">
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button
                              variant="outline"
                              className="shadow-xl bg-lime-green btn"
                            >
                              กดเพื่อตั้งเป้าหมาย <MousePointerClick />{" "}
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                              <DrawerHeader>
                                <DrawerTitle>Move Goal</DrawerTitle>
                                <DrawerDescription>
                                  Set your daily activity goal.
                                </DrawerDescription>
                              </DrawerHeader>
                              <div className="p-4 pb-0">
                                <div className="flex items-center justify-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => onClick(-10)}
                                    disabled={goal <= 200}
                                  >
                                    <Minus />
                                    <span className="sr-only">Decrease</span>
                                  </Button>
                                  <div className="flex-1 text-center">
                                    <div className="text-7xl font-bold tracking-tighter">
                                      {goal}
                                    </div>
                                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                                      Calories/day
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() => onClick(10)}
                                    disabled={goal >= 400}
                                  >
                                    <Plus />
                                    <span className="sr-only">Increase</span>
                                  </Button>
                                </div>
                                <div className="mt-3 h-[120px]">
                                  <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                  >
                                    <BarChart data={data}>
                                      <Bar
                                        dataKey="goal"
                                        style={
                                          {
                                            fill: "hsl(var(--foreground))",
                                            opacity: 0.9,
                                          } as React.CSSProperties
                                        }
                                      />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>
                              <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                              </DrawerFooter>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </div>
                    </FormControl>
                    <FormDescription>
                      ระบบจะใช้ข้อมูลนี้เพื่อปรับปรุงการแสดงผล
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex "
                  onClick={() => setStep(3)}
                >
                  <ChevronLeft /> กลับ
                </Button>
                <Button className="btn flex " onClick={() => setStep(5)}>
                  ถัดไป <ChevronRight />
                </Button>
              </div>
              {/* {isLoading ? (<Button><Loader2 className="animate-spin mr-2"/>กรุณารอสักครู่...</Button>) : <Button className="btn">ถัดไป</Button>} */}
            </form>
          </Form>
        </Card>
      ) : step === 5 ? (
        <Card className="p-11 shadow-xl">
          <CardTitle className="text-xl ">โปรดระบบโรคเเละข้อมูลการเเพ้อาหาร</CardTitle>
          <CardDescription className="mb-5">
          กรุณากรอกข้อมูลของคุณเพื่อนำไปคำนวณเเละปรับปรุงสุขภาพของคุณ
          </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              {/* เนื้อหา */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex "
                  onClick={() => setStep(4)}
                >
                  <ChevronLeft /> กลับ
                </Button>
                <Button className="btn flex " onClick={() => setStep(6)}>
                  ถัดไป <ChevronRight />
                </Button>
              </div>
              {/* {isLoading ? (<Button><Loader2 className="animate-spin mr-2"/>กรุณารอสักครู่...</Button>) : <Button className="btn">ถัดไป</Button>} */}
            </form>
          </Form>
        </Card>
        ) : step === 6 ? (
        <Card className="p-11 shadow-xl">
          <CardTitle className="text-xl ">ข้อมูลของคุณ</CardTitle>
          <CardDescription className="mb-5">
          หารกรอกข้อมูลผิดสามารถย้อนกลับไปเเก้ไขได้
          </CardDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-10"
            >
              {/* เนื้อหา */}
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex "
                  onClick={() => setStep(5)}
                >
                  <ChevronLeft /> กลับ
                </Button>
                <Button className="btn flex " onClick={() => setStep(6)}>
                  ยืนยัน 
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
