import React from "react";
import * as Firebase from "firebase/app";
import "firebase/firestore";

//import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, get } from "firebase/database";

import { View, Text } from "react-native";

//import "dotenv/config";

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
const starCountRef = ref(db, "restaurants/restaurantA/menus/menu1/categories/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log("First Category: ");
  console.log(data);
});

const TestDB = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default TestDB;
