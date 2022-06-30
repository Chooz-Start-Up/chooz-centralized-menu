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

class MenuEditPage extends React.Component<
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
                    chooz is centralized menu system! I don't even know what
                    that means!
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
                    We allow restaurant owners to make their online menus that
                    customers can see through their phone!
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
                    After publishing your menu, you will have access to the QR
                    code which you can scan to pull up the menu!
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
                    Not necessarily! If you do not have the app downloaded, you
                    will be able to check the menu through the browser! We do
                    recommend you to download the app for more future features
                    though!
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
                    code after publishing it! However, there will be a
                    restaurant verification system in the future to ensure you
                    are an actual restaurant owner.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Q6 */}
              <Accordion disableGutters elevation={3} sx={{ marginTop: 2 }}>
                <AccordionSummary>
                  <Typography variant="h5">
                    Q6: Is chooz a just an online menu provider?
                  </Typography>
                </AccordionSummary>
                <Divider />
                <AccordionDetails>
                  <Typography variant="h6">
                    Of course not! Our vision is to create a social media for
                    the restaurant owners and customers where the customers can
                    rate restaurants and share their favourite menu, while the
                    owners can observe those feedbacks and advertise their
                    menus!
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
                    Instant! As soon as you make your changes and republish it,
                    the menu will be updated on both the app and browser after a
                    quick refresh!
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
                    editted your menu as this QR code is permanent! However,
                    your menu will not be available if your menu is unpublished.
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
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant="h6" fontWeight="bold" align="center">
                Report Bug
              </Typography>
              <Box display="flex" alignSelf="center">
                <Box
                  component="img"
                  src={ChoozEmailLogo}
                  width={35}
                  height={35}
                />
                <Typography sx={{ marginLeft: 1, marginTop: 0.5 }}>
                  support@choozmenu.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}

export default MenuEditPage;
