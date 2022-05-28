import React from "react";
import "./App.css";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import { MenuColumnList } from "./component/main_objects/MenuColumnList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f44336",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ef5350",
    },
  },

  typography: {
    h4: {
      fontSize: 24,
      fontWeight: 300,
      color: "#ffffff",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
      textAlign: "center",
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              bgcolor: "primary.main",
            }}
          >
            <Typography variant="h4">Resaurant</Typography>
          </Box>

          <MenuColumnList />
        </ThemeProvider>
      </>
    );
  }
}

export default App;
