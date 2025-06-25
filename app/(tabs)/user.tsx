import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import Header from '../user/components/Header'
import DiaryShareInfo from '../user/components/DiaryShareInfo'

export default function user() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
        <View style={styles.diaryShareContainer}>
          <Text style={styles.diaryShareTitle}>日記共通相手</Text>
          <View style={styles.diaryShareInfoContainer}>
            <DiaryShareInfo />
            <DiaryShareInfo />
            <DiaryShareInfo />
          </View>
        </View>
      </View>
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
  // userInfo: {
  //   marginBottom: 16,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#ffffff',
  //   borderRadius: 10,
  // },
  // userImage: {
  //   width: 40,
  //   height: 40,
  //   margin: 16,
  // },
  // userInfoText: {
  //   marginBottom: 16,
  // },
  // userName: {
  //   fontSize: 14,
  //   lineHeight: 24
  // },
  // userInfoIcon: {
  //   marginLeft: 'auto',
  //   justifyContent: 'flex-end',
  //   marginRight: 16,
  // },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
})