import AccountForm from "../../../components/accountForm/AccountForm";
import Layout from "../Layout";
import useAccountUpdate from "./hooks/useAccountUpdate";

const AccountUpdatePage = () => {
  const { editAccount, selectedRoles, setSelectedRoles } = useAccountUpdate();
  return (
    <Layout>
      <AccountForm
        onSubmit={editAccount}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
      />
    </Layout>
  );
};

export default AccountUpdatePage;
