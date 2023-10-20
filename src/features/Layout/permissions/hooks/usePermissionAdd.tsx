import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import { PERMISSIONS_LINK } from "../../../../constants/routes";
import { PermissionNoId } from "../../../../types/permission.type";
import { useAddPermissionMutation } from "../../../../api/Permission.api";

const UsePermissionAdd = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [addPermission] = useAddPermissionMutation();

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

  return {
    createPermission,
  };
};

export default UsePermissionAdd;
