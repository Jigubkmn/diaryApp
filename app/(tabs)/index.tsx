import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DiaryList from '../diaryCreation/components/DiaryList'

export default function home() {
  return (
    <View style={styles.container}>
      {/* 年月 */}
      <View style={styles.yearMonthContainer}>
        <Text style={styles.yearMonthText}>2025年6月 ↓</Text>
      </View>
      {/* 日記一覧 */}
      <View style={styles.diaryListContainer}>
        <DiaryList />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  yearMonthContainer: {
    // View用のスタイル（必要に応じて）
  },
  yearMonthText: {
    fontSize: 20,
    lineHeight: 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  diaryListContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
})