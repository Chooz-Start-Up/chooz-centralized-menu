import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import * as Linking from "expo-linking";
import dynamicLinks, { firebase } from "@react-native-firebase/dynamic-links";

import MenuScreen from "../screens/MenuScreen";
import ItemScreen from "../screens/ItemScreen";
import TestScreen from "../screens/Test";
import RestaurantScreen from "../screens/RestaurantScreen";
import RestaurantListScreen from "../screens/RestaurantListScreen";
import TestPushDataScreen from "../screens/TestPushDataScreen";
import { Restaurant } from "../util/Restaurant";
import { Menu } from "../util/Menu";
import { Item } from "../util/Item";
import { navigationRef, navigate } from "../config/rootNavigation";
import colors from "../constants/colors";
import { Entypo } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

export type RestaurantStackParamList = {
  RestaurantListScreen: undefined;
  SearchScreen: undefined;
  RestaurantScreen: {
    restaurantID: string;
  };
  MenuScreen: {
    restaurantName: string;
    menus: Menu[];
  };
  ItemScreen: {
    item: Item;
  };
  Test: undefined;
  TestPushDataScreen: undefined;
};

const RestaurantStack = createStackNavigator<RestaurantStackParamList>();
const RestaurantStackScreen = () => {
  return (
    <RestaurantStack.Navigator initialRouteName="RestaurantListScreen">
      <RestaurantStack.Screen
        name="RestaurantListScreen"
        component={RestaurantListScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Image
              style={{ width: 200, height: 70 }}
              source={require("../assets/images/brand/chooz_red.png")}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            color: "black",
            fontWeight: "bold",
          },
          headerShown: true,
          headerTintColor: "#d11d27",
          headerTitleAlign: "center",
          headerRight: () => (
            <Entypo
              onPress={() => navigation.navigate("SearchScreen")}
              style={{ color: colors.secondaryRed, fontSize: 25 }}
              name="magnifying-glass"
            />
          ),
          headerRightContainerStyle: {
            backgroundColor: "white",
            alignItems: "center",
          },
        })}
      />
      <RestaurantStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <RestaurantStack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{
          title: "",
          headerTitleStyle: { color: "black" },
          headerShown: true,
          headerTransparent: true,
          presentation: "card",
          headerLeftLabelVisible: false,
          headerTintColor: colors.secondaryRed,
        }}
      />
      <RestaurantStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          title: "Restaurant Name",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          presentation: "card",
          headerLeftLabelVisible: false,
          headerTitleStyle: {
            color: "black",
            fontWeight: "bold",
            fontSize: Platform.OS === "ios" ? 20 : 20,
          },
          headerTintColor: colors.secondaryRed,
        }}
      />
      <RestaurantStack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{
          title: "",
          headerShown: true,
          headerLeftLabelVisible: false,
          presentation: "modal",
          headerTintColor: "#d11d27",
        }}
      />
      <RestaurantStack.Screen
        name="Test"
        component={TestScreen}
        options={{
          title: "",
          headerShown: true,
          presentation: "modal",
        }}
      />
      <RestaurantStack.Screen
        name="TestPushDataScreen"
        component={TestPushDataScreen}
      />
    </RestaurantStack.Navigator>
  );
};

const Navigation = () => {
  // const _handleUrl = (obj: any) => {
  //   let url = obj.url;
  //   dynamicLinks()
  //     .resolveLink(url)
  //     .then((resolvedData) => {
  //       //If the app is passed a dynamic link - (ios)
  //       if (resolvedData) {
  //         let { hostname, path, queryParams } = Linking.parse(resolvedData.url);
  //         let id = queryParams.id;
  //         if (id) {
  //           navigate("RestaurantListScreen");
  //           navigate("RestaurantScreen", { restaurantID: id });
  //         } else {
  //           navigate("RestaurantListScreen");
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       //If app is just passed a deep link - (android)
  //       if (url) {
  //         let { hostname, path, queryParams } = Linking.parse(url);
  //         let id = queryParams.id;
  //         if (id) {
  //           navigate("RestaurantListScreen");
  //           navigate("RestaurantScreen", { restaurantID: id });
  //         } else {
  //           navigate("RestaurantListScreen");
  //         }
  //       }
  //     });
  // };

  // useEffect(() => {
  //   //When app is in Background
  //   Linking.addEventListener("url", _handleUrl);

  //   //When app is closed
  //   Linking.getInitialURL().then((url) => {
  //     dynamicLinks()
  //       .resolveLink(url)
  //       .then((resolvedData) => {
  //         if (resolvedData) {
  //           console.log("Before");
  //           let { hostname, path, queryParams } = Linking.parse(
  //             resolvedData.url
  //           );
  //           let id = queryParams.id;
  //           if (id) {
  //             navigate("RestaurantScreen", { restaurantID: id });
  //           } else {
  //             navigate("RestaurantListScreen");
  //           }
  //         }
  //       });
  //   });
  // }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <RestaurantStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
