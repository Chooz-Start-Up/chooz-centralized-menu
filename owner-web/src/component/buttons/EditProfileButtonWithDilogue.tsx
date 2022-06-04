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

import React from "react";
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
    hoursUpdate,

    onSaveClick,

    ownerNameValidationText,
    restaurantNameValidationText,
    descriptionValidationText,
    addressValidationText,
  } = props;

  let [
    originalOwnerName,
    originalRestaurantName,
    originalDescription,
    originalAddress,
    originalHours,
  ] = [
    ownerNameUpdate(),
    restaurantNameUpdate(),
    descriptionUpdate(),
    addressUpdate(),
    hoursUpdate(),
  ];

  let splitted = originalHours.split("\n", 7);
  let mondayTimeString: string = splitted[0];
  let tuesdayTimeString: string = splitted[1];
  let wednesdayTimeString: string = splitted[2];
  let thursdayTimeString: string = splitted[3];
  let fridayTimeString: string = splitted[4];
  let saturdayTimeString: string = splitted[5];
  let sundayTimeString: string = splitted[6];

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
    mondayTimeString = timeString;
    hoursUpdate(combineTimeString());
  };
  const updateTuesdayTimeString = (timeString: string) => {
    tuesdayTimeString = timeString;
    hoursUpdate(combineTimeString());
  };
  const updateWednesdayTimeString = (timeString: string) => {
    wednesdayTimeString = timeString;
    hoursUpdate(combineTimeString());
  };
  const updateThursdayTimeString = (timeString: string) => {
    thursdayTimeString = timeString;
    hoursUpdate(combineTimeString());
  };
  const updateFridayTimeString = (timeString: string) => {
    fridayTimeString = timeString;
    hoursUpdate(combineTimeString());
  };
  const updateSaturdayTimeString = (timeString: string) => {
    saturdayTimeString = timeString;
    hoursUpdate(combineTimeString());
  };
  const updateSundayTimeString = (timeString: string) => {
    sundayTimeString = timeString;
    hoursUpdate(combineTimeString());
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

  const canClickSave = (): boolean => {
    return (
      ownerNameValidationText === "" &&
      restaurantNameValidationText === "" &&
      descriptionValidationText === "" &&
      addressValidationText === ""
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
          <DialogContentText id="alert-dialog-slide-description">
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
