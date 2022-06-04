import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { ProfilePanelProps, ProfilePanelState } from "./interface";
import EditProfileButtonWithDialog from "../buttons/EditProfileButtonWithDilogue";

class ProfilePanel extends React.Component<
  ProfilePanelProps,
  ProfilePanelState
> {
  constructor(props: ProfilePanelProps) {
    super(props);

    this.state = {
      ownerName: "string",
      restaurantName: "string",
      description: "string",
      address: "string",
      hours:
        "Monday 01:00 AM - 01:00 PM\nTuesday 02:00 AM - 02:00 PM\nWednesday 03:00 AM - 03:00 PM\nThursday 04:00 AM - 04:00 PM\nFriday 05:00 AM - 05:00 PM\nSaturday 06:00 AM - 06:00 PM\nSunday Closed",
      // "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed\n",
      //
      newOwnerName: "string",
      newRestaurantName: "string",
      newDescription: "string",
      newAddress: "string",
      newHours:
        "Monday 01:00 AM - 01:00 PM\nTuesday 02:00 AM - 02:00 PM\nWednesday 03:00 AM - 03:00 PM\nThursday 04:00 AM - 04:00 PM\nFriday 05:00 AM - 05:00 PM\nSaturday 06:00 AM - 06:00 PM\nSunday Closed",
      // "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed\n",
      //
      ownerNameValidationText: "",
      restaurantNameValidationText: "",
      descriptionValidationText: "",
      addressValidationText: "",
    };
  }

  // Text update functions that will temporily save the onChange textfield value. Returns the current field value with no parameter
  ownerNameUpdate = (text?: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          newOwnerName: text,
        };
      });

      this.ownerNameValidation(text);
    }

    return this.state.ownerName;
  };
  restaurantNameUpdate = (text?: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          newRestaurantName: text,
        };
      });

      this.restaurantNameValidation(text);
    }

    return this.state.restaurantName;
  };
  descriptionUpdate = (text?: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          newDescription: text,
        };
      });

      this.descriptionValidation(text);
    }

    return this.state.description;
  };
  addressUpdate = (text?: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          newAddress: text,
        };
      });

      this.addressValidation(text);
    }

    return this.state.address;
  };
  hoursUpdate = (text?: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          newHours: text,
        };
      });
    }

    return this.state.hours;
  };

  // Validator function to validate the live onChange values
  ownerNameValidation = (text: string): string => {
    if (text !== undefined) {
      console.log("Validating ownerName text: ", text);
      this.setState(() => {
        return {
          ownerNameValidationText:
            text === "" ? "Owner name cannot be empty." : "",
        };
      });
    }

    return this.state.ownerNameValidationText;
  };
  restaurantNameValidation = (text: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          restaurantNameValidationText:
            text === "" ? "Restaurant name cannot be empty." : "",
        };
      });
    }

    return this.state.restaurantNameValidationText;
  };
  descriptionValidation = (text: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          descriptionValidationText:
            text === "" ? "Description cannot be empty." : "",
        };
      });
    }

    return this.state.descriptionValidationText;
  };
  addressValidation = (text: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          addressValidationText: text === "" ? "Address cannot be empty." : "",
        };
      });
    }

    return this.state.addressValidationText;
  };

  // Finalizing function that updates the current field with the temporary variables
  onSaveClick = () => {
    this.setState(() => {
      return {
        ownerName: this.state.newOwnerName,
        restaurantName: this.state.newRestaurantName,
        description: this.state.newDescription,
        address: this.state.newAddress,
        hours: this.state.newHours,
      };
    });
  };

  render() {
    return (
      <>
        <Box width="100%" height="100%" bgcolor="grey.200">
          <Box
            padding={5}
            width="40%"
            height="100vh"
            bgcolor="white"
            borderColor="red"
          >
            <Typography variant="h4" color="black" textAlign="left">
              Profile
            </Typography>
            <Divider />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: 2,
              }}
            >
              <Box width="30%">
                <Typography>Owner Name: </Typography>
                <Typography>Restaurant Name:</Typography>
                <Typography>Description: </Typography>
                <Typography>Address: </Typography>
              </Box>

              <Box width="30%">
                <Typography>{this.state.ownerName}</Typography>
                <Typography>{this.state.restaurantName}</Typography>
                <Typography>{this.state.description}</Typography>
                <Typography>{this.state.address}</Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ marginTop: 5 }}>
              Operating Hours
            </Typography>

            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box width="30%">
                <Typography>
                  {this.state.hours.split("\n", 7)[0].split(" ", 1)[0]}:
                </Typography>
                <Typography>
                  {this.state.hours.split("\n", 7)[1].split(" ", 1)[0]}:
                </Typography>
                <Typography>
                  {this.state.hours.split("\n", 7)[2].split(" ", 1)[0]}:
                </Typography>
                <Typography>
                  {this.state.hours.split("\n", 7)[3].split(" ", 1)[0]}:
                </Typography>
                <Typography>
                  {this.state.hours.split("\n", 7)[4].split(" ", 1)[0]}:
                </Typography>
                <Typography>
                  {this.state.hours.split("\n", 7)[5].split(" ", 1)[0]}:
                </Typography>
                <Typography>
                  {this.state.hours.split("\n", 7)[6].split(" ", 1)[0]}:
                </Typography>
              </Box>

              <Box width="30%">
                <Typography>
                  {this.state.hours
                    .split("\n", 7)[0]
                    .substring(
                      this.state.hours.split("\n", 7)[0].split(" ", 1)[0].length
                    )}
                </Typography>
                <Typography>
                  {this.state.hours
                    .split("\n", 7)[1]
                    .substring(
                      this.state.hours.split("\n", 7)[1].split(" ", 1)[0].length
                    )}
                </Typography>
                <Typography>
                  {this.state.hours
                    .split("\n", 7)[2]
                    .substring(
                      this.state.hours.split("\n", 7)[2].split(" ", 1)[0].length
                    )}
                </Typography>
                <Typography>
                  {this.state.hours
                    .split("\n", 7)[3]
                    .substring(
                      this.state.hours.split("\n", 7)[3].split(" ", 1)[0].length
                    )}
                </Typography>
                <Typography>
                  {this.state.hours
                    .split("\n", 7)[4]
                    .substring(
                      this.state.hours.split("\n", 7)[4].split(" ", 1)[0].length
                    )}
                </Typography>
                <Typography>
                  {this.state.hours
                    .split("\n", 7)[5]
                    .substring(
                      this.state.hours.split("\n", 7)[5].split(" ", 1)[0].length
                    )}
                </Typography>
                <Typography>
                  {this.state.hours
                    .split("\n", 7)[6]
                    .substring(
                      this.state.hours.split("\n", 7)[6].split(" ", 1)[0].length
                    )}
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ marginTop: "5%" }}
            >
              <EditProfileButtonWithDialog
                ownerNameUpdate={this.ownerNameUpdate}
                restaurantNameUpdate={this.restaurantNameUpdate}
                descriptionUpdate={this.descriptionUpdate}
                addressUpdate={this.addressUpdate}
                hoursUpdate={this.hoursUpdate}
                //
                onSaveClick={this.onSaveClick}
                //
                ownerNameValidationText={this.state.ownerNameValidationText}
                restaurantNameValidationText={
                  this.state.restaurantNameValidationText
                }
                descriptionValidationText={this.state.descriptionValidationText}
                addressValidationText={this.state.addressValidationText}
              />
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

export default ProfilePanel;
