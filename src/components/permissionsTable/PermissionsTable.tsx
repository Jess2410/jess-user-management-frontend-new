import { MaterialReactTable } from "material-react-table";
import { usePermissionsColumns } from "./hooks/usePermissionsColumns";
import { Permission } from "../../types/permission.type";

const data: Permission[] = [
  {
    id: 1,
    key: "JOHN",
    title: "HELLO",
    description: "Hey salut je suis la description",
  },
];

export default function PermissionsTable() {
  const columns = usePermissionsColumns();

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnOrdering
      enableGlobalFilter={false}
    />
  );
}
