import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-kfMual2cl0xa7JMtW4WAZkEXr7l2iVo",
  authDomain: "chooz-1a9aa.firebaseapp.com",
  projectId: "chooz-1a9aa",
  storageBucket: "chooz-1a9aa.appspot.com",
  messagingSenderId: "620102991378",
  appId: "1:620102991378:web:1fd6047ed0700e429922cb",
  measurementId: "G-Y4Y1FS2R44",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
