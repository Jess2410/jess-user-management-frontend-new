import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import {
  useAddAccountMutation,
  useUpdateAccountByIdMutation,
} from "../../../../api/Account.api";
import { useState } from "react";
import { Role } from "../../../../types/role.type";

const useAccountUpdate = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const params = useParams();
  const [updateAccountById] = useUpdateAccountByIdMutation();

  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  //   console.log(params);
  const editAccount = async (newAccount: any) => {
    const id = Number(params.id);
    const selectedRolesIds = selectedRoles.map(
      (selectedRole) => selectedRole.id
    );
    console.log(
      "🚀 ~ file: useAccountUpdate.ts:28 ~ editAccount ~ selectedRolesIds:",
      selectedRolesIds
    );
    const accountUpdated = { id, ...newAccount, roles: selectedRolesIds };
    await updateAccountById(accountUpdated)
      .then((response) => {
        showToast("User modifié avec succès !", {
          type: "success",
          autoClose: 3000,
        });
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
    editAccount,
    selectedRoles,
    setSelectedRoles,
  };
};

export default useAccountUpdate;
