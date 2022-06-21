import React, { useEffect } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import Navigation from "./config/navigation";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    myOwnColor: "#BADA55",
  },
};

export default function Main() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
