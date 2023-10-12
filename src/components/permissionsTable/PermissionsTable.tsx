import { MaterialReactTable } from "material-react-table";
import { usePermissions } from "./hooks/usePermissions";

export default function PermissionsTable() {
  const { data: dataRTK, columns } = usePermissions();
  console.log(
    "🚀 ~ file: PermissionsTable.tsx:17 ~ PermissionsTable ~ dataRTK:",
    dataRTK
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={dataRTK}
      enableColumnOrdering
      enableGlobalFilter={false}
      initialState={{ columnVisibility: { id: false } }}
    />
  );
}
