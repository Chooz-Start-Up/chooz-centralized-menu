import React from "react";
import { Box, Typography, Divider, Button, Fade } from "@mui/material";
import { ProfilePanelProps, ProfilePanelState } from "./interface";
import EditProfileButtonWithDialog from "../buttons/EditProfileButtonWithDilogue";
import { Restaurant } from "../../firebase/databaseAPI/Restaurant";
import {
  pullRestaurantByUser,
  pushProfile,
} from "../../firebase/databaseAPI/RestaurantApi";
import { auth } from "../../firebase/authentication/firebaseAuthentication";

class ProfilePanel extends React.Component<
  ProfilePanelProps,
  ProfilePanelState
> {
  constructor(props: ProfilePanelProps) {
    super(props);

    this.state = {
      loading: false,
      key: "",
      isPublished: false,
      //
      ownerName: "",
      restaurantName: "",
      description: "",
      address: "",
      phoneNumber: "",
      hours:
        "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed",
      //
      newOwnerName: "",
      newRestaurantName: "",
      newDescription: "",
      newAddress: "",
      newPhoneNumber: "",
      newHours:
        "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed",
      //
      ownerNameValidationText: "",
      restaurantNameValidationText: "",
      descriptionValidationText: "",
      addressValidationText: "",
      phoneNumberValidationText: "",
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(() => {
      this.setState(() => {
        return { loading: true };
      });

      if (auth !== null && auth.currentUser !== null) {
        pullRestaurantByUser(auth.currentUser.uid).then((restaurant) => {
          this.setState(() => {
            return {
              key: restaurant.id,
              isPublished: restaurant.isPublished,
              //
              ownerName: restaurant.ownerName,
              restaurantName: restaurant.restaurantName,
              description: restaurant.description,
              address: restaurant.address,
              phoneNumber: restaurant.phoneNumber,
              hours: restaurant.hours,
              //
              newOwnerName: restaurant.ownerName,
              newRestaurantName: restaurant.restaurantName,
              newDescription: restaurant.description,
              newAddress: restaurant.address,
              newPhoneNumber: restaurant.phoneNumber,
              newHours: restaurant.hours,
              //
              ownerNameValidationText: "",
              restaurantNameValidationText: "",
              descriptionValidationText: "",
              addressValidationText: "",
              phoneNumberValidationText: "",
            };
          });
        });

        this.setState(() => {
          return { loading: false };
        });
      }
    });
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
  phoneNumberUpdate = (text?: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          newPhoneNumber: text,
        };
      });

      this.phoneNumberValidation(text);
    }

    return this.state.phoneNumber;
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
  phoneNumberValidation = (text: string): string => {
    if (text !== undefined) {
      this.setState(() => {
        return {
          phoneNumberValidationText:
            text === "" ? "Phone number cannot be empty." : "",
        };
      });
    }

    return this.state.phoneNumberValidationText;
  };

  // Finalizing function that updates the current field with the temporary variables
  onSaveClick = () => {
    if (auth !== null && auth.currentUser !== null) {
      console.log("Pushed Data:\n", this.state.newHours);
      pushProfile(
        auth.currentUser.uid,
        new Restaurant(
          this.state.key,
          this.state.newRestaurantName,
          this.state.newDescription,
          this.state.isPublished,
          this.state.newPhoneNumber,
          this.state.newOwnerName,
          this.state.newAddress,
          this.state.newHours
        )
      );

      this.setState(() => {
        return {
          ownerName: this.state.newOwnerName,
          restaurantName: this.state.newRestaurantName,
          description: this.state.newDescription,
          address: this.state.newAddress,
          phoneNumber: this.state.newPhoneNumber,
          hours: this.state.newHours,
        };
      });
    }
  };

  render() {
    return (
      <>
        <Box width="100%" height="auto" bgcolor="grey.200">
          {!this.state.loading && (
            <Fade
              in={true}
              exit={false}
              mountOnEnter
              unmountOnExit
              timeout={400}
            >
              <Box
                padding="2%"
                width="40%"
                height="95vh"
                bgcolor="white"
                boxShadow={2}
              >
                <Typography variant="h4" color="black" textAlign="left">
                  Profile
                </Typography>
                <Divider />

                <Box display="flex" marginTop={1}>
                  <Box width="40%">
                    <Typography noWrap>Email Address: </Typography>
                  </Box>
                  <Box width="50%">
                    <Typography
                      sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                      {auth.currentUser?.email}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 2,
                  }}
                >
                  <Box width="40%">
                    <Typography noWrap>Owner Name: </Typography>
                  </Box>

                  <Box width="50%">
                    <Typography
                      sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                      {this.state.ownerName}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box width="40%">
                    <Typography noWrap>Restaurant Name:</Typography>
                  </Box>

                  <Box width="50%">
                    <Typography
                      sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                      {this.state.restaurantName}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box width="40%">
                    <Typography noWrap>Phone Number: </Typography>
                  </Box>

                  <Box width="50%">
                    <Typography
                      sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                      {this.state.phoneNumber}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box width="40%">
                    <Typography>Address: </Typography>
                  </Box>

                  <Box width="50%">
                    <Typography
                      sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                      {this.state.address.split("\n", 4)[0] +
                        ", " +
                        this.state.address.split("\n", 4)[1] +
                        ", " +
                        this.state.address.split("\n", 4)[2] +
                        ", " +
                        this.state.address.split("\n", 4)[3]}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Restaurant Description
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />

                <Box width="80%">
                  <Typography
                    sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {this.state.description}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Operating Hours
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />

                {this.state.hours.split("\n", 7).map((day, i) => (
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography key={i}>{day.split(" ", 1)[0]}</Typography>
                    </Box>
                    <Box width="60%">
                      <Typography key={i} align="left">
                        {day.substring(day.split(" ", 1)[0].length)}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  sx={{ marginTop: "5%" }}
                >
                  {auth.currentUser?.providerData[0].providerId.indexOf(
                    "password"
                  ) !== -1 && (
                    <Button
                      variant="outlined"
                      href={"/resetpassword/" + auth.currentUser?.email}
                      sx={{ marginRight: 2, textTransform: "none" }}
                    >
                      Reset Password
                    </Button>
                  )}
                  <EditProfileButtonWithDialog
                    ownerNameUpdate={this.ownerNameUpdate}
                    restaurantNameUpdate={this.restaurantNameUpdate}
                    descriptionUpdate={this.descriptionUpdate}
                    addressUpdate={this.addressUpdate}
                    phoneNumberUpdate={this.phoneNumberUpdate}
                    hoursUpdate={this.hoursUpdate}
                    //
                    onSaveClick={this.onSaveClick}
                    //
                    ownerNameValidationText={this.state.ownerNameValidationText}
                    restaurantNameValidationText={
                      this.state.restaurantNameValidationText
                    }
                    descriptionValidationText={
                      this.state.descriptionValidationText
                    }
                    addressValidationText={this.state.addressValidationText}
                    phoneNumberValidationText={
                      this.state.phoneNumberValidationText
                    }
                  />
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
      </>
    );
  }
}

export default ProfilePanel;
