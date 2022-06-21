import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import * as Linking from "expo-linking";
import dynamicLinks from "@react-native-firebase/dynamic-links";

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
import { transparent } from "react-native-paper/lib/typescript/styles/colors";

export type RestaurantStackParamList = {
  RestaurantListScreen: undefined;
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
        options={{
          title: "chooz",
          headerShown: true,
          headerTintColor: colors.darkRed,
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => alert("Search not yet implemented.")}
          //     style={{ paddingHorizontal: 15 }}
          //   >
          //     <Entypo name="magnifying-glass" size={30} color={colors.blue} />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <RestaurantStack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{
          title: "Restaurant Name",
          headerTitleStyle: { color: "black" },
          headerShown: true,
          headerTransparent: true,
          presentation: "card",
          headerLeftLabelVisible: false,
          //headerTintColor: colors.darkRed,
        }}
      />
      <RestaurantStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          title: "Restaurant Name",
          gestureEnabled: true,
          gestureDirection: Platform.OS === "ios" ? "horizontal" : "vertical",
          presentation: "card",
          headerLeftLabelVisible: false,
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
  const _handleUrl = (obj: any) => {
    let url = obj.url;
    let data = Linking.parse(url);
    let id = data.queryParams.id;
    navigate("RestaurantListScreen");
    navigate("RestaurantScreen", { restaurantID: id });
  };

  //CREATE TEST
  // console.log(
  //   "URL:   " +
  //     createURL("/--/RestaurantScreen", {
  //       queryParams: { id: "-N4oB-DoClsQsVBGAOVl" },
  //     })
  // );
  useEffect(() => {
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          console.log("Before");
          let urlData = Linking.parse(url);
          let id = urlData.queryParams.id;
          if (id) {
            navigate("RestaurantScreen", { restaurantID: id });
          } else {
            navigate("RestaurantListScreen");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    Linking.addEventListener("url", _handleUrl);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <RestaurantStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
