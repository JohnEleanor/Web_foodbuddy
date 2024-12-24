"use client";
import { CaltoDay } from "@/components/dashboard/calories-to-day";
import { Nutrients } from "@/components/dashboard/nutrients";
import { HistoryEat } from "@/components/dashboard/history-eat";

export default function Page() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div>
          <CaltoDay />
        </div>
        <div className="col-span-1 lg:col-span-2 md:col-span-2 ">
          <Nutrients />
        </div>
      </div>

      <div className="min-h-max flex-1 rounded-lg border md:min-h-min p-4 overflow-x-auto">
        <HistoryEat />
      </div>

    </>
  );
}
