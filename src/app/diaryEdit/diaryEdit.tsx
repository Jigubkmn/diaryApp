import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import Feeling from '../components/diary/Feeling';
import Header from './components/Header';
import { DiaryType } from '../../../type/diary';
import { auth } from '../../config';
import { useLocalSearchParams } from 'expo-router';
import fetchSelectedDiary from '../actions/fetchSelectedDiary';
import dayjs from 'dayjs';

export default function DiaryEdit() {
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

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerArea}>
          <Header diaryId={selectedDiaryInfo?.id || ''} diaryDate={selectedDiaryInfo?.diaryDate || dayjs()} />
          <Feeling selectedFeeling={selectedFeeling || null} setSelectedFeeling={() => {}} isTouchFeelingButton={isTouchFeelingButton === 'true'} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerArea: {
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
});