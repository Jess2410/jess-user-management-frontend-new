import { useState } from "react";
import { ROLES_LINK } from "../../../../constants/routes";
import { RoleNoId, RoleNoIdNoPermissions } from "../../../../types/role.type";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import { useAddRoleMutation } from "../../../../api/Role.api";
import { Permission } from "../../../../types/permission.type";

const useRoleAdd = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [addRole] = useAddRoleMutation();

  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

  const createRole = async (newRole: RoleNoIdNoPermissions) => {
    await addRole({
      key: newRole.key,
      title: newRole.title,
      description: newRole.description,
      permissions: selectedPermissions.map(
        (selectedPermission) => selectedPermission.id
      ),
    })
      .then((response) => {
        showToast("Rôle ajouté avec succès", {
          type: "success",
        });

        if ("error" in response) {
          const typedError = response as {
            error: { data: RoleNoId; status: number };
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
  return { createRole, selectedPermissions, setSelectedPermissions };
};

export default useRoleAdd;
