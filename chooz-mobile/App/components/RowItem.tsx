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
import { Item } from "../util/Item";

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
  itemRowContainer: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  itemTextTitle: {
    marginTop: 5,
    backgroundColor: "white",
    fontSize: Platform.OS === "ios" ? 15 : 14,
    fontWeight: "bold",
  },
  sectionHeader: {
    backgroundColor: "white",
    height: 50,
    justifyContent: "center",
  },
  sectionTitleText: {
    marginLeft: 10,
    fontSize: 15,
    color: "grey",
  },
  divider: {
    backgroundColor: "lightgrey",
    height: StyleSheet.hairlineWidth,
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

export const MenuItem = ({ item, onPress }: { item: Item; onPress: any }) => {
  let hasDetails = item.description !== "" || item.ingredients !== "";
  return (
    <TouchableOpacity
      disabled={!hasDetails}
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.itemRowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTextTitle}>{item.itemName}</Text>
          {item.description ? (
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </View>
        <Text>{`$${item.price.toFixed(2)}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const SectionHeader = ({ title }: { title: string }) => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitleText}>{title}</Text>
      </View>
      <View style={styles.divider}></View>
    </>
  );
};

export const RowSeparator = () => <View style={styles.separator} />;
