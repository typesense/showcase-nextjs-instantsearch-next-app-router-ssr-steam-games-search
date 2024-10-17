"use client";
import { Input } from "@/components/ui/input";
import type { SearchBoxProps } from "react-instantsearch";
import { useSearchBox } from "react-instantsearch";

export const SearchBox = (props: SearchBoxProps) => {
  const { refine, clear, isSearchStalled, ...rest } = useSearchBox(props);

  return (
    <Input
      className="my-4 bg-background"
      onChange={(event) => refine(event.currentTarget.value)}
      placeholder="Search..."
      {...rest}
    />
  );
};
