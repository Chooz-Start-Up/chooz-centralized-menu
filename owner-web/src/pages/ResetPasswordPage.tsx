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
import {
  auth,
  sendPasswordReset,
} from "../firebase/authentication/firebaseAuthentication";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";
import { useParams } from "react-router-dom";
import { signOut } from "firebase/auth";

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = (
  props: ResetPasswordPageProps
) => {
  let { userEmail } = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(userEmail !== undefined ? userEmail : "");

  const validateEmail = (): boolean => {
    if (email === "") {
      setErrorMessage("Email cannot be empty.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const onResetPasswordClick = () => {
    if (auth) {
      signOut(auth);
    }
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
                width: 450,
                height: errorMessage === "" && !success ? 380 : 420,
                paddingTop: 2,
                paddingBottom: userEmail !== undefined ? 4 : 2,
              }}
              bgcolor={choozTheme.palette.secondary.light}
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
                  A reset email has been sent! Please reset your password
                  through the email link and try logging in again.
                </Alert>
              )}

              <Box justifyContent="center">
                <Typography
                  sx={{
                    color: "grey.600",
                    fontSize: 18,
                    marginTop: errorMessage === "" && !success ? 5 : 3,
                    marginRight: 2,
                    marginLeft: 2,
                  }}
                >
                  {userEmail !== undefined
                    ? 'Please click the "Reset Password" button to reset your password.'
                    : "Please enter your account email."}
                </Typography>

                <TextField
                  disabled={success || userEmail !== undefined}
                  defaultValue={userEmail !== undefined ? userEmail : ""}
                  onChange={onEmailChange}
                  label="Email"
                  sx={{ marginTop: 3, width: 350 }}
                />

                <Box display="flex" justifyContent="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    {!success && (
                      <Button
                        variant="contained"
                        onClick={onResetPasswordClick}
                        sx={{
                          marginTop: 3,
                          textTransform: "none",
                          width: "150px",
                        }}
                      >
                        Reset Password
                      </Button>
                    )}
                    {success && (
                      <Button
                        variant="contained"
                        href="/login/"
                        sx={{
                          marginTop: 3,
                          width: "150px",
                          textTransform: "none",
                        }}
                      >
                        Go back to Login
                      </Button>
                    )}
                    {userEmail !== undefined && !success ? (
                      <Button
                        href="/edit"
                        sx={{
                          textDecoration: "underline",
                          textTransform: "none",
                          width: "150px",
                        }}
                      >
                        Go back to Profile
                      </Button>
                    ) : (
                      <Button
                        href="/login"
                        sx={{
                          textDecoration: "underline",
                          textTransform: "none",
                          width: "150px",
                        }}
                      >
                        Go back to Login
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResetPasswordPage;
