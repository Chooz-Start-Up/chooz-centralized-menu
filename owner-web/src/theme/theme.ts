import { createTheme } from "@mui/material";
import "../fonts/stylesheet.css";

export const choozTheme = createTheme({
  palette: {
    primary: {
      main: "#D11D27",
      light: "#E53C38",
      dark: "#A90011",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFFAEF",
      light: "#FFFFFF",
      dark: "#FBEBD8",
      contrastText: "#000000",
    },
    action: {
      selected: "#FBEBD8",
    },
  },
  typography: {
    fontFamily: "Hurme Geometric Sans 3",
  },
});
