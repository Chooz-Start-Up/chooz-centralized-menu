import "firebase/firestore";
import { getDatabase, ref, get, child } from "firebase/database";
import { Restaurant } from "../component/Restaurant";
import { app } from "../config/config";
import { Menu } from "../component/Menu";
import { Category } from "../component/Category";
import { Item } from "../component/Item";
import {
  uploadBytes,
  ref as storageRef,
  listAll,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";

const dbRef = ref(getDatabase());
const apidb = getDatabase(app);
const storage = getStorage(app);

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
 * Helper function to pullRestaurantByUser
 * @param key - string of restaurant key
 * @returns restaurant promise
 */
export async function getRestaurantByKey(key: string): Promise<Restaurant> {
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

// Updated to return a Promise with an actual Array of Menu
export async function getRestaurantMenuByKey(
  key: string
): Promise<Array<Menu>> {
  return new Promise(function (resolve, reject) {
    get(child(dbRef, "restaurantMenuList/" + key))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let arrayData: Menu[] = data["menus"];

          let menus: Array<Menu> = [];
          arrayData.forEach((menu) => {
            let categories: Array<Category> = [];
            menu["_categories"].forEach((category) => {
              let items: Array<Item> = [];
              category["_items"].forEach((item) => {
                items.push(
                  new Item(
                    item["_itemName"],
                    item["_price"],
                    item["_description"],
                    item["_ingredients"]
                  )
                );
              });
              categories.push(new Category(category["_categoryName"], items));
            });
            menus.push(new Menu(menu["_menuName"], categories));
          });

          resolve(menus);
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

export async function pullBannerImage(restaurantKey: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    let imageURLs: string = "";

    listAll(storageRef(storage, restaurantKey + "/banner/")).then((data) => {
      if (data.items.length > 0) {
        getDownloadURL(data.items[0]).then((url) => {
          imageURLs = url;
          resolve(imageURLs);
        });
      }
    });
  });
}

export async function pullLogoImage(restaurantKey: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    let imageURLs: string = "";

    listAll(storageRef(storage, restaurantKey + "/logo/")).then((data) => {
      if (data.items.length > 0) {
        getDownloadURL(data.items[0]).then((url) => {
          imageURLs = url;
          resolve(imageURLs);
        });
      }
    });
  });
}
