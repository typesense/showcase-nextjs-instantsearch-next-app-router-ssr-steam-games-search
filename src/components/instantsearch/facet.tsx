import NumericMenu from "@/components/instantsearch/numeric-menu";
import { RangeFilter } from "@/components/instantsearch/range-menu";
import { attributeLabelMap } from "@/lib/schema";

function Facet({ attribute }: { attribute: string }) {
  switch (attribute) {
    case "price":
    case "min_owners":
    case "max_owners":
      return (
        <>
          <h3 className="mb-1 text-xl font-semibold">{attributeLabelMap[attribute]}</h3>
          <RangeFilter attribute={attribute} />
        </>
      );
    case "hltb_single":
      return (
        <>
          <h3 className="mb-1 text-xl font-semibold">{attributeLabelMap[attribute]}</h3>
          <NumericMenu
            attribute="hltb_single"
            items={[
              { label: "Under 2 hours", end: 2 },
              { label: "2 to 7 hours", start: 2, end: 7 },
              { label: "7 to 15 hours", start: 7, end: 15 },
              { label: "15 to 30 hours", start: 15, end: 30 },
              { label: "Over 30", start: 30 },
            ]}
          />
        </>
      );
    case "negative":
      return (
        <>
          <h3 className="mb-1 text-xl font-semibold">{attributeLabelMap[attribute]}</h3>
          <NumericMenu
            attribute="negative"
            items={[
              { label: "Under 25", end: 25 },
              { label: "25-50", start: 25, end: 50 },
              { label: "50-100", start: 50, end: 100 },
              { label: "Over 100", start: 100 },
            ]}
          />
        </>
      );
    default:
      return null;
  }
}

export { Facet };
