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
  const { isPublished, onPublishClick } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
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
        open={open && !isPublished}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to publish your menu?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            A unique QR code will be generated to access your menu!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleClose}>Publish</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && isPublished}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to unpublish your menu?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
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
