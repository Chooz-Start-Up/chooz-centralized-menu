import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material/";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { AccessQRButtonProps } from "./interface";
import { Grid } from "@material-ui/core";

const AccessQRButton: React.FC<AccessQRButtonProps> = (
  props: AccessQRButtonProps
) => {
  const { isPublished, onQRClick } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    onQRClick();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="QR code will be available after publish">
        <IconButton
          // disabled={!isPublished}

          onClick={handleClickOpen}
        >
          <QrCode2Icon fontSize="large" />
          {/* <QrCode2Icon fontSize="medium" /> */}
        </IconButton>
      </Tooltip>

      <Dialog
        open={open && !isPublished}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>QR Code Not Available</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Please publish the menu first to access the QR code!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && isPublished}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Scan the QR Code</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Use your phone to scan the QR code and access the online menu!
          </DialogContentText>
          <Grid container justifyContent="center">
            <Box
              marginTop={2}
              alignSelf="center"
              sx={{
                width: 180,
                height: 180,
                bgcolor: "red",
              }}
            ></Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccessQRButton;