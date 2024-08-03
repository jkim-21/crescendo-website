// firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "crescendo-for-a-cause.firebaseapp.com",
  projectId: "crescendo-for-a-cause",
  storageBucket: "crescendo-for-a-cause.appspot.com",
  messagingSenderId: "935831846124",
  appId: "1:935831846124:web:04107dee3690e6be2939c9",
  measurementId: "G-XWR3LV2H8E",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
