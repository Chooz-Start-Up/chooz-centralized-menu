import React from "react";
import { Box, ThemeProvider, Typography, Button } from "@mui/material";
import { choozTheme } from "../theme/theme";
import ChoozAppBar from "../component/general/ChoozAppBar";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";

const PageNotFound: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <ChoozAppBar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          bgcolor={choozTheme.palette.secondary.main}
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
            <Box component="img" src={LogoText} margin="2%" width="125px" />
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
                textTransform: "none",
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
