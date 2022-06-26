import React from "react";
import { Box, Button, Grid, ThemeProvider, Typography } from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { MainLandingPageProps, MainLandingPageState } from "./interface";
import { choozTheme } from "../theme/theme";
import { ExpandMore } from "@mui/icons-material";

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

          <Grid container justifyContent="center">
            <Box maxWidth="60%" padding={10}>
              <Typography align="center" variant="h2" fontWeight="bold">
                This is just a menu made by stupid college students. Nothing
                else. chooz
              </Typography>
            </Box>
          </Grid>

          <Grid container justifyContent="center">
            <Button
              size="large"
              variant="contained"
              href="/login"
              sx={{
                borderRadius: 8,
                textTransform: "none",
              }}
              color="primary"
            >
              <Typography variant="h5">Create Menu</Typography>
            </Button>
          </Grid>
        </ThemeProvider>
      </>
    );
  }
}

export default MenuEditPage;
