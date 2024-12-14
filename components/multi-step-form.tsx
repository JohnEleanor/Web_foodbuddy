"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalInfoStep } from "@/components/form-steps/personal-info-step";
// import { DietaryPreferencesStep } from "@/components/form-steps/dietary-preferences-step";
import { FavoriteIngredientsStep } from "@/components/form-steps/favorite-ingredients-step";
import { SubmissionStep } from "@/components/form-steps/submission-step";
import { LifestyleStep } from "@/components/form-steps/lifestyle-step";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { title: "ข้อมูลส่วนตัว", component: PersonalInfoStep }, // case 0
  { title: "ไลฟ์สไตล์", component: LifestyleStep }, // case 1
  { title: "วัตถุดิบที่ชื่นชอบ", component: FavoriteIngredientsStep }, // case 2
  { title: "ยืนยันข้อมูล", component: SubmissionStep }, // case 3
];

export function MultiStepForm() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: 0,
    height: 0,
    bmi: 0,
    lifestyle: "",
    dietaryPreferences: [],
    favoriteIngredients: [],
  });
  const [errors, setErrors] = useState({});

  const CurrentStepComponent = steps[currentStep].component;

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);
  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length === 0) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      } else {
        setIsDialogOpen(true);
      }
    } else {
      setErrors(stepErrors);
      console.error("Step validation failed:", stepErrors);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpdateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  const validateStep = (step: number, data: typeof formData) => {
    const stepErrors: Record<string, string> = {};
    switch (step) {
      case 0: // Personal Info
        if (!data.name.trim()) stepErrors.name = "กรุณาใส่ชื่อของคุณ";

        if (isNaN(Number(data.age)) || Number(data.age) == 0)
          stepErrors.age = "กรุณาใส่อายุของคุณ";

        if (isNaN(Number(data.weight)) || Number(data.weight) == 0)
          stepErrors.weight = "กรุณาใส่น้ำหนักของคุณ";
        if (isNaN(Number(data.height)) || Number(data.height) == 0)
          stepErrors.height = "กรุณาใส่ส่วนสูงของคุณ";

        break;
      case 1: // Dietary Preferences
        if (!data.lifestyle) stepErrors.lifestyle = "กรุณาเลือกไลฟ์สไตล์ของคุณ";
        // if (data.dietaryPreferences.length === 0) stepErrors.dietaryPreferences = "Please select at least one dietary preference"
        break;
      case 2: // Favorite Ingredients
        if (data.favoriteIngredients.length === 0)
          stepErrors.favoriteIngredients = "Please add at least one favorite ingredient";
        break;
    }
    return stepErrors;
  };

  const handleConfirm = () => {
    if (termsAccepted) {
      setIsDialogOpen(false);
      toast({
        title: "ข้อมูลถูกบันทึกเรียบร้อยแล้ว",
        description: "กำลังนำคุณไปยังหน้า Dashboard",
      });
      console.log(formData);
      // router.push("/dashboard")
    } else {
      toast({
        title: "กรุณายอมรับข้อกำหนดและเงื่อนไข",
        description: "คุณต้องยอมรับข้อกำหนดและเงื่อนไขก่อนดำเนินการต่อ",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* <div className="text-2xl">กรอกข้อมูลของคุณ</div> */}
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={steps.length}
            />
          </div>
          <CurrentStepComponent
            formData={formData}
            updateFormData={handleUpdateFormData}
            errors={errors}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            ย้อนกลับ
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "ยืนยัน" : "ถัดไป"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันข้อมูล</DialogTitle>
            <DialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการยืนยันข้อมูลของคุณ?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="font-semibold mb-2">ข้อกำหนดและเงื่อนไข</h3>
            <p className="text-sm text-muted-foreground mb-4">
              โดยการยอมรับข้อกำหนดและเงื่อนไขนี้
              คุณยินยอมให้เราใช้ข้อมูลของคุณเพื่อปรับปรุงบริการของเรา
              เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สามโดยไม่ได้รับอนุญาตจากคุณ
            </p>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  setTermsAccepted(checked as boolean)
                }
              />
              {/* <Label htmlFor="terms">ฉันยอมรับข้อกำหนดและเงื่อนไข</Label> */}
              <Label >ฉันยอมรับข้อกำหนดและเงื่อนไข</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleConfirm}>ยืนยัน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProgressIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="flex justify-between">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-full h-2 rounded-full ${
            index <= currentStep
              ? "bg-lime-500 ease-in duration-300"
              : "bg-gray-200 ease-in duration-300"
          } ${index < totalSteps - 1 ? "mr-1" : ""}`}
        />
      ))}
    </div>
  );
}
