import React, { useState } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../constants/colors";
import { Menu } from "../util/Menu";

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

type Props = {
  menus: Menu[];
  changeMenuIndex: Function;
};

const ColumnSeparator = () => <View style={styles.columnSeparator} />;

const HorizontalList: React.FC<Props> = ({ menus, changeMenuIndex }: Props) => {
  const [selected, setSelected] = useState();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {menus.map((menu, i) => {
        return (
          <View key={menu.menuName + "View"}>
            <TouchableOpacity
              key={menu.menuName + "ViewKey"}
              style={styles.listItem}
              onPress={() => {
                console.log("INDEX: " + i);
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
