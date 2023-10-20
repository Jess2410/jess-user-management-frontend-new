import { FC } from "react";
import PermissionForm from "../../../components/permissionForm/PermissionForm";
import Layout from "../Layout";
import UsePermissionAdd from "./hooks/usePermissionAdd";

const PermissionAddPage: FC = () => {
  const { createPermission } = UsePermissionAdd();

  return (
    <Layout>
      <PermissionForm onSubmit={createPermission} />
    </Layout>
  );
};

export default PermissionAddPage;
