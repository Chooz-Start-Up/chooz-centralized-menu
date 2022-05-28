import React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import colors from "../constants/colors";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.white,
    height: 30,
  },
  item: {
    backgroundColor: colors.white,
    alignItems: "center",
    height: 75,
    width: 150,
  },
  itemText: {
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

const HorizontalList = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      <View style={styles.item}>
        <Text style={styles.itemText}>Breakfast</Text>
      </View>
      <ColumnSeparator />
      <View style={styles.item}>
        <Text style={styles.itemText}>Lunch</Text>
      </View>
      <ColumnSeparator />
      <View style={styles.item}>
        <Text style={styles.itemText}>Dinner</Text>
      </View>
      <ColumnSeparator />
      <View style={styles.item}>
        <Text style={styles.itemText}>Drink</Text>
      </View>
    </ScrollView>
  );
};

export default HorizontalList;
