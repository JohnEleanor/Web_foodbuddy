
import { CaltoDay } from "@/components/dashboard/calories-to-day"

export function HistoryCalories() {
  return (
    <>
        <div className="grid gap-4 lg:grid-cols-4">
            <div><CaltoDay/></div>
            <div><CaltoDay/></div>
            <div><CaltoDay/></div>
            <div><CaltoDay/></div>
            
        </div>
    </>
  )
}

