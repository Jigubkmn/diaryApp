import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DiaryList from '../diaryList/components/DiaryList'
import { auth, db } from '../../config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { DiaryType } from '../../../type/diary';

export default function home() {
  const [diaryLists, setDiaryLists] = useState<DiaryType[]>([]);

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
      <View style={styles.diaryListContainer}>
        {diaryLists.map((diaryList) => {
          return (
            <DiaryList key={diaryList.date} diaryList={diaryList} />
          )
        })}
      </View>
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
})