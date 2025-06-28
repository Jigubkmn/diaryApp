import { initializeApp } from "firebase/app"; // Firebaseの初期化
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Firebaseの認証
import { getFirestore } from "firebase/firestore/lite"; // Firebaseのデータベース
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebaseの設定
const firebaseConfig = {
  // apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  // authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  // projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  // storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  // messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  // appId: process.env.EXPO_PUBLIC_FB_APP_ID,
  apiKey: "AIzaSyA29Cc4jDz-lrUFwuGjt8riB5ZfZcxwIk0",
  authDomain: "diaryapp-7435e.firebaseapp.com",
  projectId: "diaryapp-7435e",
  storageBucket: "diaryapp-7435e.firebasestorage.app",
  messagingSenderId: "898256447374",
  appId: "1:898256447374:web:be01ebb2fa9d1206e5a6df",
  measurementId: "G-9F85G993LH"
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);

// Firebaseの認証
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firebaseのデータベースの初期化
const db = getFirestore(app);

export { app, auth, db };