import "firebase/firestore";
import {
  getDatabase,
  ref,
  get,
  child,
  push,
  update,
  set,
} from "firebase/database";
import { Restaurant } from "./Restaurant";
import { string } from "prop-types";
import { db } from "../data/database";
import { useReducer } from "react";

const dbRef = ref(getDatabase());

/**
 * pushes Restaurant to db - if user and restaurant exists, it updates otherwise, it adds a new record
 * @param uid - string of userID
 * @param restaurant - restaurant object to push
 */
export async function pushRestaurant(uid: string, restaurant: Restaurant) {
  console.log("API ID: " + restaurant.id);
  get(ref(db, "users/" + uid + "/restaurants/" + restaurant.id)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        updateRestaurant(restaurant.id, restaurant);
      } else {
        addRestaurant(uid, restaurant);
      }
    }
  );
}

/**
 * returns a restaurant based on UserID
 * @param uid - UserID as string
 * @returns restaurant owned by user
 */
export async function pullRestaurantByUser(uid: string): Promise<Restaurant> {
  return new Promise(function (resolve, reject) {
    getRestaurantKey(uid)
      .then((key) => {
        getRestaurantByKey(key).then((restaurant) => {
          resolve(restaurant);
        });
      })
      .catch((error) => reject(error));
  });
}

/**
 * Used for RestaurantListScreen.tsx
 * sets the list of restaurants using the setState function passed.
 * @param setRestaurantList - a function that sets the state of restaurantList
 * @param setLoading - an optional function that sets the state of isLoading
 */
export async function getRestaurantList(
  setRestaurantList: Function,
  setLoading?: Function
) {
  get(child(dbRef, "restaurantList"))
    .then((snapshot) => {
      let objList: Restaurant[] = [];
      if (snapshot.exists()) {
        snapshot.forEach(function (item) {
          let itemVal = item.val();
          objList.push(
            new Restaurant(
              item.key!,
              itemVal.restaurantName,
              itemVal.description
            )
          );
        });

        setRestaurantList(objList);
        if (setLoading !== undefined) {
          setLoading(false);
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Used for RestaurantScreen.tsx
 * sets Restaurant Details to the restaurant object that is passed
 * @param restaurant - the restaurant that requires details
 * @param setLoading - an optional function that sets the state of isLoading
 */
export async function getRestaurantDetails(
  restaurant: Restaurant,
  setLoading?: Function
) {
  get(child(dbRef, "restaurants/" + restaurant.id))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        restaurant.setDetails(JSON.stringify(data));
        if (setLoading !== undefined) {
          setLoading(false);
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Helper Function for pushRestaurant
 * pushes a restaurant object to the restaurantList, restaurants, and user restaurants of the database
 * @param uid - user ID
 * @param restaurant - restaurant object to push
 * @returns - the key to the restaurant that was pushed
 */
async function addRestaurant(uid: string, restaurant: Restaurant) {
  let key = push(child(ref(db), "users/" + uid)).key;

  console.log(restaurant);
  const restaurantListData = {
    id: key,
    restaurantName: restaurant.restaurantName,
    description: restaurant.description,
  };

  const restaurantDetailData = {
    id: key,
    restaurantName: restaurant.restaurantName,
    description: restaurant.description,
    phoneNumber: restaurant.phoneNumber,
    address: restaurant.address,
    menus: restaurant.menus,
  };

  const userRestaurantReference = {
    id: key,
  };

  const updates = {};
  (updates as any)["/users/" + uid + "/restaurants/" + key] =
    userRestaurantReference;
  (updates as any)["/restaurantList/" + key] = restaurantListData;
  (updates as any)["/restaurants/" + key] = restaurantDetailData;

  update(ref(db), updates);
  alert("PUSHED DATA");
}

/**
 * Helper function for pushRestaurant
 * @param restaurantKey
 * @param restaurant
 */
async function updateRestaurant(restaurantKey: string, restaurant: Restaurant) {
  set(ref(db, "restaurantList/" + restaurantKey), {
    id: restaurantKey,
    restaurantName: restaurant.restaurantName,
    description: restaurant.description,
  });

  set(ref(db, "restaurants/" + restaurantKey), {
    id: restaurantKey,
    restaurantName: restaurant.restaurantName,
    description: restaurant.description,
    phoneNumber: restaurant.phoneNumber,
    address: restaurant.address,
    menus: restaurant.menus,
  });

  console.log("UPDATED");
}

/**
 * Helper Function to pullRestaurantByUser
 * Takes a Users ID and returns the key of their Restaurant
 * V.0 - ONLY RETURNS FIRST RESTAURANT IN USERS RESTAURANT LIST 06/09
 * @param uid - userID of restaurant you want to retrieve
 * @returns - key of restaurant
 */
async function getRestaurantKey(uid: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    get(child(dbRef, "users/" + uid + "/restaurants"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          resolve(Object.keys(data)[0]);
        } else {
          reject("No Data Available");
          console.log("No data available");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * Helper function to pullRestaurantByUser
 * @param key - string of restaurant key
 * @returns restaurant promise
 */
async function getRestaurantByKey(key: string): Promise<Restaurant> {
  return new Promise(function (resolve, reject) {
    get(child(dbRef, "restaurants/" + key))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          resolve(data);
        } else {
          reject("No Data Available");
          console.log("No data available");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
