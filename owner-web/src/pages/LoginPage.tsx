import React from "react";
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
} from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { LoginPageProps, LoginPageState } from "./interface";
import { choozTheme } from "./theme";
import AdbIcon from "@mui/icons-material/Adb";
import GoogleIcon from "../component/icon_images/icons8-google-48.png";
import FacebookIcon from "../component/icon_images/icons8-facebook-48.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { isLoggedin, isPasswordVisibile, handleClickShowPassword } =
      this.props;

    return (
      <>
        <ThemeProvider theme={choozTheme}>
          <ChoozAppBar isLoggedin={isLoggedin} />
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

              <Box>
                <TextField
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
                    type={isPasswordVisibile ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
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
              <Button variant="contained" sx={{ marginTop: 3, width: "70%" }}>
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
              <Button variant="outlined" sx={{ width: "70%", fontSize: 20 }}>
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
  }
}

export default LoginPage;
