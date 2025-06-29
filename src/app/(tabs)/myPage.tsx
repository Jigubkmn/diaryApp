import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import Header from '../myPage/components/Header'
import DiaryShareInfo from '../myPage/components/DiaryShareInfo'
import { Image } from 'expo-image'
import EditIcon from '../components/Icon/EditIcon';
import { auth, db } from '../../config';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { collection, onSnapshot, query } from 'firebase/firestore'



export default function myPage() {

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const userImage = require('../../../assets/images/user.png')

  useEffect(() => {
    // ユーザー情報取得
    const userId = auth.currentUser?.uid
    if (userId) {
      const ref = collection(db, `users/${userId}/userInfo`)
      const q = query(ref) // ユーザー情報の参照を取得。
      onSnapshot(q, (snapshot) => { // snapshot：userInfoのデータを取得。
        // データ1つずつの処理
        snapshot.docs.forEach((doc) => {
          console.log("ユーザー情報", doc.data())
        })
      })
    }
  }, [])
  // ログアウト
  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      router.replace("/auth/login")
    })
    .catch((error) => {
      console.log("error", error)
      Alert.alert("ログアウト処理を失敗しました")
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.userInfoContainer}>
          {/* ユーザー画像 */}
          <View style={styles.userImageContainer}>
            <Image source={userImage} style={styles.userImage} />
            <TouchableOpacity style={styles.editIconOverlay} onPress={() => {}}>
              <EditIcon size={24} color="#FFA500" />
            </TouchableOpacity>
          </View>
          {/* ユーザーID */}
          <View style={styles.userTextContainer}>
            <Text style={styles.userTitle}>ユーザーID</Text>
            <Text style={styles.userText}>AAAABBBBCCCC</Text>
          </View>
          {/* ニックネーム */}
          <View style={styles.userTextContainer}>
            <View style={styles.userTextWrapper}>
              <Text style={styles.userTitle}>ユーザー名</Text>
              <TouchableOpacity onPress={() => {}}>
                <EditIcon size={24} color="#FFA500" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userText}>塩見太郎</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={() => {handleLogout()}}>
            <Text style={styles.logoutButtonText}>ログアウト</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.diaryShareContainer}>
          <Text style={styles.diaryShareTitle}>日記共通相手</Text>
          <View style={styles.diaryShareInfoContainer}>
            <DiaryShareInfo />
            <DiaryShareInfo />
            <DiaryShareInfo />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 48,
  },
  userInfoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    marginHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  userImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  userImage: {
    width: 100,
    height: 100,
  },
  editIconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFA500',
    backgroundColor: '#ffffff',
    padding: 3,
  },
  userTextContainer: {
    marginTop: 16,
    marginRight: 'auto',
  },
  userTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  userText: {
    fontSize: 14,
    lineHeight: 24,
  },
  logoutButton: {
    height: 24,
    width: 90,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  logoutButtonText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#ffffff',
  },
  diaryShareContainer: {
    flex: 1,
    marginTop: 16,
  },
  diaryShareTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
    marginLeft: 8
  },
  diaryShareInfoContainer: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
})