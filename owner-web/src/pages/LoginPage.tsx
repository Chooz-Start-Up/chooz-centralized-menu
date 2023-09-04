import React, { useState } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
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
import { choozTheme } from "../theme/theme";
import GoogleIcon from "../component/images/login_icons/icons8-google-48.png";
import FacebookIcon from "../component/images/login_icons/icons8-facebook-48.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
} from "../firebase/authentication/firebaseAuthentication";
import { useNavigate } from "react-router-dom";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


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

  return <>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={choozTheme}>
        <Box height="110%" bgcolor={choozTheme.palette.secondary.main}>
          <ChoozAppBar />
          <Box display="flex" justifyContent="center" height="85%" margin={3}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Box
                boxShadow={5}
                width="450"
                height={errorMessage === "" ? "620" : "680"}
                bgcolor={choozTheme.palette.secondary.light}
                textAlign="center"
                padding={2}
              >
                <Box component="img" src={LogoText} margin="2%" width="25%" />
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
                  <FormControl
                    variant="standard"
                    sx={{ width: "70%", margin: 1 }}
                  >
                    <InputLabel>Password</InputLabel>
                    <Input
                      onChange={onPasswordChange}
                      type={isPasswordVisibile ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end" size="large">
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
                  sx={{ marginTop: 3, width: "70%", textTransform: "none" }}
                >
                  Login
                </Button>

                <Button href="/resetpassword" sx={{ textTransform: "none" }}>
                  <Typography fontSize="small">
                    Forgot your password?
                  </Typography>
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
                <Typography fontSize="medium" sx={{ marginTop: 4 }}>
                  Don't have an account?
                </Typography>
                <Button href="/registration/" sx={{ textTransform: "none" }}>
                  <Typography fontSize="medium">Create Account</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  </>;
};

export default LoginPage;
