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
import { apidb } from "../authentication/firebaseAuthentication";
import { Menu } from "./Menu";

const dbRef = ref(getDatabase());

/**
 * pushes Restaurant profile to db - if user and restaurant exists, it updates otherwise, it adds a new record
 * @param uid - string of userID
 * @param restaurant - restaurant object to push
 */
export async function pushProfile(uid: string, restaurant: Restaurant) {
  get(ref(apidb, "users/" + uid + "/restaurants/" + restaurant.id)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        updateProfile(restaurant.id, restaurant);
      } else {
        addRestaurant(uid, restaurant);
      }
    }
  );
}

/**
 * pushes Restaurant menus to db - if user and restaurant exists, it updates otherwise, it adds a new record
 * @param uid - string of userID
 * @param restaurant - restaurant object to push
 */
export async function pushMenu(uid: string, restaurant: Restaurant) {
  get(ref(apidb, "users/" + uid + "/restaurants/" + restaurant.id)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        updateMenu(restaurant.id, restaurant);
      } else {
        // This should never executing. Assuming menu will be added when everything other exists in the DB
        console.log("Adding to menu list");
        addMenu(restaurant);
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

export async function pullRestaurantMenuByUser(uid: string): Promise<Menu[]> {
  return new Promise(function (resolve, reject) {
    getRestaurantKey(uid)
      .then((key) => {
        getRestaurantMenuByKey(key).then((menus) => {
          resolve(menus);
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
              itemVal.description,
              itemVal.isPublished
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
  let key = push(child(ref(apidb), "users/" + uid)).key;

  const restaurantListData = {
    id: key,
    restaurantName: restaurant.restaurantName,
    description: restaurant.description,
    isPublished: restaurant.isPublished,
    hours: restaurant.hours,
  };

  const restaurantDetailData = {
    id: key,
    restaurantName: restaurant.restaurantName,
    description: restaurant.description,
    isPublished: restaurant.isPublished,
    phoneNumber: restaurant.phoneNumber,
    address: restaurant.address,
    menus: restaurant.menus,
    ownerName: restaurant.ownerName,
    hours: restaurant.hours,
  };

  const userRestaurantReference = {
    id: key,
  };

  const updates = {};
  (updates as any)["/users/" + uid + "/restaurants/" + key] =
    userRestaurantReference;
  (updates as any)["/restaurantList/" + key] = restaurantListData;
  (updates as any)["/restaurants/" + key] = restaurantDetailData;

  update(ref(apidb), updates);
}

/**
 * Helper function for pushRestaurant
 * @param restaurantKey
 * @param restaurant
 */
async function updateProfile(restaurantKey: string, restaurant: Restaurant) {
  set(ref(apidb, "restaurantList/" + restaurantKey), {
    id: restaurantKey,
    restaurantName: restaurant.restaurantName,
    description: restaurant.description,
    isPublished: restaurant.isPublished,
    hours: restaurant.hours,
  });

  set(ref(apidb, "restaurants/" + restaurantKey), {
    id: restaurantKey,
    restaurantName: restaurant.restaurantName,
    description: restaurant.description,
    isPublished: restaurant.isPublished,
    phoneNumber: restaurant.phoneNumber,
    address: restaurant.address,
    ownerName: restaurant.ownerName,
    hours: restaurant.hours,
  });

  console.log("UPDATED");
}

async function addMenu(restaurant: Restaurant) {
  const menuData = {
    menus: JSON.parse(JSON.stringify(restaurant.menus)),
  };

  const updates = {};
  (updates as any)["/restaurantMenuList/" + restaurant.id] = menuData;

  update(ref(apidb), updates);
}

async function updateMenu(restaurantKey: string, restaurant: Restaurant) {
  set(ref(apidb, "restaurantMenuList/" + restaurantKey), {
    menus: JSON.parse(JSON.stringify(restaurant.menus)),
  });

  console.log("UPDATED MENU");
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

async function getRestaurantMenuByKey(key: string): Promise<Array<Menu>> {
  return new Promise(function (resolve, reject) {
    get(child(dbRef, "restaurantMenuList/" + key))
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
