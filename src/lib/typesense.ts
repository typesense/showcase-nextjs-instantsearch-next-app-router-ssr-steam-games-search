import type { ConfigurationOptions } from "typesense/lib/Typesense/Configuration";

const {
  TYPESENSE_HOST = "localhost",
  TYPESENSE_PORT = 8108,
  TYPESENSE_PROTOCOL = "http",
  TYPESENSE_API_KEY = "xyz",
} = process.env;

export const typesenseConfig: ConfigurationOptions = {
  nodes: [
    {
      host: TYPESENSE_HOST,
      port: Number(TYPESENSE_PORT),
      protocol: TYPESENSE_PROTOCOL,
    },
  ],
  apiKey: TYPESENSE_API_KEY,
  retryIntervalSeconds: 2,
};
