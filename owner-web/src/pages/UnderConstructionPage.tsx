import React from "react";
import {
  Box,
  ThemeProvider,
  Typography,
  AppBar,
  Grid,
  Toolbar,
} from "@mui/material";
import { choozTheme } from "../theme/theme";
import AdbIcon from "@mui/icons-material/Adb";

import JacobChoi from "../component/images/profile/jacob_choi.jpg";
import JustinGalang from "../component/images/profile/justin_galang.jpg";

const UnderConstructionPage: React.FC = () => {
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
          height="100vh"
          bgcolor="#ffd7db"
        >
          <Box
            boxShadow={5}
            sx={{
              width: 600,
              height: 460,
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

            <Typography fontSize={36} marginTop={5}>
              We are currently under construction!
            </Typography>
            <Typography marginTop={5} marginBottom={2}>
              Developed by
            </Typography>

            <Grid container>
              <Grid item xs={6} paddingLeft="14%">
                <img
                  src={JustinGalang}
                  width={80}
                  height={80}
                  style={{ borderRadius: "50%" }}
                />
                <Typography marginTop={1} fontWeight="bold">
                  Justin Galang
                </Typography>
                <Typography fontSize="small" color="grey.600">
                  justingalang@gmail.com
                </Typography>
              </Grid>

              <Grid item xs={6} paddingRight="14%">
                <img
                  src={JacobChoi}
                  width={80}
                  height={80}
                  style={{ borderRadius: "50%" }}
                />
                <Typography marginTop={1} fontWeight="bold">
                  Jacob Choi
                </Typography>
                <Typography fontSize="small" color="grey.600">
                  chlgustjr41@gmail.com
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default UnderConstructionPage;
