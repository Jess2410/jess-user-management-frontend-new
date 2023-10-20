import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../hooks/useToast";
import { PERMISSIONS_LINK } from "../../../../constants/routes";
import { PermissionNoId } from "../../../../types/permission.type";
import { useUpdatePermissionByIdMutation } from "../../../../api/Permission.api";

const usePermissionUpdate = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  console.log(
    "🚀 ~ file: usePermissionUpdate.tsx:11 ~ usePermissionUpdate ~ params:",
    params
  );

  const [updatePermissionById] = useUpdatePermissionByIdMutation();

  const editPermission = async (newPermission: PermissionNoId) => {
    const permissionId = Number(params.id);
    console.log(
      "🚀 ~ file: usePermissionUpdate.tsx:20 ~ editPermission ~ permissionId:",
      permissionId
    );
    const permissionUpdated = {
      id: permissionId,
      ...newPermission,
    };
    await updatePermissionById(permissionUpdated);
    showToast("Permission modifiée avec succès !", {
      type: "success",
    });

    navigate(PERMISSIONS_LINK);
  };
  return {
    editPermission,
  };
};

export default usePermissionUpdate;
