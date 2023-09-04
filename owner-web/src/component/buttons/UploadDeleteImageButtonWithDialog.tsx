import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { UploadDeleteImageButtonWithDialogProps } from "./interface";

const UploadDeleteImageButtonWithDialog: React.FC<
  UploadDeleteImageButtonWithDialogProps
> = (props: UploadDeleteImageButtonWithDialogProps) => {
  const { handleDeleteAgreeClick, handleUploadAgreeClick } = props;

  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
    setIsDeleting(true);
  };
  const handleDeleteOkayClick = () => {
    setOpen(false);
    setIsDeleting(false);
    handleDeleteAgreeClick();
  };

  const handleUploadClick = () => {
    setOpen(true);
    setIsUploading(true);
  };
  const handleUploadOkayClick = () => {
    setOpen(false);
    setIsUploading(false);
    handleUploadAgreeClick();
  };

  const handleCancelClick = () => {
    setOpen(false);
    setIsDeleting(false);
    setIsUploading(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleDeleteClick}
        sx={{ textTransform: "none" }}
      >
        Delete Current Images
      </Button>

      <Button
        variant="contained"
        sx={{ marginLeft: 1, textTransform: "none" }}
        onClick={handleUploadClick}
      >
        Upload
      </Button>

      <Dialog open={open && isDeleting} keepMounted onClose={handleCancelClick}>
        <DialogTitle>
          Are you sure you want to delete the currently uploaded images?
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="black">
            These images cannot be recovered and your restaurant images will be
            empty.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteOkayClick}
            sx={{ textTransform: "none" }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && isUploading}
        keepMounted
        onClose={handleCancelClick}
      >
        <DialogTitle>Are you sure you want to upload?</DialogTitle>
        <DialogContent>
          <DialogContentText color="black">
            The banner or/and logo will be updated with the new images.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={handleUploadOkayClick}
            sx={{ textTransform: "none" }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadDeleteImageButtonWithDialog;
