import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Role } from "../../../types/role.type";

type useRolesColumnReturn = MRT_ColumnDef<Role>[];

export const useRolesColumns = (): useRolesColumnReturn => {
  const columns = useMemo<MRT_ColumnDef<Role>[]>(
    (): MRT_ColumnDef<Role>[] => [
      {
        accessorKey: "key",
        header: "Key",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
    ],
    []
  );
  return columns;
};
