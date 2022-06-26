import * as React from "react";
import {
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import { DeleteButtonWithWarningDialogProps } from "./interface";

const DeleteButtonWithWarningDialog: React.FC<
  DeleteButtonWithWarningDialogProps
> = (props: DeleteButtonWithWarningDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    props.deleteAction(props.id);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        size="small"
        sx={{
          position: "relative",
        }}
        onClick={handleClickOpen}
      >
        <ClearIcon />
      </IconButton>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.label}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButtonWithWarningDialog;
