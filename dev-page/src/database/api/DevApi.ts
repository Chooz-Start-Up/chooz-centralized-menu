import "firebase/firestore";
import { getDatabase, ref, get, update, remove } from "firebase/database";
import { apidb } from "../authentication/firebaseAuthentication";

const dbRef = ref(getDatabase());

export async function updateUID(
  targetUID: string,
  sourceUID: string
): Promise<string> {
  return new Promise(function (resolve, reject) {
    validateUIDs(targetUID, sourceUID).then(
      () => {
        get(ref(apidb, "users/" + targetUID + "/restaurants/")).then(
          (snapshot) => {
            if (snapshot.exists()) {
              const targetRestaurantKey = Object.keys(snapshot.val())[0];

              createSourceUIDwithRestaurantKey(
                sourceUID,
                targetRestaurantKey
              ).then(() => {
                removeUIDfromUsers(targetUID, targetRestaurantKey);
              });

              resolve(
                "Successfully cleaned the owner UID-" +
                  sourceUID +
                  " information and claimed and replaced with UID-" +
                  targetUID +
                  " information"
              );
            } else {
              reject("Given target UID do not exist"); // should never executed since already validated
            }
          }
        );
      },
      (str) => {
        console.error(str);
        reject(str);
      }
    );
  });
}

export async function validateUIDs(
  targetUID: string,
  sourceUID: string
): Promise<string> {
  return new Promise(function (resolve, reject) {
    if (targetUID === "") {
      reject("Validation Failed: ID to Claim cannot be empty");
    } else if (sourceUID === "") {
      reject("Validation Failed: Owner ID cannot be empty");
    } else {
      get(ref(apidb, "users/" + targetUID)).then((snapshot) => {
        if (snapshot.exists()) {
          get(ref(apidb, "users/" + sourceUID)).then((snapshot) => {
            if (snapshot.exists()) {
              resolve("Validation completed");
            } else {
              reject(
                "Validation Failed: Owner ID UID-" + sourceUID + " do not exist"
              );
            }
          });
        } else {
          reject(
            "Validation Failed: ID to Claim UID-" + targetUID + " do not exist"
          );
        }
      });
    }
  });
}

async function createSourceUIDwithRestaurantKey(
  sourceUID: string,
  restaurantKey: string
): Promise<string> {
  return new Promise(function (resolve, reject) {
    cleanSourceUID(sourceUID).then(() => {
      const userRestaurantReference = {
        id: restaurantKey,
      };
      const updates = {};
      (updates as any)[
        "/users/" + sourceUID + "/restaurants/" + restaurantKey
      ] = userRestaurantReference;
      update(ref(apidb), updates);

      resolve("Success");
    });
  });
}

async function removeUIDfromUsers(
  removingUID: string,
  restaurantKey: string
): Promise<string> {
  return new Promise(function (resolve, reject) {
    remove(
      ref(apidb, "users/" + removingUID + "/restaurants/" + restaurantKey)
    ).then(() => {
      resolve("Successfully removed data of UID: " + removingUID);
    });
  });
}

async function cleanSourceUID(sourceUID: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    get(ref(apidb, "users/" + sourceUID + "/restaurants/")).then((snapshot) => {
      if (snapshot.exists()) {
        const sourceRestaurantKey = Object.keys(snapshot.val())[0];

        remove(ref(apidb, "restaurantDynamicLink/" + sourceRestaurantKey));
        remove(ref(apidb, "restaurantList/" + sourceRestaurantKey));
        remove(ref(apidb, "restaurantMenuList/" + sourceRestaurantKey));
        remove(ref(apidb, "restaurants/" + sourceRestaurantKey));
        removeUIDfromUsers(sourceUID, sourceRestaurantKey);

        resolve("Successfully cleaned the given UID: " + sourceUID);
      } else {
        reject("Given source UID do not exist"); // should never executed since already validated
      }
    });
  });
}
