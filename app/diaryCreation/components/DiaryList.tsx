import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'

export default function DiaryList() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const userImage = require('../../../assets/images/user.png');

  return (
    <View style={styles.diaryList}>
      <View style={styles.diaryDateContainer}>
        <Text style={styles.diaryDate}>6月18日(水)</Text>
      </View>
      <View>
        {/* 日記作成者のアイコン画像 */}
        <View>
          <Image
            source={userImage}
            style={styles.diaryCreateUserIcon}
          />
        </View>
        <Text>今日は上司の佐藤さんに褒められて</Text>
        <Text>嬉しい1日だった。何を褒められ．．．</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  diaryList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  diaryDateContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 24,
  },
  diaryDate: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  diaryCreateUserIcon: {
    width: 30,
    height: 30,
  },
})