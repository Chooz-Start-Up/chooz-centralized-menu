import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { choozTheme } from "../theme/theme";
import AdbIcon from "@mui/icons-material/Adb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getRestaurantByKey,
  getRestaurantMenuByKey,
} from "../database/api/RestaurantApi";
import { Restaurant } from "../database/component/Restaurant";
import { Menu } from "../database/component/Menu";

const RestaurantMenuPage: React.FC = () => {
  const [descriptionExpanded, setDescriptionExpanded] = React.useState<
    string | false
  >(false);

  const handleDescriptionAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setDescriptionExpanded(isExpanded ? panel : false);
    };

  const [restaurantKey, setRestaurantKey] = useState("-N4oB-DoClsQsVBGAOVl");
  const [restaurant, setRestaurant] = useState<Restaurant>(new Restaurant());
  const [restaurantMenus, setRestaurantMenus] = useState<Array<Menu>>([]);

  useEffect(() => {
    getRestaurantByKey(restaurantKey).then(
      (restaurant) => {
        setRestaurant(restaurant);
      },
      () => {}
    );
    getRestaurantMenuByKey(restaurantKey).then(
      (menus) => {
        setRestaurantMenus(menus);
      },
      () => {}
    );
  }, [restaurantKey]);

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <AppBar position="sticky" sx={{ height: "auto" }}>
          <Grid container justifyContent="center">
            <AdbIcon sx={{ fontSize: 30, marginTop: "1%" }} />
            <Typography fontSize={24} marginTop="0.5%">
              Chooz
            </Typography>
          </Grid>
        </AppBar>

        <Box display="flex">
          <Box height="200" width="100%" bgcolor={choozTheme.palette.info.main}>
            <Avatar
              alt="Remy Sharp"
              src=""
              sx={{
                width: 100,
                height: 100,
                bgcolor: choozTheme.palette.background.paper,
                marginLeft: 2,
                marginTop: "150",
              }}
            />
          </Box>
        </Box>

        <Box
          display="flex"
          marginTop="50"
          sx={{ flexDirection: "column" }}
          bgcolor="white"
          padding={2}
        >
          <Typography
            variant="h4"
            color="black"
            fontWeight="bold"
            alignSelf="flex-start"
          >
            {restaurant.restaurantName}
          </Typography>
          <Typography variant="h6">{restaurant.description}</Typography>

          <Box marginTop={1} display="flex" flexDirection="column">
            <Accordion
              disableGutters
              elevation={1}
              sx={{ bgcolor: "transparent" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  Restaurant Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography fontWeight="bold">Phone Number</Typography>
                  <Typography>{restaurant.phoneNumber}</Typography>
                </Box>

                <Box marginTop={2}>
                  <Typography fontWeight="bold">Address</Typography>
                  <Typography>{restaurant.address}</Typography>
                </Box>

                <Box marginTop={2}>
                  <Typography fontWeight="bold">Hours</Typography>
                  {restaurant.hours.split("\n").map((day, i) => {
                    return (
                      <Box
                        key={i}
                        display="flex"
                        justifyContent="space-between"
                        width="60%"
                      >
                        <Typography>
                          {day.split("\n", 7)[0].split(" ", 1)[0]}:
                        </Typography>
                        <Typography>
                          {day
                            .split("\n", 7)[0]
                            .substring(
                              day.split("\n", 7)[0].split(" ", 1)[0].length
                            )}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>

        <Box
          display="flex"
          textAlign="center"
          marginTop="5%"
          sx={{ flexDirection: "column" }}
          bgcolor="white"
          borderTop={1}
          borderBottom={1}
          borderColor="grey.300"
          boxShadow={3}
        >
          {restaurantMenus.map((menu, menuIndex) => (
            <Accordion
              key={menuIndex}
              disableGutters
              defaultExpanded={true}
              elevation={1}
              sx={{
                bgcolor: "white",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5" color="black" fontWeight="bold">
                  {menu.menuName}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ height: "40%" }}>
                {menu.categories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <Typography
                      variant="h6"
                      marginBottom="2%"
                      fontWeight="bold"
                      textAlign="left"
                    >
                      {category.categoryName}
                    </Typography>
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <Box
                          key={itemIndex}
                          // bgcolor={choozTheme.palette.info.main}
                          bgcolor="white"
                          height="auto"
                          padding="10"
                          display="flex"
                          flexDirection="column"
                          marginBottom="3%"
                          boxShadow={1}
                        >
                          <Accordion
                            key={menuIndex}
                            disableGutters
                            defaultExpanded={false}
                            elevation={0}
                            sx={{
                              // bgcolor: choozTheme.palette.info.main,
                              bgcolor: "white",
                            }}
                            expanded={
                              descriptionExpanded ===
                              "m" +
                                menuIndex +
                                "c" +
                                categoryIndex +
                                "i" +
                                itemIndex
                            }
                            onChange={handleDescriptionAccordionChange(
                              "m" +
                                menuIndex +
                                "c" +
                                categoryIndex +
                                "i" +
                                itemIndex
                            )}
                          >
                            <Box display="flex" justifyContent="space-between">
                              <AccordionSummary sx={{ width: "100%" }}>
                                <Typography>{item.itemName}</Typography>
                              </AccordionSummary>
                              <Typography
                                flexDirection="column"
                                alignSelf="center"
                                paddingRight="2%"
                              >
                                {"$" + item.price}
                              </Typography>
                            </Box>

                            <AccordionDetails>
                              <Divider sx={{ marginBottom: 2 }} />
                              <Typography>
                                {item.description === ""
                                  ? "Empty"
                                  : item.description}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                          {/* <Box textAlign="left" marginTop="3%"></Box> */}
                        </Box>
                      </div>
                    ))}
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </ThemeProvider>
    </>
  );
};
export default RestaurantMenuPage;
