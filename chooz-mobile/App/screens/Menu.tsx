import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

import { RowItem, RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";
import { MenuStackParamList } from "../config/navigation";

const openURL = ({ url }: { url: any }) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert("Something went wrong", "Please try again later.");
  });
};

type MenuScreenNavigationProp = StackNavigationProp<
  MenuStackParamList,
  "MenuScreen"
>;

type Props = {
  navigation: MenuScreenNavigationProp;
};

const Menu = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView>
        <RowItem
          text="Themes"
          onPress={() => {
            navigation.push("ItemScreen");
            console.log("Themes Pushed");
          }}
          /*
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
          onPress={() => alert("todo!")}
          /*
          rightIcon={
          <>
          <Entypo name="export" size={20} color={colors.blue} />}
          </>
          */
        />

        <RowSeparator />

        <RowItem
          text="React Native by Example"
          onPress={() => alert("todo!")}
          /*
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
          */
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
