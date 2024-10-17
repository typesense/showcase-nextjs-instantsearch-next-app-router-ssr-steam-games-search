"use client";
import { useHitsPerPage, UseHitsPerPageProps } from "react-instantsearch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HitsPerPageSelect(props: UseHitsPerPageProps) {
  const { items, refine } = useHitsPerPage(props);

  return (
    <Select
      onValueChange={(value) => {
        refine(Number(value));
      }}
    >
      <SelectTrigger className="lg:w-1/5 w-2/3 mt-2 bg-background">
        <SelectValue placeholder="Results per Page" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value.toString()}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
