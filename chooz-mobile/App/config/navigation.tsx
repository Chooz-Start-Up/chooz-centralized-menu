import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
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
import colors from "../constants/colors";

export type RestaurantStackParamList = {
  RestaurantListScreen: undefined;
  RestaurantScreen: {
    restaurant: Restaurant;
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
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link!.url === "https://choozmenu.com/menu/Test") {
          // ...set initial route as offers screen
        }
      });
  }, []);

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
          title: "",
          headerTitleStyle: { color: "black" },
          headerShown: true,
          presentation: "card",
          headerLeftLabelVisible: false,
          //headerTintColor: colors.darkRed,
        }}
      />
      <RestaurantStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          title: "",
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
  const linking = {
    prefixes: ["https://choozmenu.com/menu"],
    config: {
      screens: {
        RestaurantScreen: "Test",
      },
    },
  };
  return (
    <NavigationContainer linking={linking}>
      <RestaurantStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
