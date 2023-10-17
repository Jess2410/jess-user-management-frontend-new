import { MaterialReactTable } from "material-react-table";
import { useRoles } from "./hooks/useRoles";
import { Box, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetPermissionsQuery } from "../../api/Permission.api";

export default function RolesTable() {
  const { data, columns } = useRoles();

  const navigate = useNavigate();

  const handleUpdate = (id: number) => {
    navigate(`/role/${id}`);
    console.log("update", id);
  };
  const handleDelete = (id: number) => {
    console.log("delete");
  };
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnOrdering
      enableGlobalFilter={false}
      initialState={{ columnVisibility: { id: false } }}
      enableRowNumbers
      enableRowActions
      positionActionsColumn="last"
      renderRowActions={(rowData) => (
        <Box sx={{ display: "flex" }}>
          <IconButton
            color="primary"
            onClick={() => handleUpdate(rowData.row.original.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleDelete(rowData.row.original.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    />
  );
}
