"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNumericMenu, UseNumericMenuProps } from "react-instantsearch";

export default function NumericMenu(props: UseNumericMenuProps) {
  const { items, refine } = useNumericMenu(props);

  return (
    <RadioGroup onValueChange={(value) => refine(value)}>
      {items.map((item) => (
        <div className="flex items-center space-x-2" key={item.value}>
          <RadioGroupItem id={item.value} value={item.value} checked={item.isRefined} />
          <Label htmlFor={item.value}>{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
