import React from "react";
import * as Firebase from "firebase/app";
import "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import { View, Text } from "react-native";
//import database from "@react-native-firebase/database";

import { Restaurant } from "../util/Restaurant";

const firebaseConfig = {
  apiKey: "AIzaSyA-kfMual2cl0xa7JMtW4WAZkEXr7l2iVo",
  authDomain: "chooz-1a9aa.firebaseapp.com",
  projectId: "chooz-1a9aa",
  storageBucket: "chooz-1a9aa.appspot.com",
  messagingSenderId: "620102991378",
  appId: "1:620102991378:web:1fd6047ed0700e429922cb",
  measurementId: "G-Y4Y1FS2R44",
};

// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);
const db = getDatabase();

const reference = ref(db, "restaurantList/");

const TestDB = () => {
  // database()
  //   .ref("restaurantList")
  //   .once("value")
  //   .then((snapshot) => {
  //     console.log("Restaurant List", snapshot.val());
  //   });

  let restaurantObj: Restaurant = new Restaurant();
  //Realtime Changes
  onValue(reference, (snapshot) => {
    const raw_data = snapshot.val();
    const data = JSON.stringify(raw_data);
    console.log("Data as string: ");
    console.log(data);

    console.log("Ref Object: ");
    const ref = JSON.parse(data);

    let result: any[] = [];
    let keys = Object.keys(ref);
    keys.forEach(function (key: any) {
      result.push(ref[key]);
    });
    console.log(result[0]);
  });
  return (
    <View>
      <Text>Restaurant ID: {restaurantObj.id}</Text>
      <Text>Restaurant Name: {restaurantObj.restaurantName}</Text>
    </View>
  );
};

export default TestDB;
