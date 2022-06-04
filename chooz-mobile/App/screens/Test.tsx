import React, { useEffect, useState } from "react";
import * as Firebase from "firebase/app";
import "firebase/firestore";
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  DatabaseReference,
} from "firebase/database";
import { View, Text } from "react-native";
//import database from "@react-native-firebase/database";

import { IRestaurant, Restaurant } from "../util/Restaurant";
import { db } from "../data/database";
import { getRestaurantList } from "../util/RestaurantApi";
import { SafeAreaView } from "react-native-safe-area-context";
import RestauarantList from "./RestaurantList";
import Item from "./Item";

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

const dbRef = ref(getDatabase());

const TestDB = () => {
  const [restaurantList, setRestaurantList] = useState<Array<IRestaurant>>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("USE EFFECT");
    get(child(dbRef, "restaurantList"))
      .then((snapshot) => {
        let objList: Restaurant[] = [];
        if (snapshot.exists()) {
          snapshot.forEach(function (item) {
            let itemVal = item.val();
            // objList.push(new Restaurant(itemVal.id, itemVal.restaurantName));
          });

          setRestaurantList(objList);
          setLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView>
      {isLoading && (
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 50 }}>LOADING</Text>
        </View>
      )}
      {!isLoading &&
        restaurantList?.map(({ id, restaurantName }) => {
          return (
            <View key={id}>
              <Text key={id}>
                Restaurant Object {id}: {restaurantName}
              </Text>
            </View>
          );
        })}
    </SafeAreaView>
  );
};

export default TestDB;
