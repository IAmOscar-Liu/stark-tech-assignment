import { StockMonthRevenue } from "@/types";

export function processStockRevenue(revenues: StockMonthRevenue[]) {
  for (let i = 12; i < revenues.length; i++) {
    revenues[i].revenue_growth_rate =
      revenues[i].revenue / revenues[i - 12].revenue - 1;
  }
  return revenues.slice(12);
}

export function getStockRevenueTicks(
  data: {
    name: string;
    revenue: number;
    growRate: number;
  }[],
) {
  const dataLength = data.length;
  return data
    .filter((d) => {
      if (dataLength > 58) return d.name.endsWith("01");
      if (dataLength > 34) return /.*(01|07)$/.test(d.name);
      if (dataLength > 14) return /.*(01|04|07|10)$/.test(d.name);
      return true;
    })
    .map((d) => d.name);
}
