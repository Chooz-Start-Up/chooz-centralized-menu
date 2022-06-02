import React from "react";
import * as Firebase from "firebase/app";
import "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import { View, Text } from "react-native";
//import database from "@react-native-firebase/database";

import { Restaurant } from "../util/Restaurant";
import { db } from "../data/database";

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

const reference = ref(db, "restaurantList/");

const TestDB = () => {
  /*
  DEV NOTES (06/02)
  This is reading from db using realtime changes - 
  I tried changing it to one-time read because it could 
  limit the total reads but ran into alot of errors
  */
  let restaurantObj: Restaurant = new Restaurant();
  let restaurantObj2: Restaurant = new Restaurant();
  let i = "Test";

  let result: Restaurant[] = [new Restaurant(), new Restaurant()];
  onValue(reference, (snapshot) => {
    //Retrieve Restaurant List
    //raw_data is snapshot value
    const raw_data = snapshot.val();

    //data is snapshot as string
    const data = JSON.stringify(raw_data);
    // console.log("Data as string: ");
    // console.log(data);

    //ref is list of objects parsed from data
    const ref = JSON.parse(data);

    //keys are the keys of the objects in the list
    let keys = Object.keys(ref);

    keys.forEach(function (key: any) {
      result[0] = new Restaurant(ref[key].id, ref[key].title);
      // console.log("DATA FROM TEST: " + JSON.stringify(key.title));
    });
    // console.log("DATA FROM TEST: " + JSON.stringify(result[0].title));
    // restaurantObj = new Restaurant(result[0].id, result[0].title);
    // restaurantObj2 = new Restaurant(result[1].id, result[1].title);
  });
  restaurantObj.restaurantName = result[0].restaurantName;
  restaurantObj2.restaurantName = result[0].restaurantName;
  // restaurantObj.restaurantName = result[0].title;
  // restaurantObj2.restaurantName = result[1].title;

  return (
    <View>
      <Text>Restaurant Object 1: {restaurantObj.restaurantName}</Text>
      <Text>Restaurant Object 2: {restaurantObj2.restaurantName}</Text>
      {console.log("INSIDE BLOCK")}
    </View>
  );
};

export default TestDB;
