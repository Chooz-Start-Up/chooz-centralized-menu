import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { ScrollView } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { RestaurantStackParamList } from "../config/navigation";
import { RowSeparator } from "../components/RowItem";
import { IRestaurant, Restaurant } from "../util/Restaurant";
import { child, get, ref } from "firebase/database";
import { db } from "../data/database";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<
  RestaurantStackParamList,
  "RestaurantListScreen"
>;

const screen = Dimensions.get("window");
const dbRef = ref(db);

const styles = StyleSheet.create({
  scrollView: {
    height: screen.height,
    backgroundColor: "white",
  },
  listSection: {},
});

const RestauarantList: React.FC<Props> = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();

  const [restaurantList, setRestaurantList] = useState<Array<IRestaurant>>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("USE EFFECT");
    get(child(dbRef, "restaurantList"))
      .then((snapshot) => {
        let objList: Restaurant[] = [];
        if (snapshot.exists()) {
          snapshot.forEach(function (item) {
            let itemVal = item.val();
            objList.push(
              new Restaurant(
                itemVal.id,
                itemVal.restaurantName,
                itemVal.description
              )
            );
          });

          setRestaurantList(objList);
          setLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 50 }}>LOADING</Text>
        </View>
      )}
      {!isLoading && (
        <ScrollView style={styles.scrollView}>
          <List.Section style={styles.listSection}>
            {restaurantList?.map(({ id, restaurantName, description }) => {
              return (
                <>
                  <List.Item
                    key={id}
                    title={restaurantName}
                    description={description}
                    left={(props: any) => <List.Icon {...props} icon="book" />}
                    right={(props: any) => <List.Icon {...props} icon="" />}
                    onPress={() =>
                      navigation.navigate("RestaurantScreen", {
                        restaurantName: "Restaurant Name",
                      })
                    }
                  />
                  <RowSeparator key={10} />
                </>
              );
            })}
          </List.Section>
        </ScrollView>
      )}
    </>
  );
};

{
  /* <List.Item
  title={"Restaurant"}
  description={"This is a test description"}
  left={(props: any) => <List.Icon {...props} icon="book" />}
  right={(props: any) => <List.Icon {...props} icon="" />}
  onPress={() =>
    navigation.navigate("RestaurantScreen", {
      restaurantName: "Restaurant Name",
    })
  }
/> */
}
export default RestauarantList;
