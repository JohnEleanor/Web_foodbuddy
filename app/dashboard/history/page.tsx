'use client';
import { HistoryEat } from "@/components/dashboard/history-eat";
import { HistoryCalories } from "@/components/history/history-calories";

export default function Page() {
  return (
    <>
    <div className="text-2xl mb-4">ประวัติการกิน </div>
    <div className="max-h-fit flex-1 rounded-xl  md:min-h-min p-1 overflow-x-auto">
        <HistoryCalories /> {/* asdasd */}
    </div>
    <div className="max-h-fit flex-1 rounded-xl border md:min-h-min p-4 overflow-x-auto">
        <HistoryEat />
    </div>
    </>
  )
}

