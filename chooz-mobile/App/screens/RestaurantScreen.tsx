import React, { useEffect, useState } from "react";
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
import { getRestaurantDetails } from "../util/RestaurantApi";

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

const RestaurantScreen: React.FC<Props> = ({ route }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();

  const restaurant = route.params.restaurant;

  useEffect(() => {
    navigation.setOptions({ title: restaurant.restaurantName });
    getRestaurantDetails(restaurant, setLoading);
  }, []);

  return (
    <>
      {!isLoading && (
        <SafeAreaView>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          {isFocused && (
            <Portal>
              <FAB
                style={styles.fab}
                icon="book-open"
                label="Menu"
                onPress={() =>
                  navigation.navigate("MenuScreen", {
                    restaurantName: restaurant.restaurantName,
                    menus: restaurant.menus,
                  })
                }
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
                {restaurant.description}
              </Text>
            </View>
            <RowSeparator />
            <View style={styles.hoursView}>
              <Text style={styles.headerText}>Hours</Text>
              <Text style={styles.bodyText}>{restaurant.hours}</Text>
            </View>
            <RowSeparator />
            <View style={styles.phoneNumberView}>
              <Text style={styles.headerText}>Phone</Text>
              <Text style={styles.bodyText}>{restaurant.phoneNumber}</Text>
            </View>
            <RowSeparator />
            <View style={styles.addressView}>
              <Text style={styles.headerText}>Address</Text>
              <Text style={styles.bodyText}>{restaurant.address}</Text>
            </View>
            <RowSeparator />
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default RestaurantScreen;
