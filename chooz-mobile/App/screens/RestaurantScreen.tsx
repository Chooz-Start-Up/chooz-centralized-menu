import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Text,
  Platform,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FAB, Portal } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { RestaurantStackParamList } from "../config/navigation";
import { RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";
import {
  child,
  equalTo,
  get,
  onValue,
  orderByKey,
  ref,
} from "firebase/database";
import { db } from "../data/database";
import { IRestaurant } from "../util/Restaurant";
import { Menu } from "../util/Menu";
import { Category } from "../util/Category";
import { Item } from "../util/Item";

type Props = NativeStackScreenProps<
  RestaurantStackParamList,
  "RestaurantScreen"
>;

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    height: screen.height,
    //flex: 1,
  },
  portal: {},
  fab: {
    position: "absolute",
    margin: 5,
    right: 0,
    top: Platform.OS === "ios" ? screen.height * 0.1 : screen.height * 0.09,
    //bottom: screen.height - 5,
    //bottom: 0,
  },
  pictureView: {
    backgroundColor: colors.blue,
    height: 175,
  },
  descriptionView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  hoursView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  phoneNumberView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  addressView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 17 : 14,
    marginBottom: 5,
  },
  bodyText: {
    marginLeft: 20,
    fontSize: Platform.OS === "ios" ? 15 : 12,
  },
  descriptionText: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 14,
  },
});

const RestaurantScreen: React.FC<Props> = ({ route }: Props) => {
  const [isLoading, setLoading] = useState(true);

  const dbRef = ref(db);
  const isFocused = useIsFocused();

  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();

  const restaurant = route.params.restaurant;

  useEffect(() => {
    navigation.setOptions({ title: restaurant.restaurantName });
    get(child(dbRef, "restaurants/restaurant" + restaurant.id))
      .then((snapshot) => {
        let menuList: Menu[] = [];
        if (snapshot.exists()) {
          let data = snapshot.val();

          restaurant.setDetails(JSON.stringify(data));

          // //Construct Items
          // let menuKeys = Object.keys(data.menus);
          // menuKeys.forEach(function (menuKey: any) {
          //   let menu = data.menus[menuKey];
          //   let title = menu.title;

          //   //SET CATEGORIES
          //   let categories: Category[] = [];
          //   let categoryKeys = Object.keys(menu.categories);
          //   categoryKeys.forEach(function (categoryKey: any) {
          //     let category = menu.categories[categoryKey];
          //     let categoryName = category.title;

          //     //SET ITEMS
          //     let items: Item[] = [];
          //     if (category.Items !== undefined) {
          //       let itemKeys = Object.keys(category.Items);
          //       itemKeys.forEach(function (itemKey: any) {
          //         let item = category.Items[itemKey];
          //         let itemName = item.title;
          //         let price = item.price;
          //         let description = item.description;
          //         let ingredients = item.ingredients;

          //         items.push(
          //           new Item(itemName, price, description, ingredients)
          //         );
          //       });
          //     }

          //     categories.push(new Category(categoryName, items));
          //   });

          //   menuList.push(new Menu(title, categories));
          // });

          // restaurant.menus = menuList;

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
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      {isFocused && (
        <Portal>
          <FAB
            style={styles.fab}
            icon="book-open"
            label="Menu"
            onPress={() =>
              navigation.navigate("MenuScreen", { menus: restaurant.menus })
            }
          />
        </Portal>
      )}
      <ScrollView
        style={styles.scrollView}
        //contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.pictureView}></View>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>{restaurant.description}</Text>
        </View>
        <RowSeparator />
        <View style={styles.hoursView}>
          <Text style={styles.headerText}>Hours</Text>
          <Text style={styles.bodyText}>{restaurant.hours}</Text>
        </View>
        <RowSeparator />
        <View style={styles.phoneNumberView}>
          <Text style={styles.headerText}>Phone</Text>
          <Text style={styles.bodyText}>{restaurant.phoneNumber}</Text>
        </View>
        <RowSeparator />
        <View style={styles.addressView}>
          <Text style={styles.headerText}>Address</Text>
          <Text style={styles.bodyText}>{restaurant.address}</Text>
        </View>
        <RowSeparator />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestaurantScreen;
