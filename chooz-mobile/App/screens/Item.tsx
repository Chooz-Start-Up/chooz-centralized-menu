import React from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, Dimensions, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RowSeparator } from "../components/RowItem";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
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
    fontSize: Platform.OS === "ios" ? 28 : 24,
    fontWeight: "bold",
  },
  priceContainer: {},
  priceText: {
    fontSize: Platform.OS === "ios" ? 22 : 20,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: Platform.OS === "ios" ? 22 : 20,
    fontWeight: "bold",
  },
  bodyContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  bodyText: {
    fontSize: Platform.OS === "ios" ? 20 : 16,
  },
});

const Item = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Item 1</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>$0.00</Text>
            </View>
          </View>
          <RowSeparator />
          <View style={styles.itemContainer}>
            <Text style={styles.headerText}>Description</Text>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>
                This item is very yummy and is made with a lot of love
              </Text>
            </View>
          </View>
          <RowSeparator />
          <View style={styles.itemContainer}>
            <Text style={styles.headerText}>Ingredients</Text>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>
                These are the ingredients of Item 1
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Item;
