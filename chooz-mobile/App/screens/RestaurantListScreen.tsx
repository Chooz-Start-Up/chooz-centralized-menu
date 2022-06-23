import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, View, Text, StatusBar } from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "react-native-elements";

import { RestaurantStackParamList } from "../config/navigation";
import { RowSeparator, RowItem } from "../components/RowItem";
import { Restaurant } from "../util/Restaurant";
import { getRestaurantList } from "../util/RestaurantApi";
import colors from "../constants/colors";

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
      {isLoading && (
        <View style={{ justifyContent: "center", backgroundColor: "#A90011" }}>
          <Text style={{ fontSize: 50 }}>LOADING</Text>
        </View>
      )}
      {!isLoading && (
        <ScrollView style={styles.scrollView}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

          {restaurantList?.map((restaurant) => {
            return (
              <View key={restaurant.id + "ViewKey"}>
                {restaurant.isPublished && (
                  <RowItem
                    title={restaurant.restaurantName}
                    description={restaurant.description}
                    onPress={() =>
                      navigation.navigate("RestaurantScreen", {
                        restaurantID: restaurant.id,
                      })
                    }
                  />
                )}
                <RowSeparator />
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

//           <List.Section style={styles.listSection}>
//             {restaurantList?.map((restaurant) => {
//               return (
//                 <View key={restaurant.id + "ViewKey"}>
//                   {restaurant.isPublished && (
//                     <>
//                       <ListItem
//                         key={restaurant.id}
//                         title={restaurant.restaurantName}
//                         description={restaurant.description}
//                         left={}
//                         right={(props: any) => <List.Icon {...props} icon="" />}
//                         onPress={() =>
//                           navigation.navigate("RestaurantScreen", {
//                             restaurantID: restaurant.id,
//                           })
//                         }
//                       />
//                       <RowSeparator key={restaurant.id + "key"} />
//                     </>
//                   )}
//                 </View>
//               );
//             })}
//           </List.Section>
//         </ScrollView>
//       )}
//     </>
//   );
// };

export default RestaurantListScreen;
