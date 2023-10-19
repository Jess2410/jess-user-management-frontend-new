import AccountForm from "../../../components/accountForm/AccountForm";
import Layout from "../Layout";
import UseAccountAdd from "./hooks/useAccountAdd";

const AccountAddPage = () => {
  const { createAccount, selectedRoles, setSelectedRoles } = UseAccountAdd();
  return (
    <Layout>
      <AccountForm
        onSubmit={createAccount}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
      />
    </Layout>
  );
};

export default AccountAddPage;
