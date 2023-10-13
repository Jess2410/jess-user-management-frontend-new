import { Box, Button } from "@mui/material";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import AccountsTable from "../../../components/accountTable/AccountsTable";

const AccountPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pb: 2 }}>
          <Button variant="contained" onClick={() => navigate("/account/add")}>
            Add
          </Button>
        </Box>
        <AccountsTable />
      </Layout>
    </div>
  );
};

export default AccountPage;
