import Box from "@mui/material/Box";
import { Button, Container, TextField, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  RoleNoId,
  RoleNoIdNoPermissions,
  roleFormSchema,
} from "../../types/role.type";
import {
  useAddRoleMutation,
  useLazyGetRoleByIdQuery,
} from "../../api/Role.api";
import TransferList from "../transferList/TransferList";
import { useGetPermissionsQuery } from "../../api/Permission.api";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { ROLES_LINK } from "../../constants/routes";
import { Permission } from "../../types/permission.type";

const RoleForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { showToast } = useToast();

  const [addRole] = useAddRoleMutation();
  const { data: permissions } = useGetPermissionsQuery();

  const [getRoleById] = useLazyGetRoleByIdQuery();
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

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

  const createRole = async (newRole: RoleNoIdNoPermissions) => {
    await addRole({
      key: newRole.key,
      title: newRole.title,
      description: newRole.description,
      permissions: selectedPermissions.map(
        (selectedPermission) => selectedPermission.id
      ),
    })
      .then((response) => {
        showToast("Rôle ajouté avec succès", {
          type: "success",
        });

        if ("error" in response) {
          const typedError = response as {
            error: { data: RoleNoId; status: number };
          };
          if (typedError.error.status === 500) {
            showToast(
              "Une erreur est survenue ! Merci de contacter le service client.",
              {
                type: "error",
                autoClose: 3000,
              }
            );
          }
        }
        navigate(ROLES_LINK);
      })
      .catch(() => {
        showToast(
          "Une erreur est survenue ! Merci de contacter le service client.",
          {
            type: "error",
            autoClose: 3000,
          }
        );
      });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit(createRole)}>
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
              Add
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default RoleForm;
