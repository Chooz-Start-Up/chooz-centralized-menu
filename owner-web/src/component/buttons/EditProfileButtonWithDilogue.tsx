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
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import DateTimeInput from "./DateTimeInput";
import { EditProfileButtonWithDialogProps } from "./interface";

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

  let [
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

  let splitted = originalHours.split("\n", 7);
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
  const onAddressChange = (event: any) => {
    addressUpdate(event.target.value);
  };
  const onPhoneNumberChange = (event: any) => {
    phoneNumberUpdate(event.target.value);
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
      <Button onClick={handleClickOpen} variant="contained">
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
          <DialogContentText color="black" id="alert-dialog-slide-description">
            All fields are required and cannot be empty
          </DialogContentText>
        </DialogTitle>
        <DialogContent>
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
              id="address"
              label="Address"
              variant="standard"
              error={addressValidationText !== ""}
              helperText={addressValidationText}
              onChange={onAddressChange}
              defaultValue={originalAddress}
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
            <Typography variant="h5" sx={{ marginTop: 2 }} textAlign="center">
              Operating Hours
            </Typography>

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            <DateTimeInput
              timeString={mondayTimeString}
              updateTimeString={updateMondayTimeString}
            />
            <DateTimeInput
              timeString={tuesdayTimeString}
              updateTimeString={updateTuesdayTimeString}
            />
            <DateTimeInput
              timeString={wednesdayTimeString}
              updateTimeString={updateWednesdayTimeString}
            />
            <DateTimeInput
              timeString={thursdayTimeString}
              updateTimeString={updateThursdayTimeString}
            />
            <DateTimeInput
              timeString={fridayTimeString}
              updateTimeString={updateFridayTimeString}
            />
            <DateTimeInput
              timeString={saturdayTimeString}
              updateTimeString={updateSaturdayTimeString}
            />
            <DateTimeInput
              timeString={sundayTimeString}
              updateTimeString={updateSundayTimeString}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClose}
            variant="outlined"
            sx={{
              bgcolor: "grey.300",
              color: "black",
              borderColor: "grey.400",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "grey.400",
                borderColor: "grey.500",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClose}
            variant="contained"
            sx={{ marginLeft: 1 }}
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
