import React, { useState } from "react";
import { Text, View, StyleSheet, Platform, Dimensions } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../constants/colors";
import { Menu } from "../util/Menu";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
    height: 30,
  },
  listItem: {
    backgroundColor: colors.white,
    alignItems: "center",
    height: 30,
    //borderWidth: 1,
    borderBottomColor: "#E53C38",
  },
  listItemText: {
    textAlign: "center", // <-- the magic
    paddingTop: Platform.OS === "ios" ? 5 : 5,
    fontSize: Platform.OS === "ios" ? 17 : 16,
    marginTop: 0,
    height: 25,
    backgroundColor: "transparent",
  },
  columnSeparator: {
    backgroundColor: colors.border,
    width: 2,
  },
});

type Props = {
  menus: Menu[];
  currentMenuIndex: number;
  changeMenuIndex: Function;
};

const ColumnSeparator = () => <View style={styles.columnSeparator} />;

const HorizontalList: React.FC<Props> = ({
  menus,
  currentMenuIndex,
  changeMenuIndex,
}: Props) => {
  const [selected, setSelected] = useState(currentMenuIndex);

  const getWidth = () => {
    if (menus.length === 1) {
      return { width: screen.width };
    } else if (menus.length === 2) {
      return { width: screen.width / 2 };
    } else {
      return { width: screen.width / 2.5 };
    }
  };

  const setSelectedStyle = (index: number) => {
    if (selected === index) {
      return {
        borderBottomWidth: 2,
      };
    } else {
      return {};
    }
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {menus.map((menu, i) => {
        return (
          <View
            key={menu.menuName + "View"}
            style={[styles.listItem, getWidth(), setSelectedStyle(i)]}
          >
            <TouchableOpacity
              key={menu.menuName + "ViewKey"}
              style={getWidth()}
              onPress={() => {
                setSelected(i);
                changeMenuIndex(i);
              }}
            >
              <Text key={menu.menuName + "TextKey"} style={styles.listItemText}>
                {menu.menuName}
              </Text>
            </TouchableOpacity>
            <ColumnSeparator key={menu.menuName + "Column"} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default HorizontalList;
