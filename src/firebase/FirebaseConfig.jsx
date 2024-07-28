// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiwTfYJKMQaK8uEKWIi3c9m58pu94qnSg",
  authDomain: "nirbharecom.firebaseapp.com",
  projectId: "nirbharecom",
  storageBucket: "nirbharecom.appspot.com",
  messagingSenderId: "1054265364270",
  appId: "1:1054265364270:web:8389e29f23261eeb5c34bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth}