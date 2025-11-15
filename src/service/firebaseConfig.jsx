// Import Firebase core
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import Firebase Auth
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaoT1tmT2MbR83lfF0hJWWnk_hrIL7G2g",
  authDomain: "smart-trip-ai-ba940.firebaseapp.com",
  projectId: "smart-trip-ai-ba940",
  storageBucket: "smart-trip-ai-ba940.firebasestorage.app",
  messagingSenderId: "805798186447",
  appId: "1:805798186447:web:b983cc689d9e922e0856ba",
  measurementId: "G-9YEVRX02DF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Auth
export const auth = getAuth(app);

// Google Provider
export const googleProvider = new GoogleAuthProvider();
