import React, { useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { FillRestaurantInfoPageProps, VerifyEmailPageProps } from "./interface";
import { choozTheme } from "./theme";
import AdbIcon from "@mui/icons-material/Adb";

import {
  auth,
  resendEmailVerification,
} from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";
import { pushRestaurant } from "../firebase/databaseAPI/RestaurantApi";
import { Restaurant } from "../firebase/databaseAPI/Restaurant";

const FillRestaurantInfoPage: React.FC<FillRestaurantInfoPageProps> = (
  props: FillRestaurantInfoPageProps
) => {
  const navigate = useNavigate();

  const [ownerName, setOwnerName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [ownerNameValidationText, setOwnerNameValidationText] = useState("");
  const [restaurantNameValidationText, setRestaurantNameValidationText] =
    useState("");
  const [descriptionValidationText, setDescriptionValidationText] =
    useState("");
  const [addressValidationText, setAddressValidationText] = useState("");
  const [phoneNumberValidationText, setPhoneNumberValidationText] =
    useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOkay = () => {
    if (auth !== null && auth.currentUser !== null) {
      pushRestaurant(
        auth.currentUser.uid,
        new Restaurant(
          "",
          "",
          "",
          false,
          "",
          "",
          "",
          "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed"
        )
      );
    }

    setOpen(false);
    navigate("/edit");
  };

  const onSubmit = () => {
    let isValidOwnerName = validateOwnerName();
    let isValidRestaurantName = validateRestaurantName();
    let isValidDescription = validateDescription();
    let isValidAddress = validateAddress();
    let isValidPhoneNumber = validatePhoneNumber();

    if (
      isValidOwnerName &&
      isValidRestaurantName &&
      isValidDescription &&
      isValidAddress &&
      isValidPhoneNumber &&
      auth !== null &&
      auth.currentUser !== null
    ) {
      console.log("Filled information pushed");
      pushRestaurant(
        auth.currentUser.uid,
        new Restaurant(
          "",
          restaurantName,
          description,
          false,
          phoneNumber,
          ownerName,
          address,
          "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed"
        )
      );

      navigate("/edit");
    }
  };

  const onOwnerNameChange = (event: any) => {
    setOwnerName(event.target.value);
  };
  const onRestaurantNameChange = (event: any) => {
    setRestaurantName(event.target.value);
  };
  const onDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };
  const onAddressChange = (event: any) => {
    setAddress(event.target.value);
  };
  const onPhoneNumberChange = (event: any) => {
    setPhoneNumber(event.target.value);
  };

  const validateOwnerName = (): boolean => {
    if (ownerName === "") {
      setOwnerNameValidationText("Owner name cannot be empty.");
      return false;
    } else {
      setOwnerNameValidationText("");
      return true;
    }
  };
  const validateRestaurantName = (): boolean => {
    if (restaurantName === "") {
      setRestaurantNameValidationText("Restaurant name cannot be empty.");
      return false;
    } else {
      setRestaurantNameValidationText("");
      return true;
    }
  };
  const validateDescription = (): boolean => {
    if (description === "") {
      setDescriptionValidationText("Description cannot be empty.");
      return false;
    } else {
      setDescriptionValidationText("");
      return true;
    }
  };
  const validateAddress = (): boolean => {
    if (address === "") {
      setAddressValidationText("Address cannot be empty.");
      return false;
    } else {
      setAddressValidationText("");
      return true;
    }
  };
  const validatePhoneNumber = (): boolean => {
    if (phoneNumber === "") {
      setPhoneNumberValidationText("Phone number cannot be empty.");
      return false;
    } else {
      setPhoneNumberValidationText("");
      return true;
    }
  };

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <ChoozAppBar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="#ffd7db"
          paddingTop={6}
        >
          <Box
            boxShadow={5}
            sx={{ width: 500, height: 750 }}
            bgcolor="white"
            textAlign="center"
            paddingLeft={7}
            paddingRight={7}
            paddingTop={1}
          >
            <AdbIcon sx={{ fontSize: 45, marginTop: "3%", color: "red" }} />
            <Typography
              sx={{ color: "black", fontWeight: "bold", fontSize: 34 }}
            >
              Chooz
            </Typography>
            <Typography sx={{ color: "grey.600", fontSize: 18 }}>
              Centralized Menu App
            </Typography>

            <Box sx={{ height: 525 }}>
              <TextField
                fullWidth
                margin="normal"
                required
                id="ownerName"
                label="Owner Name"
                variant="standard"
                error={ownerNameValidationText !== ""}
                helperText={ownerNameValidationText}
                onChange={onOwnerNameChange}
                defaultValue=""
              />
              <TextField
                fullWidth
                margin="normal"
                required
                id="restaurantName"
                label="Restaurant Name"
                variant="standard"
                error={restaurantNameValidationText !== ""}
                helperText={restaurantNameValidationText}
                onChange={onRestaurantNameChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                id="description"
                label="Description"
                variant="outlined"
                multiline
                minRows={3}
                maxRows={3}
                error={descriptionValidationText !== ""}
                helperText={descriptionValidationText}
                onChange={onDescriptionChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                id="address"
                label="Address"
                variant="standard"
                error={addressValidationText !== ""}
                helperText={addressValidationText}
                onChange={onAddressChange}
              />
              <TextField
                fullWidth
                margin="normal"
                required
                id="phoneNumber"
                label="Phone Number"
                variant="standard"
                error={phoneNumberValidationText !== ""}
                helperText={phoneNumberValidationText}
                onChange={onPhoneNumberChange}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 3 }}>
              <Button
                onClick={handleOpen}
                variant="outlined"
                sx={{ marginRight: 1 }}
              >
                Skip for now
              </Button>
              <Button onClick={onSubmit} variant="contained">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>

        <Dialog
          open={open}
          keepMounted
          onClose={handleCancel}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              color="black"
            >
              You will not be able to publish your menu if you do not fill in
              the necessary information. You will be able to fill in your
              information on the profile page.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleOkay}>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default FillRestaurantInfoPage;
