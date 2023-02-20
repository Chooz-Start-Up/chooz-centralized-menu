import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  StatusBar,
  RefreshControl,
  Alert,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import { RestaurantStackParamList } from "../config/navigation";
import {
  RowSeparator,
  RestaurantListItem,
  SectionHeader,
} from "../components/RowItem";
import { Restaurant } from "../util/Restaurant";
import {
  getRestaurantList,
  getRestaurantListByUserLocation,
} from "../util/RestaurantApi";
import colors from "../constants/colors";
import { LocationAccuracy } from "expo-location";

type Props = NativeStackScreenProps<
  RestaurantStackParamList,
  "RestaurantListScreen"
>;

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    height: screen.height,
    backgroundColor: "white",
  },
  listSection: {},
});

const RestaurantListScreen: React.FC<Props> = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>();

  const [restaurantList, setRestaurantList] = useState<Array<Restaurant>>();
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getRestaurantListByUserLocation(
      setRestaurantList,
      currentLocation,
      setLoading
    );
    setRefreshing(false);
  };
  const requestLocationPermission = async () => {
    console.log("IN LOCATION PERMISSION");
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      console.log("rejected");
    } else {
      setLocationPermissionGranted(true);
      console.log("Permission Granted");
    }
  };

  const getCurrentLocation = async () => {
    await requestLocationPermission();
    console.log("GETTING CURRENT LOCATION");
    let currentLocation;
    await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.Lowest,
      distanceInterval: 152.4,
    })
      .then((location) => {
        currentLocation = location;
      })
      .catch(() => {
        console.log("LOCATION NOT AVAILABLE");
        currentLocation = null;
      });

    setCurrentLocation(currentLocation);
    console.log("Current Location Set " + JSON.stringify(currentLocation));
  };

  useEffect(() => {
    console.log("IN USE EFFECT");
    getCurrentLocation();
    if (locationPermissionGranted) {
      console.log("IN IF");
      getRestaurantListByUserLocation(
        setRestaurantList,
        currentLocation,
        setLoading
      );
    }
  }, []);

  return (
    <>
      {isLoading && (
        <View>
          <Text>LOADING</Text>
        </View>
      )}
      {!isLoading && (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          {console.log("LIST: " + JSON.stringify(restaurantList) + "\n")}
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          <SectionHeader title="All Restaurants" />
          {restaurantList.map((restaurant) => {
            return (
              <View key={restaurant.id + "ViewKey"}>
                {restaurant.isPublished && (
                  <RestaurantListItem
                    title={restaurant.restaurantName}
                    restaurantID={restaurant.id}
                    description={restaurant.description}
                    onPress={() =>
                      navigation.navigate("RestaurantScreen", {
                        restaurantID: restaurant.id,
                      })
                    }
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default RestaurantListScreen;
