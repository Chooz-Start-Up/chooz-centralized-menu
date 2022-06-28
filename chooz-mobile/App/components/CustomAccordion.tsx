import React, { useCallback, useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  Dimensions,
  Text,
  ColorPropType,
} from "react-native";
import { Divider, List } from "react-native-paper";
import colors from "../constants/colors";
import { Category } from "../util/Category";
import { MenuItem, RowSeparator } from "./RowItem";

type Props = {
  category: Category;
  navigate: Function;
};

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
  },
  sectionTitle: {
    color: colors.secondaryRed,
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 17 : 14,
  },
  columnSeparator: {
    backgroundColor: colors.border,
    width: StyleSheet.hairlineWidth,
  },
  sectionRowSeparator: {
    width: screen.width,
  },
  rightItem: {
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});

const CustomAccordion: React.FC<Props> = ({ category, navigate }) => {
  const [expanded, setExpanded] = useState(true);
  let items = category.items;

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <List.Accordion
      title={category.categoryName}
      style={styles.section}
      titleStyle={styles.sectionTitle}
      expanded={expanded}
      onPress={handlePress}
    >
      <Divider />

      {items?.map((item, i) => {
        return (
          <View key={item.itemName + "View" + i}>
            <MenuItem
              key={item.itemName + "List" + i}
              item={item}
              onPress={() => navigate("ItemScreen", item)}
            />
            <Divider key={item.itemName + "Separator" + i} />
          </View>
        );
      })}
    </List.Accordion>
  );
};

export default CustomAccordion;
