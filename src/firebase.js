import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyMa0zZDrNFXUvNNBOdDYJWC1PORC_6C0",
  authDomain: "supersilla-9b878.firebaseapp.com",
  projectId: "supersilla-9b878",
  storageBucket: "supersilla-9b878.appspot.com",
  messagingSenderId: "238266011230",
  appId: "1:238266011230:web:cdafc758ce5a7bee166ecf",
  measurementId: "G-S8QVBHQ5SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
