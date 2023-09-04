import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material/";
import { UnpublishAndEditButtonWithDialogProps } from "./interface";

const UnpublishAndEditButtonWithDialog: React.FC<
  UnpublishAndEditButtonWithDialogProps
> = (props: UnpublishAndEditButtonWithDialogProps) => {
  const { isPublished, isLoading, onUnpublishEditClick } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    onUnpublishEditClick();
    setOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          bgcolor: "red",
          "&:hover": {
            backgroundColor: "red.100",
            boxShadow: "none",
          },
          textTransform: "none",
        }}
        disabled={!isPublished}
      >
        Edit
      </Button>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Are you sure you want start editting the menu?
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="black" id="alert-dialog-slide-description">
            The menu will be unpublished when you are in edit mode. Please make
            sure you republish the menu after complete editting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Start Editting</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UnpublishAndEditButtonWithDialog;
