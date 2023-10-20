import PermissionForm from "../../../components/permissionForm/PermissionForm";
import Layout from "../Layout";
import usePermissionUpdate from "./hooks/usePermissionUpdate";

const PermissionUpdatePage = () => {
  const { editPermission } = usePermissionUpdate();

  return (
    <Layout>
      <PermissionForm onSubmit={editPermission} />
    </Layout>
  );
};

export default PermissionUpdatePage;
