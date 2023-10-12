import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string(),
});

console.log(import.meta.env);
export const ENV = envSchema.parse(import.meta.env);
