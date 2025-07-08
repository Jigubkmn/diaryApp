import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { DiaryType } from '../../../../../type/diary';
import { userImage, noImage } from '../../../constants/userImage';
import { feelings } from '../../../constants/feelings';
import formatTimestampToTime from '../../../actions/formatTimestampToTime';
import formatDate from '../../../actions/formatData';
import dayjs from 'dayjs';

type Props = {
  diaryList: DiaryType
}

export default function DiaryList({ diaryList } :Props) {
  const [diaryDate, setDiaryDate] = useState("");
  const router = useRouter();

  // 体調の画像を取得
  const feelingImage = feelings.find((feeling) => feeling.name === diaryList.feeling)?.image;
  // 日記更新日時を時間と分に変換
  const formattedTime = formatTimestampToTime({diaryList});

  const handleDiaryPress = () => {
    // 日記詳細画面に遷移
    router.push({
      pathname: `/diary/show/diaryShow`,
      params: {
        diaryId: diaryList.id,
        isTouchFeelingButton: 'false'
      }
    });
  };

  useEffect(() => {
    // 日付を文字列に変換する関数：◯月◯日(◯)
    if (diaryList.diaryDate) {
      // Timestampをdayjsオブジェクトに変換
      const dayjsDate = dayjs(diaryList.diaryDate.toDate());
      const formattedDate = formatDate(dayjsDate);
      setDiaryDate(formattedDate);
    }
  }, [diaryList.diaryDate])

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.diaryList} onPress={handleDiaryPress} activeOpacity={0.7}>
        <View style={styles.diaryDateContainer}>
          <Text style={styles.diaryDay}>{diaryDate}</Text>
        </View>
        <View style={styles.diaryContentContainer}>
          {/* 日記作成者のアイコン画像 */}
          <View style={styles.diaryUserIconContainer}>
            <Image
              source={userImage}
              style={styles.diaryUserIcon}
            />
          </View>
          <View style={styles.diaryContent}>
            <View style={styles.diaryTimeContainer}>
              <Text style={styles.diaryTime}>{formattedTime}</Text>
              <Image
                source={feelingImage}
                style={styles.feelingImage}
              />
            </View>
            {/* 日記内容 */}
            <Text style={styles.diaryContentText} numberOfLines={2} ellipsizeMode="tail">
              {diaryList.diaryText}
            </Text>
          </View>
          {/* 日記投稿画像 */}
          <View style={styles.diaryImageContainer}>
            <Image
              source={diaryList.selectedImage ? { uri: diaryList.selectedImage } : noImage}
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