import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux"; //TODO: Wrap App in Store Provider

import Navigation from "./config/navigation";
export default function Main() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
