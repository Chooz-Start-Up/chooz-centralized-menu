import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { choozTheme } from "../theme/theme";
import { useParams } from "react-router-dom";
import { Restaurant } from "../database/component/Restaurant";
import { getRestaurants } from "../database/api/RestaurantApi";
import { RestaurantListItem } from "../component/restaurant_list/RestaurantListItem";
import LogoText from "../component/images/chooz_icons/logoRed_textBlack_vertical.png";

const RestaurantListPage: React.FC = () => {
  const { location } = useParams();

  const [restaurantList, setRestaurantList] = useState<Array<Restaurant>>([]);

  useEffect(() => {
    if (restaurantList.length === 0) {
      getRestaurants().then((list) => {
        setRestaurantList(list);
      });
    }
  }, []);

  const checkAddress = (restaurantAddress: string): boolean => {
    let parsedAddress: string = "";

    if (restaurantAddress.split("\n", 4).length === 4) {
      parsedAddress =
        restaurantAddress.split("\n", 4)[1].replace(" ", "_").toLowerCase() +
        "-" +
        restaurantAddress.split("\n", 4)[2].toLowerCase();
    }

    if (parsedAddress === location) {
      return true;
    }
    return false;
  };

  const parseLocation = (): string => {
    let parsedLocation: string = "";

    location?.split("_").forEach((str) => {
      str = str[0].toUpperCase() + str.substring(1);
      parsedLocation += str + " ";
    });

    parsedLocation = parsedLocation.split("-")[0];

    return parsedLocation + ", " + location?.split("-")[1].toUpperCase();
  };

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100%"
        >
          <Box display="flex" justifyContent="center" sx={{ marginTop: 1 }}>
            <Box component="img" src={LogoText} margin="2%" width="150" />
          </Box>

          <Typography variant="h5" align="center" marginTop={2}>
            Download the app for a better experience!
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
            href={"https://choozmenu.com/mobile/download"}
          >
            Download App
          </Button>

          <Typography variant="h4" align="center" sx={{ marginTop: 5 }}>
            Local Restaurants in
            <Typography variant="inherit">{parseLocation()}!</Typography>
          </Typography>
          <List>
            {restaurantList.map(
              (restaurant, i) =>
                restaurant.isPublished &&
                checkAddress(restaurant.address) && (
                  <RestaurantListItem key={i} restaurant={restaurant} />
                )
            )}
          </List>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default RestaurantListPage;
