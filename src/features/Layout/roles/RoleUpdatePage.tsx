import RoleForm from "../../../components/roleForm/RoleForm";
import Layout from "../Layout";
import useRoleUpdate from "./hooks/useRoleUpdate";

const RoleUpdatePage = () => {
  const { editRole, selectedPermissions, setSelectedPermissions } =
    useRoleUpdate();

  return (
    <Layout>
      <RoleForm
        onSubmit={editRole}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
      />
    </Layout>
  );
};

export default RoleUpdatePage;
