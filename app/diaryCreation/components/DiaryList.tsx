import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
// import { addLineBreaks } from '../action/addLineBreaks'

export default function DiaryList() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const userImage = require('../../../assets/images/user.png');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const noImage = require('../../../assets/images/no_image.png');


  return (
    <View style={styles.diaryList}>
      <View style={styles.diaryDateContainer}>
        <Text style={styles.diaryDay}>6月18日(水)</Text>
      </View>






      <View style={styles.diaryContentContainer}>
        {/* 日記作成者のアイコン画像 */}
        <View style={styles.diaryCreateUserIconContainer}>
          <Image
            source={userImage}
            style={styles.diaryCreateUserIcon}
          />
        </View>
        {/* 日記内容 */}
        <View style={styles.diaryContent}>
          <Text>21:22</Text>
          <Text numberOfLines={3} ellipsizeMode="tail">
            {/* {formattedText} */}
            今日は上司の佐藤さんに褒められて嬉しい1日だった。何を褒められ．．．
          </Text>
        </View>
        {/* 日記投稿画像 */}
        <View style={styles.diaryImageContainer}>
          <Image
            source={noImage}
            style={styles.diaryImage}
          />
        </View>
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
  diaryDay: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  diaryContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  diaryCreateUserIconContainer: {
    marginRight: 16,
  },
  diaryContent: {
    //
  },
  diaryCreateUserIcon: {
    width: 40,
    height: 40,
  },
  diaryImageContainer: {
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  diaryImage: {
    width: 80,
    height: 80,
  },
})