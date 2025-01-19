// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxf3XoTZTW7WdhQ0ISYc08cfpqRns1ARk",
  authDomain: "jumprope-2c211.firebaseapp.com",
  projectId: "jumprope-2c211",
  storageBucket: "jumprope-2c211.appspot.com", // storageBucket 주소 수정
  messagingSenderId: "555320477245",
  appId: "1:555320477245:web:3055122f711ca4557bcc54",
  measurementId: "G-Q3K7XT7QMX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };