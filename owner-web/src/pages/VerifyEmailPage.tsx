import React, { useState } from "react";
import { Box, Button, ThemeProvider, Theme, StyledEngineProvider, Typography, Alert } from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { VerifyEmailPageProps } from "./interface";
import { choozTheme } from "../theme/theme";
import {
  auth,
  resendEmailVerification,
} from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";
import { pushMenu, pushProfile } from "../firebase/databaseAPI/RestaurantApi";
import { Restaurant } from "../firebase/databaseAPI/Restaurant";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";
import { Menu } from "../firebase/databaseAPI/Menu";
import defaultMenu from "../firebase/authentication/defaultMenu.json";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const VerifyEmailPage: React.FC<VerifyEmailPageProps> = (
  props: VerifyEmailPageProps
) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  setInterval(() => {
    if (auth.currentUser !== null && !auth.currentUser?.emailVerified) {
      const user = auth.currentUser;

      return auth.currentUser?.reload().then(() => {
        if (auth.currentUser?.emailVerified) {
          // if (!auth.currentUser?.emailVerified) { // this is for manually creating the account for the restaurants
          pushProfile(
            user.uid,
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
          ).then((key) => {
            const pushingMenu = new Restaurant(
              key,
              "",
              "",
              false,
              "",
              "",
              "",
              "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed",
              Menu.parseMenus(JSON.stringify(defaultMenu))
            );
            pushMenu(user.uid, pushingMenu).then(() => {
              navigate("/fillinfo");
            });
          });
        }
      });
    }
  }, 2000);

  const onResendEmailVerification = () => {
    resendEmailVerification().then(
      () => {
        setErrorMessage("");
      },
      (err) => {
        if (err.message.indexOf("auth/too-many-requests") !== -1) {
          setErrorMessage(
            "It is too soon to request for another verification email. Please check your spam email and try again later."
          );
        } else {
          setErrorMessage("Unexpected error occurred. Please try again later.");
        }
      }
    );
  };

  return <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={choozTheme}>
        <Box height="100%" bgcolor={choozTheme.palette.secondary.main}>
          <ChoozAppBar />
          <Box display="flex" justifyContent="center" height="85%" margin={3}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Box
                boxShadow={5}
                sx={{ width: 450, height: errorMessage === "" ? 380 : 420 }}
                bgcolor="white"
                textAlign="center"
                padding={1}
              >
                <Box component="img" src={LogoText} margin="2%" width="25%" />
                <Typography sx={{ color: "grey.600", fontSize: 18 }}>
                  Centralized Menu App
                </Typography>

                {errorMessage !== "" && (
                  <Alert severity="error" sx={{ justifyContent: "center" }}>
                    Error: {errorMessage}
                  </Alert>
                )}

                <Typography
                  sx={{
                    color: "grey.600",
                    fontSize: 18,
                    marginTop: 3,
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                >
                  A verification email has been sent to{" "}
                  {auth.currentUser?.email}.
                </Typography>
                <Typography
                  sx={{
                    color: "grey.600",
                    fontSize: 18,
                    marginTop: 1,
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                >
                  Please check your email and come back after verifying your
                  email through the link.
                </Typography>

                <Button
                  variant="contained"
                  onClick={onResendEmailVerification}
                  sx={{
                    marginTop: errorMessage === "" ? 6 : 4,
                    textTransform: "none",
                  }}
                >
                  Resend Verification Email
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  </>;
};

export default VerifyEmailPage;
