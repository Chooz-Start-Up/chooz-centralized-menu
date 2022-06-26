import React from "react";
import { Box, Button, Grid, ThemeProvider, Typography } from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { MainLandingPageProps, MainLandingPageState } from "./interface";
import { choozTheme } from "../theme/theme";
import { ExpandMore } from "@mui/icons-material";
import Background from "../component/images/background/red_landingPage.jpg";
import ChoozBackground from "../component/images/background/chooz_featureGraphic.png";

class MenuEditPage extends React.Component<
  MainLandingPageProps,
  MainLandingPageState
> {
  constructor(props: MainLandingPageProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <ThemeProvider theme={choozTheme}>
          <ChoozAppBar />
          <Box height="200vh" />
          <Box
            height="460"
            width="100%"
            // component="img"
            // src={Background}
            bgcolor={choozTheme.palette.primary.main}
            sx={{ position: "absolute" }}
            zIndex="-1"
            top={0}
          />
          <Typography
            align="center"
            variant="h2"
            fontWeight="bold"
            color={choozTheme.palette.secondary.light}
            sx={{
              position: "absolute",
              top: 0,
              maxWidth: "60%",
              marginLeft: "20%",
              marginTop: 12,
            }}
          >
            This is just a menu made by stupid college students. Nothing else.
            chooz
            <Box display="flex" justifyContent="center" marginTop={6}>
              <Button
                size="large"
                variant="contained"
                href="/login"
                sx={{
                  borderRadius: 8,
                  textTransform: "none",
                  alignSelf: "center",
                }}
                color="primary"
              >
                <Typography variant="h5">Create Menu</Typography>
              </Button>
            </Box>
          </Typography>

          {/* <Box
            component="img"
            src={ChoozBackground}
            // height="460"
            width="100%"
          /> */}
        </ThemeProvider>
      </>
    );
  }
}

export default MenuEditPage;
