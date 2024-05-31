
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChUeaK3NzERqRHNtVYeMHqx99Uo9tz150",
  authDomain: "fortress-in-pixels.firebaseapp.com",
  projectId: "fortress-in-pixels",
  storageBucket: "fortress-in-pixels.appspot.com",
  messagingSenderId: "254655958247",
  appId: "1:254655958247:web:6c096622838cf7505fe642",
  measurementId: "G-DE2WVRVMTT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);