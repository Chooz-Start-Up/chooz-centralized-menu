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
import { auth } from "../../firebase/authentication/firebaseAuthentication";
import { pullDynamicLink } from "../../firebase/databaseAPI/DynamicLinkAPI";
import { QRCode } from "react-qrcode-logo";
import JacobChoi from "../images/profile/jacob_choi.jpg";

const AccessQRButton: React.FC<AccessQRButtonProps> = (
  props: AccessQRButtonProps
) => {
  const { isPublished } = props;

  const [open, setOpen] = React.useState(false);

  const [link, setLink] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateLink = () => {
    if (auth !== null && auth.currentUser !== null) {
      pullDynamicLink(auth.currentUser.uid).then((dynamicLink) => {
        setLink(dynamicLink);
        console.log(link);
      });
    }
    return link;
  };

  return (
    <>
      <Tooltip title="Access QR Code">
        <IconButton onClick={handleClickOpen}>
          <QrCode2Icon fontSize="large" />
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
          <DialogContentText color="black" id="alert-dialog-slide-description">
            Please publish the menu first to access the QR code!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && isPublished}
        // keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          minHeight: "500px",
        }}
      >
        <DialogTitle>Scan the QR Code</DialogTitle>
        <DialogContent>
          <DialogContentText color="black" id="alert-dialog-slide-description">
            Use your phone to scan the QR code and access the online menu!
          </DialogContentText>
          <Grid container justifyContent="center">
            {/* <Box
              marginTop={2}
              alignSelf="center"
              sx={{
                width: 180,
                height: 180,
                bgcolor: "red",
              }}
            ></Box> */}
            <QRCode
              value={generateLink()}
              logoImage={JacobChoi}
              eyeRadius={3}
            />
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
