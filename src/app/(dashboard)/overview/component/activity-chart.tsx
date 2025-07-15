"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
const chartData = [
  { month: "Mon", desktop: 286 },
  { month: "Tue", desktop: 305 },
  { month: "Wed", desktop: 97 },
  { month: "Thu", desktop: 373 },
  { month: "Fri", desktop: 109 },
  { month: "Sat", desktop: 214 },
  { month: "Sun", desktop: 60 },
];

export function ActivityChart() {
  const [selected, setselected] = useState("transaction");

  const chartConfig = {
    desktop: {
      label: selected,
      color: "var(--primary)",
    },
  } satisfies ChartConfig;
  return (
    <div className="bg-white px-[25px] py-5">
      <div className="flex justify-between items-center mb-2.5">
        <p className="text-xs font-medium text-black-02 capitalize">
          weekly Chart
        </p>
        <Select
          onValueChange={(value: string) => {
            setselected(value);
          }}
          defaultValue={selected}
        >
          <SelectTrigger
            className={cn(
              "min-w-[90px] h-8 text-black-02 border-white-07 rounded-[3px] py-2 px-2.5 shadow-none"
            )}
          >
            <SelectValue className="" placeholder={"Select Option"} />
          </SelectTrigger>
          <SelectContent className=" overflow-y-auto">
            <SelectItem value={"transaction"} className="py-2 text-black-01">
              Transaction
            </SelectItem>
            <SelectItem value={"customer"} className="py-2 text-black-01">
              Customers
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer
        className="bg-white-01 rounded-xm p-2 max-h-[215px] w-full"
        config={chartConfig}
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="linear"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
