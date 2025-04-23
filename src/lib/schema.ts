import { z } from "zod";

const gameSchema = z.object({
  name: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "number" ? val.toString() : val)),
  release_date: z.string(),
  price: z.number(),
  positive: z.number(),
  negative: z.number(),
  app_id: z.number(),
  min_owners: z.number(),
  max_owners: z.number(),
  hltb_single: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? 0 : typeof val === "string" ? parseInt(val) : val)),
});

const typesenseSchema = gameSchema.omit({ hltb_single: true, release_date: true }).extend({
  release_date: z.number(),
  hltb_single: z.number(),
});

const attributeLabelMap = {
  price: "Price",
  min_owners: "Minimum Owners",
  max_owners: "Maximum Owners",
  hltb_single: "How Long To Beat",
  negative: "Negative Reviews",
  name: "Name",
  app_id: "App ID",
  positive: "Positive Reviews",
  release_date: "Release Date",
} as const satisfies { [K in keyof z.infer<typeof typesenseSchema>]: string };

export { attributeLabelMap, gameSchema, typesenseSchema };
