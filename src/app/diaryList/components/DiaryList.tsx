import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

export default function DiaryList({ date }: { date: string }) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const userImage = require('../../../../assets/images/user.png');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const noImage = require('../../../../assets/images/no_image.png');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const feelingImage = require('../../../../assets/images/excellent_icon.png');

  const diaryText = "今日は上司の佐藤さんに褒められて嬉しい1日だった。何を褒められたかというと";

  const handleDiaryPress = () => {
    // 日記編集画面に遷移（仮のID: 1を使用）
    router.push('/diaryEdit/diaryEdit?id=1');
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.diaryList} onPress={handleDiaryPress} activeOpacity={0.7}>
        <View style={styles.diaryDateContainer}>
          <Text style={styles.diaryDay}>{date}</Text>
        </View>
        <View style={styles.diaryContentContainer}>
          {/* 日記作成者のアイコン画像 */}
          <View style={styles.diaryUserIconContainer}>
            <Image
              source={userImage}
              style={styles.diaryUserIcon}
            />
          </View>
          {/* 日記内容 */}
          <View style={styles.diaryContent}>
            <View style={styles.diaryTimeContainer}>
              <Text style={styles.diaryTime}>21:22</Text>
              <Image
                source={feelingImage}
                style={styles.feelingImage}
              />
            </View>
            <Text style={styles.diaryContentText} numberOfLines={2} ellipsizeMode="tail">
              {diaryText}
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
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  diaryList: {
    backgroundColor: '#fff',
  },
  diaryDateContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 24,
  },
  diaryDay: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  diaryContentContainer: {
    padding: 16,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  diaryUserIconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  diaryUserIcon: {
    width: 50,
    height: 50,
  },
  diaryContent: {
    flex: 1,
    marginRight: 16,
  },
  diaryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diaryTime: {
    fontSize: 12,
    lineHeight: 20,
    marginRight: 8
  },
  feelingImage: {
    width: 30,
    height: 30,
  },
  diaryContentText: {
    fontSize: 14,
    lineHeight: 24,
    // テキストが折り返されるようにする
    flexWrap: 'wrap',
    flexShrink: 1,
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