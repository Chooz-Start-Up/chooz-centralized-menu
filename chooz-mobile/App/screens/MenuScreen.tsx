import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  StyleSheet,
  Dimensions,
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

  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();

  const [menu, setMenu] = React.useState<Menu>();
  const changeMenu = ({ menu }: { menu: Menu }) => {
    setMenu(menu);
  };

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  /*
  DEVELOPER NOTE 05/27:
  openItem() will accept an Item object
  */
  let openItem = (screen: keyof RestaurantStackParamList, item: Item) => {
    navigation.navigate(screen, { item });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <HorizontalList menus={menus} setMenu={changeMenu} />
      <ScrollView style={styles.scrollView}>
        <List.Section>
          {menu?.categories!.map((category) => {
            console.log(menu?.categories);
            //Probably will have category error
            return (
              <List.Accordion
                title={category.categoryName}
                expanded={expanded}
                onPress={handlePress}
              >
                {category.items!.map((item) => {
                  return (
                    <List.Item
                      title={item.itemName}
                      onPress={() => {
                        openItem("ItemScreen", item);
                      }}
                    />
                  );
                })}
              </List.Accordion>
            );
          })}

          {/* <List.Accordion
            title="Appetizers"
            expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Item 1"
              onPress={() => {
                openItem(
                  "ItemScreen",
                  "Item 1",
                  14.99,
                  "Item One is a lovely sorbet made from the tears of sad small children",
                  "Honey, Vanilla, Tears"
                );
              }}
              right={() => <Text>$0.00</Text>}
              description={"this is a test description."}
            />
            <RowSeparator />
            <List.Item
              title="Item 2"
              onPress={() => {
                openItem("ItemScreen", "Item 2");
                console.log("Themes Pushed");
              }}
              right={() => <Text>$0.00</Text>}
              description={"this is a test description."}
            />
          </List.Accordion>
          <List.Accordion
            title="Entrees"
            expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Item 3"
              onPress={() => {
                openItem("ItemScreen", "Item 3");
                console.log("Themes Pushed");
              }}
              right={() => <Text>$0.00</Text>}
              description={"this is a test description."}
            />
            <RowSeparator />
            <List.Item
              title="Item 4"
              onPress={() => {
                openItem("ItemScreen", "Item 4", undefined, "Test Description");
                console.log("Themes Pushed");
              }}
              right={() => <Text>$0.00</Text>}
              description={"this is a test description."}
            />
            <RowSeparator />
          </List.Accordion> */}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;
