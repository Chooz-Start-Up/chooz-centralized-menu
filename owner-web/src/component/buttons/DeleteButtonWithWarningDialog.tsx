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
        <DialogTitle>{"Are you sure you want to delete the menu?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            All items in the menu will be deleted as well.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButtonWithWarningDialog;
