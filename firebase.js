// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxf3XoTZTW7WdhQ0ISYc08cfpqRns1ARk",
    authDomain: "jumprope-2c211.firebaseapp.com",
    projectId: "jumprope-2c211",
    storageBucket: "jumprope-2c211.appspot.com",
    messagingSenderId: "555320477245",
    appId: "1:555320477245:web:3055122f711ca4557bcc54",
    measurementId: "G-Q3K7XT7QMX",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 가져오기
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };