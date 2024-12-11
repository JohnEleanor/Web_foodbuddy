import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Keto",
  "Paleo",
  "Low-carb",
]

export function DietaryPreferencesStep({ formData, updateFormData, errors }) {
  
  const handleCheckboxChange = (option: string) => {
    const updatedPreferences = formData.dietaryPreferences.includes(option)
      ? formData.dietaryPreferences.filter((item) => item !== option)
      : [...formData.dietaryPreferences, option]
    updateFormData({ dietaryPreferences: updatedPreferences })
  }

  return (
    <div className="space-y-4">
      {dietaryOptions.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={option}
            checked={formData.dietaryPreferences.includes(option)}
            onCheckedChange={() => handleCheckboxChange(option)}
          />
          <Label htmlFor={option}>{option}</Label>
        </div>
      ))}
      {errors.dietaryPreferences && (
        <p className="text-red-500 text-sm mt-1">{errors.dietaryPreferences}</p>
      )}
    </div>
  )
}

