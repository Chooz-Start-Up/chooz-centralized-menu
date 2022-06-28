import React from "react";
import { Box, Button, Grid, ThemeProvider, Typography } from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { MainLandingPageProps, MainLandingPageState } from "./interface";
import { choozTheme } from "../theme/theme";
import ChoozEmailLogo from "../component/images/chooz_icons/logoRed.png";

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
          <Box
            height="400"
            width="100%"
            // component="img"
            // src={Background}
            bgcolor={choozTheme.palette.primary.main}
            sx={{ position: "absolute" }}
            zIndex="-1"
            top={0}
            display="flex"
            justifyContent="center"
          />
          <Typography
            align="center"
            variant="h3"
            fontWeight="bold"
            color={choozTheme.palette.secondary.light}
            sx={{
              maxWidth: "80%",
              marginLeft: "10%",
              marginTop: 6,
            }}
          >
            Create a free online menu for your restaurant
            <Typography variant="h4" marginTop={4}>
              Easily Viewable
            </Typography>
            <Typography variant="h4">Instant Updates</Typography>
            <Typography variant="h4">QR Code access</Typography>
            <Box display="flex" justifyContent="center" marginTop={6}>
              <Button
                size="large"
                variant="contained"
                href="/login"
                sx={{
                  borderRadius: 8,
                  textTransform: "none",
                  alignSelf: "center",
                  marginTop: 8,
                }}
              >
                <Typography variant="h5">Create Menu</Typography>
              </Button>
            </Box>
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            marginTop="8%"
            width="20%"
            position="absolute"
            bottom={10}
            right="40%"
          >
            <Typography variant="h6" fontWeight="bold" align="center">
              Report Bug
            </Typography>
            <Box display="flex" alignSelf="center">
              <Box
                component="img"
                src={ChoozEmailLogo}
                width={35}
                height={35}
              />
              <Typography sx={{ marginLeft: 1.5, marginTop: 0.5 }}>
                support@choozmenu.com
              </Typography>
            </Box>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}

export default MenuEditPage;
