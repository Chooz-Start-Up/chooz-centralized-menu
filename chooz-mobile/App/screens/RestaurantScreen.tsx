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
  Image,
  Linking,
} from "react-native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FAB, Portal } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { RestaurantStackParamList } from "../config/navigation";
import colors from "../constants/colors";
import {
  getRestaurantByKey,
  pullBannerImage,
  pullLogoImage,
} from "../util/RestaurantApi";
import { Restaurant } from "../util/Restaurant";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<
  RestaurantStackParamList,
  "RestaurantScreen"
>;

const screen = Dimensions.get("screen");
const window = Dimensions.get("window");

const styles = StyleSheet.create({
  scrollView: {
    height: screen.height,
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    margin: 5,
    right: 5,
    bottom:
      Platform.OS === "ios" ? screen.height * 0.025 : screen.height * 0.025,
    backgroundColor: colors.secondaryRed,
    color: colors.darkRed,
  },
  banner: {
    flex: 1,
    backgroundColor: colors.offWhite,
    height: (screen.width / 4) * 2.5,
    top: 0,
    left: 0,
  },
  logoView: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 75 / 2,
    width: 75,
    height: 75,
  },
  titleView: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 22 : 20,
  },
  descriptionView: {
    marginHorizontal: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionText: {
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 17 : 14,
  },
  hoursView: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  hoursContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
  },
  dayText: {
    fontSize: Platform.OS === "ios" ? 17 : 14,
    backgroundColor: "white",
  },
  hourText: {
    fontSize: Platform.OS === "ios" ? 17 : 14,
    backgroundColor: "white",
  },
  phoneNumberView: {
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: 10,
  },
  phoneContent: {
    flex: 1,
  },
  phoneButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  phoneIcon: {
    fontSize: 30,
    color: colors.secondaryRed,
  },
  addressView: {
    marginVertical: 10,
    marginLeft: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 17 : 14,
    marginBottom: 5,
    color: colors.secondaryRed,
  },
  bodyText: {
    marginLeft: 20,
    fontSize: Platform.OS === "ios" ? 17 : 14,
  },

  separator: {
    backgroundColor: colors.border,
    height: 1,
    marginHorizontal: Platform.OS === "ios" ? 20 : 0,
  },
  spacer: {
    height: 300,
  },
});

const RestaurantScreen: React.FC<Props> = ({ route }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant>(new Restaurant());
  const [bannerURL, setBannerURL] = useState<string>();
  const [logoURL, setLogoURL] = useState<string>();

  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RestaurantStackParamList>>();
  const restaurantID = route.params.restaurantID;

  useEffect(() => {
    getRestaurantByKey(restaurantID)
      .then((restaurant) => {
        setRestaurant(restaurant);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    pullBannerImage(restaurantID).then((bannerURL) => {
      setBannerURL(bannerURL);
    });

    pullLogoImage(restaurantID).then((logoURL) => {
      setLogoURL(logoURL);
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <SafeAreaView>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          {isFocused ? (
            <Portal>
              <FAB
                style={styles.fab}
                icon="book-open"
                label="Menu"
                onPress={() =>
                  navigation.navigate("MenuScreen", {
                    restaurantName: restaurant.restaurantName,
                    menus: restaurant.menus,
                  })
                }
              />
            </Portal>
          ) : null}
          <ScrollView style={styles.scrollView}>
            {logoURL ? (
              <Image style={styles.banner} source={{ uri: bannerURL }} />
            ) : (
              <View style={styles.banner} />
            )}

            <View style={styles.logoView}>
              {logoURL ? (
                <Image style={styles.logo} source={{ uri: logoURL }} />
              ) : (
                <Image
                  style={styles.logo}
                  source={require("../assets/images/brand/logo_lightGrey.png")}
                />
              )}
            </View>

            <View style={styles.titleView}>
              <Text style={styles.titleText}>{restaurant.restaurantName}</Text>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.descriptionText}>
                {restaurant.description}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.hoursView}>
              <Text style={styles.headerText}>Hours</Text>
              {restaurant.hours.split("\n").map((day, i) => {
                return (
                  <View key={i} style={styles.hoursContainer}>
                    <View style={{ width: 150 }}>
                      <Text style={styles.dayText}>
                        {day.split("\n", 7)[0].split(" ", 1)[0]}:
                      </Text>
                    </View>
                    <Text style={styles.hourText}>
                      {day
                        .split("\n", 7)[0]
                        .substring(
                          day.split("\n", 7)[0].split(" ", 1)[0].length
                        )}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.separator} />

            <View style={styles.phoneNumberView}>
              <View style={styles.phoneContent}>
                <Text style={styles.headerText}>Phone</Text>
                <Text style={styles.bodyText}>{restaurant.phoneNumber}</Text>
              </View>
              <TouchableOpacity
                style={styles.phoneButton}
                onPress={() => {
                  Linking.openURL(`tel:${restaurant.phoneNumber}`);
                }}
              >
                <Entypo name="phone" style={styles.phoneIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.separator} />

            <View style={styles.addressView}>
              <Text style={styles.headerText}>Address</Text>
              <Text style={styles.bodyText}>{restaurant.address}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.spacer}></View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default RestaurantScreen;
