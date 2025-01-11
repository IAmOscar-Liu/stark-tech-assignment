"use server";

import { DEFAULT_VALUES } from "@/consstants";
import { CustomDate } from "@/lib/date";
import { processStockRevenue } from "@/lib/stockRevenue";
import { HomePageSearchParams, StockInfo, StockMonthRevenue } from "@/types";

export async function getMonthRevenue({
  data_id,
  start_date,
  end_date,
  duration,
}: HomePageSearchParams) {
  if (!data_id)
    return {
      error: "Missing required parameter 'data_id'",
    };
  // await waitFor(1000);
  const params = new URLSearchParams();
  params.set("token", process.env.FINMIND_API_TOKEN ?? "");
  params.set("data_id", data_id);
  params.set("dataset", "TaiwanStockMonthRevenue");
  if (duration) {
    params.set(
      "start_date",
      new CustomDate().adjustDate({ year: -duration - 1 }).getFormatedDate(),
    );
    params.set("end_date", new CustomDate().getFormatedDate());
  } else {
    params.set(
      "start_date",
      start_date
        ? new CustomDate(start_date).adjustDate({ year: -1 }).getFormatedDate()
        : new CustomDate()
            .adjustDate({ year: -DEFAULT_VALUES.pastYear - 1 })
            .getFormatedDate(),
    );
    params.set("end_date", end_date ?? new CustomDate().getFormatedDate());
  }

  const url =
    (process.env.FINMIND_API_BASE_URL ?? "") + "?" + params.toString();
  console.log("parameters: ", params.toString());

  try {
    const response = await fetch(url);
    const json = await response.json();
    // const json = mockTaiwanStockMonthRevenue;
    if (json.status != 200) throw new Error(`Failed to fetch ${url}`);
    return { data: processStockRevenue(json.data as StockMonthRevenue[]) };
  } catch (e) {
    return {
      error: (e as Error).message,
    };
  }
}

export async function getStockInfo(data_id: HomePageSearchParams["data_id"]) {
  if (!data_id)
    return {
      error: "Missing required parameter 'data_id'",
    };
  // await waitFor(1000);
  const params = new URLSearchParams();
  params.set("token", process.env.FINMIND_API_TOKEN ?? "");
  params.set("data_id", data_id);
  params.set("dataset", "TaiwanStockInfo");

  const url =
    (process.env.FINMIND_API_BASE_URL ?? "") + "?" + params.toString();

  try {
    const response = await fetch(url);
    const json = await response.json();
    // const json = mockTaiwanStockInfo;
    if (json.status != 200) throw new Error(`Failed to fetch ${url}`);
    return { data: json.data as StockInfo[] };
  } catch (e) {
    return {
      error: (e as Error).message,
    };
  }
}
