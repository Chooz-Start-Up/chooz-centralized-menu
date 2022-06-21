import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import "firebase/firestore";

import { SafeAreaView } from "react-native-safe-area-context";

const TestDB = () => {
  return (
    <SafeAreaView>
      <Text>HOORAY!</Text>
    </SafeAreaView>
  );
};

export default TestDB;
