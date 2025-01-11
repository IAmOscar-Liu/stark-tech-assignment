"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TSEStocks } from "@/data/TSEStocks";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [dataId, setDataId] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    setDataId(searchParams.get("data_id") ?? "");
    // eslint-disable-next-line
  }, [searchParams.get("data_id")]);

  const filteredStocks = useMemo(() => {
    if (dataId === "") return TSEStocks.slice(0, 10);
    return TSEStocks.filter(
      (stock) =>
        stock.stock_code.includes(dataId.toLowerCase()) ||
        stock.company_name.includes(dataId.toLowerCase()),
    ).slice(0, 10);
  }, [dataId]);

  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString("data_id", dataId));
  };

  return (
    <div className="flex h-[60px] items-center justify-center bg-background shadow-md">
      <form className="relative" onSubmit={handleSubmission}>
        <Input
          className="w-[420px] pl-10 pr-10"
          placeholder="輸入台/美股代號，查看公司價值"
          value={dataId}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setDataId(e.target.value)}
        />
        <button className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search size={20} className="" />
        </button>
        {dataId && (
          <X
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setDataId("")}
          />
        )}
        {isFocused && filteredStocks.length > 0 && (
          <ul className="absolute left-0 top-[calc(100%+5px)] max-h-[168px] w-full overflow-y-auto rounded-md border-[1px] border-border bg-background py-1">
            {filteredStocks.map((stock) => (
              <li
                className="mx-1 flex cursor-pointer list-none justify-between gap-2 px-2 py-1 hover:bg-secondary"
                key={stock.stock_code}
                onMouseDown={() => setDataId(stock.stock_code)}
              >
                <p>{stock.stock_code}</p>
                <p className="line-clamp-1">{stock.company_name}</p>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default Header;
