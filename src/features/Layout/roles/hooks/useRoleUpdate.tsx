import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import { Permission } from "../../../../types/permission.type";
import { useUpdateRoleByIdMutation } from "../../../../api/Role.api";
import { ROLES_LINK } from "../../../../constants/routes";

const useRoleUpdate = () => {
  const { showToast } = useToast();
  const params = useParams();
  const navigate = useNavigate();

  const [updateRoleById] = useUpdateRoleByIdMutation();

  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

  const editRole = async (newRole: any) => {
    const id = Number(params.id);
    const selectedPermissionsIds = selectedPermissions.map(
      (selectedPermission) => selectedPermission.id
    );
    const roleUpdated = { id, ...newRole, permissions: selectedPermissionsIds };

    await updateRoleById(roleUpdated)
      .then(() => {
        showToast("Role modifié avec succès !", {
          type: "success",
          autoClose: 3000,
        });
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
  return { editRole, selectedPermissions, setSelectedPermissions };
};
export default useRoleUpdate;
