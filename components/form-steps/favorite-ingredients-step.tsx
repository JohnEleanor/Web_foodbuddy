import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function FavoriteIngredientsStep({ formData, updateFormData, errors }) {
  const [ingredient, setIngredient] = useState("")

  const handleAddIngredient = () => {
    if (ingredient && !formData.favoriteIngredients.includes(ingredient)) {
      updateFormData({
        favoriteIngredients: [...formData.favoriteIngredients, ingredient],
      })
      setIngredient("")
    }
  }

  const handleRemoveIngredient = (item: string) => {
    updateFormData({
      favoriteIngredients: formData.favoriteIngredients.filter((i) => i !== item),
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ingredient">Add Favorite Ingredient</Label>
        <div className="flex space-x-2">
          <Input
            id="ingredient"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter an ingredient"
          />
          <Button onClick={handleAddIngredient}>Add</Button>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Your Favorite Ingredients:</h3>
        <ul className="list-disc list-inside">
          {formData.favoriteIngredients.map((item) => (
            <li key={item} className="flex justify-between items-center">
              {item}
              <Button variant="ghost" size="sm" onClick={() => handleRemoveIngredient(item)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {errors.favoriteIngredients && (
        <p className="text-red-500 text-sm mt-1">{errors.favoriteIngredients}</p>
      )}
    </div>
  )
}

