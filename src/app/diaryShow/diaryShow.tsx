import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Image, Text, ScrollView } from 'react-native';
import Feeling from '../components/diary/Feeling';
import { DiaryType } from '../../../type/diary';
import { auth, db } from '../../config';
import { doc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams, Stack } from 'expo-router';
import Header from './components/Header';


export default function diaryShow() {
  const [selectedDiaryInfo, setSelectedDiaryInfo] = useState<DiaryType | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const userId = auth.currentUser?.uid;
  const { diaryId } = useLocalSearchParams<{ diaryId?: string }>(); //idだけを取得
  const { isTouchFeelingButton } = useLocalSearchParams<{ isTouchFeelingButton?: string }>();



  useEffect(() => {
    const fetchDiary = async () => {
      if (userId === null || diaryId === null) return;
      try {
        const diaryRef = doc(db, `users/${userId}/diary/${diaryId}`);
        const diarySnap = await getDoc(diaryRef);

        if (diarySnap.exists()) {
          const data = diarySnap.data();
          const diary: DiaryType = {
            id: diarySnap.id,
            diaryText: data.diaryText,
            diaryDate: data.diaryDate,
            feeling: data.feeling || null,
            updatedAt: data.updatedAt,
            selectedImage: data.selectedImage
          };
          setSelectedDiaryInfo(diary);
        } else {
          console.log('対象データがありません。');
        }
      } catch (error) {
        console.error('対象データの取得に失敗しました。', error);
      }
    };

    fetchDiary();
  }, []);

  useEffect(() => {
    // 体調のnameを取得
    const feelingName = selectedDiaryInfo?.feeling || null;
    setSelectedFeeling(feelingName);
  }, [selectedDiaryInfo?.feeling]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerArea}>
          <Header
            diaryText={selectedDiaryInfo?.diaryText || ''}
            selectedFeeling={selectedDiaryInfo?.feeling || null}
            setDiaryText={() => {}}
            setSelectedFeeling={() => {}}
            selectedImage={selectedDiaryInfo?.selectedImage || null}
          />
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
            {selectedDiaryInfo.selectedImage && (
              <View style={styles.selectedImageContainer}>
                <Image source={{ uri: selectedDiaryInfo.selectedImage }} style={styles.selectedImage} />
              </View>
            )}
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
    backgroundColor: '#fff',
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
});
