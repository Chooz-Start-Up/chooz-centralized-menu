import React, { useEffect, useState } from "react";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { choozTheme } from "../theme/theme";
import { useNavigate, useParams } from "react-router-dom";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";
import { getRestaurantByKey } from "../database/api/RestaurantApi";
import generateLink from "../database/dynamicLink/DynamicLink";
import MobileDetect from "mobile-detect";

const WelcomePage: React.FC = () => {
  const { restaurantKey } = useParams();
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const type = new MobileDetect(window.navigator.userAgent);

  useEffect(() => {
    if (restaurantKey !== undefined) {
      getRestaurantByKey(restaurantKey).then((restaurant) => {
        setRestaurantName(
          restaurant.restaurantName.replace(" ", "-").toLowerCase()
        );
      });
      generateLink(restaurantKey).then((link) => {
        setDownloadLink(link);
      });
    }
  }, []);

  if (restaurantKey === undefined) {
    navigate("/notfound");
  }

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        {/* <ChoozAppBar /> */}

        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          margin="10%"
        >
          {/* Replacing the header */}
          <Box display="flex" justifyContent="center">
            <Box component="img" src={LogoText} margin="2%" width="150" />
          </Box>
          <Typography variant="h3" margin="2%" fontWeight="bold">
            Welcome to chooz!
          </Typography>

          <Typography variant="h4" margin="2%" marginTop="6%">
            Download the app for a better experience!
            {/* The App will be availble soon... For now, view on the browser! */}
          </Typography>
          <Typography variant="h6" margin="2%" marginTop="3%">
            Chooz is a centralized menu app that allows you to view restaurant's
            menus natively on your phone. At participating restaurants, scan the
            Chooz QR code to view the entire menu in a natural and intuitive
            way.
            {/* The Chooz app will soon be available for iOS and Android... */}
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 8,
              marginTop: "5%",
              fontSize: "large",
              alignSelf: "center",
              textTransform: "none",
            }}
            href={
              type.os() === "AndroidOS" || type.os() === "iOS"
                ? downloadLink
                : "/menu/" + restaurantName + "/" + restaurantKey
            }
          >
            Download App
          </Button>
          <Box display="flex" justifyContent="center" marginTop={1}>
            <Button href={"/menu/" + restaurantName + "/" + restaurantKey}>
              <Typography
                sx={{ textTransform: "none", textDecoration: "underline" }}
              >
                View Menu
              </Typography>
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
export default WelcomePage;
