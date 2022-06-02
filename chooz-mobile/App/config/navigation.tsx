import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { Platform } from "react-native";
import { ref, onValue } from "firebase/database";

import MenuScreen from "../screens/Menu";
import ItemScreen from "../screens/Item";
import TestScreen from "../screens/Test";
import RestaurantScreen from "../screens/Restaurant";
import RestaurantListScreen from "../screens/RestaurantList";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../constants/colors";
import { db } from "../data/database";
import { Restaurant } from "../util/Restaurant";

const reference = ref(db, "restaurantList/");

/*
DEVELOPER NOTE 05/27:
Eventually, MenuScreen and ItemScreen will 
accept Menu and Item Objects as their parameters.
Menu and Item will deal with the optional fields.
*/

export type RestaurantStackParamList = {
  RestaurantListScreen: {
    restaurantList: Restaurant[];
  };
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
  TestScreen: undefined;
};

const RestaurantStack = createStackNavigator<RestaurantStackParamList>();
const RestaurantStackScreen = () => {
  let restaurantList: Restaurant[] = [];
  onValue(reference, (snapshot) => {
    const raw_data = snapshot.val();
    const data = JSON.stringify(raw_data);
    // console.log("Data as string: ");
    // console.log(data);

    const ref = JSON.parse(data);

    let keys = Object.keys(ref);
    keys.forEach(function (key: any) {
      restaurantList.push(ref[key]);
    });
    //console.log("Within Navigation: " + restaurantList);
  });
  return (
    <RestaurantStack.Navigator initialRouteName="TestScreen">
      <RestaurantStack.Screen
        name="RestaurantListScreen"
        component={RestaurantListScreen}
        initialParams={{ restaurantList }}
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
        name="TestScreen"
        component={TestScreen}
        options={{
          title: "",
          headerShown: true,
          presentation: "modal",
        }}
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
