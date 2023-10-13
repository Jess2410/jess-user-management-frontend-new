import Box from "@mui/material/Box";
import { Button, Container, TextField, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { roleFormSchema } from "../../types/role.type";

const RoleForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm({
    defaultValues: { key: "", title: "", description: "", permissions: [] },
    resolver: zodResolver(roleFormSchema),
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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

export default RoleForm;
