import React, { useEffect, useState } from "react";
import { Box, Fade, ListItemButton, Typography } from "@mui/material";
import { pullLogoImage } from "../../database/api/RestaurantApi";
import Logo from "../images/chooz_icons/logoGrey.png";
import { RestaurantListItemProps } from "./interface";
import { choozTheme } from "../../theme/theme";

export const RestaurantListItem: React.FC<RestaurantListItemProps> = (
  props: RestaurantListItemProps
) => {
  const [logoSrc, setLogoSrc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    pullLogoImage(props.restaurant.id).then(
      (src) => {
        setLogoSrc(src);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  return (
    <Fade in={true} timeout={1000}>
      <ListItemButton
        sx={{
          padding: 1,
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
        <Box
          display="flex"
          width="100%"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          <Fade in={!loading} timeout={1000}>
            <Box
              component="img"
              src={logoSrc === "" ? Logo : logoSrc}
              width={75}
              height={75}
              borderRadius={10}
            />
          </Fade>
          <Typography variant="h6" noWrap sx={{ marginLeft: 3, marginTop: 1 }}>
            {props.restaurant.restaurantName}
            <Typography noWrap>{props.restaurant.description}</Typography>
          </Typography>
        </Box>
      </ListItemButton>
    </Fade>
  );
};
