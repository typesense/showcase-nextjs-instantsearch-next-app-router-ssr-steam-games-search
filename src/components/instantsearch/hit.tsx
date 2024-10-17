"use client";
import { Card } from "@/components/ui/card";
import { typesenseSchema } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import { format } from "date-fns/format";
import { Clock, ThumbsDown, ThumbsUp, UserRound } from "lucide-react";
import { z } from "zod";

type Game = z.infer<typeof typesenseSchema>;

function formatPrice(price: number) {
  return price === 0 ? "Free" : `$${price}`;
}

export default function Hit({ hit }: { hit: Game }) {
  return (
    <div className="w-full  flex flex-col aspect-3/4  transition-all pb-[10px]">
      <Card className="flex flex-col  relative rounded-lg  transition-all hover:shadow-xl items-center p-4 bg-white dark:bg-zinc-900 ">
        <div className=" w-full mb-6">
          <h3 className="text-xl  truncate tracking-tight  font-bold">{hit.name}</h3>
          <div className="flex  items-bottom gap-3 w-2/3 text-sm text-muted-foreground">
            <p className="text-sm text-foreground font-medium">#{hit.app_id}</p>
            <p>{format(new Date(hit.release_date * 1000), "MMM dd, yyyy")}</p>
          </div>
        </div>
        <div className="flex justify-between w-full mb-2">
          <div className="flex  items-center gap-1 w-1/2 text-sm text-muted-foreground">
            <span>{formatNumber(hit.positive)}</span>
            <ThumbsUp size={16} />
            <span>•</span>
            <span>{formatNumber(hit.negative)}</span>
            <ThumbsDown size={16} />
          </div>
          <div className="flex  items-center gap-1  text-sm text-muted-foreground">
            <span className="italic">{formatNumber(hit.min_owners)} ~ </span>
            <span className="italic">{formatNumber(hit.max_owners)}</span>
            <UserRound size={16} />
          </div>
        </div>
        <div className="flex justify-between w-full mb-2">
          {hit.hltb_single && (
            <div className="flex items-start gap-1  text-sm text-muted-foreground">
              <span>{hit.hltb_single} hrs</span>
              <Clock size={16} />
            </div>
          )}
        </div>
        <div className="absolute mb-[-16px] mr-3  border-green-400 dark:border-background border-2 bottom-0  font-extrabold right-0 text-green-400  bg-green-50 dark:bg-green-800 py-1 px-2 rounded-lg">
          <h1 className="text-xl">{formatPrice(hit.price)}</h1>
        </div>
      </Card>
    </div>
  );
}
