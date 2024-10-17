import { z } from "zod";

const gameSchema = z.object({
  name: z.string(),
  release_date: z.string(),
  price: z.number(),
  positive: z.number(),
  negative: z.number(),
  app_id: z.number(),
  min_owners: z.number(),
  max_owners: z.number(),
  hltb_single: z.union([z.number(), z.undefined()]),
});

const typesenseSchema = gameSchema.omit({ hltb_single: true, release_date: true }).extend({
  release_date: z.number(),
  hltb_single: z.number(),
});

const attributeLabelMap: { [K in keyof z.infer<typeof typesenseSchema>]: string } = {
  price: "Price",
  min_owners: "Minimum Owners",
  max_owners: "Maximum Owners",
  hltb_single: "How Long To Beat",
  negative: "Negative Reviews",
  name: "Name",
  app_id: "App ID",
  positive: "Positive Reviews",
  release_date: "Release Date",
} as const;

export { attributeLabelMap, gameSchema, typesenseSchema };
