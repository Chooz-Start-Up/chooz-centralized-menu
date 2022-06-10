import React, { useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  TextField,
  Divider,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Alert,
} from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { LoginPageProps } from "./interface";
import { choozTheme } from "./theme";
import AdbIcon from "@mui/icons-material/Adb";
import GoogleIcon from "../component/images/login_icons/icons8-google-48.png";
import FacebookIcon from "../component/images/login_icons/icons8-facebook-48.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  auth,
} from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
  const navigate = useNavigate();

  const { isPasswordVisibile, handleClickShowPassword } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const emailValidation = (): boolean => {
    if (email === "") {
      setErrorMessage("Email cannot be empty");
      return false;
    } else if (email.indexOf("@") < 0) {
      setErrorMessage("Invalid email format");
      return false;
    }

    setErrorMessage("");
    return true;
  };
  const passwordValidation = (): boolean => {
    if (password === "") {
      setErrorMessage("Password cannot be empty");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const onEmailPasswordLogIn = () => {
    if (emailValidation() && passwordValidation()) {
      logInWithEmailAndPassword(email, password).then(
        () => {
          navigate("/edit");
        },
        () => {
          setErrorMessage("Invalid email or password");
        }
      );
    }
  };

  const onGoogleLogIn = () => {
    signInWithGoogle(navigate).then(
      () => {
        setErrorMessage("");
      },
      () => {
        setErrorMessage("Unexpected error occurred. Please try again later.");
      }
    );
  };

  const onFacebookLogIn = () => {
    signInWithFacebook(navigate).then(
      () => {
        setErrorMessage("");
      },
      () => {
        setErrorMessage(
          "Please make sure your Facebook account has your email information and then try again later."
        );
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
            width="450"
            height={errorMessage === "" ? "620" : "680"}
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
              <Alert
                severity="error"
                sx={{ maxHeight: 60, justifyContent: "center" }}
              >
                Error: {errorMessage}
              </Alert>
            )}

            <Box>
              <TextField
                onChange={onEmailChange}
                variant="standard"
                label="Email"
                sx={{ width: "70%", margin: 1 }}
              />
              <FormControl variant="standard" sx={{ width: "70%", margin: 1 }}>
                <InputLabel>Password</InputLabel>
                <Input
                  onChange={onPasswordChange}
                  type={isPasswordVisibile ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {!isPasswordVisibile ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Button
              onClick={onEmailPasswordLogIn}
              variant="contained"
              sx={{ marginTop: 3, width: "70%" }}
            >
              Login
            </Button>

            <Button href="/resetpassword/">
              <Typography fontSize="small">Forgot your password?</Typography>
            </Button>

            <Divider
              variant="middle"
              sx={{
                marginTop: 2,
                marginBottom: 2,
                color: "grey.500",
              }}
            >
              Or
            </Divider>
            <Button
              onClick={onGoogleLogIn}
              variant="outlined"
              sx={{ width: "70%", fontSize: 20 }}
            >
              <img src={GoogleIcon} width="10%" height="10%" />
              <Typography marginLeft={1}>Continue with Google</Typography>
            </Button>
            <Button
              onClick={onFacebookLogIn}
              variant="outlined"
              sx={{ width: "70%", fontSize: 20, marginTop: 1 }}
            >
              <img src={FacebookIcon} width="10%" height="10%" />
              <Typography marginLeft={1}>Continue with Facebook</Typography>
            </Button>
            <Typography fontSize="medium" sx={{ marginTop: 4 }}>
              Don't have an account?
            </Typography>
            <Button href="/registration/">
              <Typography fontSize="medium">Create Account</Typography>
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LoginPage;
