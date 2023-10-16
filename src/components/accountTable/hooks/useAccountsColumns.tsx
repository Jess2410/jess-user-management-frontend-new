import { type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Account } from "../../../types/account.type";
import ButtonDetails from "../../ButtonDetails/ButtonDetails";

type useAccountsColumnReturn = MRT_ColumnDef<Account>[];

export const useAccountsColumns = (): useAccountsColumnReturn => {
  // const [open, setOpen] = useState(false);
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
        Cell: ({ cell }) => {
          return (
            <ButtonDetails itemsList={cell.row.original.roles} nameList="rôles">
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
