import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DiaryList from '../diaryList/components/DiaryList'

export default function home() {
  return (
    <View style={styles.container}>
      {/* 年月 */}
      <View style={styles.yearMonthContainer}>
        <Text style={styles.yearMonthText}>2025年6月 ↓</Text>
      </View>
      {/* 日記一覧 */}
      <View style={styles.diaryListContainer}>
        <DiaryList date="6月18日(水)" />
        <DiaryList date="6月19日(木)" />
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