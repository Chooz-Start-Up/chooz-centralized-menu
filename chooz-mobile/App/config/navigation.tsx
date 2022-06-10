import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { Platform } from "react-native";
import { ref, onValue } from "firebase/database";

import MenuScreen from "../screens/MenuScreen";
import ItemScreen from "../screens/ItemScreen";
import TestScreen from "../screens/Test";
import RestaurantScreen from "../screens/RestaurantScreen";
import RestaurantListScreen from "../screens/RestaurantListScreen";
import TestPushDataScreen from "../screens/TestPushDataScreen";

import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../constants/colors";
import { db } from "../data/database";
import { IRestaurant, Restaurant } from "../util/Restaurant";
import { Menu } from "../util/Menu";
import { Item } from "../util/Item";

const reference = ref(db, "restaurantList/");

/*
DEVELOPER NOTE 05/27:
Eventually, MenuScreen and ItemScreen will 
accept Menu and Item Objects as their parameters.
Menu and Item will deal with the optional fields.
*/

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
  return (
    //RestaurantListScreen
    //TestPushDataScreen
    <RestaurantStack.Navigator initialRouteName="RestaurantListScreen">
      <RestaurantStack.Screen
        name="RestaurantListScreen"
        component={RestaurantListScreen}
        options={{
          title: "Chooz",
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("Search not yet implemented.")}
              style={{ paddingHorizontal: 15 }}
            >
              <Entypo name="magnifying-glass" size={30} color={colors.blue} />
            </TouchableOpacity>
          ),
        }}
      />
      <RestaurantStack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{
          title: "Restaurant Name",
          headerShown: true,
          presentation: "card",
          headerLeftLabelVisible: false,
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
  return (
    <NavigationContainer>
      <RestaurantStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
