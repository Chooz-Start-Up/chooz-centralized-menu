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
import { CreateAccountPageProps } from "./interface";
import { choozTheme } from "./theme";
import AdbIcon from "@mui/icons-material/Adb";
import GoogleIcon from "../component/icon_images/icons8-google-48.png";
import FacebookIcon from "../component/icon_images/icons8-facebook-48.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";

const CreateAccountPage: React.FC<CreateAccountPageProps> = (
  props: CreateAccountPageProps
) => {
  const navigate = useNavigate();
  const { isPasswordVisibile, handleClickShowPassword } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event: any) => {
    setPassword(event.target.value);
  };
  const onReenterPasswordChange = (event: any) => {
    setReenterPassword(event.target.value);
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
    } else if (password.length < 6) {
      setErrorMessage("Password must be longer than 6 characters");
      return false;
    } else if (password !== reenterPassword) {
      setErrorMessage("Password and the reentered password do not match");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const onCreateAccount = () => {
    if (emailValidation() && passwordValidation()) {
      //
      registerWithEmailAndPassword(email, password).then(
        () => {
          navigate("/verifyemail");
        },
        (err) => {
          if (err.message.indexOf("auth/email-already-in-use") !== -1) {
            setErrorMessage("The email is already in use");
          } else {
            setErrorMessage(
              "Unexpected error occurred. Please try again later."
            );
          }
        }
      );
    }
  };

  const onGoogleLogIn = () => {
    signInWithGoogle(navigate).then(
      () => {
        // empty on success. Navigation is done by the function
      },
      () => {
        setErrorMessage("Unexpected error occurred. Please try again later.");
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
            height={errorMessage === "" ? "625" : "665"}
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
                sx={{ width: "70%", margin: 1, marginBottom: 1.5 }}
              />

              <FormControl
                variant="standard"
                sx={{ width: "70%", marginBottom: 0.5 }}
              >
                <InputLabel>Password</InputLabel>
                <Input
                  onChange={onPasswordChange}
                  type={isPasswordVisibile ? "text" : "password"}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     <IconButton onClick={handleClickShowPassword} edge="end">
                  //       {!isPasswordVisibile ? (
                  //         <VisibilityOff />
                  //       ) : (
                  //         <Visibility />
                  //       )}
                  //     </IconButton>
                  //   </InputAdornment>
                  // }
                />
              </FormControl>

              <FormControl variant="standard" sx={{ width: "70%" }}>
                <InputLabel>Reenter Password</InputLabel>
                <Input
                  onChange={onReenterPasswordChange}
                  type={isPasswordVisibile ? "text" : "password"}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     <IconButton onClick={handleClickShowPassword} edge="end">
                  //       {!isPasswordVisibile ? (
                  //         <VisibilityOff />
                  //       ) : (
                  //         <Visibility />
                  //       )}
                  //     </IconButton>
                  //   </InputAdornment>
                  // }
                />
              </FormControl>
            </Box>
            <Button
              onClick={onCreateAccount}
              variant="contained"
              sx={{ marginTop: 4, width: "70%" }}
            >
              Create Account
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
              Already have an account?
            </Typography>
            <Button href="/login/">
              <Typography>Login</Typography>
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default CreateAccountPage;
