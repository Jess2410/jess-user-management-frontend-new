import { MaterialReactTable } from "material-react-table";
import { usePermissions } from "./hooks/usePermissions";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import { useToast } from "../../hooks/useToast";
import { useDeletePermissionByIdMutation } from "../../api/Permission.api";

export default function PermissionsTable() {
  const navigate = useNavigate();
  const { data, columns } = usePermissions();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | undefined>(undefined);

  const [deletePermissionById] = useDeletePermissionByIdMutation();

  const handleUpdate = (id: number) => {
    navigate(`/permission/${id}`);
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
    await deletePermissionById(id);
    handleCloseDialog();
    showToast("Utilisateur supprimé avec succès !", {
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
