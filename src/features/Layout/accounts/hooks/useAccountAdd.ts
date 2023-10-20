import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import { useAddAccountMutation } from "../../../../api/Account.api";
import { useState } from "react";
import { Role } from "../../../../types/role.type";
import { AccountNoId } from "../../../../types/account.type";
import { ACCOUNTS_LINK } from "../../../../constants/routes";

const UseAccountAdd = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [addAccount] = useAddAccountMutation();

  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

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

  return {
    createAccount,
    selectedRoles,
    setSelectedRoles,
  };
};

export default UseAccountAdd;
