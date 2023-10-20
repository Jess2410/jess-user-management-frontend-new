import { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { useRoles } from "./hooks/useRoles";
import { Box, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import { useDeleteRoleByIdMutation } from "../../api/Role.api";

export default function RolesTable() {
  const { data, columns } = useRoles();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);

  const [deleteRoleById] = useDeleteRoleByIdMutation();

  const handleUpdate = (id: number) => {
    navigate(`/role/${id}`);
  };
  const handleDelete = (id: number) => {
    setOpen(true);
    setId(id);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmDialog = async () => {
    if (!id) {
      return;
    }
    await deleteRoleById(id);
    handleCloseDialog();
    showToast("Rôle supprimé avec succès !", {
      type: "success",
      autoClose: 3000,
    });
  };
  return (
    <>
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
      {open ? (
        <ConfirmDialog
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDialog}
        />
      ) : null}
    </>
  );
}
