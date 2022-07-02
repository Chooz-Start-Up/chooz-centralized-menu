import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
  FacebookAuthProvider,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "../config/config";
import { Menu } from "../databaseAPI/Menu";
import { Restaurant } from "../databaseAPI/Restaurant";
import { pushMenu, pushProfile } from "../databaseAPI/RestaurantApi";
import defaultMenu from "./defaultMenu.json";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const currentUser = auth.currentUser;
const db = getFirestore(app);
const apidb = getDatabase(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = async (navigate: any) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      }).then(() => {
        pushProfile(
          user.uid,
          new Restaurant(
            "",
            "",
            "",
            false,
            "",
            "",
            "",
            "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed"
          )
        ).then((key) => {
          const pushingMenu = new Restaurant(
            key,
            "",
            "",
            false,
            "",
            "",
            "",
            "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed",
            Menu.parseMenus(JSON.stringify(defaultMenu))
          );
          pushMenu(user.uid, pushingMenu).then(() => {
            navigate("/fillinfo");
          });
        });
      });
    } else {
      navigate("/edit");
    }
  } catch (err: any) {
    throw err;
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    throw err;
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });

    await sendEmailVerification(user); // disabling this when manually creating account
  } catch (err: any) {
    throw err;
  }
};

const resendEmailVerification = async () => {
  if (auth.currentUser !== null) {
    await sendEmailVerification(auth.currentUser);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: any) {
    throw err;
  }
};

const logout = () => {
  signOut(auth);
};

const signInWithFacebook = async (navigate: any) => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "facebook",
        email: user.email,
      }).then(() => {
        pushProfile(
          user.uid,
          new Restaurant(
            "",
            "",
            "",
            false,
            "",
            "",
            "",
            "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed"
          )
        ).then((key) => {
          const pushingMenu = new Restaurant(
            key,
            "",
            "",
            false,
            "",
            "",
            "",
            "Monday Closed\nTuesday Closed\nWednesday Closed\nThursday Closed\nFriday Closed\nSaturday Closed\nSunday Closed",
            Menu.parseMenus(JSON.stringify(defaultMenu))
          );
          pushMenu(user.uid, pushingMenu).then(() => {
            navigate("/fillinfo");
          });
        });
      });
    } else {
      navigate("/edit");
    }
  } catch (err: any) {
    throw err;
  }
};

export {
  auth,
  currentUser,
  db,
  apidb,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  resendEmailVerification,
  sendPasswordReset,
  logout,
  signInWithFacebook,
};
