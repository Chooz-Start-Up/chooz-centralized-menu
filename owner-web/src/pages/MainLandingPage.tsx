import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { MainLandingPageProps, MainLandingPageState } from "./interface";
import { choozTheme } from "./theme";
import { Link, Outlet } from "react-router-dom";

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
              <Typography align="center" variant="h2">
                This is just a menu made by stupid college students. Nothing
                else.
              </Typography>
            </Box>
          </Grid>

          <Grid container justifyContent="center">
            <Button
              size="large"
              variant="contained"
              href="/edit"
              sx={{
                borderRadius: 8,
                bgcolor: "red",
                "&:hover": {
                  background: "red.800",
                },
              }}
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
