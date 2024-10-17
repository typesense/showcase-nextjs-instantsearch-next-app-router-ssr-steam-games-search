"use client";
import Hit from "@/components/instantsearch/hit";
import { Button } from "@/components/ui/button";
import { typesenseSchema } from "@/lib/schema";
import { useInfiniteHits } from "react-instantsearch";
import { z } from "zod";

export function InfiniteHits() {
  const { items, showMore, isLastPage } = useInfiniteHits<z.infer<typeof typesenseSchema>>();

  return items.length === 0 ? (
    <div className="flex justify-center items-center h-96">
      <p className="text-lg text-muted-foreground">No results found</p>
    </div>
  ) : (
    <div className="align-center flex w-full animate-fadein flex-col items-center">
      <div className="mb-10 grid w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Hit key={item.objectID} hit={item} />
        ))}
      </div>
      <Button variant="ghost" onClick={showMore} disabled={isLastPage} className="font-semibold">
        Show More
      </Button>
    </div>
  );
}
