import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { RowItem, RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";

const openURL = ({ url }: { url: any }) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert("Something went wrong", "Please try again later.");
  });
};

const Menu = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView>
        <RowItem
          text="Themes"
          /*
          onPress={() => alert("todo!")}
          rightIcon={
            <>
              <Entypo name="chevron-right" size={20} color={colors.blue} />
            </>
          }
          */
        />

        <RowSeparator />

        <RowItem
          text="React Native Basics"
          /*
          onPress={() => openURL()}
          rightIcon={
          <>
          <Entypo name="export" size={20} color={colors.blue} />}
          </>
          */
        />

        <RowSeparator />

        <RowItem
          text="React Native by Example"
          /*
          onPress={() => openURL("https://youtube.com")}
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
          */
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
