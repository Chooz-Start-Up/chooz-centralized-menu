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
import { useState } from "react";
import { pullRestaurantMenuByUser } from "../../firebase/databaseAPI/RestaurantApi";
import { auth } from "../../firebase/authentication/firebaseAuthentication";
import { Restaurant } from "@mui/icons-material";
import { Typography } from "@material-ui/core";

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
  const [isMenuValid, setIsMenuValid] = useState(false);

  const [open, setOpen] = React.useState(false);

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
        open={open && !isPublished && !isMenuValid && !isLoading}
        keepMounted
        onClose={handleClose}
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
          <Button onClick={handleCancel}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={
          open && !isPublished && isMenuValid && !isProfileValid && !isLoading
        }
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
        open={
          open && !isPublished && isMenuValid && isProfileValid && !isLoading
        }
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
        open={open && isPublished && !isLoading}
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
