import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "dnuozm14",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});