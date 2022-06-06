import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import colors from "../constants/colors";
import { Menu } from "../util/Menu";
import PropTypes from "prop-types";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
    height: 30,
  },
  listItem: {
    backgroundColor: colors.white,
    alignItems: "center",
    height: 75,
    width: 150,
  },
  listItemText: {
    textAlign: "center", // <-- the magic
    paddingTop: Platform.OS === "ios" ? 5 : 5,
    fontSize: Platform.OS === "ios" ? 17 : 16,
    marginTop: 0,
    height: 75,
    backgroundColor: colors.white,
  },
  columnSeparator: {
    backgroundColor: colors.border,
    width: StyleSheet.hairlineWidth,
  },
});

const ColumnSeparator = () => <View style={styles.columnSeparator} />;

const HorizontalList = ({
  menus,
  setMenu,
}: {
  menus: Menu[];
  setMenu: Function;
}) => {
  console.log("TEST");
  console.log("FINAL: " + menus[0].categories![0].items![0].itemName);
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {menus.map((menu) => {
        return (
          <>
            <TouchableOpacity
              key={menu.menuName + "ViewKey"}
              style={styles.listItem}
              onPress={setMenu(menu)}
            >
              <Text key={menu.menuName + "TextKey"} style={styles.listItemText}>
                {menu.menuName}
              </Text>
            </TouchableOpacity>
            <ColumnSeparator />
          </>
        );
      })}
    </ScrollView>
  );
};

export default HorizontalList;
