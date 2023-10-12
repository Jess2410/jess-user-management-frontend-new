import { type MRT_ColumnDef } from "material-react-table";
import { Permission } from "../../../types/permission.type";
import { useMemo } from "react";

type usePermissionsColumnReturn = MRT_ColumnDef<Permission>[];

export const usePermissionsColumns = (): usePermissionsColumnReturn => {
  const columns = useMemo<MRT_ColumnDef<Permission>[]>(
    (): MRT_ColumnDef<Permission>[] => [
      {
        accessorKey: "id",
        header: "Id",
      },
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
