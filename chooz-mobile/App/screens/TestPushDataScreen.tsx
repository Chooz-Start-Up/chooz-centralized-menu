import { child, push, ref, set, update } from "firebase/database";
import React, { Component, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardSpacer } from "../components/keyboardSpacer";
import { db } from "../data/database";
import { Menu } from "../util/Menu";
import { Restaurant } from "../util/Restaurant";
import { pullRestaurantByUser, pushRestaurant } from "../util/RestaurantApi";

interface IProps {}

interface IState {
  rendered: boolean;
  restaurantName: string;
  description: string;
  address: string;
  phoneNumber: string;
  menuName: string;
  categoryName: string;
  text1: string;
  text2: string;
  text3: string;
  scrollEnabled: boolean;
}

class TestPushDataScreen extends Component<IProps, IState> {
  scrollEnabled: boolean = false;

  constructor(props: IProps) {
    super(props);
    this.state = {
      rendered: false,
      restaurantName: "",
      description: "",
      address: "",
      phoneNumber: "",
      menuName: "",
      categoryName: "",
      text1: "",
      text2: "",
      text3: "",
      scrollEnabled: false,
    };
  }

  public setScrollEnabled(flag: boolean) {
    this.scrollEnabled = flag;
  }

  onChangeText(text: string, field: string) {
    if (field === "restaurantName") {
      this.setState({ restaurantName: text });
    } else if (field === "description") {
      this.setState({ description: text });
    } else if (field === "address") {
      this.setState({ address: text });
    } else if (field === "phoneNumber") {
      this.setState({ phoneNumber: text });
    } else if (field === "menuName") {
      this.setState({ menuName: text });
    } else if (field === "categoryName") {
      this.setState({ categoryName: text });
    } else if (field === "text1") {
      this.setState({ text1: text });
    } else if (field === "text2") {
      this.setState({ text2: text });
    } else if (field === "text3") {
      this.setState({ text3: text });
    }
  }

  submitData() {
    let restaurantName = this.state.restaurantName;
    let description = this.state.description;
    let address = this.state.address;
    let phoneNumber = this.state.phoneNumber;
    let uid = "Test";

    const items = {
      item1: {
        itemName: this.state.text1,
      },
      item2: {
        itemName: this.state.text2,
      },
      item3: {
        itemName: this.state.text3,
      },
    };

    const category = {
      categoryName: this.state.categoryName,
      items: items,
    };

    const categories = {
      categoryA: category,
    };

    const menu = {
      menuName: this.state.menuName,
      categories: categories,
    };

    const menus = {
      menu: menu,
    };

    const restaurantListData = {
      restaurantName: restaurantName,
      description: description,
    };

    const restaurantDetailData = {
      id: "",
      restaurantName: restaurantName,
      description: description,
      phoneNumber: phoneNumber,
      address: address,
      menus: menus,
    };

    let restaurant = Restaurant.parseRestaurant(
      JSON.stringify(restaurantDetailData)
    );

    // console.log(restaurant.restaurantName);
    // updateRestaurant("-N49eD0SueXyGmf7XcGl", restaurant).catch((error) => {
    //   console.log(error);
    // });

    // getRestaurantByUser("testID").then((restaurant) => {
    //   console.log(restaurant);
    // });

    // console.log("ID: " + restaurant.id);
    // pushRestaurant("JACOB CHOI", restaurant).catch((error) => {
    //   console.log(error);
    // });

    pullRestaurantByUser("JACOB CHOI").then((restaurant) => {
      console.log(restaurant);
    });

    console.log("AFTER");
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text>Restaurant Info:</Text>
        </View>

        <View>
          <View>
            <TextInput
              placeholder="Restaurant Name"
              onChangeText={(text) => this.onChangeText(text, "restaurantName")}
            />
          </View>
          <View>
            <TextInput
              placeholder="Description"
              onChangeText={(text) => this.onChangeText(text, "description")}
            />
            <TextInput
              placeholder="Address"
              onChangeText={(text) => this.onChangeText(text, "address")}
            />
            <TextInput
              placeholder="Phone Number"
              onChangeText={(text) => this.onChangeText(text, "phoneNumber")}
            />
          </View>
        </View>

        <View>
          <Text>Generate Menu:</Text>
          <View>
            <TextInput
              placeholder="Menu Name"
              onChangeText={(text) => this.onChangeText(text, "menuName")}
            />
            <TextInput
              placeholder="Category Name"
              onChangeText={(text) => this.onChangeText(text, "categoryName")}
            />
            <TextInput
              placeholder="Item 1 Title"
              onChangeText={(text) => this.onChangeText(text, "text1")}
            />
            <TextInput
              placeholder="Item 2 Title"
              onChangeText={(text) => this.onChangeText(text, "text2")}
            />
            <TextInput
              placeholder="Item 3 Title"
              onChangeText={(text) => this.onChangeText(text, "text3")}
            />
          </View>
        </View>

        <KeyboardSpacer
          style={undefined}
          onToggle={(visible: boolean) => this.setScrollEnabled(visible)}
        />
        <Button title="Submit" onPress={this.submitData.bind(this)} />
      </ScrollView>
    );
  }
}

export default TestPushDataScreen;
