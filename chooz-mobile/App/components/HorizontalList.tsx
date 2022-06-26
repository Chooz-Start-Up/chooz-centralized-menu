import React, { useState } from "react";
import { Text, View, StyleSheet, Platform, Dimensions } from "react-native";
import {
  BorderlessButton,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import colors from "../constants/colors";
import { Menu } from "../util/Menu";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
    height: 33,
  },
  listItem: {
    backgroundColor: colors.white,
    alignItems: "center",
    height: 33,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  listItemText: {
    textAlign: "center", // <-- the magic
    paddingTop: 6,
    fontSize: Platform.OS === "ios" ? 17 : 16,
    backgroundColor: "transparent",
  },
});

type Props = {
  menus: Menu[];
  currentMenuIndex: number;
  changeMenuIndex: Function;
};

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

  const setSelectedBorder = (index: number) => {
    if (selected === index) {
      return {
        borderBottomWidth: 2,
        borderBottomColor: colors.secondaryRed,
      };
    } else {
      return {};
    }
  };

  const setSelectedText = (index: number) => {
    if (selected === index) {
      return {
        fontWeight: "bold",
        color: colors.secondaryRed,
        paddingTop: 4,
      } as const;
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
          <View key={menu.menuName + "container"}>
            <View
              key={menu.menuName + "View"}
              style={[styles.listItem, getWidth(), setSelectedBorder(i)]}
            >
              <TouchableOpacity
                key={menu.menuName + "ViewKey"}
                style={getWidth()}
                onPress={() => {
                  setSelected(i);
                  changeMenuIndex(i);
                }}
              >
                <Text
                  key={menu.menuName + "TextKey"}
                  style={[styles.listItemText, setSelectedText(i)]}
                >
                  {menu.menuName}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default HorizontalList;
