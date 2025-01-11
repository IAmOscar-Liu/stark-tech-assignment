import { getStockInfo } from "@/actions";
import { FileWarningIcon } from "lucide-react";
import CardLayout from "./CardLayout";

type Props =
  | {
      isLoading: true;
      title: string;
    }
  | {
      isLoading: false;
      dataId?: string;
      result: Awaited<ReturnType<typeof getStockInfo>>;
    };

function StockInfo(props: Props) {
  if (props.isLoading)
    return (
      <CardLayout className="px-4">
        <h1 className="text-xl font-semibold tracking-tight">{props.title} </h1>
      </CardLayout>
    );

  if (!props.dataId) return null;
  if (props.result.error !== undefined) return null;
  if (props.result.data.length === 0)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <FileWarningIcon className="mb-3" size={36} />
        <p className="text-lg">公司不存在，請確認代號是否正確</p>
      </div>
    );

  return (
    <CardLayout className="px-4">
      <h1 className="text-xl font-semibold tracking-tight">
        {props.result.data[0].stock_name}（{props.result.data[0].stock_id}）
      </h1>
    </CardLayout>
  );
}

export default StockInfo;
