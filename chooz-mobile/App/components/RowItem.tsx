import React from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import colors from "../constants/colors";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: Platform.OS === "ios" ? 17 : 16,
    color: colors.text,
  },
  separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: Platform.OS === "ios" ? 20 : 0,
  },
});

export const RowItem = ({
  text,
  onPress,
}: //rightIcon,
{
  text: any;
  onPress: any;
  //rightIcon: any;
}) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export const RowSeparator = () => <View style={styles.separator} />;
