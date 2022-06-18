import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA-kfMual2cl0xa7JMtW4WAZkEXr7l2iVo",
  authDomain: "chooz-1a9aa.firebaseapp.com",
  databaseURL: "https://chooz-1a9aa-default-rtdb.firebaseio.com",
  projectId: "chooz-1a9aa",
  storageBucket: "chooz-1a9aa.appspot.com",
  messagingSenderId: "620102991378",
  appId: "1:620102991378:web:1fd6047ed0700e429922cb",
  measurementId: "G-Y4Y1FS2R44",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
