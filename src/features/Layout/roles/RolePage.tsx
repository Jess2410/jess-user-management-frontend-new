import PermissionsTable from "../../../components/permissionsTable/PermissionsTable";
import { Box, Button } from "@mui/material";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";

const RolePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pb: 2 }}>
          <Button variant="contained" onClick={() => navigate("/role/add")}>
            Add
          </Button>
        </Box>
        <PermissionsTable />
      </Layout>
    </div>
  );
};

export default RolePage;
