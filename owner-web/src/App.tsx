import React from "react";
import "./App.css";
import {
  Box,
  createTheme,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MenuColumnList } from "./component/main_objects/MenuColumnList";
import TabPanel from "./features/TabPanel";
import ChoozAppBar from "./features/ChoozAppBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f44336",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
  },

  typography: {
    h4: {
      fontSize: 34,
      fontWeight: 300,
      color: "#ffffff",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
      textAlign: "center",
    },
  },
});

interface AppProp {}

interface AppState {
  tabIndex: number;
}

class App extends React.Component<AppProp, AppState> {
  constructor(props: AppProp) {
    super(props);

    this.state = { tabIndex: 0 };
  }

  a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  handleChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({ tabIndex: newValue });
  };

  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <ChoozAppBar />
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "100vh",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={this.state.tabIndex}
              onChange={this.handleChange}
              sx={{ height: 500, borderRight: 1, borderColor: "grey.300" }}
            >
              <Tab label="Profile" {...this.a11yProps(0)} />
              <Tab label="Edit Menu" {...this.a11yProps(1)} />
            </Tabs>
            <TabPanel value={this.state.tabIndex} index={0}>
              Profile yet implemented
            </TabPanel>
            <TabPanel value={this.state.tabIndex} index={1}>
              <Paper
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  // bgcolor: "#ffebee",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      bgcolor: "#ef5350",
                    }}
                  >
                    <Typography variant="h4">Resaurant</Typography>
                  </Box>

                  <MenuColumnList />
                </Box>
              </Paper>
            </TabPanel>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
