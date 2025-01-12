"use client";

import { formatNumber } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import { StockMonthRevenue } from "@/types";
import { useEffect, useRef } from "react";

const BASE_TD_CLASS =
  "border-[1px] border-border p-2 text-right whitespace-nowrap";

function RevenueTable({
  classname,
  revenues,
}: {
  classname?: string;
  revenues: StockMonthRevenue[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-md border-[1px] border-border",
        classname,
      )}
      ref={containerRef}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              className={cn(BASE_TD_CLASS, "z-1 sticky left-0 p-0 text-left")}
            >
              <div className="ms-[-1px] border-r-[1px] border-r-border bg-slate-100 p-2">
                年度月份
              </div>
            </th>
            {revenues.map((r, rIdx) => (
              <th
                key={rIdx}
                className={cn(BASE_TD_CLASS, "bg-slate-100")}
              >{`${r.revenue_year}${String(r.revenue_month).padStart(2, "0")}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              className={cn(BASE_TD_CLASS, "z-1 sticky left-0 p-0 text-left")}
            >
              <div className="ms-[-1px] border-r-[1px] border-r-border bg-background p-2">
                年月營收(千元)
              </div>
            </td>
            {revenues.map((r, rIdx) => (
              <td key={rIdx} className={BASE_TD_CLASS}>
                {formatNumber(Math.round(r.revenue / 1000))}
              </td>
            ))}
          </tr>
          <tr>
            <td
              className={cn(BASE_TD_CLASS, "z-1 sticky left-0 p-0 text-left")}
            >
              <div className="ms-[-1px] border-r-[1px] border-r-border bg-slate-100 p-2">
                單月營收年增率(%)
              </div>
            </td>
            {revenues.map((r, rIdx) => (
              <td key={rIdx} className={cn(BASE_TD_CLASS, "bg-slate-100")}>
                {r.revenue_growth_rate === undefined
                  ? "N/A"
                  : (r.revenue_growth_rate * 100).toFixed(2) + "%"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RevenueTable;
