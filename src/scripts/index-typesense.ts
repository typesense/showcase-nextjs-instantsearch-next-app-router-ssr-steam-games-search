import { Client, Errors } from "typesense";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { getUnixTime, parse } from "date-fns";
import ora from "ora";
import { upAll } from "docker-compose";

// Instantiate the Typesense client
const client = new Client({
  nodes: [
    {
      host: "localhost",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "xyz",
  retryIntervalSeconds: 2,
});

const gameSchema = z.object({
  name: z.string(),
  release_date: z.string(),
  price: z.number(),
  positive: z.number(),
  negative: z.number(),
  app_id: z.number(),
  min_owners: z.number(),
  max_owners: z.number(),
  htlb_single: z.union([z.number(), z.undefined()]),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const typesenseSchema = gameSchema.omit({ htlb_single: true, release_date: true }).extend({
  release_date: z.number(),
  htlb_single: z.number(),
});

function parseCustomDate(dateString: string) {
  const date = parse(dateString, "MMM d, yyyy", new Date());
  const unixTime = getUnixTime(date);

  if (isNaN(unixTime)) {
    return 0;
  }

  return unixTime;
}

function parseGames(): z.infer<typeof typesenseSchema>[] {
  // Read through the games.jsonl file and parse their dates to UNIX timestamps
  const cwd = process.cwd();
  const jsonFilePath = path.join(cwd, "data", "games.jsonl");
  try {
    const result = fs
      .readFileSync(jsonFilePath, "utf-8")
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const parsed = gameSchema.safeParse(JSON.parse(line));

        // If the game doesn't match the schema, skip it
        if (!parsed.success) {
          return;
        }
        return {
          ...parsed.data,
          release_date: parseCustomDate(parsed.data.release_date),
          htlb_single: parsed.data.htlb_single === undefined ? 0 : parsed.data.htlb_single,
        };
      })
      .filter((game) => game !== undefined);

    return result;
  } catch (error) {
    throw error;
  }
}

async function createCollection() {
  const spinner = ora("Creating collection");
  await client.collections().create({
    name: "games",
    fields: [
      { name: "name", type: "string" },
      { name: "release_date", type: "int64" },
      { name: "price", type: "float", facet: true },
      { name: "positive", type: "int32", facet: true },
      { name: "negative", type: "int32", facet: true },
      { name: "app_id", type: "int32" },
      { name: "min_owners", type: "int32", facet: true },
      { name: "max_owners", type: "int32", facet: true },
      { name: "htlb_single", type: "int32" },
    ],
    default_sorting_field: "release_date",
  });
  spinner.succeed("Collection created");
}

async function handleCollection(games: z.infer<typeof typesenseSchema>[]) {
  const spinner = ora("Checking collection");
  try {
    const collection = await client.collections("games").retrieve();
    spinner.text = "Collection already exists";
    if (collection.num_documents === games.length) {
      spinner.succeed("Collection already has the same number of documents");
      return;
    }

    spinner.warn("Collection has a different number of documents");
    await client.collections("games").delete();
    await createCollection();
  } catch (e: unknown) {
    if (!(e instanceof Errors.ObjectNotFound)) {
      throw e;
    }
    spinner.warn("Collection does not exist");
    await createCollection();
  }
}

// Index the games into Typesense
async function indexGames(games: z.infer<typeof typesenseSchema>[]) {
  await handleCollection(games);
  await client.collections("games").documents().import(games);
}

async function main() {
  const spinner = ora();
  try {
    await upAll({ cwd: path.join(process.cwd()) });
    const games = parseGames();
    await indexGames(games);
    spinner.succeed("Script completed successfully.");
  } catch (error) {
    spinner.fail(`An error occurred: ${error}`);
    process.exit(1);
  }
}

// Run the script
main();
