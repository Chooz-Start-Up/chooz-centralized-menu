import React from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { RowSeparator } from "../components/RowItem";
import { RestaurantStackParamList } from "../config/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
  },
  content: {
    //paddingTop: screen.height * 0.05,
    //paddingLeft: 20,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  titleContainer: {
    flex: 1,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  titleText: {
    fontSize: Platform.OS === "ios" ? 22 : 20,
    //fontWeight: "bold",
  },
  priceContainer: {
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  priceText: {
    fontSize: Platform.OS === "ios" ? 22 : 20,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: Platform.OS === "ios" ? 17 : 14,
    fontWeight: "bold",
    color: colors.darkRed,
  },
  bodyContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  bodyText: {
    fontSize: Platform.OS === "ios" ? 17 : 14,
  },
  separator: {
    backgroundColor: colors.border,
    height: 1,
    marginHorizontal: Platform.OS === "ios" ? 20 : 0,
    marginVertical: 5,
  },
});

type Props = NativeStackScreenProps<RestaurantStackParamList, "ItemScreen">;

const ItemScreen = ({ route }: Props) => {
  let itemName = route.params.item.itemName;
  let price = route.params.item.price;
  let description = route.params.item.description;
  let ingredients = route.params.item.ingredients;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{itemName}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{`$${price.toFixed(2)}`}</Text>
          </View>
          <View style={styles.separator} />

          <View style={styles.itemContainer}>
            <Text style={styles.headerText}>Description</Text>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>{description}</Text>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={styles.itemContainer}>
            <Text style={styles.headerText}>Ingredients</Text>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>{ingredients}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ItemScreen;
