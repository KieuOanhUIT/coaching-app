// Import the functions you need from the SDKs you need
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { getAnalytics } from "firebase/analytics";
// import { initializeAuth } from 'firebase/auth';
// import { getReactNativePersistence } from 'firebase/auth/react-native'; // ✅ sửa đây
// import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzHqayXkUbhR8VokIw-FzNcvLtmxfq6ZU",
  authDomain: "project-2025-984aa.firebaseapp.com",
  projectId: "project-2025-984aa",
  storageBucket: "project-2025-984aa.firebasestorage.app",
  messagingSenderId: "881855392576",
  appId: "1:881855392576:web:a989c8ce74c3a9c56468a5",
  measurementId: "G-1924D74QPE"
};

// Initialize Firebase
// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// export const db = getFirestore(app);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);