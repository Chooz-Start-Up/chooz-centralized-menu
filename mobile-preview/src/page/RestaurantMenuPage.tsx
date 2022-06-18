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

const WelcomePage: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <AppBar position="sticky">
          <Grid container justifyContent="center">
            <AdbIcon />
            <Typography fontSize="large">Chooz</Typography>
          </Grid>
        </AppBar>
        <Box
          display="flex"
          textAlign="center"
          marginTop="5%"
          sx={{ flexDirection: "column" }}
        ></Box>
      </ThemeProvider>
    </>
  );
};
export default WelcomePage;
