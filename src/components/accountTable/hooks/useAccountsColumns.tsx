import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Account } from "../../../types/account.type";

type useAccountsColumnReturn = MRT_ColumnDef<Account>[];

export const useAccountsColumns = (): useAccountsColumnReturn => {
  const columns = useMemo<MRT_ColumnDef<Account>[]>(
    (): MRT_ColumnDef<Account>[] => [
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
        accessorKey: "roles",
        header: "Roles",
      },
    ],
    []
  );
  return columns;
};
