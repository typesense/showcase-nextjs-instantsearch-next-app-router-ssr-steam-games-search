import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatNumber(num: number) {
  const thresholds: Record<string, string> = {
    1000000: "M",
    1000: "K",
  };

  const threshold = Object.keys(thresholds)
    .sort((a, b) => Number(b) - Number(a))
    .find((threshold) => num >= Number(threshold));

  return threshold
    ? Math.floor(num / Number(threshold)).toString() + thresholds[threshold]
    : num.toString();
}

export { cn, formatNumber };
