import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

type ItemProps = {
  onClose: () => void;
  onConfirm: () => void;
};
const ConfirmDialog: React.FC<ItemProps> = ({ onClose, onConfirm }) => {
  return (
    <>
      <Dialog open>
        <Box>
          <DialogTitle>Êtes-vous sûr de bien vouloir supprimer ?</DialogTitle>
          <Divider />
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                p: 2,
                justifyContent: "center",
              }}
            >
              <Button
                onClick={onClose}
                variant="outlined"
                startIcon={<ArrowBackIosIcon />}
              >
                Non
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                p: 2,
                justifyContent: "center",
              }}
            >
              <Button
                onClick={onConfirm}
                variant="outlined"
                endIcon={<CheckIcon />}
              >
                Oui
              </Button>
            </Box>
            <Divider />
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
