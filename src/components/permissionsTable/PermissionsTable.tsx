import { MaterialReactTable } from "material-react-table";
import { usePermissions } from "./hooks/usePermissions";

export default function PermissionsTable() {
  const { data, columns } = usePermissions();

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnOrdering
      enableGlobalFilter={false}
      initialState={{ columnVisibility: { id: false } }}
    />
  );
}
