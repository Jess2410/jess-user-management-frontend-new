import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Role } from "../../../types/role.type";

type useRolesColumnReturn = MRT_ColumnDef<Role>[];

export const useRolesColumns = (): useRolesColumnReturn => {
  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    (): MRT_ColumnDef<Role>[] => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "firstName",
        header: "Firstname",
      },
      {
        accessorKey: "lastName",
        header: "Lastname",
      },
      {
        accessorKey: "permissions",
        header: "Permissions",
      },
    ],
    []
  );
  return columns;
};
