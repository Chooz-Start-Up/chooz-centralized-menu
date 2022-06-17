import React from "react";
import {
  Box,
  Grid,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import TabPanel from "../component/buttons/TabPanel";
import { MenuColumnList } from "../component/edit_page_components/MenuColumnList";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import PublishButton from "../component/buttons/PublishButton";
import AccessQRButton from "../component/buttons/AccessQRButton";
import { MenuEditPageProp, MenuEditPageState } from "./interface";
import { choozTheme } from "./theme";
import ProfilePanel from "../component/edit_page_components/ProfilePanel";
import { pullRestaurantByUser } from "../firebase/databaseAPI/RestaurantApi";
import { auth } from "../firebase/authentication/firebaseAuthentication";

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
          console.log(restaurant);
          this.setState(() => {
            return {
              restaurantName: restaurant.restaurantName,
              isLoading: false,
            };
          });
        });
      }
    });
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

  onPublishClick = () => {
    this.setState(() => {
      return {
        isPublished: !this.state.isPublished,
      };
    });
  };

  onQRClick = () => {};

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
              bgcolor: "background.paper",
              display: "flex",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={this.state.tabIndex}
              onChange={this.handleTabPanelChange}
              sx={{
                borderRight: 1,
                borderColor: "grey.400",
              }}
            >
              <Tab label="Profile" {...this.tabPanelProps(0)} />
              <Tab label="Edit Menu" {...this.tabPanelProps(1)} />
            </Tabs>
            <TabPanel value={this.state.tabIndex} index={0}>
              <ProfilePanel />
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={1}>
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  // bgcolor: "#ffebee",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      bgcolor: "#ef5350",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingLeft: "45%",
                      }}
                    >
                      <Box paddingTop={0.5}>
                        <Typography variant="h4">
                          {this.state.restaurantName}
                        </Typography>
                      </Box>

                      <Box
                        alignSelf="right"
                        marginRight={this.state.isPublished ? 1.75 : 3}
                      >
                        <AccessQRButton
                          isPublished={this.state.isPublished}
                          onQRClick={this.onQRClick}
                        />
                        <PublishButton
                          isPublished={this.state.isPublished}
                          isProfileValid={this.state.isProfileValid}
                          isLoading={this.state.isLoading}
                          checkValidProfile={this.checkValidProfile}
                          onPublishClick={this.onPublishClick}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <MenuColumnList />
                </Box>
              </Box>
            </TabPanel>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}

export default MenuEditPage;
