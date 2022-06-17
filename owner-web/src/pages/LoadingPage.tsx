import React from "react";
import { Grid, ThemeProvider, Typography } from "@mui/material";
import { choozTheme } from "./theme";
import AdbIcon from "@mui/icons-material/Adb";

const LoadingPage: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <Grid container justifyContent="center">
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "red",
              textDecoration: "none",
            }}
            marginTop="18%"
          >
            <AdbIcon
              fontSize="large"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            Chooz
          </Typography>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default LoadingPage;
