import React, { useCallback, useState } from "react";
import { Platform, View, StyleSheet, Dimensions, Text } from "react-native";
import { Divider, List } from "react-native-paper";
import colors from "../constants/colors";
import { Category } from "../util/Category";
import { RowSeparator } from "./RowItem";

type Props = {
  category: Category;
  navigate: Function;
};

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
  },
  listItem: {
    backgroundColor: "white",
    alignItems: "center",
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
  sectionRowSeparator: {
    width: screen.width,
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
      expanded={expanded}
      onPress={handlePress}
    >
      <Divider />

      {items?.map((item, i) => {
        return (
          <View key={item.itemName + "View" + i}>
            <List.Item
              key={item.itemName + "List" + i}
              title={item.itemName}
              description={item.description}
              right={() => <Text>{item.price}</Text>}
              style={styles.listItem}
              onPress={() => navigate("ItemScreen", item)}
            />
            <RowSeparator key={item.itemName + "Separator" + i} />
          </View>
        );
      })}
    </List.Accordion>
  );
};

export default CustomAccordion;
