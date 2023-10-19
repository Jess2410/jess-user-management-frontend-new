import { z } from "zod";
import { roleSchemaResponse } from "./role.type";

export const accountSchema = z.object({
  id: z.number(),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  roles: z.array(roleSchemaResponse),
});
export const accountSchemaResponse = z.object({
  id: z.number(),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
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
export type AccountFormType = z.TypeOf<typeof accountFormSchema>;
export type AccountSchemaResponseType = z.TypeOf<typeof accountSchemaResponse>;
