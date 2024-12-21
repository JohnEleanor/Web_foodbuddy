"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator";


const chartData = [
  { browser: "safari", visitors: 26, fill: "var(--color-safari)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function CaltoDay() {
  return (
    <>
      <Card className="max-w-full md:max-w-lg lg:max-w-xl h-full rounded-lg">
        {/* <CardHeader className="text-center">
          <CardTitle className="text-lg font-bold md:text-xl lg:text-2xl">
            เคลอรี่วันนี้
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-gray-600">
            Card Description
          </CardDescription>
        </CardHeader> */}
        <CardContent className="py-8">
        <ChartContainer
          config={chartConfig}
          className="mx-auto  max-h-[180px] w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={200}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-muted-foreground"
                        >
                          กิโลแคลอรี่
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        </CardContent>
        <CardFooter className="">
          <div className="flex w-full items-center  pt-2">
          <Separator orientation="vertical" className="mx-4 h-10 w-px" />
            <div className="flex w-full items-center  ">
              <div className="grid flex-1">
                <div className="text-xs text-muted-foreground">เคลอรี่วันนี้</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  1,500
                  <span className="text-sm font-normal text-muted-foreground">
                    / 2,000
                  </span>
                </div>
              </div>
              
            </div>
          </div>
        </CardFooter>
        
      </Card>
    </>
  );
}
