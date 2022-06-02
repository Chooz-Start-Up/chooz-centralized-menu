import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Text,
  Platform,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FAB, Portal } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { RestaurantStackParamList } from "../config/navigation";
import { RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";

type Props = NativeStackScreenProps<
  RestaurantStackParamList,
  "RestaurantScreen"
>;

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  scrollView: {
    height: screen.height,
    //flex: 1,
  },
  portal: {},
  fab: {
    position: "absolute",
    margin: 5,
    right: 0,
    top: Platform.OS === "ios" ? screen.height * 0.1 : screen.height * 0.09,
    //bottom: screen.height - 5,
    //bottom: 0,
  },
  pictureView: {
    backgroundColor: colors.blue,
    height: 175,
  },
  descriptionView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  hoursView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  phoneNumberView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  addressView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 17 : 14,
    marginBottom: 5,
  },
  bodyText: {
    marginLeft: 20,
    fontSize: Platform.OS === "ios" ? 15 : 12,
  },
  descriptionText: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 14,
  },
});

const Restaurant: React.FC<Props> = () => {
  const isFocused = useIsFocused();

  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {isFocused && (
        <Portal>
          <FAB
            style={styles.fab}
            icon="book-open"
            label="Menu"
            onPress={() => navigation.navigate("MenuScreen")}
          />
        </Portal>
      )}
      <ScrollView
        style={styles.scrollView}
        //contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.pictureView}></View>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>
            This restaurant is very good and has a lot of amazing things to eat.
            We cook all kinds of meals and it is pretty cheap.
          </Text>
        </View>
        <RowSeparator />
        <View style={styles.hoursView}>
          <Text style={styles.headerText}>Hours</Text>
          <Text style={styles.bodyText}>
            Monday: 7:00am - 7:00pm {"\n"}Tuesday: 7:00am - 7:00pm {"\n"}
            Wednesday: 7:00am - 7:00pm {"\n"}Thursday: closed {"\n"}Friday:
            7:00am - 7:00pm {"\n"}Saturday: 7:00am - 7:00pm {"\n"}Sunday: 7:00am
            - 7:00pm
          </Text>
        </View>
        <RowSeparator />
        <View style={styles.phoneNumberView}>
          <Text style={styles.headerText}>Phone</Text>
          <Text style={styles.bodyText}>(816)-739-1403</Text>
        </View>
        <RowSeparator />
        <View style={styles.addressView}>
          <Text style={styles.headerText}>Address</Text>
          <Text style={styles.bodyText}>
            914 S Wabash St, Kirksville MO, 63501
          </Text>
        </View>
        <RowSeparator />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Restaurant;
