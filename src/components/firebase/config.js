// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCgdMNGiJTcjP8YnsAbF_13rop32TOB5i0",
    authDomain: "chat-app-840ee.firebaseapp.com",
    projectId: "chat-app-840ee",
    storageBucket: "chat-app-840ee.appspot.com",
    messagingSenderId: "342850102990",
    appId: "1:342850102990:web:c1599b60e8dff4321d929f",
    measurementId: "G-D7PYZ4NQMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

// Initialize Cloud FireStore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const authentication = getAuth(app);

export { analytics, db, authentication };