// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDqpxmJaQarF6o61wQHwPC6bE1itsocBo",
  authDomain: "flutter-2c00b.firebaseapp.com",
  projectId: "flutter-2c00b",
  storageBucket: "flutter-2c00b.appspot.com",
  messagingSenderId: "105549333264",
  appId: "1:105549333264:web:6b65235da41582689c1b95"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
