interface submission {
  formData: any;
  updateFormData: (data: any) => void;
  errors: any;
}

export function SubmissionStep({ formData, updateFormData, errors }: submission) {
  const { age, weight, height, gender, lifestyle, target } = formData;

  const getLifestyleLabel = (value: keyof typeof lifestyleMap) => {
    const lifestyleMap: { [key in 'sedentary' | 'light' | 'moderate' | 'active' | 'intense']: string } = {
      sedentary: "ไม่ออกกำลังกาย / ทำงานนั่งโต๊ะ",
      light: "ออกกำลังกายเบาๆ (3-5 ครั้งต่อสัปดาห์)",
      moderate: "ออกกำลังกาย (3-5 ครั้งต่อสัปดาห์)",
      active: "ออกกำลังกาย (6-7 ครั้งต่อสัปดาห์)",
      intense: "ออกกำลังกายหนักวัน (วันละ 2 ช่วง)",
    };
    return lifestyleMap[value] || value;
  };

  const getTargetLabel = (value: keyof typeof targetMap) => {
    const targetMap: { [key in 'balance-weight' | 'gain-weight' | 'lose-weight']: string } = {
      "balance-weight": "ฉันต้องการรักษาน้ำหนักเท่าเดิม",
      "gain-weight": "ฉันต้องการเพิ่มน้ำหนัก",
      "lose-weight": "ฉันต้องการลดน้ำหนัก",
    };
    return targetMap[value] || value;
  };

  function calculateCaloriesPerDay(age: number, weight: number, height: number, gender: string, lifestyle: string, target: string): number {
    let BMR: number;

    // Mifflin-St Jeor Equation for BMR calculation
    if (gender === "male") {
      BMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
      BMR = 665 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }

    BMR = Math.round(BMR);
    console.log(BMR)

    // Adjust BMR based on activity level
    let activityFactor: number;

    switch (lifestyle) {
      case "sedentary":
        activityFactor = 1.2;
        break;
      case "light":
        activityFactor = 1.375;
        break;
      case "moderate":
        activityFactor = 1.55;
        break;
      case "active":
        activityFactor = 1.725;
        break;
      case "intense":
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.2; // Default to sedentary if activity level is not specified
    }

    // Calculate total daily caloric needs
    let calories = Math.round(BMR * activityFactor);
    console.log("TDEE", calories)
    // Adjust based on target weight
    console.log(target)
    if (target === "ลดน้ำหนัก") {
      calories -= 500; // Reduce 500 calories to lose weight (1 lb per week)
    } else if (target === "เพิ่มน้ำหนัก") {
      calories += 500; // Add 500 calories to gain weight (1 lb per week)
    }
    
    return calories;
  }

  const dailyCalories = calculateCaloriesPerDay(age, weight, height, gender, lifestyle, target);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">ตรวจสอบข้อมูลของคุณ</h3>
      <div>
        <p><strong>ชื่อ :</strong> {formData.name}</p>
        <p><strong>อายุ :</strong> {age}</p>
        {gender === "male" ? <p><strong>เพศ :</strong> ชาย</p> : <p><strong>เพศ :</strong> หญิง</p>}
        <p><strong>น้ำหนัก :</strong> {weight} กิโลกรัม</p>
        <p><strong>ส่วนสูง :</strong> {height} เซนติเมตร</p>
        <p><strong>BMI :</strong> {formData.bmi}</p>
        <p><strong>เป้าหมาย :</strong> {getTargetLabel(target)}</p>
        <p><strong>ไลฟ์สไตล์ :</strong> {getLifestyleLabel(lifestyle)}</p>
        <p><strong>เป้าหมายน้ำหนัก :</strong> {formData.target_weight} กิโลกรัม</p>
        <p><strong>แคลอรี่ที่ต้องการต่อวัน :</strong> {dailyCalories} kcal.</p>
      </div>
      
      <div>
        <p><strong>โรคประจำตัว</strong></p>
        <ul className="list-disc list-inside">
          {formData.disease.map((disease: any) => (
            <li key={disease}>{disease}</li>
          ))}
        </ul>
        {formData.disease_other && <p>โรคประจำตัวอื่นๆ : {formData.disease_other}</p>}
      </div>

      <div>
        <p><strong>เเพ้อาหาร</strong></p>
        <ul className="list-disc list-inside">
          {formData.foodallery.map((foodallery: any) => (
            <li key={foodallery}>{foodallery}</li>
          ))}
        </ul>
        {formData.foodallery_other && <p>อาหารที่เเพ้อื่นๆ : {formData.foodallery_other}</p>}
      </div>
    </div>
  );
}
