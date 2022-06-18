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
        >
          <Typography variant="h3">Welcome4</Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 8,
              marginTop: "8%",
              fontSize: "large",
              width: "30%",
              alignSelf: "center",
            }}
          >
            Download App
          </Button>
          <Button
            variant="outlined"
            sx={{ margin: 1, maxWidth: "10%", alignSelf: "flex-end" }}
          >
            Continue
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default WelcomePage;
