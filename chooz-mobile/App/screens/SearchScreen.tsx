import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  RefreshControl,
  StatusBar,
  View,
} from "react-native";
import "firebase/firestore";
import "firebase/firestore";
import { getDatabase, ref, get, child } from "firebase/database";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchBar } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { RestaurantStackParamList } from "../config/navigation";
import colors from "../constants/colors";
import { RestaurantListItem } from "../components/RowItem";
import { getStorage } from "firebase/storage";
import { app } from "../data/database";
import { Restaurant } from "../util/Restaurant";

const dbRef = ref(getDatabase());
const storage = getStorage(app);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  listSection: {},
});

const SearchScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();
  const [search, setSearch] = useState("");
  //NOTE 7/7/22: Master Restaurant List will just be Local
  const [masterRestaurantList, setMasterRestaurantList] = useState<any>([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState<any>([]);

  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterRestaurantList.filter(function (item: any) {
        const itemData = item.restaurantName
          ? item.restaurantName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredRestaurantList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredRestaurantList(masterRestaurantList);
      setSearch(text);
    }
  };

  useEffect(() => {
    get(child(dbRef, "restaurantList")).then((snapshot) => {
      let objList: Restaurant[] = [];
      if (snapshot.exists()) {
        snapshot.forEach(function (item) {
          let itemVal = item.val();
          objList.push(
            new Restaurant(
              item.key!,
              itemVal.restaurantName,
              itemVal.description,
              itemVal.isPublished
            )
          );
        });
        setFilteredRestaurantList(objList);
        setMasterRestaurantList(objList);
      }
    });
  }, []);

  return (
    <>
      {Platform.OS === "ios" ? (
        <>
          <SafeAreaView style={{ backgroundColor: "white" }} />
          <SearchBar
            autoFocus={true}
            platform="ios"
            round
            containerStyle={{ height: 50 }}
            inputContainerStyle={{ height: 30 }}
            placeholder="Restaurant"
            //@ts-ignore
            onChangeText={(text: string) => searchFilterFunction(text)}
            showCancel={true}
            onClear={() => searchFilterFunction("")}
            cancelButtonTitle="Cancel"
            cancelButtonProps={{
              buttonTextStyle: {
                color: colors.secondaryRed,
              },
            }}
            onCancel={navigation.pop}
            value={search}
          />
        </>
      ) : (
        <>
          <SearchBar
            autoFocus={true}
            platform="android"
            placeholder="Type Here..."
            //@ts-ignore
            onChangeText={(text: string) => searchFilterFunction(text)}
            onClear={() => searchFilterFunction("")}
            onCancel={navigation.pop}
            value={search}
          />
        </>
      )}
      <ScrollView style={styles.scrollView} keyboardDismissMode="on-drag">
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        {filteredRestaurantList?.map((restaurant) => {
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
    </>
  );
};

export default SearchScreen;
