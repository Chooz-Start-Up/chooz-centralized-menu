import React from "react";
import { Column } from "./component/column/Column";
import "./App.css";
import VerticalTabs from "./component/column/TabTest";
import {
  Box,
  createTheme,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { FormDialog } from "./component/column/ListTest";

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

          <FormDialog />
        </ThemeProvider>
      </>
    );
  }
}

export default App;
