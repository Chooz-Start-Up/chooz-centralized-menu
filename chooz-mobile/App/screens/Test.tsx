import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import * as Location from "expo-location";
import zipcode from "zipcodes";

import { SafeAreaView } from "react-native-safe-area-context";

const TestDB = () => {
  const [currentLocation, setCurrentLocation] = useState<any>("");

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      console.log("rejected");
    }

    let { coords } = await Location.getCurrentPositionAsync();

    // if (coords) {
    //   const { latitude, longitude } = coords;
    //   let response = await Location.reverseGeocodeAsync({
    //     latitude,
    //     longitude,
    //   });

    //   for (let item of response) {
    //     let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
    //     setCurrentLocation(address);
    //     console.log(address);
    //   }
    // }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <SafeAreaView>
      <Text>{`Location: ${currentLocation}`}</Text>
    </SafeAreaView>
  );
};

export default TestDB;
