import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Firebaseの設定
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);

let auth: Auth;

if (Constants.executionEnvironment === "bare") {
  // Expo GoやWebはgetAuthのみで利用（永続化は効かない）
  auth = getAuth(app);
} else {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getReactNativePersistence } = require('firebase/auth');
auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
}

// Firebaseのデータベースの初期化
const db = getFirestore(app);

export { app, auth, db };