import { MRT_ColumnDef } from "material-react-table";
import { Permission } from "../../../types/permission.type";
import { usePermissionsColumns } from "./usePermissionsColumns";
import { useGetPermissionsQuery } from "../../../api/Permission.api";

type usePermissionsReturn = {
  loading: boolean;
  columns: MRT_ColumnDef<Permission>[];
  data: Permission[] | [];
};

export const usePermissions = (): usePermissionsReturn => {
  const columns = usePermissionsColumns();

  const { isLoading, isFetching, data: permissions } = useGetPermissionsQuery();

  return {
    loading: isLoading || isFetching,
    columns: columns,
    data: permissions || [],
  };
};
