import { z } from "zod";

export const accountSchema = z.object({
  id: z.number(),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  //   roles: z.array(roles),
});
export const accountIdArraySchema = z.object({
  id: z.number(),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  roles: z.number().array(),
});
export const accountSchemaNoId = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  roles: z.number().array(),
});
export const accountFormSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
});

export type Account = z.TypeOf<typeof accountSchema>;
export type AccountIdArray = z.TypeOf<typeof accountIdArraySchema>;
export type AccountNoId = z.TypeOf<typeof accountSchemaNoId>;
export type AccountForm = z.TypeOf<typeof accountFormSchema>;
