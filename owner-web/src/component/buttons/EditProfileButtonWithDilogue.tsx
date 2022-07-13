import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/authentication/firebaseAuthentication";
import DateTimeInput from "./DateTimeInput";
import { EditProfileButtonWithDialogProps } from "./interface";
import { AddressInput } from "./AddressInput";

const EditProfileButtonWithDialog: React.FC<
  EditProfileButtonWithDialogProps
> = (props: EditProfileButtonWithDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const {
    ownerNameUpdate,
    restaurantNameUpdate,
    descriptionUpdate,
    addressUpdate,
    phoneNumberUpdate,
    hoursUpdate,

    onSaveClick,

    ownerNameValidationText,
    restaurantNameValidationText,
    descriptionValidationText,
    addressValidationText,
    phoneNumberValidationText,
  } = props;

  const [
    originalOwnerName,
    originalRestaurantName,
    originalDescription,
    originalAddress,
    originalPhoneNumber,
    originalHours,
  ] = [
    ownerNameUpdate(),
    restaurantNameUpdate(),
    descriptionUpdate(),
    addressUpdate(),
    phoneNumberUpdate(),
    hoursUpdate(),
  ];

  const splitted = originalHours.split("\n", 7);
  // let mondayTimeString: string = splitted[0];
  // let tuesdayTimeString: string = splitted[1];
  // let wednesdayTimeString: string = splitted[2];
  // let thursdayTimeString: string = splitted[3];
  // let fridayTimeString: string = splitted[4];
  // let saturdayTimeString: string = splitted[5];
  // let sundayTimeString: string = splitted[6];

  const [mondayTimeString, setMondayTimeString] = useState(splitted[0]);
  const [tuesdayTimeString, setTuesdayTimeString] = useState(splitted[1]);
  const [wednesdayTimeString, setWednesdayTimeString] = useState(splitted[2]);
  const [thursdayTimeString, setThursdayTimeString] = useState(splitted[3]);
  const [fridayTimeString, setFridayTimeString] = useState(splitted[4]);
  const [saturdayTimeString, setSaturdayTimeString] = useState(splitted[5]);
  const [sundayTimeString, setSundayTimeString] = useState(splitted[6]);

  useEffect(() => {
    setMondayTimeString(splitted[0]);
    setTuesdayTimeString(splitted[1]);
    setWednesdayTimeString(splitted[2]);
    setThursdayTimeString(splitted[3]);
    setFridayTimeString(splitted[4]);
    setSaturdayTimeString(splitted[5]);
    setSundayTimeString(splitted[6]);
  }, splitted);

  useEffect(() => {
    hoursUpdate(combineTimeString());
  }, [
    mondayTimeString,
    tuesdayTimeString,
    wednesdayTimeString,
    thursdayTimeString,
    fridayTimeString,
    saturdayTimeString,
    sundayTimeString,
  ]);

  const combineTimeString = (): string => {
    return (
      mondayTimeString +
      "\n" +
      tuesdayTimeString +
      "\n" +
      wednesdayTimeString +
      "\n" +
      thursdayTimeString +
      "\n" +
      fridayTimeString +
      "\n" +
      saturdayTimeString +
      "\n" +
      sundayTimeString
    );
  };

  const updateMondayTimeString = (timeString: string) => {
    // mondayTimeString = timeString;
    setMondayTimeString(timeString);
    // hoursUpdate(combineTimeString());
  };
  const updateTuesdayTimeString = (timeString: string) => {
    // tuesdayTimeString = timeString;
    setTuesdayTimeString(timeString);
    // hoursUpdate(combineTimeString());
  };
  const updateWednesdayTimeString = (timeString: string) => {
    // wednesdayTimeString = timeString;
    setWednesdayTimeString(timeString);
    // hoursUpdate(combineTimeString());
  };
  const updateThursdayTimeString = (timeString: string) => {
    // thursdayTimeString = timeString;
    setThursdayTimeString(timeString);
    // hoursUpdate(combineTimeString());
  };
  const updateFridayTimeString = (timeString: string) => {
    // fridayTimeString = timeString;
    setFridayTimeString(timeString);
    // hoursUpdate(combineTimeString());
  };
  const updateSaturdayTimeString = (timeString: string) => {
    // saturdayTimeString = timeString;
    setSaturdayTimeString(timeString);
    // hoursUpdate(combineTimeString());
  };
  const updateSundayTimeString = (timeString: string) => {
    // sundayTimeString = timeString;
    setSundayTimeString(timeString);
    // hoursUpdate(combineTimeString());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCancelClose = () => {
    ownerNameUpdate(originalOwnerName);
    restaurantNameUpdate(originalRestaurantName);
    descriptionUpdate(originalDescription);
    addressUpdate(originalAddress);
    hoursUpdate(originalHours);

    setMondayTimeString(splitted[0]);
    setTuesdayTimeString(splitted[1]);
    setWednesdayTimeString(splitted[2]);
    setThursdayTimeString(splitted[3]);
    setFridayTimeString(splitted[4]);
    setSaturdayTimeString(splitted[5]);
    setSundayTimeString(splitted[6]);

    setOpen(false);
  };
  const handleSaveClose = () => {
    onSaveClick();
    setOpen(false);
  };

  const onOwnerNameChange = (event: any) => {
    ownerNameUpdate(event.target.value);
  };
  const onRestaurantNameChange = (event: any) => {
    restaurantNameUpdate(event.target.value);
  };
  const onDescriptionChange = (event: any) => {
    descriptionUpdate(event.target.value);
  };
  const onPhoneNumberChange = (event: any) => {
    phoneNumberUpdate(event.target.value);
  };
  const onAddressChange = (input: string) => {
    addressUpdate(input);
  };

  const canClickSave = (): boolean => {
    return (
      ownerNameValidationText === "" &&
      restaurantNameValidationText === "" &&
      descriptionValidationText === "" &&
      addressValidationText === "" &&
      phoneNumberValidationText === ""
    );
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{ textTransform: "none" }}
      >
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleCancelClose}
        PaperProps={{
          sx: {
            width: "30%",
          },
        }}
      >
        <DialogTitle variant="h4" sx={{ color: "black" }}>
          Edit Profile
          <DialogContentText color="black" sx={{ marginTop: 1 }}>
            All fields are required and cannot be empty.
          </DialogContentText>
          <DialogContentText color="black">
            Operation hours will be set to be "Closed" by default.
          </DialogContentText>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Tooltip title="You cannot change the email address.">
              <TextField
                fullWidth
                margin="normal"
                id="emailAddress"
                label="Email Address"
                variant="standard"
                defaultValue={auth.currentUser?.email}
                disabled={true}
              />
            </Tooltip>
          </Box>

          <Box>
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
              defaultValue={originalOwnerName}
            />
          </Box>

          <Box>
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
              defaultValue={originalRestaurantName}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              margin="normal"
              required
              id="description"
              label="Description"
              variant="outlined"
              multiline
              minRows={4}
              error={descriptionValidationText !== ""}
              helperText={descriptionValidationText}
              onChange={onDescriptionChange}
              defaultValue={originalDescription}
            />
          </Box>

          <Box>
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
              defaultValue={originalPhoneNumber}
            />
          </Box>

          <Box>
            {/* <TextField
              fullWidth
              margin="normal"
              required
              id="address"
              label="Address"
              variant="standard"
              error={addressValidationText !== ""}
              helperText={addressValidationText}
              onChange={onAddressChange}
              defaultValue={originalAddress}
            /> */}
            <AddressInput
              address={originalAddress}
              onAddressChange={onAddressChange}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ marginTop: 2 }} textAlign="center">
              Operating Hours
            </Typography>

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            <DateTimeInput
              timeString={mondayTimeString}
              updateTimeString={updateMondayTimeString}
              aboveTimeString={""}
            />
            <DateTimeInput
              timeString={tuesdayTimeString}
              updateTimeString={updateTuesdayTimeString}
              aboveTimeString={mondayTimeString}
            />
            <DateTimeInput
              timeString={wednesdayTimeString}
              updateTimeString={updateWednesdayTimeString}
              aboveTimeString={tuesdayTimeString}
            />
            <DateTimeInput
              timeString={thursdayTimeString}
              updateTimeString={updateThursdayTimeString}
              aboveTimeString={wednesdayTimeString}
            />
            <DateTimeInput
              timeString={fridayTimeString}
              updateTimeString={updateFridayTimeString}
              aboveTimeString={thursdayTimeString}
            />
            <DateTimeInput
              timeString={saturdayTimeString}
              updateTimeString={updateSaturdayTimeString}
              aboveTimeString={fridayTimeString}
            />
            <DateTimeInput
              timeString={sundayTimeString}
              aboveTimeString={saturdayTimeString}
              updateTimeString={updateSundayTimeString}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClose}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClose}
            variant="contained"
            sx={{ marginLeft: 1, textTransform: "none" }}
            disabled={!canClickSave()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProfileButtonWithDialog;
