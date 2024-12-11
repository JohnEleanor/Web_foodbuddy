export function SubmissionStep({ formData }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Review Your Information</h3>
      <div>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
      </div>
      <div>
        <p><strong>Dietary Preferences:</strong></p>
        <ul className="list-disc list-inside">
          {formData.dietaryPreferences.map((pref) => (
            <li key={pref}>{pref}</li>
          ))}
        </ul>
      </div>
      <div>
        <p><strong>Favorite Ingredients:</strong></p>
        <ul className="list-disc list-inside">
          {formData.favoriteIngredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

