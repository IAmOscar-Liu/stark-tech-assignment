"use client";

import { formatNumber } from "@/lib/number";
import { getStockRevenueTicks } from "@/lib/stockRevenue";
import { cn } from "@/lib/utils";
import { StockMonthRevenue } from "@/types";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Props } from "recharts/types/component/Legend";

function RevenuChart({
  classname,
  revenues,
}: {
  classname?: string;
  revenues: StockMonthRevenue[];
}) {
  const data = revenues.map((r) => ({
    name: `${r.revenue_year}${String(r.revenue_month).padStart(2, "0")}`,
    revenue: Math.round(r.revenue / 1000),
    growRage: r.revenue_growth_rate ?? 0,
  }));

  return (
    <div className={cn("overflow-x-auto", classname)}>
      <div className="relative min-w-[800px]">
        {/** left label */}
        <div className="absolute left-[70px] top-0 font-medium">千元</div>
        {/** right label */}
        <div className="absolute right-[50px] top-0 font-medium">%</div>

        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={data}
            margin={{ top: 30, right: 10, left: 50, bottom: 5 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="0" />
            <XAxis
              dataKey="name"
              padding={{ left: 5, right: 5 }}
              tickLine={false}
              ticks={getStockRevenueTicks(data)}
              interval={0}
              tickFormatter={(value) => {
                const valueStr = String(value);
                if (revenues.length > 58)
                  return valueStr.endsWith("01") ? valueStr.slice(0, 4) : "";
                return valueStr;
              }}
            />
            {/* Left Y-Axis for Bar */}
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => formatNumber(+value)}
            />
            {/* Right Y-Axis for Line */}
            <YAxis
              yAxisId="right"
              axisLine={false}
              tickLine={false}
              orientation="right"
              tickFormatter={(value) => Math.round(+value * 100) + ""}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "每月營收")
                  return [formatNumber(+value), name + "(千元)"];
                if (name === "單月營收年增率")
                  return [(+value * 100).toFixed(2) + "%", name];
                return [value, name];
              }}
            />
            <Legend
              // @ts-expect-error: Should expect props
              content={renderLegend}
            />
            {/* Bar chart linked to left Y-axis */}
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="#f6df99"
              name="每月營收"
              stroke="#e8af02"
            />
            {/* Line chart linked to right Y-axis */}
            <Line
              yAxisId="right"
              dataKey="growRage"
              stroke="#cd5151"
              name="單月營收年增率"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function renderLegend(props: Props) {
  const { payload } = props; // `payload` contains the legend items
  return (
    <ul className="mt-4 flex list-none justify-center gap-4">
      {payload &&
        payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            className="mb-1 flex flex-wrap items-center"
          >
            {/* Rectangle with line color */}
            <div
              className="me-2 size-3"
              style={{
                backgroundColor: entry.color,
              }}
            ></div>
            {/* Data key */}
            <span className="text-sm capitalize">
              {entry.value === "每月營收"
                ? entry.value + "(千元)"
                : entry.value === "單月營收年增率"
                  ? entry.value + " (%)"
                  : entry.value}
            </span>
          </li>
        ))}
    </ul>
  );
}

export default RevenuChart;
