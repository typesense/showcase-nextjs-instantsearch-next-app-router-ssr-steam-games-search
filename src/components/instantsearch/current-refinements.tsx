"use client";
import { Button } from "@/components/ui/button";
import { attributeLabelMap } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import { X } from "lucide-react";
import { useCurrentRefinements, UseCurrentRefinementsProps } from "react-instantsearch";

const formatRefinementLabel = (label: string): string => {
  const labelParts = label.split(" ");

  if (labelParts.length > 1 && isFinite(Number(labelParts[1])) && !isNaN(Number(labelParts[1]))) {
    const formattedNumber = formatNumber(Number(labelParts[1]));
    return `${labelParts[0]} ${formattedNumber}${labelParts.slice(2).join(" ")}`;
  }

  return label;
};

function isAttributeLabel(label: string): label is keyof typeof attributeLabelMap {
  return label in attributeLabelMap;
}

function formatLabel(label: string): string {
  return isAttributeLabel(label) ? attributeLabelMap[label] : label;
}

export function CurrentRefinements(props: UseCurrentRefinementsProps) {
  const { items, refine } = useCurrentRefinements(props);

  return (
    <div className="flex gap-3 flex-wrap h-15">
      {items
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((item) =>
          item.refinements.map((refinement) => {
            const formattedRefinementLabel = formatRefinementLabel(refinement.label);
            const formattedLabel = formatLabel(item.label);

            return (
              <Button
                onClick={() => {
                  refine(refinement);
                }}
                variant="outline"
                className="rounded-full"
                key={[item.indexName, item.label, refinement.label].join("/")}
                size="sm"
              >
                <span>{`${formattedLabel}: ${formattedRefinementLabel}`}</span>
                <X className="h-5" />
              </Button>
            );
          }),
        )}
    </div>
  );
}
