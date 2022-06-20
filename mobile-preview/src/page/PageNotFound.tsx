import React from "react";
import {
  Box,
  ThemeProvider,
  Typography,
  AppBar,
  Grid,
  Toolbar,
  Button,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { choozTheme } from "../theme/theme";

const PageNotFound: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <AppBar position="static">
          <Grid>
            <Toolbar disableGutters>
              <Grid container paddingLeft={3}>
                <Typography
                  variant="h4"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <AdbIcon
                    fontSize="large"
                    sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                  />
                  Chooz
                </Typography>
              </Grid>
            </Toolbar>
          </Grid>
        </AppBar>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          bgcolor="#ffd7db"
        >
          <Box
            boxShadow={5}
            sx={{
              width: "80%",
              height: "auto",
            }}
            bgcolor="white"
            textAlign="center"
            padding={3}
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

            <Typography fontSize={36} marginTop={3}>
              Page not found...
            </Typography>
            <Typography fontSize={24} marginTop={1}>
              The page may not be available anymore.
            </Typography>
            <Typography fontSize={24} marginTop={3}>
              Download our app to search for other restaurant menus!
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 8,
                marginTop: 4,
                fontSize: "large",
                alignSelf: "center",
              }}
            >
              Download App
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default PageNotFound;
