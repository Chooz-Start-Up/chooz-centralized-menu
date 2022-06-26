import React, { useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Input,
  Alert,
} from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { CreateAccountPageProps } from "./interface";
import { choozTheme } from "../theme/theme";
import GoogleIcon from "../component/images/login_icons/icons8-google-48.png";
import FacebookIcon from "../component/images/login_icons/icons8-facebook-48.png";
import {
  registerWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
} from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";

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

  const onFacebookLogIn = () => {
    signInWithFacebook(navigate).then(
      () => {
        setErrorMessage("");
      },
      (err) => {
        if (
          err.message.indexOf(
            "auth/account-exists-with-different-credential"
          ) !== -1
        ) {
          setErrorMessage(
            "You already have an existing account with the same email. Please try to login another way."
          );
        } else {
          setErrorMessage(
            "Please make sure your Facebook account has your email information and then try again later."
          );
        }
      }
    );
  };

  return (
    <ThemeProvider theme={choozTheme}>
      <Box height="110%" bgcolor={choozTheme.palette.secondary.main}>
        <ChoozAppBar />
        <Box display="flex" justifyContent="center" height="85%" margin={3}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box
              boxShadow={5}
              width="450"
              height={errorMessage === "" ? "630" : "690"}
              bgcolor={choozTheme.palette.secondary.light}
              textAlign="center"
              padding={2}
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

              <Box>
                <TextField
                  onChange={onEmailChange}
                  variant="standard"
                  label="Email"
                  sx={{
                    width: "70%",
                    margin: errorMessage === "" ? 1 : 0,
                    marginBottom: 1.5,
                  }}
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
                sx={{
                  marginTop: errorMessage === "" ? 4 : 2,
                  width: "70%",
                  textTransform: "none",
                }}
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
                sx={{ width: "70%", fontSize: 20, textTransform: "none" }}
              >
                <img src={GoogleIcon} width="10%" height="10%" />
                <Typography marginLeft={1}>Continue with Google</Typography>
              </Button>

              <Button
                onClick={onFacebookLogIn}
                variant="outlined"
                sx={{
                  width: "70%",
                  fontSize: 20,
                  marginTop: 1,
                  textTransform: "none",
                }}
              >
                <img src={FacebookIcon} width="10%" height="10%" />
                <Typography marginLeft={1}>Continue with Facebook</Typography>
              </Button>

              <Typography
                fontSize="medium"
                sx={{ marginTop: errorMessage === "" ? 4 : 2 }}
              >
                Already have an account?
              </Typography>
              <Button href="/login/" sx={{ textTransform: "none" }}>
                <Typography fontSize="medium">Login</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreateAccountPage;
