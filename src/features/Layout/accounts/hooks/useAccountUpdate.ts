import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import { useUpdateAccountByIdMutation } from "../../../../api/Account.api";
import { useState } from "react";
import { Role } from "../../../../types/role.type";
import { ACCOUNTS_LINK } from "../../../../constants/routes";

const useAccountUpdate = () => {
  const { showToast } = useToast();
  const params = useParams();
  const navigate = useNavigate();
  const [updateAccountById] = useUpdateAccountByIdMutation();

  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const editAccount = async (newAccount: any) => {
    const id = Number(params.id);
    const selectedRolesIds = selectedRoles.map(
      (selectedRole) => selectedRole.id
    );
    const accountUpdated = { id, ...newAccount, roles: selectedRolesIds };
    await updateAccountById(accountUpdated)
      .then(() => {
        showToast("User modifié avec succès !", {
          type: "success",
          autoClose: 3000,
        });
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
    editAccount,
    selectedRoles,
    setSelectedRoles,
  };
};

export default useAccountUpdate;
