import { createTheme } from "@mui/material";

export const choozTheme = createTheme({
  palette: {
    primary: {
      main: "#f44336",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffd7db",
      paper: "white",
    },
    info: {
      main: "#fffaef",
    },
  },

  typography: {
    button: {
      textTransform: "none",
    },
    h4: {
      fontSize: 34,
      color: "#ffffff",
      verticalAlign: "middle",
      alignItems: "center",
      textAlign: "center",
    },
  },
});
