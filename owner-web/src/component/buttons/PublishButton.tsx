import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Typography,
  Grid,
  Box,
} from "@mui/material/";
import { PublishButtonProps } from "./interface";
import { useState } from "react";
import { pullRestaurantMenuByUser } from "../../firebase/databaseAPI/RestaurantApi";
import { auth } from "../../firebase/authentication/firebaseAuthentication";
import { QRCode } from "react-qrcode-logo";
import { pullDynamicLink } from "../../firebase/databaseAPI/DynamicLinkAPI";
import { toPng } from "html-to-image";
import ChoozIcon from "../images/chooz_icons/logoRed_bgWhiteCircular.png";

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
  const printRef = React.useRef<HTMLDivElement>(null);

  const [isMenuValid, setIsMenuValid] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [qrOpen, setQROpen] = React.useState(false);

  const [link, setLink] = React.useState("");

  const handleClickOpen = () => {
    checkValidProfile();

    // checking for valid menus if there is no empty item
    if (auth !== null && auth.currentUser !== null) {
      pullRestaurantMenuByUser(auth.currentUser.uid).then(
        (menus) => {
          let isValid = true;
          menus.forEach((menu) => {
            if (menu.categories.length === 0) {
              isValid = false;
            } else {
              menu.categories.forEach((category) => {
                if (category.items.length === 0) {
                  isValid = false;
                }
              });
            }
          });

          setIsMenuValid(isValid);
          setOpen(true);
        },
        () => {
          setIsMenuValid(false);
          setOpen(true);
        }
      );
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = () => {
    onPublishClick();
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
        link.download = "Chooz " + props.restaurantName + ".png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
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
            textTransform: "none",
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
            textTransform: "none",
          }}
        >
          Unpublish
        </Button>
      )}

      <Dialog
        open={open && !isPublished && !isMenuValid && !isLoading}
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Make sure your menu is complete.</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography>
            Please make sure all menus have at least one category and all
            categories have at least one item. (Delete empty Menus and
            Categories )
          </Typography>
          <Typography>
            You will not be able to publish the menu until you have a valid menu
            list
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={
          open && !isPublished && isMenuValid && !isProfileValid && !isLoading
        }
        keepMounted
        onClose={handleCancel}
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
        open={
          open && !isPublished && isMenuValid && isProfileValid && !isLoading
        }
        keepMounted
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to publish your menu?</DialogTitle>
        <DialogContent>
          <DialogContentText color="black" id="alert-dialog-slide-description">
            A unique QR code will be generated to access your menu!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              setQROpen(true);
            }}
            sx={{ textTransform: "none" }}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && isPublished && !isLoading}
        keepMounted
        onClose={handleCancel}
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
          <Button onClick={handleCancel} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Unpublish
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={qrOpen}
        // keepMounted
        onClose={handleCancel}
        sx={{
          minHeight: "500px",
        }}
      >
        <DialogTitle>
          <Typography fontSize={22} fontWeight="bold" align="center">
            View Menu
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="black">
            <Typography fontSize={20}>
              Your restaurant and menu is now discoverable on the app. You can
              scan the QR code now to see!
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
          <Button
            onClick={() => {
              setQROpen(false);
            }}
            sx={{ textTransform: "none" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PublishButton;
