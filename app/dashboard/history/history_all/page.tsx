'use client';
import { HistoryEat } from "@/components/dashboard/history-eat"
import { HistoryStats } from "@/components/history/history-stats"
export default function Page() {
  return (
    <>
    <div className="text-2xl mb-4">ประวัติการกินทั้งหมด </div>
    <div className="max-h-fit flex-1 rounded-xl  md:min-h-min overflow-x-auto">
        <HistoryStats totalItems={10} savoryCount={1} sweetCount={22} totalCalories={1500} />
    </div>
    <div className="max-h-fit flex-1 rounded-xl border md:min-h-min p-4 overflow-x-auto">
        <HistoryEat />
    </div>
    </>
  );
}
