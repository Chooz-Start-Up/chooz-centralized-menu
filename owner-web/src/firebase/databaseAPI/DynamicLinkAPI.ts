import "firebase/firestore";
import { ref, get, update } from "firebase/database";
import { apidb, storage } from "../authentication/firebaseAuthentication";
import { getRestaurantKey } from "./RestaurantApi";
import generateLink from "../dynamicLink/DynamicLink";

export async function pullDynamicLink(uid: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    getRestaurantKey(uid)
      .then((restaurantKey) => {
        get(ref(apidb, "/restaurantDynamicLink/" + restaurantKey)).then(
          (snapshot) => {
            if (snapshot.exists()) {
              resolve(snapshot.val().dynamicLink);
            } else {
              generateLink(restaurantKey).then(
                (dynamicLink) => {
                  addDynamicLink(restaurantKey, dynamicLink);
                  resolve(dynamicLink);
                },
                () => {
                  reject("Error occurred while generating dynamic link");
                }
              );
            }
          }
        );
      })
      .catch(() => {
        reject("Unexpected error pulling the dynamic link");
      });
  });
}

async function addDynamicLink(restaurantKey: string, link: string) {
  const restaurantDynamicLink = {
    dynamicLink: link,
  };

  const updates = {};
  (updates as any)["/restaurantDynamicLink/" + restaurantKey] =
    restaurantDynamicLink;

  update(ref(apidb), updates);
}
