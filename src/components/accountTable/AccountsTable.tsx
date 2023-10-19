import { MaterialReactTable } from "material-react-table";
import { useAccounts } from "./hooks/useAccounts";
import { Box, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function AccountsTable() {
  const { data, columns } = useAccounts();

  const navigate = useNavigate();

  const handleUpdate = (id: number) => {
    navigate(`/account/${id}`);
  };
  const handleDelete = (id: number) => {
    console.log("delete", id);
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
