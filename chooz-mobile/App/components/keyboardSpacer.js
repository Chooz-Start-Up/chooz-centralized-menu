import React, { useState, useEffect } from "react";
import { View, Keyboard, Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const KeyboardSpacer = ({ style, onToggle }) => {
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    const updateKeyboardSpace = (event) => {
      if (!event.endCoordinates) {
        return;
      }

      const screenHeight = Dimensions.get("window").height;
      const newKeyboardSpace = screenHeight - event.endCoordinates.screenY;
      setKeyboardSpace(newKeyboardSpace);
      onToggle(true, newKeyboardSpace);
    };

    const showEvent =
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow";
    const showListener = Keyboard.addListener(showEvent, updateKeyboardSpace);

    const resetKeyboardSpace = () => {
      setKeyboardSpace(0);
      onToggle(false, 0);
    };

    const hideEvent =
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide";
    const hideListener = Keyboard.addListener(hideEvent, resetKeyboardSpace);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return <View style={[styles.container, { height: keyboardSpace }, style]} />;
};
