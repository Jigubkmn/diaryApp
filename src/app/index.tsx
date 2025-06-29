import React, { useEffect } from 'react';
import { Redirect, router } from 'expo-router';
import { auth } from '../config';
import { onAuthStateChanged } from 'firebase/auth';

export default function Index() {
  useEffect(() => {
    // ログイン状態を監視
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)")
      }
    })
  }, [])
  return <Redirect href="/auth/login" />;
}