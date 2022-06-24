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

import ChoozIcon from "../images/chooz_icon/chooz_red.png";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

const AccessQRButton: React.FC<AccessQRButtonProps> = (
  props: AccessQRButtonProps
) => {
  const printRef = React.useRef<HTMLDivElement>(null);

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
      });
    }
    return link;
  };

  const downloadQR = () => {
    if (printRef.current === null) {
      console.log("It was null");
      return;
    }

    toPng(printRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "ChoozQR.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Box
              marginTop={2}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box fontSize={100}>
                <div ref={printRef}>
                  <QRCode
                    value={generateLink()}
                    logoImage={ChoozIcon}
                    logoHeight={80}
                    logoWidth={80}
                    eyeRadius={10}
                    qrStyle="dots"
                    size={300}
                    // bgColor="#FFFAEF"
                    // fgColor="#A90011"
                  />
                </div>
              </Box>

              <Button
                variant="outlined"
                sx={{ width: "90%", marginLeft: "5%", marginTop: "5%" }}
                onClick={downloadQR}
              >
                Download Image
              </Button>
            </Box>
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
