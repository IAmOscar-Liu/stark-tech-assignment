import { getMonthRevenue, getStockInfo } from "@/actions";
import Await from "@/components/Await";
import Header from "@/components/Header";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RevenueDetails from "@/components/RevenueDetails";
import StockInfo from "@/components/StockInfo";
import { HomePageSearchParams } from "@/types";
import { Suspense } from "react";
import { v4 as uuidv4 } from "uuid";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<HomePageSearchParams>;
}) {
  const params = await searchParams;
  const revenuePromise = getMonthRevenue(params);
  const stockInfoPromise = getStockInfo(params.data_id);

  return (
    <div className="flex h-screen flex-col bg-secondary">
      <Header />
      <main className="h-0 flex-grow space-y-3 overflow-y-auto px-4 py-6">
        <Suspense
          key={uuidv4()}
          fallback={
            <StockInfo isLoading title={`Searching for ${params.data_id}...`} />
          }
        >
          <Await promise={stockInfoPromise}>
            {(result) => (
              <StockInfo
                isLoading={false}
                dataId={params.data_id}
                result={result}
              />
            )}
          </Await>
        </Suspense>

        <Suspense
          key={uuidv4()}
          fallback={
            <>
              <LoadingSkeleton title="每月營收" />
              <LoadingSkeleton title="詳細數據" />
            </>
          }
        >
          <Await promise={revenuePromise}>
            {(result) => (
              <RevenueDetails dataId={params.data_id} result={result} />
            )}
          </Await>
        </Suspense>
      </main>
    </div>
  );
}
