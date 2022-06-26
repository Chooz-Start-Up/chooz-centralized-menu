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

const WelcomePage: React.FC = () => {
  let { restaurantKey } = useParams();
  const navigate = useNavigate();

  if (restaurantKey === undefined) {
    navigate("/notfound");
  }

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <ChoozAppBar />
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
              textTransform: "none",
            }}
          >
            Download App
          </Button>
        </Box>

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
      </ThemeProvider>
    </>
  );
};
export default WelcomePage;
