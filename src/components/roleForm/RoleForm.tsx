import Box from "@mui/material/Box";
import { Button, Container, TextField, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { roleFormSchema } from "../../types/role.type";
import { useLazyGetRoleByIdQuery } from "../../api/Role.api";
import TransferList from "../transferList/TransferList";
import { useGetPermissionsQuery } from "../../api/Permission.api";
import { FC } from "react";
import { Permission } from "../../types/permission.type";

type RoleFormProps = {
  onSubmit: () => void;
  selectedPermissions: Permission[];
  setSelectedPermissions: (permissions: Permission[]) => void;
};
const RoleForm: FC<RoleFormProps> = ({
  onSubmit,
  selectedPermissions,
  setSelectedPermissions,
}) => {
  const navigate = useNavigate();
  const params = useParams();

  const { data: permissions } = useGetPermissionsQuery();

  const [getRoleById] = useLazyGetRoleByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm({
    defaultValues: async () => {
      if (params.id) {
        const { data: role } = await getRoleById(Number(params.id));
        setSelectedPermissions(role?.permissions || []);
        return role;
      } else {
        return { key: "", title: "", description: "", permissions: [] };
      }
    },
    resolver: zodResolver(roleFormSchema),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 3 }}>
            <Controller
              control={control}
              name="key"
              render={(controller) => (
                <TextField
                  {...controller.field}
                  required
                  fullWidth
                  id="key"
                  label="Key"
                />
              )}
            />
          </Box>
          {/* {errors.key && <p>{errors.key.message}</p>} */}
          <Box sx={{ mb: 3 }}>
            <Controller
              control={control}
              name="title"
              render={(controller) => (
                <TextField
                  {...controller.field}
                  required
                  fullWidth
                  id="title"
                  label="Title"
                />
              )}
            />
            {/* {errors.title && <p>{errors.title.message}</p>} */}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Controller
              control={control}
              name="description"
              render={(controller) => (
                <TextField
                  {...controller.field}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                />
              )}
            />
            {/* {errors.description && <p>{errors.description.message}</p>} */}
          </Box>

          {permissions?.length ? (
            <TransferList
              allItems={permissions}
              selectedItems={selectedPermissions}
              setSelectedItems={setSelectedPermissions}
            />
          ) : null}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/roles")}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              VALIDER
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default RoleForm;
