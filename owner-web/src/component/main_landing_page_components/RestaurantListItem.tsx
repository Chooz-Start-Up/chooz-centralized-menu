import React, { useEffect, useState } from "react";
import { Box, ListItemButton, Typography } from "@mui/material";
import { pullLogoImageByRestaurantKey } from "../../firebase/databaseAPI/RestaurantApi";
import Logo from "../images/chooz_icons/logoGrey.png";
import { RestaurantListItemProps } from "./interface";
import { choozTheme } from "../../theme/theme";

export const RestaurantListItem: React.FC<RestaurantListItemProps> = (
  props: RestaurantListItemProps
) => {
  const [logoSrc, setLogoSrc] = useState("");

  useEffect(() => {
    pullLogoImageByRestaurantKey(props.restaurant.id).then((src) => {
      setLogoSrc(src);
    });
  }, []);

  return (
    <ListItemButton
      sx={{
        height: 75,
        padding: 1,
        // bgcolor: choozTheme.palette.secondary.dark,
        margin: 1,
      }}
      href={
        "https://m.choozmenu.com/menu/" +
        props.restaurant.restaurantName.replace(" ", "-").toLowerCase() +
        "/" +
        props.restaurant.id
      }
      target="_blank"
    >
      <Box display="flex">
        <Box
          component="img"
          src={logoSrc === "" ? Logo : logoSrc}
          width={50}
          height={50}
          borderRadius="10px"
        />
        <Typography sx={{ marginLeft: 2, marginTop: 1.5 }}>
          {props.restaurant.restaurantName}
        </Typography>
      </Box>
    </ListItemButton>
  );
};
