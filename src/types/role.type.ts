import { z } from "zod";
import { permissionSchema } from "./permission.type";

export const roleSchema = z.object({
  id: z.number(),
  key: z.string(),
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(300),
  permissions: z.array(permissionSchema),
});
export const roleFormSchema = z.object({
  key: z.string(),
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(300),
});

export type Role = z.TypeOf<typeof roleSchema>;
export type RoleNoIdNoPermissions = z.TypeOf<typeof roleFormSchema>;
