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
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
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