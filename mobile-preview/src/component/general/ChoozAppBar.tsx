import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Grid } from "@mui/material";
import LogoText from "../images/chooz_icons/logoWhite_textWhite_horizontal.png";

const ChoozAppBar: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ height: "auto" }}>
      <Grid container justifyContent="center" padding={1}>
        <Box component="img" src={LogoText} width="125px" />
      </Grid>
    </AppBar>
  );
};

export default ChoozAppBar;
