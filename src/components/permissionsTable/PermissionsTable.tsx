import { MaterialReactTable } from "material-react-table";
import { usePermissions } from "./hooks/usePermissions";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PermissionsTable() {
  const navigate = useNavigate();
  const { data, columns } = usePermissions();
  // const [open, setOpen] = useState(false);

  const handleUpdate = (id: number) => {
    navigate(`/permission/${id}`);
    console.log("update", id);
  };
  const handleDelete = (id: number) => {
    // setOpen(true);
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
