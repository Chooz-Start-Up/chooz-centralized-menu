import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { RestaurantStackParamList } from "../config/navigation";
import { RowSeparator } from "../components/RowItem";

type Props = NativeStackScreenProps<
  RestaurantStackParamList,
  "RestaurantListScreen"
>;

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    height: screen.height,
  },
});

const RestauarantList: React.FC<Props> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();

  return (
    <ScrollView style={styles.scrollView}>
      <List.Section>
        <List.Item
          title={"Restaurant"}
          description={"This is a test description"}
          left={(props) => <List.Icon {...props} icon="book" />}
          right={(props) => <List.Icon {...props} icon="" />}
          onPress={() =>
            navigation.navigate("RestaurantScreen", {
              restaurantName: "Restaurant Name",
            })
          }
        />
        <RowSeparator />
        <List.Item
          title={"Restaurant"}
          description={"This is a test description"}
          left={(props) => <List.Icon {...props} icon="folder" />}
          onPress={() =>
            navigation.navigate("RestaurantScreen", {
              restaurantName: "Restaurant Name",
            })
          }
        />
      </List.Section>
      <RowSeparator />
    </ScrollView>
  );
};

export default RestauarantList;
