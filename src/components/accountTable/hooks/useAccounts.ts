import { MRT_ColumnDef } from "material-react-table";
import { useAccountsColumns } from "./useAccountsColumns";
import { Account } from "../../../types/account.type";
import { useGetAccountsQuery } from "../../../api/Account.api";

type useAccountsReturn = {
  loading: boolean;
  columns: MRT_ColumnDef<Account>[];
  data: Account[] | [];
};

export const useAccounts = (): useAccountsReturn => {
  const columns = useAccountsColumns();

  const { isLoading, isFetching, data: accounts } = useGetAccountsQuery();

  return {
    loading: isLoading || isFetching,
    columns: columns,
    data: accounts || [],
  };
};
