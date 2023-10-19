import Box from "@mui/material/Box";
import { Button, Container, TextField, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import {
  PermissionNoId,
  permissionSchemaNoId,
} from "../../types/permission.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddPermissionMutation,
  useLazyGetPermissionByIdQuery,
} from "../../api/Permission.api";
import { useToast } from "../../hooks/useToast";
import { PERMISSIONS_LINK } from "../../constants/routes";
import "react-toastify/dist/ReactToastify.css";

const PermissionForm = () => {
  const params = useParams();

  const { showToast } = useToast();

  const navigate = useNavigate();
  const [getPermissionById] = useLazyGetPermissionByIdQuery();

  const [addPermission] = useAddPermissionMutation();

  const {
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm({
    defaultValues: async () => {
      if (params.id) {
        const { data } = await getPermissionById(Number(params.id));
        if (data) {
          return data;
        } else {
          throw new Error("GetAccountById failed !");
        }
      } else {
        return { key: "", title: "", description: "" };
      }
    },
    resolver: zodResolver(permissionSchemaNoId),
  });

  const createPermission = async (newPermission: PermissionNoId) => {
    await addPermission({
      key: newPermission.key,
      title: newPermission.title,
      description: newPermission.description,
    })
      .then((response) => {
        showToast("Permission ajoutée avec succès", {
          type: "success",
        });

        if ("error" in response) {
          const typedError = response as {
            error: { data: PermissionNoId; status: number };
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
        navigate(PERMISSIONS_LINK);
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
        <form onSubmit={handleSubmit(createPermission)}>
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
          {errors.key && <p>{errors.key.message}</p>}
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
            {errors.title && <p>{errors.title.message}</p>}
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
            {errors.description && <p>{errors.description.message}</p>}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/permissions")}>
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

export default PermissionForm;
