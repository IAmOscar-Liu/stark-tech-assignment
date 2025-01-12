"use client";

import { DEFAULT_VALUES } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { CustomDate } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function DateRangeSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [startAt, setStartAt] = useState<Date | undefined>(undefined);
  const [endAt, setEndAt] = useState<Date | undefined>(undefined);

  const createQueryString = ({
    newDuration,
    newStartAt,
    newEndAt,
  }: {
    newDuration: typeof duration;
    newStartAt: typeof startAt;
    newEndAt: typeof endAt;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("duration");
    params.delete("start_date");
    params.delete("end_date");
    if (newDuration !== undefined) {
      params.append("duration", String(newDuration));
    } else {
      if (newStartAt !== undefined)
        params.append(
          "start_date",
          new CustomDate(newStartAt).getFormatedDate(),
        );
      if (newEndAt !== undefined)
        params.append("end_date", new CustomDate(newEndAt).getFormatedDate());
    }

    return params.toString();
  };

  useEffect(() => {
    const durationParam = searchParams.get("duration");
    const startDateParam = searchParams.get("start_date");
    const endDateParam = searchParams.get("end_date");
    if (
      durationParam === null &&
      startDateParam === null &&
      endDateParam === null
    ) {
      setDuration(DEFAULT_VALUES.pastYear);
      setStartAt(undefined);
      setEndAt(undefined);
    } else if (durationParam !== null) {
      setDuration(+durationParam);
      setStartAt(undefined);
      setEndAt(undefined);
    } else {
      setDuration(undefined);
      setStartAt(
        startDateParam === null
          ? undefined
          : new CustomDate(startDateParam).getDate(),
      );
      setEndAt(
        endDateParam === null
          ? undefined
          : new CustomDate(endDateParam).getDate(),
      );
    }
    // eslint-disable-next-line
  }, [
    searchParams.get("duration"),
    searchParams.get("start_date"),
    searchParams.get("end_date"),
  ]);

  const handleDurationChange = (newDuration: string) => {
    if (newDuration === "manual") return setDuration(undefined);

    setDuration(+newDuration);
    router.push(
      pathname +
        "?" +
        createQueryString({
          newDuration: +newDuration,
          newStartAt: startAt,
          newEndAt: endAt,
        }),
    );
  };

  const handleDateRangeSubmission = () => {
    if (startAt !== undefined && endAt !== undefined && +startAt > +endAt) {
      return toast({
        variant: "destructive",
        description: "啟始日不可晚於結束日",
      });
    }
    router.push(
      pathname +
        "?" +
        createQueryString({
          newDuration: duration,
          newStartAt: startAt,
          newEndAt: endAt,
        }),
    );
  };

  return (
    <div className="flex gap-2">
      <Select
        value={duration === undefined ? "manual" : String(duration)}
        onValueChange={handleDurationChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="選擇查詢區間" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">近12個月</SelectItem>
            <SelectItem value="3">近3年</SelectItem>
            <SelectItem value="5">近5年</SelectItem>
            <SelectItem value="10">近10年</SelectItem>
            <SelectItem value="manual">自訂區間</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {duration === undefined && (
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[130px] justify-start text-left font-normal",
                  !startAt && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {startAt ? (
                  new CustomDate(startAt).getFormatedDate()
                ) : (
                  <span>請選擇</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startAt}
                onSelect={setStartAt}
              />
            </PopoverContent>
          </Popover>
          <span className="mx-2">~</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[130px] justify-start text-left font-normal",
                  !endAt && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {endAt ? (
                  new CustomDate(endAt).getFormatedDate()
                ) : (
                  <span>請選擇</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endAt} onSelect={setEndAt} />
            </PopoverContent>
          </Popover>
          <Button
            className="ms-1"
            disabled={startAt === undefined || endAt === undefined}
            onClick={handleDateRangeSubmission}
          >
            查詢
          </Button>
        </div>
      )}
    </div>
  );
}

export default DateRangeSelector;
