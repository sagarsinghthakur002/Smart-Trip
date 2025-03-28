// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const db=getFirestore(app);

// const analytics = getAnalytics(app);