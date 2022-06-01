import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

import MenuScreen from "../screens/Menu";
import ItemScreen from "../screens/Item";
import TestScreen from "../screens/Test";
import RestaurantScreen from "../screens/Restaurant";
import RestaurantListScreen from "../screens/RestaurantList";

/*
DEVELOPER NOTE 05/27:
Eventually, MenuScreen and ItemScreen will 
accept Menu and Item Objects as their parameters.
Menu and Item will deal with the optional fields.
*/
export type RestaurantStackParamList = {
  RestaurantListScreen: undefined;
  RestaurantScreen: {
    restaurantName: String;
    description?: String;
    hours?: String;
    phone?: String;
    address?: String;
  };
  MenuScreen: undefined;
  ItemScreen: {
    itemName: String;
    price?: Number;
    description?: String;
    ingredients?: String;
  };
  Test: undefined;
};

const MenuStack = createStackNavigator<RestaurantStackParamList>();
const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator initialRouteName="RestaurantListScreen">
      <MenuStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{ title: "Restaurant Name" }}
      />
      <MenuStack.Screen
        name="ItemScreen"
        component={ItemScreen}
        options={{
          title: "",
          headerShown: true,
          presentation: "modal",
        }}
      />
      <MenuStack.Screen
        name="Test"
        component={TestScreen}
        options={{
          title: "",
          headerShown: true,
          presentation: "modal",
        }}
      />
      <MenuStack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{
          title: "Restaurant Name",
          headerShown: true,
        }}
      />
      <MenuStack.Screen
        name="RestaurantListScreen"
        component={RestaurantListScreen}
        options={{
          title: "Chooz",
          headerShown: true,
        }}
      />
    </MenuStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <MenuStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
