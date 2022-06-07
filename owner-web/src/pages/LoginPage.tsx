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
import GoogleIcon from "../component/icon_images/icons8-google-48.png";
import FacebookIcon from "../component/icon_images/icons8-facebook-48.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

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
    signInWithGoogle().then(
      () => {
        navigate("/edit");
      },
      () => {
        setErrorMessage("Unexpected error occurred");
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
            height="575"
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
              variant="outlined"
              sx={{ width: "70%", fontSize: 20, marginTop: 1 }}
            >
              <img src={FacebookIcon} width="10%" height="10%" />
              <Typography marginLeft={1}>Continue with Facebook</Typography>
            </Button>
            <Typography sx={{ marginTop: 4 }}>
              Don't have an account?
            </Typography>
            <Button href="/registration/">
              <Typography>Create Account</Typography>
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default LoginPage;
