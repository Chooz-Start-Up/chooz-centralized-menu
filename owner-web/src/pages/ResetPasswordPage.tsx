import React, { useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  Alert,
  TextField,
} from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { ResetPasswordPageProps } from "./interface";
import { choozTheme } from "../theme/theme";
import { sendPasswordReset } from "../firebase/authentication/firebaseAuthentication";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = (
  props: ResetPasswordPageProps
) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const validateEmail = (): boolean => {
    if (email === "") {
      setErrorMessage("Email cannot be empty.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const onResetPasswordClick = () => {
    if (validateEmail()) {
      sendPasswordReset(email).then(
        () => {
          setErrorMessage("");
          setSuccess(true);
        },
        (err) => {
          if (err.message.indexOf("auth/user-not-found") !== -1) {
            setErrorMessage(
              "Email does not exist. Please create an account first."
            );
          } else {
            setErrorMessage(
              "Unexpected error. Please check if it is a valid account email and try again later."
            );
          }
        }
      );
    }
  };

  const onEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  return (
    <ThemeProvider theme={choozTheme}>
      <Box height="100%" bgcolor={choozTheme.palette.secondary.main}>
        <ChoozAppBar />
        <Box display="flex" justifyContent="center" height="85%" margin={3}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box
              boxShadow={5}
              sx={{
                width: 425,
                height: errorMessage === "" && !success ? 380 : 420,
              }}
              bgcolor="white"
              textAlign="center"
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

              {success && (
                <Alert severity="success" sx={{ justifyContent: "center" }}>
                  The email has been sent! Please reset your password through
                  the email link and try logging in again.
                </Alert>
              )}

              <Box justifyContent="center">
                <Typography
                  sx={{
                    color: "grey.600",
                    fontSize: 18,
                    marginTop: errorMessage === "" && !success ? 5 : 3,
                  }}
                >
                  Please enter your account email.
                </Typography>

                <TextField
                  disabled={success}
                  onChange={onEmailChange}
                  label="Email"
                  sx={{ marginTop: 3, width: 350 }}
                />

                {!success && (
                  <Button
                    variant="contained"
                    onClick={onResetPasswordClick}
                    sx={{ marginTop: 3, textTransform: "none" }}
                  >
                    Reset Password
                  </Button>
                )}
                {success && (
                  <Button
                    variant="contained"
                    href="/login/"
                    sx={{ marginTop: 3 }}
                  >
                    Go back to Login
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResetPasswordPage;
