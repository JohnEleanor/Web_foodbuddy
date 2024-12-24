import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Utensils, Cake } from "lucide-react";

interface HistoryStatsProps {
  totalItems: number;
  savoryCount: number;
  sweetCount: number;
  totalCalories: number;
}

export function HistoryStats({ totalItems, savoryCount, sweetCount, totalCalories }: HistoryStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">รายการทั้งหมด</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">รายการ</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">ของคาว</CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{savoryCount}</div>
          <p className="text-xs text-muted-foreground">รายการ</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">ของหวาน</CardTitle>
          <Cake className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sweetCount}</div>
          <p className="text-xs text-muted-foreground">รายการ</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">แคลอรี่รวม</CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCalories}</div>
          <p className="text-xs text-muted-foreground">Kcal</p>
        </CardContent>
      </Card>
    </div>
  );
}