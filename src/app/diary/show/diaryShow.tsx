import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Alert } from 'react-native';
import { Image } from 'expo-image';
import Feeling from '../../components/diary/Feeling';
import { DiaryType } from '../../../../type/diary';
import { auth, db } from '../../../config';
import { doc, deleteDoc } from 'firebase/firestore';
import { useLocalSearchParams, Stack } from 'expo-router';
import Header from './components/Header';
import handleBack from '../../actions/handleBack';
import dayjs from 'dayjs';
import fetchSelectedDiary from '../../actions/fetchSelectedDiary';


export default function diaryShow() {
  const [selectedDiaryInfo, setSelectedDiaryInfo] = useState<DiaryType | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const userId = auth.currentUser?.uid;
  const { diaryId } = useLocalSearchParams<{ diaryId?: string }>(); //idだけを取得
  const { isTouchFeelingButton } = useLocalSearchParams<{ isTouchFeelingButton?: string }>();

  useEffect(() => {
    // 日記の情報を取得
    fetchSelectedDiary({ userId, diaryId, setSelectedDiaryInfo });
  }, []);

  useEffect(() => {
    // 体調のnameを取得
    const feelingName = selectedDiaryInfo?.feeling || null;
    setSelectedFeeling(feelingName);
  }, [selectedDiaryInfo?.feeling]);

  const handleDelete = async () => {
    if (!userId || !diaryId) return;
    Alert.alert(
      '日記を削除',
      'この日記を削除しますか？\nこの操作は取り消せません。',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            try {
              const diaryRef = doc(db, `users/${userId}/diary/${diaryId}`);
              await deleteDoc(diaryRef);
              console.log('日記を削除しました');
              handleBack();
            } catch (error) {
              console.error('日記の削除に失敗しました:', error);
              Alert.alert('エラー', '日記の削除に失敗しました。');
            }
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerArea}>
          <Header diaryId={selectedDiaryInfo?.id || ''} diaryDate={selectedDiaryInfo?.diaryDate || dayjs()} onDelete={handleDelete} />
          <Feeling selectedFeeling={selectedFeeling || null} setSelectedFeeling={() => {}} isTouchFeelingButton={isTouchFeelingButton === 'true'} />
        </View>
        {selectedDiaryInfo && (
          <ScrollView style={styles.contentArea}>
            {/* 今日の出来事 */}
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputTitle}>今日の出来事</Text>
              <Text style={styles.textInput}>{selectedDiaryInfo.diaryText}</Text>
            </View>
          {/* 今日の出来事の画像 */}
          <View style={styles.imageContainer}>
            <View style={styles.imageTitleContainer}>
              <Text style={styles.textInputTitle}>今日の画像</Text>
            </View>
            {/* 画像表示部分 */}
            <View style={styles.selectedImageContainer}>
              {selectedDiaryInfo.selectedImage ? (
                <Image
                  source={{ uri: selectedDiaryInfo.selectedImage }}
                  style={styles.selectedImage}
                  contentFit="contain"
                  cachePolicy="memory-disk"
                />
              ) : (
                <Text style={styles.ImageText}>写真を選択していません</Text>
              )}
            </View>
          </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerArea: {
    backgroundColor: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
  },
  textInputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  textInputTitle: {
    fontSize: 16,
    lineHeight: 30,
  },
  textInput: {
    height: 250,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  imageContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  imageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedImageContainer: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  ImageText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#000000',
  }
});
