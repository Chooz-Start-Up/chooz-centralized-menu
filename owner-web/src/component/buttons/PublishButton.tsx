import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material/";
import { PublishButtonProps } from "./interface";

const PublishButton: React.FC<PublishButtonProps> = (
  props: PublishButtonProps
) => {
  const {
    isPublished,
    isProfileValid,
    isLoading,
    checkValidProfile,
    onPublishClick,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    checkValidProfile();
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    onPublishClick();
    setOpen(false);
  };

  return (
    <>
      {!isPublished && (
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
          }}
        >
          Publish
        </Button>
      )}
      {isPublished && (
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
          }}
        >
          Unpublish
        </Button>
      )}

      <Dialog
        open={open && !isProfileValid && !isLoading}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Please make sure you have filled in all of the profile information.
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="black" id="alert-dialog-slide-description">
            You will not be able to publish the menu until you have filled in
            the profile information.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && !isPublished && isProfileValid && !isLoading}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to publish your menu?</DialogTitle>
        <DialogContent>
          <DialogContentText color="black" id="alert-dialog-slide-description">
            A unique QR code will be generated to access your menu!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Publish</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && isPublished && isProfileValid && !isLoading}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to unpublish your menu?</DialogTitle>
        <DialogContent>
          <DialogContentText color="black" id="alert-dialog-slide-description">
            Your menu will not be accessible through the QR code anymore. The QR
            code remains the same when the menu is published again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Unpublish</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PublishButton;
