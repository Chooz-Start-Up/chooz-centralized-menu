import React, { useState } from "react";
import { Box, Button, ThemeProvider, Typography, Alert } from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { VerifyEmailPageProps } from "./interface";
import { choozTheme } from "./theme";
import AdbIcon from "@mui/icons-material/Adb";

import {
  auth,
  resendEmailVerification,
} from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = (
  props: VerifyEmailPageProps
) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  setInterval(() => {
    if (!auth.currentUser?.emailVerified) {
      return auth.currentUser?.reload().then(() => {
        if (auth.currentUser?.emailVerified) {
          navigate("/fillinfo");
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
            "It is too soon to request for another verification email. Please try again later."
          );
        } else {
          setErrorMessage("Unexpected error occurred. Please try again later.");
        }
      }
    );
  };

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <ChoozAppBar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="#ffd7db"
        >
          <Box
            boxShadow={5}
            sx={{ width: 450, height: errorMessage === "" ? 380 : 420 }}
            bgcolor="white"
            textAlign="center"
          >
            <AdbIcon sx={{ fontSize: 45, marginTop: "3%", color: "red" }} />
            <Typography
              sx={{ color: "black", fontWeight: "bold", fontSize: 34 }}
            >
              Chooz
            </Typography>
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
              A verification email has been sent to {auth.currentUser?.email}.
              Please check your email and come back after verifying your email
              through the link.
            </Typography>

            <Button
              variant="contained"
              onClick={onResendEmailVerification}
              sx={{ marginTop: errorMessage === "" ? 6 : 4 }}
            >
              Resend Verification Email
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default VerifyEmailPage;
