import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waitFor(time: number) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, time),
  );
}
