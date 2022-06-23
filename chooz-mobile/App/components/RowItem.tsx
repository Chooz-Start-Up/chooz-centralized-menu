import React, { useEffect } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import { Entypo } from "@expo/vector-icons";

import colors from "../constants/colors";

const styles = StyleSheet.create({
  row: {
    paddingLeft: 7,
    paddingRight: 10,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    backgroundColor: "white",
    fontSize: Platform.OS === "ios" ? 17 : 14,
    fontWeight: "bold",
    color: "black",
  },
  description: {
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
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  rowContainer: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
});

export const RowItem = ({
  title,
  description,
  rightIcon,
  onPress,
}: {
  title: string;
  description?: string;
  rightIcon?: any;
  onPress: any;
}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowContainer}>
        <Image
          style={styles.leftImage}
          source={require("../assets/images/testImages/subwayLogo.jpg")}
        />
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

export const RowSeparator = () => <View style={styles.separator} />;
