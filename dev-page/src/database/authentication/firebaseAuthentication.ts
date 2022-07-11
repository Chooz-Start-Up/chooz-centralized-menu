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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const currentUser = auth.currentUser;
const db = getFirestore(app);
const apidb = getDatabase(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<boolean> => {
  const devAccount = [
    "chlgustjr41@gmail.com",
    "choozfood@gmail.com",
    "justingnalag@gmail.com",
    "justingnalag2000@gmail.com",
  ];

  return new Promise(async function (resolve, reject) {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      if (user.email !== null && devAccount.indexOf(user.email) !== -1) {
        resolve(true);
      } else {
        reject(false);
      }
    } catch (err: any) {
      reject(err);
    }
  });
};

const logout = () => {
  signOut(auth);
};

export { auth, currentUser, db, apidb, storage, signInWithGoogle, logout };
