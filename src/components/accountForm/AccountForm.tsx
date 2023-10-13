import Box from "@mui/material/Box";
import { Button, Container, TextField, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { accountFormSchema } from "../../types/account.type";

const AccountForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm({
    defaultValues: { key: "", firstName: "", lastName: "" },
    resolver: zodResolver(accountFormSchema),
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
              name="firstName"
              render={(controller) => (
                <TextField
                  {...controller.field}
                  required
                  fullWidth
                  id="firstName"
                  label="Firstname"
                />
              )}
            />
          </Box>
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <Box sx={{ mb: 3 }}>
            <Controller
              control={control}
              name="lastName"
              render={(controller) => (
                <TextField
                  {...controller.field}
                  required
                  fullWidth
                  id="lastName"
                  label="Lastname"
                />
              )}
            />
          </Box>
          {errors.lastName && <p>{errors.lastName.message}</p>}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => navigate("/accounts")}>
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

export default AccountForm;
