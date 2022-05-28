import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

import MenuScreen from "../screens/Menu";
import ItemScreen from "../screens/Item";

/*
DEVELOPER NOTE 05/27:
Eventually, MenuScreen and ItemScreen will 
accept Menu and Item Objects as their parameters.
Menu and Item will deal with the optional fields.
*/
export type MenuStackParamList = {
  MenuScreen: undefined;
  ItemScreen: {
    itemName: String;
    price?: Number;
    description?: String;
    ingredients?: String;
  };
};

const MenuStack = createStackNavigator<MenuStackParamList>();
const MenuStackScreen = () => {
  return (
    <MenuStack.Navigator>
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
