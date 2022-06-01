import React from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/core";

import { RowSeparator } from "../components/RowItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { RestaurantStackParamList } from "../config/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const screen = Dimensions.get("window");

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
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  titleText: {
    fontSize: Platform.OS === "ios" ? 22 : 20,
    //fontWeight: "bold",
  },
  priceContainer: {},
  priceText: {
    fontSize: Platform.OS === "ios" ? 20 : 16,
  },
  headerText: {
    fontSize: Platform.OS === "ios" ? 17 : 14,
    fontWeight: "bold",
  },
  bodyContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  bodyText: {
    fontSize: Platform.OS === "ios" ? 17 : 14,
  },
});

type Props = NativeStackScreenProps<RestaurantStackParamList, "ItemScreen">;

const Item = ({ route }: Props) => {
  let itemName = route.params.itemName;
  let price = route.params.price;
  let description = route.params.description;
  let ingredients = route.params.ingredients;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{itemName}</Text>
            {price && (
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${price}</Text>
              </View>
            )}
          </View>
          <RowSeparator />
          {description && (
            <View style={styles.itemContainer}>
              <Text style={styles.headerText}>Descriptions</Text>
              <View style={styles.bodyContainer}>
                <Text style={styles.bodyText}>{description}</Text>
              </View>
            </View>
          )}
          <RowSeparator />
          {ingredients && (
            <View style={styles.itemContainer}>
              <Text style={styles.headerText}>Ingredients</Text>
              <View style={styles.bodyContainer}>
                <Text style={styles.bodyText}>{ingredients}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Item;
