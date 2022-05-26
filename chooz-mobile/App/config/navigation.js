import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

import Menu from "../screens/Menu";
import Item from "../screens/Item";

import colors from "../constants/colors";

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

const Navigation = () => {
  return (
    <NavigationContainer>
      <ModalStackScreen />
    </NavigationContainer>
  );
};

export default Navigation;
