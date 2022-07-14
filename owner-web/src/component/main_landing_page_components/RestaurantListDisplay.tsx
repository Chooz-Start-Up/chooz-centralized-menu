import React, { useEffect, useState } from "react";
import { Box, List, Typography } from "@mui/material";
import { Restaurant } from "../../firebase/databaseAPI/Restaurant";
import { getRestaurantList } from "../../firebase/databaseAPI/RestaurantApi";
import { RestaurantListItem } from "./RestaurantListItem";
import { choozTheme } from "../../theme/theme";

export const RestaurantListDisplay: React.FC = () => {
  const [restaurantList, setRestaurantList] = useState<Array<Restaurant>>([]);

  useEffect(() => {
    if (restaurantList.length === 0) {
      getRestaurantList().then((list) => {
        setRestaurantList(list);
      });
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="30%"
    >
      <Typography variant="h4" align="center" fontWeight="bold">
        Local Restaurants
      </Typography>
      <Box
        bgcolor={choozTheme.palette.secondary.light}
        boxShadow={5}
        height={500}
        overflow="auto"
        marginTop={2}
      >
        <List>
          {restaurantList.map(
            (restaurant) =>
              restaurant.isPublished && (
                <RestaurantListItem restaurant={restaurant} />
              )
          )}
        </List>
      </Box>
    </Box>
  );
};
