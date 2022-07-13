import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import colors from "../constants/colors.js";
import { RestaurantStackParamList } from "../config/navigation";
import HorizontalList from "../components/HorizontalList";
import { Item } from "../util/Item";
import CustomAccordion from "../components/CustomAccordion";

type Props = NativeStackScreenProps<RestaurantStackParamList, "MenuScreen">;

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    height: screen.height * 0.855,
    // flex: 2,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
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

  let openItem = (screen: keyof RestaurantStackParamList, item: Item) => {
    if (item.description || item.ingredients) {
      navigation.navigate(screen, { item });
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <HorizontalList
        menus={menus}
        currentMenuIndex={menuIndex}
        changeMenuIndex={changeMenuIndex}
      />
      <ScrollView style={styles.scrollView}>
        {menus[menuIndex].categories.map((category, i) => {
          return (
            <CustomAccordion
              key={category.categoryName + i}
              category={category}
              navigate={openItem}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;
