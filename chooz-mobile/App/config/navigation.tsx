import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

import MenuScreen from "../screens/Menu";
import ItemScreen from "../screens/Item";

import colors from "../constants/colors";

/*
const MainStack = createStackNavigator();
const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

const ModalStack = createStackNavigator();
const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false, presentation: "modal" }}
      />
      <MainStack.Screen
        name="Item"
        component={Item}
        options={({ navigation, route }) => ({
          title: route.params && route.params.title,
          headerLeft: null,
          headerRight: () => {
            <TouchableOpacity
              onPress={() => navigation.pop()}
              style={{ paddingHorizontal: 10 }}
            >
              <Entypo name="cross" size={30} color={colors.blue} />
            </TouchableOpacity>;
          },
        })}
      />
    </ModalStack.Navigator>
  );
};
*/

export type RootStackParamList = {
  MenuScreen: undefined; // MUST UPDATE
  ItemScreen: undefined;
};

const MenuStack = createStackNavigator<RootStackParamList>();
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
