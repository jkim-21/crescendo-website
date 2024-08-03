// firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "crescendo-for-a.firebaseapp.com",
  projectId: "crescendo-for-a",
  storageBucket: "crescendo-for-a.appspot.com",
  messagingSenderId: "219899885944",
  appId: "1:219899885944:web:a1aa19d2311b0571f9f08d",
  measurementId: "G-7WMMJ758F9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
