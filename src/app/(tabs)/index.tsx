import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import DiaryList from '../diaryList/components/DiaryList'
import { auth, db } from '../../config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { DiaryType } from '../../../type/diary';
import PlusIcon from '../components/Icon/PlusIcon';
import { useRouter } from 'expo-router';

export default function home() {
  const [diaryLists, setDiaryLists] = useState<DiaryType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId === null) return;
    const ref = collection(db, `users/${userId}/diary`)
    const q = query(ref)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteDiaryList: DiaryType[] = []
      snapshot.docs.forEach((doc) => {
        const { diaryText, date, feeling, updatedAt } = doc.data();
        remoteDiaryList.push({ diaryText, date, feeling, updatedAt })
      })
      setDiaryLists(remoteDiaryList)
    })
    return unsubscribe;
  }, [])

  return (
    <View style={styles.container}>
      {/* 年月 */}
      <View style={styles.yearMonthContainer}>
        <Text style={styles.yearMonthText}>2025年6月 ↓</Text>
      </View>
      {/* 日記一覧 */}
      <ScrollView style={styles.diaryListContainer}>
        {diaryLists.map((diaryList) => {
          return (
            <DiaryList key={diaryList.date} diaryList={diaryList} />
          )
        })}
      </ScrollView>
      <TouchableOpacity style={styles.plusButton} onPress={() => router.push('/diaryCreation')}>
        <PlusIcon width={40} height={40} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yearMonthContainer: {
    // View用のスタイル（必要に応じて）
    backgroundColor: '#ffffff',
  },
  yearMonthText: {
    fontSize: 20,
    lineHeight: 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  diaryListContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  plusButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 60,
    height: 60,
    backgroundColor: '#FFA500',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // ドロップシャドウ
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
})