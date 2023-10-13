import { MaterialReactTable } from "material-react-table";
import { useRoles } from "./hooks/useRoles";

export default function AccountsTable() {
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
