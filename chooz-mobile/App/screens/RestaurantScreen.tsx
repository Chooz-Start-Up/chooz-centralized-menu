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
import { useHeaderHeight } from "@react-navigation/elements";

import { RestaurantStackParamList } from "../config/navigation";
import { RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";
import {
  getRestaurantByKey,
  getRestaurantMenu,
  pullRestaurantByUser,
} from "../util/RestaurantApi";
import { Restaurant } from "../util/Restaurant";
import { navigate } from "../config/rootNavigation";

type Props = NativeStackScreenProps<
  RestaurantStackParamList,
  "RestaurantScreen"
>;

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");
const navbarHeight = screen.height - window.height;

const styles = StyleSheet.create({
  scrollView: {
    height: screen.height,
    backgroundColor: colors.white,
    //flex: 1,
  },
  portal: {},
  fab: {
    position: "absolute",
    margin: 5,
    right: 0,
    top: Platform.OS === "ios" ? screen.height * 0.1 : screen.height * 0.09,
    backgroundColor: colors.lightRed,
    color: colors.darkRed,
  },
  pictureView: {
    backgroundColor: "lightgrey",
    height: (screen.width / 4) * 3,
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
    color: colors.darkRed,
  },
  bodyText: {
    marginLeft: 20,
    fontSize: Platform.OS === "ios" ? 17 : 14,
  },
  descriptionText: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 14,
    fontWeight: "bold",
  },
});

const RestaurantScreen: React.FC<Props> = ({ route }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant>(new Restaurant());
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();

  const restaurantID = route.params.restaurantID;

  useEffect(() => {
    getRestaurantByKey(restaurantID)
      .then((restaurant) => {
        setRestaurant(restaurant);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {!isLoading && (
        <SafeAreaView>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          {isFocused ? (
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
          ) : null}
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
