import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ChoozAppBar from "../component/general_componets/ChoozAppBar";
import { MainLandingPageProps, MainLandingPageState } from "./interface";
import { choozTheme } from "../theme/theme";
import ChoozEmailLogo from "../component/images/chooz_icons/logoRed.png";
import { RestaurantListDisplay } from "../component/main_landing_page_components/RestaurantListDisplay";
import AppleStore from "../component/images/app_store/Apple_Store_Screenshot.png";
import PlayStore from "../component/images/app_store/Play_Store_Screenshot.png";
import JacobChoi from "../component/images/profile/jacob_choi.jpg";
import JustinGalang from "../component/images/profile/justin_galang.jpg";

class MainLandingPage extends React.Component<
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
          <Box
            height="400"
            width="100%"
            // component="img"
            // src={Background}
            bgcolor={choozTheme.palette.primary.main}
            sx={{ position: "absolute" }}
            zIndex="-1"
            top={0}
            display="flex"
            justifyContent="center"
          />
          <Typography
            align="center"
            variant="h3"
            fontWeight="bold"
            color={choozTheme.palette.secondary.light}
            sx={{
              maxWidth: "80%",
              marginLeft: "10%",
              marginTop: 6,
            }}
          >
            Create a free online menu for your restaurant
            <Typography variant="h4" marginTop={4}>
              Easily Viewable
            </Typography>
            <Typography variant="h4">Instant Updates</Typography>
            <Typography variant="h4">QR Code access</Typography>
            <Box display="flex" justifyContent="center" marginTop={6}>
              <Button
                size="large"
                variant="contained"
                href="/login"
                sx={{
                  borderRadius: 8,
                  textTransform: "none",
                  alignSelf: "center",
                  marginTop: 8,
                }}
              >
                <Typography variant="h5">Create Menu</Typography>
              </Button>
            </Box>
          </Typography>

          <Box
            display="flex"
            // justifyContent="space-between"
            justifyContent="center"
            marginTop="5%"
            // paddingLeft="10%"
            // paddingRight="10%"
          >
            <Box
              display="flex"
              flexDirection="column"
              width="40%"
              marginRight="2%"
            >
              <Typography variant="h5" align="center">
                Download at Apple Store
              </Typography>
              <Box component="img" src={AppleStore} marginTop="1%" />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              width="40%"
              marginLeft="2%"
            >
              <Typography variant="h5" align="center">
                Download at Play Store
              </Typography>
              <Box component="img" src={PlayStore} marginTop="1%" />
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" marginTop="5%">
            <RestaurantListDisplay />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            marginTop={10}
            // border={1}
          >
            <Box width="60%" marginLeft="20%">
              {/* Wrapped the title with an Accordion component to prevent below Accordions from pushing up */}
              <Accordion elevation={0}>
                <Typography variant="h4" fontWeight="bold" align="center">
                  FAQ
                </Typography>{" "}
              </Accordion>

              {/* Q1 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 1 }}>
                <AccordionSummary>
                  <Typography variant="h5">Q1: What is chooz?</Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    Chooz is a platform with the mission to connect local
                    restaurants to their customers. This means providing the
                    ability for restaurants to create and update their profile
                    instantaneously and giving customers a way to easily
                    discover local restaurants via the app.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Q2 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 2 }}>
                <AccordionSummary>
                  <Typography variant="h5">
                    Q2: What service do you provide?
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    For now, we provide restaurant owners with the ability to
                    create a menu that is easily viewable on a mobile device,
                    and a QR Code for restaurant owners to place around their
                    restaurant.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Q3 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 2 }}>
                <AccordionSummary>
                  <Typography variant="h5">
                    Q3: How can I access the menu?
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    After publishing your menu, you will have access to your QR
                    code. Scanning this QR code will pull up your menu! This QR
                    Code will pull up the menu on the app if it is downloaded,
                    or the browser preview if the user decides to download it at
                    a later time.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Q4 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 2 }}>
                <AccordionSummary>
                  <Typography variant="h5">
                    Q4: Do I have to download the app to check the menu?
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    Nope! If you do not have the app downloaded, you will be
                    able to check the menu through the browser! We do recommend
                    you to download the app for a better experience and future
                    features!
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Q5 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 2 }}>
                <AccordionSummary>
                  <Typography variant="h5">
                    Q5: Is it free to make my own online menu?
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    Yes! It is totally free to make the menu and retrieve the QR
                    code after publishing it!
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Q6 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 2 }}>
                <AccordionSummary>
                  <Typography variant="h5">
                    Q6: Is chooz just an online menu provider?
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    Of course not! Our vision is to create a social media for
                    the restaurant owners and customers where the customers can
                    rate restaurants and share their favourite menus and items,
                    while the owners can observe those feedbacks and advertise
                    their menus!
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Q7 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 2 }}>
                <AccordionSummary>
                  <Typography variant="h5">
                    Q7: How long does it take to update my menu?
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    Updating the menu or restaurant information is INSTANT! As
                    soon as you make your changes, the menu will be updated on
                    both the app and browser after a quick refresh!
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Q8 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 2 }}>
                <AccordionSummary>
                  <Typography variant="h5">
                    Q8: Do I need to print out a new QR code every time I edit
                    my menu?
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    No! The QR code will remain the same even after you have
                    editted your menu.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            marginTop={10}
            marginBottom={5}
          >
            <Box display="flex" alignSelf="center">
              <Box
                component="img"
                src={ChoozEmailLogo}
                width={50}
                height={50}
              />
              <Typography fontSize={24} sx={{ marginLeft: 1, marginTop: 0.5 }}>
                support@choozmenu.com
              </Typography>
            </Box>
          </Box>

          <Typography marginTop={5} marginBottom={2} align="center">
            Developed by
          </Typography>
          <Box
            display="flex"
            justifyContent="space-evenly"
            marginLeft="40%"
            width="20%"
            marginBottom={5}
          >
            <Box>
              <Box
                component="img"
                src={JustinGalang}
                width={80}
                height={80}
                borderRadius="50%"
                marginLeft={1.5}
              />
              <Typography marginTop={1} fontWeight="bold" align="center">
                Justin Galang
              </Typography>
            </Box>

            <Box>
              <Box
                component="img"
                src={JacobChoi}
                width={80}
                height={80}
                borderRadius="50%"
              />
              <Typography marginTop={1} fontWeight="bold" align="center">
                Jacob Choi
              </Typography>
            </Box>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}

export default MainLandingPage;
