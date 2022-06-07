import { getDatabase, ref, child, get } from "firebase/database";
import React from "react";
import { database } from "./config/config";
import { Restaurant } from "./Restaurant";

export const getRestaurantById = (
  id: string,
  setRestaurant: any,
  setIsLoading: any
) => {
  const dbRef = ref(database);
  get(child(dbRef, "restaurantList"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let key = "restaurant" + id;
        // console.log(key);

        let data = JSON.parse(JSON.stringify(snapshot.val()));
        let restaurant = data[key];

        console.log(JSON.stringify(restaurant));
        setRestaurant({
          description: restaurant.description,
          id: restaurant.id,
          restaurantName: restaurant.restaurantName,
        });
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};
