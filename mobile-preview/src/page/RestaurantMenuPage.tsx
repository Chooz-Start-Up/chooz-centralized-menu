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
  Fade,
  Grid,
  Slide,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { choozTheme } from "../theme/theme";
import AdbIcon from "@mui/icons-material/Adb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getRestaurantByKey,
  getRestaurantMenuByKey,
  pullBannerImage,
  pullLogoImage,
} from "../database/api/RestaurantApi";
import { Restaurant } from "../database/component/Restaurant";
import { Menu } from "../database/component/Menu";
import { useNavigate, useParams } from "react-router-dom";
import ChoozAppBar from "../component/general/ChoozAppBar";
import Logo from "../component/images/chooz_icons/logoGrey.png";
import { border } from "@mui/system";
import MobileDetect from "mobile-detect";

const RestaurantMenuPage: React.FC = () => {
  const { restaurantName, restaurantKey } = useParams();
  const navigate = useNavigate();
  const type = new MobileDetect(window.navigator.userAgent);

  const [descriptionExpanded, setDescriptionExpanded] = React.useState<
    string | false
  >(false);

  const handleDescriptionAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setDescriptionExpanded(isExpanded ? panel : false);
    };

  // Cha House: -N4oE-g8WbJUPYqadmWf
  // Subway pic: -N4oB-DoClsQsVBGAOVl
  // No pic: -N4oEq1Ofly59SHGifJ3
  const [restaurant, setRestaurant] = useState<Restaurant>(new Restaurant());
  const [restaurantMenus, setRestaurantMenus] = useState<Array<Menu>>([]);
  const [bannerURL, setBannerURL] = useState("");
  const [logoURL, setLogoURL] = useState("");

  const [bannerLoading, setBannerLoading] = useState(true);
  const [logoLoading, setLogoLoading] = useState(true);

  useEffect(() => {
    if (restaurantKey !== undefined || restaurantKey === "") {
      getRestaurantByKey(restaurantKey).then(
        (restaurant) => {
          setRestaurant(restaurant);
        },
        () => {
          navigate("/notfound");
        }
      );
      getRestaurantMenuByKey(restaurantKey).then(
        (menus) => {
          setRestaurantMenus(menus);
        },
        () => {
          navigate("/notfound");
        }
      );
      pullBannerImage(restaurantKey)
        .then(
          (bannerURL) => {
            setBannerURL(bannerURL);
            setBannerLoading(false);
          },
          () => {
            setBannerLoading(false);
          }
        )
        .catch(() => {
          setBannerLoading(false);
        });
      pullLogoImage(restaurantKey)
        .then(
          (logoURL) => {
            setLogoURL(logoURL);
            setLogoLoading(false);
          },
          () => {
            setLogoLoading(false);
          }
        )
        .catch(() => {
          setLogoLoading(false);
        });
    } else {
      navigate("/notfound");
    }
  }, [restaurantKey]);

  return (
    <>
      <ThemeProvider theme={choozTheme}>
        <ChoozAppBar />
        {bannerURL === "" ? (
          <Box display="flex">
            <Fade
              in={!bannerLoading && !logoLoading}
              mountOnEnter
              unmountOnExit
              timeout={1000}
            >
              <Box
                height="300"
                width="100%"
                bgcolor={choozTheme.palette.secondary.main}
              >
                <Avatar
                  src={!logoURL ? Logo : logoURL}
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: choozTheme.palette.secondary.dark,
                    marginLeft: 2,
                    marginTop: "150",
                    top: 90,
                    border: 1,
                    borderColor: "grey.400",
                  }}
                />
              </Box>
            </Fade>
          </Box>
        ) : (
          <Box>
            <Fade
              in={!bannerLoading && !logoLoading}
              mountOnEnter
              unmountOnExit
              timeout={1000}
            >
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  bgcolor="grey.300"
                  // bgcolor={choozTheme.palette.secondary.light}
                >
                  <Box
                    height="300"
                    width={
                      type.os() === "AndroidOS" || type.os() === "iOS"
                        ? "100%"
                        : "auto"
                    }
                    component="img"
                    src={bannerURL}
                  />
                </Box>
                <Avatar
                  src={!logoURL ? Logo : logoURL}
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: choozTheme.palette.secondary.light,
                    marginLeft: 2,
                    bottom: 60,
                    border: 1,
                    borderColor: "grey.400",
                  }}
                />
              </Box>
            </Fade>
          </Box>
        )}

        <Fade
          in={!bannerLoading && !logoLoading}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Box position="absolute" top={465} width="100%">
            <Box
              display="flex"
              marginTop={-5}
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

              <Accordion
                disableGutters
                elevation={1}
                sx={{ bgcolor: "transparent" }}
                defaultExpanded={true}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold">Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h6">{restaurant.description}</Typography>
                </AccordionDetails>
              </Accordion>

              <Box marginTop={1} display="flex" flexDirection="column">
                <Accordion
                  disableGutters
                  elevation={1}
                  sx={{ bgcolor: "transparent" }}
                  defaultExpanded={true}
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
                            width="100%"
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
                        <Accordion
                          key={menuIndex}
                          disableGutters
                          defaultExpanded={true}
                          elevation={0}
                          sx={{
                            bgcolor: "white",
                          }}
                        >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography
                              variant="h6"
                              marginBottom="2%"
                              fontWeight="bold"
                              textAlign="left"
                            >
                              {category.categoryName}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex}>
                                <Box
                                  key={itemIndex}
                                  bgcolor="white"
                                  height="auto"
                                  padding="10"
                                  display="flex"
                                  flexDirection="column"
                                  marginBottom="3%"
                                  boxShadow={1}
                                >
                                  <Accordion
                                    disableGutters
                                    defaultExpanded={false}
                                    elevation={0}
                                    sx={{
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
                                    <AccordionSummary
                                      sx={{ width: "100%" }}
                                      expandIcon={
                                        item.description !== "" ? (
                                          <ExpandMoreIcon />
                                        ) : (
                                          <ExpandMoreIcon
                                            sx={{ color: "white" }}
                                          />
                                        )
                                      }
                                    >
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        width="100%"
                                      >
                                        <Typography align="left">
                                          {item.itemName}
                                        </Typography>
                                        <Typography
                                          flexDirection="column"
                                          align="right"
                                          marginLeft={2}
                                          marginRight={1}
                                        >
                                          {"$" + item.price.toFixed(2)}
                                        </Typography>
                                      </Box>
                                      {/* {item.description !== "" && (
                                        <Typography>
                                          {item.description}
                                        </Typography>
                                      )} */}
                                    </AccordionSummary>

                                    {item.description !== "" && (
                                      <AccordionDetails>
                                        <Divider sx={{ marginBottom: 2 }} />
                                        <Typography>
                                          {item.description}
                                        </Typography>
                                      </AccordionDetails>
                                    )}
                                  </Accordion>
                                </Box>
                              </div>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </Fade>
      </ThemeProvider>
    </>
  );
};
export default RestaurantMenuPage;
