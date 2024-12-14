

export function SubmissionStep({ formData }: { formData: any }) {
  const getLifestyleLabel = (value: keyof typeof lifestyleMap) => {
    const lifestyleMap: { [key in 'sedentary' | 'light' | 'moderate' | 'active' | 'intense']: string } = {
      sedentary: "ไม่ออกกำลังกาย / ทำงานนั่งโต๊ะ",
      light: "ออกกำลังกายเบาๆ (3-5 ครั้งต่อสัปดาห์)",
      moderate: "ออกกำลังกาย (3-5 ครั้งต่อสัปดาห์)",
      active: "ออกกำลังกาย (6-7 ครั้งต่อสัปดาห์)",
      intense: "ออกกำลังกายหนักวัน (วันละ 2 ช่วง)",
    }
    return lifestyleMap[value] || value
  }

  const getTargetLabel = (value: keyof typeof targetMap) => { 
    const targetMap: { [key in 'balance-weight' | 'gain-weight' | 'lose-weight']: string } = {
      "balance-weight": "ฉันต้องการรักษาน้ำหนักเท่าเดิม",
      "gain-weight": "ฉันต้องการเพิ่มน้ำหนัก",
      "lose-weight": "ฉันต้องการลดน้ำหนัก",
    }
    return targetMap[value] || value
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">ตรวจสอบข้อมูลของคุณ</h3>
      <div>
        <p><strong>ชื่อ :</strong> {formData.name}</p>
        <p><strong>อายุ :</strong> {formData.age}</p>
        <p><strong>น้ำหนัก :</strong> {formData.weight} กิโลกรัม</p>
        <p><strong>ส่วนสูง :</strong> {formData.height} เซนติเมตร</p>
        <p><strong>BMI :</strong> {formData.bmi}</p>
        <p><strong>เป้าหมาย :</strong> {getTargetLabel(formData.target)}</p>
        <p><strong>ไลฟ์สไตล์ :</strong> {getLifestyleLabel(formData.lifestyle)}</p>
        <p><strong>เป้าหมายน้ำหนัก :</strong> {formData.target_weight} กิโลกรัม</p>

      </div>
      
      <div>
        <p><strong>วัตถุดิบที่ชื่นชอบ:</strong></p>
        <ul className="list-disc list-inside">
          {formData.favoriteIngredients.map((ingredient: any) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

