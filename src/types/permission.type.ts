import { z } from "zod";

export const permissionSchema = z.object({
  id: z.number(),
  key: z.string(),
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(300),
});
export const permissionSchemaNoId = z.object({
  key: z.string(),
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(300),
});

export type Permission = z.TypeOf<typeof permissionSchema>;
export type PermissionNoId = z.TypeOf<typeof permissionSchemaNoId>;
