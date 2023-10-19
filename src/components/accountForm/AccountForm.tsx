import Box from "@mui/material/Box";
import { Button, Container, TextField, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { AccountNoId, accountFormSchema } from "../../types/account.type";
import {
  useAddAccountMutation,
  useLazyGetAccountByIdQuery,
} from "../../api/Account.api";
import { useState } from "react";
import { useGetRolesQuery } from "../../api/Role.api";
import TransferList from "../transferList/TransferList";
import { ACCOUNTS_LINK } from "../../constants/routes";
import { useToast } from "../../hooks/useToast";
import { Role } from "../../types/role.type";

const AccountForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { showToast } = useToast();

  const [addAccount] = useAddAccountMutation();
  const { data: roles } = useGetRolesQuery();
  const [getAccountById] = useLazyGetAccountByIdQuery();

  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const {
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm({
    defaultValues: async () => {
      if (params.id) {
        const { data: account } = await getAccountById(Number(params.id));
        setSelectedRoles(account?.roles || []);
        console.log(setSelectedRoles);
        return account;
      } else {
        return { firstName: "", lastName: "", roles: [] };
      }
    },

    resolver: zodResolver(accountFormSchema),
  });

  const createAccount = async (newAccount: AccountNoId) => {
    await addAccount({
      lastName: newAccount.lastName,
      firstName: newAccount.firstName,
      roles: selectedRoles.map((selectedRole) => selectedRole.id),
    })
      .then((response) => {
        showToast("Utilisateur ajouté avec succès", {
          type: "success",
        });

        if ("error" in response) {
          const typedError = response as {
            error: { data: AccountNoId; status: number };
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
        navigate(ACCOUNTS_LINK);
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
        <form onSubmit={handleSubmit(createAccount)}>
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
              Add
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default AccountForm;
