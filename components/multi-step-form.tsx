"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalInfoStep } from "@/components/form-steps/personal-info-step"
import { DietaryPreferencesStep } from "@/components/form-steps/dietary-preferences-step"
import { FavoriteIngredientsStep } from "@/components/form-steps/favorite-ingredients-step"
import { SubmissionStep } from "@/components/form-steps/submission-step"

const steps = [
  { title: "ข้อมูลส่วนตัว", component: PersonalInfoStep },
  { title: "Dietary Preferences", component: DietaryPreferencesStep },
  { title: "Favorite Ingredients", component: FavoriteIngredientsStep },
  { title: "Submit", component: SubmissionStep },
]



export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: null,
    height: null,
    bmi : 0,
    brithday: "",
    dietaryPreferences: [],
    favoriteIngredients: [],
  })
  const [errors, setErrors] = useState({})

  const CurrentStepComponent = steps[currentStep].component

  useEffect(() => {
    console.log("formData", formData)
  }, [formData])
  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length === 0) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
        setErrors({})
      }
    } else {
      setErrors(stepErrors)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleUpdateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData })
  }

  const validateStep = (step: number, data: typeof formData) => {
    const stepErrors: Record<string, string> = {}
    switch (step) {
      case 0: // Personal Info
        if (!data.name.trim()) stepErrors.name = "กรุณาใส่ชื่อของคุณ"

        if (isNaN(Number(data.age)) || Number(data.age) == 0 ) stepErrors.age = "กรุณาใส่อายุของคุณ"
        
        if (isNaN(Number(data.weight)) || Number(data.weight) == 0 ) stepErrors.weight = "กรุณาใส่น้ำหนักของคุณ"
        if (isNaN(Number(data.height)) || Number(data.height) == 0 ) stepErrors.height = "กรุณาใส่ส่วนสูงของคุณ"
 
      
        break
      case 1: // Dietary Preferences
        if (data.dietaryPreferences.length === 0) stepErrors.dietaryPreferences = "Please select at least one dietary preference"
        break
      case 2: // Favorite Ingredients
        if (data.favoriteIngredients.length === 0) stepErrors.favoriteIngredients = "Please add at least one favorite ingredient"
        break
    }
    return stepErrors
  }

  return (
    <Card className="w-11/12 shadow-lg">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} />
        </div>
        <CurrentStepComponent
          formData={formData}
          updateFormData={handleUpdateFormData}
          errors={errors}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>
          ย้อนกลับ
        </Button>
        <Button onClick={handleNext} >
          {currentStep === steps.length - 1 ? "ยืนยัน" : "ถัดไป"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex justify-between">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-full h-2 rounded-full ${
            index <= currentStep ? "bg-lime-500 ease-in duration-300" : "bg-gray-200 ease-in duration-300"
          } ${index < totalSteps - 1 ? "mr-1" : ""}`}
        />
      ))}
    </div>
  )
}

