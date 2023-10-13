import { MRT_ColumnDef } from "material-react-table";
import { useRolesColumns } from "./useRolesColumns";
import { Role } from "../../../types/role.type";
import { useGetRolesQuery } from "../../../api/Role.api";

type useAccountsReturn = {
  loading: boolean;
  columns: MRT_ColumnDef<Role>[];
  data: Role[] | [];
};

export const useRoles = (): useAccountsReturn => {
  const columns = useRolesColumns();

  const { isLoading, isFetching, data: roles } = useGetRolesQuery();

  return {
    loading: isLoading || isFetching,
    columns: columns,
    data: roles || [],
  };
};
