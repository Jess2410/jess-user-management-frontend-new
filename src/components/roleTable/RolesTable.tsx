import { MaterialReactTable } from "material-react-table";
import { useRoles } from "./hooks/useRoles";

export default function RolesTable() {
  const { data, columns } = useRoles();

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
