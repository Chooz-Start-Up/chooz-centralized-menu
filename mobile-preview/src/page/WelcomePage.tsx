import React from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { choozTheme } from "../theme/theme";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate, useParams } from "react-router-dom";
import ChoozAppBar from "../component/general/ChoozAppBar";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";

const WelcomePage: React.FC = () => {
  let { restaurantKey } = useParams();
  const navigate = useNavigate();

  if (restaurantKey === undefined) {
    navigate("/notfound");
  }

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        {/* <ChoozAppBar /> */}

        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          margin="10%"
        >
          {/* Replacing the header */}
          <Box display="flex" justifyContent="center">
            <Box component="img" src={LogoText} margin="2%" width="40%" />
          </Box>
          {/* <Typography variant="h3" margin="2%" fontWeight="bold">
            Welcome to chooz!
            </Typography> */}

          <Typography variant="h4" margin="2%" marginTop="6%">
            Download the app for a better experience!
          </Typography>
          <Typography variant="h6" margin="2%" marginTop="3%">
            Chooz is a centralized menu app that allows you to view restaurant's
            menus natively on your phone. At participating restaurants, scan the
            Chooz QR code to view the entire menu in a natural and intuitive
            way.
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 8,
              marginTop: "5%",
              fontSize: "large",
              alignSelf: "center",
              textTransform: "none",
            }}
          >
            Download App
          </Button>
          <Box display="flex" justifyContent="center">
            <Button
              variant="text"
              sx={{
                margin: 2,
                width: "30%",
                height: "5%",
                fontSize: "18",
                padding: 1,
              }}
              href={"/preview/" + restaurantKey}
            >
              <Typography
                sx={{ textDecoration: "underline", textTransform: "none" }}
              >
                Not now
              </Typography>
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default WelcomePage;
