import React, { useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { FillRestaurantInfoPageProps } from "./interface";
import { choozTheme } from "../theme/theme";
import { auth } from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";
import {
  getRestaurantKey,
  pushProfile,
} from "../firebase/databaseAPI/RestaurantApi";
import { Restaurant } from "../firebase/databaseAPI/Restaurant";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";
import { FillAddressInfoInput } from "../component/fill_info_page_components/FillAddressInfoInput";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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
    setOpen(false);
    navigate("/edit");
  };

  const onSubmit = async () => {
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
      let uid = auth.currentUser.uid;

      getRestaurantKey(uid).then((key) => {
        pushProfile(
          uid,
          new Restaurant(
            key,
            restaurantName,
            description,
            false,
            phoneNumber,
            ownerName,
            address,
            "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed"
          )
        ).then(() => {
          setOpen(false);
          navigate("/edit");
        });
      });
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
  const onAddressChange = (input: string) => {
    setAddress(input);
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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={choozTheme}>
        <ChoozAppBar />
        <Box height="140vh" bgcolor={choozTheme.palette.secondary.main}>
          <Box display="flex" justifyContent="center" height="85%">
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Box
                boxShadow={5}
                sx={{ width: 500, height: "auto" }}
                bgcolor="white"
                textAlign="center"
                marginTop="20%"
                paddingLeft={5}
                paddingRight={5}
                paddingTop={1}
                paddingBottom={3}
              >
                <Box component="img" src={LogoText} margin="2%" width="25%" />
                <Typography sx={{ color: "grey.600", fontSize: 18 }}>
                  Centralized Menu App
                </Typography>

                <Box sx={{ height: 700 }}>
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
                    id="phoneNumber"
                    label="Phone Number"
                    variant="standard"
                    error={phoneNumberValidationText !== ""}
                    helperText={phoneNumberValidationText}
                    onChange={onPhoneNumberChange}
                  />
                  <FillAddressInfoInput onAddressChange={onAddressChange} />
                </Box>

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  sx={{ marginTop: 3 }}
                >
                  <Button
                    onClick={handleOpen}
                    variant="outlined"
                    sx={{ marginRight: 1, textTransform: "none" }}
                  >
                    Skip for now
                  </Button>
                  <Button
                    onClick={onSubmit}
                    variant="contained"
                    sx={{ textTransform: "none" }}
                  >
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
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ textTransform: "none" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleOkay}
                  sx={{ textTransform: "none" }}
                >
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default FillRestaurantInfoPage;
