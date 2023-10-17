import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { RoleNoIdNoPermissions } from "../../types/role.type";
import { PermissionNoId } from "../../types/permission.type";

type ButtonProps = {
  itemsList: RoleNoIdNoPermissions[] | PermissionNoId[];
  nameList: string;
};
const ButtonDetails: React.FC<ButtonProps> = ({ itemsList, nameList }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack>
        <Button onClick={() => setOpen(!open)}>View More</Button>
      </Stack>
      <Dialog open={open}>
        <DialogTitle>Liste des {nameList}</DialogTitle>
        <Divider />
        <List>
          {itemsList.length ? (
            itemsList.map((item) => (
              <ListItem key={item.key}>{item.key}</ListItem>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>Pas de {nameList}</p>
          )}
        </List>
        <Button onClick={() => setOpen(!open)}>Close</Button>
      </Dialog>
    </>
  );
};

export default ButtonDetails;
