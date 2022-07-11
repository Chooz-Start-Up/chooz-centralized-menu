import React, { useEffect, useState } from "react";
import "./App.css";
import TabPanel from "./component/panel/TabPanel";
import { ClaimRestaurantToolPanel } from "./component/panel/ClaimRestaurantToolPanel";
import { choozTheme } from "./theme/theme";
import {
  Box,
  Button,
  Fade,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import GoogleIcon from "./component/images/login_icons/icons8-google-48.png";
import {
  auth,
  logout,
  signInWithGoogle,
} from "./database/authentication/firebaseAuthentication";

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isUserDev, setIsUserDev] = useState(false);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  const tabPanelProps = (index: number) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  const handleTabPanelChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabIndex(newValue);
  };

  return (
    <ThemeProvider theme={choozTheme}>
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
          value={tabIndex}
          onChange={handleTabPanelChange}
        >
          <Tab
            label="Claim Restaurant Tool"
            {...tabPanelProps(0)}
            sx={{ textTransform: "none", width: 100 }}
          />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          {isUserDev ? (
            <Box>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => {
                    logout();
                    setIsUserDev(false);
                    setCurrentUser(null);
                  }}
                  sx={{ textTransform: "none", margin: 2 }}
                >
                  Logout
                </Button>
              </Box>
              <ClaimRestaurantToolPanel />
            </Box>
          ) : (
            <Box>
              {currentUser !== null && (
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      logout();
                      setIsUserDev(false);
                      setCurrentUser(null);
                    }}
                    sx={{ textTransform: "none", margin: 2 }}
                  >
                    Logout
                  </Button>
                </Box>
              )}
              <Box display="flex" justifyContent="center" marginTop={5}>
                <Box display="flex" flexDirection="column">
                  {currentUser !== null && (
                    <Typography align="center">
                      Current Email: {currentUser?.email}
                    </Typography>
                  )}
                  <Button
                    onClick={() => {
                      signInWithGoogle().then(
                        (isDev) => {
                          setIsUserDev(isDev);
                          setCurrentUser(auth.currentUser);
                        },
                        (err) => {
                          setIsUserDev(false);
                          setCurrentUser(auth.currentUser);
                        }
                      );
                    }}
                    variant="outlined"
                    sx={{ width: 300, fontSize: 20, textTransform: "none" }}
                  >
                    <img src={GoogleIcon} width={30} height={30} />
                    <Typography marginLeft={1}>Continue with Google</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default App;
