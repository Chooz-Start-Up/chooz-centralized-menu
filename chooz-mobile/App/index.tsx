import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux"; //TODO: Wrap App in Store Provider
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Menu from "./screens/Menu";
import Navigation from "./config/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default function Main() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
