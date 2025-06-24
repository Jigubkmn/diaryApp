import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import Header from '../user/components/Header'

export default function user() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const userImage = require('../../assets/images/user.png');
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.diaryShareContainer}>
        <Text style={styles.diaryShareTitle}>日記共通相手</Text>
        <View style={styles.diaryShareInfo}>
          <View style={styles.diaryShareMainInfo}>
            <Image
              source={userImage}
              style={styles.diaryShareUserImage}
            />
            <Text style={styles.diaryShareUserName}>山田太郎</Text>
            <View style={styles.diaryShareToggleButton}>
              {/* 通知設定用トグルスイッチ */}
              <Text>通知</Text>
              {/*  */}
            </View>
          </View>
          <TouchableOpacity onPress={()=>{}} style={styles.diaryShareDeleteIcon}>
            <Text style={styles.diaryShareDeleteText}>削除</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 48,
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
  diaryShareInfo: {
    padding: 16,
    // flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  diaryShareMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  diaryShareUserImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  diaryShareUserName: {
    fontSize: 14,
    lineHeight: 24
  },
  diaryShareToggleButton: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  diaryShareDeleteIcon: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(255,0,0, 0.6)',
    padding: 0,
    borderRadius: 10,
  },
  diaryShareDeleteText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
    width: 50,
    height: 24,
    textAlign: 'center',
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
})