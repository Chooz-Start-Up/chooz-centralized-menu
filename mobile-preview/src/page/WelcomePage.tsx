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

const WelcomePage: React.FC = () => {
  let { restaurantKey } = useParams();
  const navigate = useNavigate();

  if (restaurantKey === undefined) {
    navigate("/notfound");
  }

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <AppBar position="sticky" sx={{ height: "5%" }}>
          <Grid container justifyContent="center">
            <AdbIcon sx={{ fontSize: 30, marginTop: "1.5%" }} />
            <Typography fontSize={24} marginTop="1%">
              Chooz
            </Typography>
          </Grid>
        </AppBar>
        <Box
          display="flex"
          textAlign="center"
          marginTop="10%"
          sx={{ flexDirection: "column" }}
        >
          <Typography variant="h3" margin="2%">
            Welcome to chooz!
          </Typography>

          <Typography variant="h5" margin="2%" marginTop="10%">
            Download the app for a better experience!
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 8,
              marginTop: "5%",
              fontSize: "large",
              alignSelf: "center",
            }}
          >
            Download App
          </Button>
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{
              margin: 2,
              marginTop: 7,
              width: "30%",
              height: "5%",
              fontSize: "18",
              padding: 1,
            }}
            href={"/preview/" + restaurantKey}
          >
            Not now
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default WelcomePage;
