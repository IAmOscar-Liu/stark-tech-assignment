import { getMonthRevenue } from "@/actions";
import { AlertCircleIcon } from "lucide-react";
import CardLayout from "./CardLayout";
import DateRangeSelector from "./DateRangeSelector";
import RevenueTable from "./RevenueTable";
import RevenuChart from "./RevenuChart";

function RevenueDetails({
  dataId,
  result,
}: {
  dataId?: string;
  result: Awaited<ReturnType<typeof getMonthRevenue>>;
}) {
  if (!dataId)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg">請輸入台/美股代號，查看公司價值</p>
      </div>
    );
  if (result.error !== undefined)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <AlertCircleIcon className="mb-3 text-destructive" size={36} />
        <p className="text-lg text-destructive">發生錯誤，請重新輸入</p>
      </div>
    );
  if (result.data.length === 0) return null;

  return (
    <>
      <CardLayout className="px-4 pb-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold tracking-tight">每月營收</h1>
          <DateRangeSelector />
        </div>
        <RevenuChart classname="mt-2" revenues={result.data} />
      </CardLayout>

      <CardLayout className="px-4 pb-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold tracking-tight">詳細數據</h1>
        </div>
        <RevenueTable classname="mt-2" revenues={result.data} />
      </CardLayout>
    </>
  );
}

export default RevenueDetails;
