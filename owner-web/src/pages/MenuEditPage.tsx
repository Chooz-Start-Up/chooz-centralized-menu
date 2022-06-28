import React from "react";
import { Box, Fade, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import TabPanel from "../component/buttons/TabPanel";
import { MenuColumnList } from "../component/edit_page_components/MenuColumnList";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import PublishButton from "../component/buttons/PublishButton";
import AccessQRButton from "../component/buttons/AccessQRButton";
import { MenuEditPageProp, MenuEditPageState } from "./interface";
import { choozTheme } from "../theme/theme";
import ProfilePanel from "../component/edit_page_components/ProfilePanel";
import { UploadImagePanel } from "../component/edit_page_components/UploadImagePanel";
import {
  pullRestaurantByUser,
  pushProfile,
} from "../firebase/databaseAPI/RestaurantApi";
import { auth } from "../firebase/authentication/firebaseAuthentication";
import UnpublishAndEditButtonWithDialog from "../component/buttons/UnpublishAndEditButtonWithDialog";

class MenuEditPage extends React.Component<
  MenuEditPageProp,
  MenuEditPageState
> {
  constructor(props: MenuEditPageProp) {
    super(props);

    this.state = {
      restaurantName: "",

      tabIndex: 0,
      isPublished: false,
      isProfileValid: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(() => {
      this.setState(() => {
        return { isLoading: true };
      });

      if (auth !== null && auth.currentUser !== null) {
        pullRestaurantByUser(auth.currentUser.uid).then((restaurant) => {
          this.setState(() => {
            return {
              restaurantName: restaurant.restaurantName,
              isPublished: restaurant.isPublished,
              isLoading: false,
            };
          });
        });
      }
    });
  }

  componentDidUpdate(
    prevProps: MenuEditPageProp,
    prevState: MenuEditPageState
  ) {
    if (
      this.state.tabIndex !== prevState.tabIndex &&
      this.state.tabIndex === 2
    ) {
      if (auth !== null && auth.currentUser !== null) {
        pullRestaurantByUser(auth.currentUser.uid).then((restaurant) => {
          this.setState(() => {
            return {
              restaurantName: restaurant.restaurantName,
            };
          });
        });
      }
    }
  }

  checkValidProfile = () => {
    this.setState(() => {
      return {
        isLoading: true,
      };
    });
    if (auth !== null && auth.currentUser !== null) {
      pullRestaurantByUser(auth.currentUser.uid).then((restaurant) => {
        let isValid: boolean =
          restaurant.ownerName !== "" &&
          restaurant.restaurantName !== "" &&
          restaurant.description !== "" &&
          restaurant.phoneNumber !== "" &&
          restaurant.address !== "";

        this.setState(() => {
          return {
            isProfileValid: isValid,
            isLoading: false,
          };
        });
      });
    }
  };

  onUnpublishEditClick = () => {
    this.setState(() => {
      return {
        isLoading: true,
      };
    });
    if (auth !== null && auth.currentUser !== null) {
      pullRestaurantByUser(auth.currentUser.uid).then((restaurant) => {
        restaurant.isPublished = !this.state.isPublished;

        if (auth !== null && auth.currentUser !== null) {
          pushProfile(auth.currentUser.uid, restaurant);

          this.setState(() => {
            return {
              isPublished: !this.state.isPublished,
              isLoading: false,
            };
          });
        }
      });
    }
  };

  onPublishClick = () => {
    this.setState(() => {
      return {
        isLoading: true,
      };
    });
    if (auth !== null && auth.currentUser !== null) {
      pullRestaurantByUser(auth.currentUser.uid).then((restaurant) => {
        restaurant.isPublished = !this.state.isPublished;

        if (auth !== null && auth.currentUser !== null) {
          pushProfile(auth.currentUser.uid, restaurant);

          this.setState(() => {
            return {
              isPublished: !this.state.isPublished,
              isLoading: false,
            };
          });
        }
      });
    }
  };

  tabPanelProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  handleTabPanelChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ tabIndex: newValue });
  };

  render() {
    return (
      <>
        <ThemeProvider theme={choozTheme}>
          <ChoozAppBar />
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: choozTheme.palette.secondary.light,
              display: "flex",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={this.state.tabIndex}
              onChange={this.handleTabPanelChange}
            >
              <Tab
                label="Profile"
                {...this.tabPanelProps(0)}
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Upload Image"
                {...this.tabPanelProps(1)}
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Edit Menu"
                {...this.tabPanelProps(2)}
                sx={{ textTransform: "none" }}
              />
            </Tabs>
            <TabPanel value={this.state.tabIndex} index={0}>
              <ProfilePanel />
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={1}>
              <UploadImagePanel />
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={2}>
              <Fade
                in={true}
                exit={false}
                mountOnEnter
                unmountOnExit
                timeout={400}
              >
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: choozTheme.palette.secondary.light,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        bgcolor: choozTheme.palette.primary.main,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box minWidth="175px">
                          {this.state.isPublished && (
                            <Box
                              alignSelf="left"
                              paddingTop={1.25}
                              marginLeft={2}
                            >
                              <UnpublishAndEditButtonWithDialog
                                isPublished={this.state.isPublished}
                                isLoading={this.state.isPublished}
                                onUnpublishEditClick={this.onUnpublishEditClick}
                              />
                            </Box>
                          )}
                        </Box>

                        <Box paddingTop={0.5}>
                          <Typography
                            variant="h4"
                            sx={{
                              color: choozTheme.palette.primary.contrastText,
                            }}
                          >
                            {this.state.restaurantName}
                          </Typography>
                        </Box>

                        <Box
                          alignSelf="right"
                          marginRight={this.state.isPublished ? 1.75 : 3}
                        >
                          <AccessQRButton
                            isPublished={this.state.isPublished}
                            restaurantName={this.state.restaurantName}
                          />
                          <PublishButton
                            isPublished={this.state.isPublished}
                            isProfileValid={this.state.isProfileValid}
                            isLoading={this.state.isLoading}
                            checkValidProfile={this.checkValidProfile}
                            onPublishClick={this.onPublishClick}
                            restaurantName={this.state.restaurantName}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <MenuColumnList isPublished={this.state.isPublished} />
                  </Box>
                </Box>
              </Fade>
            </TabPanel>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}

export default MenuEditPage;
