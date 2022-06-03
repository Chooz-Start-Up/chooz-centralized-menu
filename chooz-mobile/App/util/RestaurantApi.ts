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
import { db } from "../data/database";

const dbRef = ref(getDatabase());

export async function getRestaurantList(restaurantListRetrieved: any) {
  var restaurantList: any[] = [];
  var snapshot = await get(child(dbRef, "restaurantList"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let raw_data = snapshot.val();
        let data = JSON.parse(JSON.stringify(raw_data));

        let keys = Object.keys(data);
        keys.forEach(function (key: any) {
          restaurantList.push(data[key]);
        });
        console.log(restaurantList[0]);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  restaurantListRetrieved(restaurantList);
}
