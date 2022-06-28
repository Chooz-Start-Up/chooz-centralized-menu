import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text, StatusBar } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { RestaurantStackParamList } from "../config/navigation";
import {
  RowSeparator,
  RestaurantListItem,
  SectionHeader,
} from "../components/RowItem";
import { Restaurant } from "../util/Restaurant";
import { getRestaurantList } from "../util/RestaurantApi";
import colors from "../constants/colors";
import { List } from "react-native-paper";

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
  const [restaurantList, setRestaurantList] = useState<Array<Restaurant>>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getRestaurantList(setRestaurantList, setLoading);
  }, []);

  return (
    <>
      {isLoading && <View></View>}
      {!isLoading && (
        <ScrollView style={styles.scrollView}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          <SectionHeader title="All Restaurants" />
          {restaurantList?.map((restaurant) => {
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
