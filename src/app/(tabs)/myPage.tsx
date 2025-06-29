import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import Header from '../myPage/components/Header'
import DiaryShareInfo from '../myPage/components/DiaryShareInfo'
import { auth, db } from '../../config';
import { UserInfoType } from '../../../type/userInfo'
import { collection, onSnapshot, query } from 'firebase/firestore'
import UserInfo from '../myPage/components/UserInfo';

export default function myPage() {
  const [userInfos, setUserInfos] = useState<UserInfoType[]>([])

  useEffect(() => {
    // ユーザー情報取得
    const userId = auth.currentUser?.uid
    if (userId === null) return;
      const ref = collection(db, `users/${userId}/userInfo`)
      const q = query(ref) // ユーザー情報の参照を取得。
      // snapshot：userInfoのデータを取得。
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const remoteUserInfo: UserInfoType[] = []
        // データ1つずつの処理
        snapshot.docs.forEach((doc) => {
          console.log("ユーザー情報", doc.data())
          const { accountId, userName } = doc.data();
          remoteUserInfo.push({ accountId, userName })
        })
        setUserInfos(remoteUserInfo)
      })
    return unsubscribe;
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.bodyContainer}>
        {userInfos.map((userInfo) => {
          return (
            <UserInfo key={userInfo.accountId} userInfo={userInfo} />
          )
        })}
        {/* <UserInfo /> */}
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