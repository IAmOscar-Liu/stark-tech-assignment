import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function CardLayout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[1000px] rounded-md bg-background px-4 py-2 shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default CardLayout;
