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
  Grid,
  Typography,
  ThemeProvider,
} from "@mui/material/";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { AccessQRButtonProps } from "./interface";
import { auth } from "../../firebase/authentication/firebaseAuthentication";
import { pullDynamicLink } from "../../firebase/databaseAPI/DynamicLinkAPI";
import { QRCode } from "react-qrcode-logo";
import ChoozIcon from "../images/chooz_icons/logoRed_bgWhiteCircular.png";
import { toPng } from "html-to-image";
import { choozTheme } from "../../theme/theme";

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
      <ThemeProvider theme={choozTheme}>
        <Tooltip title="Access QR Code">
          <Button
            variant="contained"
            sx={{
              height: 35,
              bgcolor: "red",
              "&:hover": {
                backgroundColor: "red.100",
                boxShadow: "none",
              },
              margin: 1,
            }}
            onClick={handleClickOpen}
          >
            <QrCode2Icon fontSize="medium" />
            {/* <IconButton onClick={handleClickOpen}>
              <QrCode2Icon fontSize="large" />
            </IconButton> */}
          </Button>
        </Tooltip>

        <Dialog open={open && !isPublished} keepMounted onClose={handleClose}>
          <DialogTitle>QR Code Not Available</DialogTitle>
          <DialogContent>
            <DialogContentText color="black">
              Please publish the menu first to access the QR code
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ textTransform: "none" }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open && isPublished}
          // keepMounted
          onClose={handleClose}
          sx={{
            minHeight: "500px",
          }}
        >
          <DialogTitle>Scan the QR Code</DialogTitle>
          <DialogContent>
            <DialogContentText color="black">
              <Typography fontSize={20}>
                Use your phone to scan the QR code and access the mobile menu
              </Typography>
            </DialogContentText>
            <Grid container justifyContent="center">
              <Box
                marginTop={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <div ref={printRef}>
                  <QRCode
                    value={generateLink()}
                    logoImage={ChoozIcon}
                    logoHeight={80}
                    logoWidth={80}
                    eyeRadius={10}
                    qrStyle="dots"
                    size={300}
                  />
                </div>

                <Button
                  variant="outlined"
                  sx={{
                    width: "90%",
                    marginLeft: "5%",
                    marginTop: "5%",
                    textTransform: "none",
                  }}
                  onClick={downloadQR}
                >
                  Download Image
                </Button>
              </Box>
            </Grid>
            <Typography
              align="center"
              fontSize={14}
              color="grey.500"
              sx={{ marginTop: 3 }}
            >
              <Typography display="inline" fontWeight="bold">
                This QR code will remain the same
              </Typography>{" "}
              after any edits that you make to the menu or profile
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ textTransform: "none" }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default AccessQRButton;
