import { MaterialReactTable } from "material-react-table";
import { useAccounts } from "./hooks/useAccounts";

export default function AccountsTable() {
  const { data, columns } = useAccounts();

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
