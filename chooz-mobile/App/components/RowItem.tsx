import React, { useEffect, useState } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { pullLogoImage } from "../util/RestaurantApi";

import colors from "../constants/colors";

const styles = StyleSheet.create({
  row: {
    paddingLeft: 7,
    paddingRight: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 5,
    backgroundColor: "white",
    fontSize: Platform.OS === "ios" ? 17 : 14,
    fontWeight: "bold",
  },
  description: {
    marginTop: 3,
    marginBottom: 5,
    backgroundColor: "white",
    fontSize: Platform.OS === "ios" ? 15 : 12,
    color: "grey",
  },
  separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: Platform.OS === "ios" ? 20 : 0,
  },
  leftImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  rowContainer: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    height: 75,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  menuItem: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    height: 75,
  },
  loadingLogo: {
    backgroundColor: "lightgrey",
  },
});

export const RestaurantListItem = ({
  title,
  description,
  restaurantID,
  onPress,
}: {
  title: string;
  description?: string;
  restaurantID: string;
  onPress: any;
}) => {
  const [logoURL, setLogoURL] = useState("");

  useEffect(() => {
    pullLogoImage(restaurantID)
      .then((url) => {
        if (url) {
          setLogoURL(url);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowContainer}>
        {logoURL ? (
          <Image style={styles.leftImage} source={{ uri: logoURL }} />
        ) : (
          <Image
            style={styles.leftImage}
            source={require("../assets/images/brand/logo_lightGrey.png")}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
        <Entypo name="chevron-right" />
      </View>
    </TouchableOpacity>
  );
};

export const MenuItem = ({
  title,
  description,
  price,
  onPress,
}: {
  title: string;
  description?: string;
  price: Number;
  onPress: any;
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description ? (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          ) : null}
        </View>
        <Text>{`$${price.toFixed(2)}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const RowSeparator = () => <View style={styles.separator} />;
