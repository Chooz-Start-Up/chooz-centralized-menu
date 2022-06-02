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