import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Role } from "../../../types/role.type";
import ButtonDetails from "../../ButtonDetails/ButtonDetails";

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
      {
        accessorKey: "permissions",
        header: "Permissions",
        Cell: ({ cell }) => {
          return (
            <ButtonDetails
              itemsList={cell.row.original.permissions}
              nameList="permissions"
            >
              View More
            </ButtonDetails>
          );
        },
      },
    ],
    []
  );
  return columns;
};
