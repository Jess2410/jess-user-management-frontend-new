import Box from "@mui/material/Box";
import { Button, Container, TextField, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { accountFormSchema } from "../../types/account.type";
import { useLazyGetAccountByIdQuery } from "../../api/Account.api";
import { useGetRolesQuery } from "../../api/Role.api";
import TransferList from "../transferList/TransferList";
import { Role } from "../../types/role.type";

type AccountFormProps = {
  onSubmit: () => void;
  selectedRoles: Role[];
  setSelectedRoles: (roles: Role[]) => void;
};
const AccountForm: React.FC<AccountFormProps> = ({
  onSubmit,
  selectedRoles,
  setSelectedRoles,
}) => {
  const navigate = useNavigate();
  const params = useParams();

  const { data: roles } = useGetRolesQuery();
  const [getAccountById] = useLazyGetAccountByIdQuery();

  const {
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm({
    defaultValues: async () => {
      if (params.id) {
        const { data: account } = await getAccountById(Number(params.id));
        setSelectedRoles(account?.roles || []);
        return account;
      } else {
        return { firstName: "", lastName: "", roles: [] };
      }
    },

    resolver: zodResolver(accountFormSchema),
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
          {/* {errors.firstName && <p>{errors.firstName.message}</p>} */}
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
          {/* {errors.lastName && <p>{errors.lastName.message}</p>} */}

          {roles?.length ? (
            <TransferList
              allItems={roles}
              selectedItems={selectedRoles}
              setSelectedItems={setSelectedRoles}
            />
          ) : null}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/accounts")}>
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

export default AccountForm;
