import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { RowItem, RowSeparator } from "../components/RowItem";
import colors from "../constants/colors.js";
import { RestaurantStackParamList } from "../config/navigation";
import HorizontalList from "../components/HorizontalList";
import { IMenu, Menu } from "../util/Menu";
import { Item } from "../util/Item";

type Props = NativeStackScreenProps<RestaurantStackParamList, "MenuScreen">;

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    height: screen.height,
  },
});

const MenuScreen: React.FC<Props> = ({ route }: Props) => {
  const menus = route.params.menus;
  const restaurantName = route.params.restaurantName;

  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();

  const [menuIndex, setMenuIndex] = React.useState(0);
  const changeMenuIndex = (menuIndex: number) => {
    setMenuIndex(menuIndex);
  };

  useEffect(() => {
    navigation.setOptions({ title: restaurantName });
    setMenuIndex(menuIndex);
  }, [menuIndex]);

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  let openItem = (screen: keyof RestaurantStackParamList, item: Item) => {
    navigation.navigate(screen, { item });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <HorizontalList menus={menus} changeMenuIndex={changeMenuIndex} />
      <ScrollView style={styles.scrollView}>
        <List.Section>
          {menus[menuIndex]?.categories!.map((category) => {
            return (
              <List.Accordion
                key={category.categoryName + "ACCORDIAN"}
                title={category.categoryName}
                expanded={expanded}
                onPress={handlePress}
              >
                {category.items?.map((item) => {
                  return (
                    <View key={item.itemName + "VIEW"}>
                      <List.Item
                        key={item.itemName + "ITEM"}
                        title={item.itemName}
                        onPress={() => {
                          openItem("ItemScreen", item);
                        }}
                      />
                      <RowSeparator key={item.itemName + "SEPERATOR"} />
                    </View>
                  );
                })}
              </List.Accordion>
            );
          })}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;
