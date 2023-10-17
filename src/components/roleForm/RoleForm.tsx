import Box from "@mui/material/Box";
import { Button, Container, TextField, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { roleFormSchema, roleSchema } from "../../types/role.type";
import { useLazyGetRoleByIdQuery } from "../../api/Role.api";
import TransferList from "../transferList/TransferList";
import { useGetPermissionsQuery } from "../../api/Permission.api";
import { useEffect, useState } from "react";

const RoleForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data: permissions } = useGetPermissionsQuery();
  const [getRoleById, { data }] = useLazyGetRoleByIdQuery();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm({
    defaultValues: async () => {
      if (params.id) {
        const { data } = await getRoleById(Number(params.id));
        return data;
      } else {
        return { key: "", title: "", description: "", permissions: [] };
      }
    },
    resolver: zodResolver(roleFormSchema),
  });

  useEffect(() => {
    if (data?.permissions) {
      setSelectedPermissions(
        data?.permissions.map((permission) => permission.key)
      );
    }
  }, [data, setSelectedPermissions]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Container>
        <form
          onSubmit={handleSubmit((data) =>
            console.log("data submit", {
              ...data,
              permissions: selectedPermissions,
            })
          )}
        >
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
              allItems={
                permissions
                  ? permissions.map((permission) => permission.key)
                  : []
              }
              setSelectedItems={setSelectedPermissions}
              selectedItems={selectedPermissions}
            />
          ) : (
            ""
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
