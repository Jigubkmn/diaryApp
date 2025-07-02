import React, { useState } from 'react';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import Feeling from '../diaryCreation/components/Feeling';
import Header from '../diaryCreation/components/Header';

export default function DiaryCreation() {
  const { isShowBackButton } = useLocalSearchParams<{ isShowBackButton?: string }>();
  const [diaryText, setDiaryText] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  // 画面がフォーカスされた時に状態をリセット
  useFocusEffect(
    React.useCallback(() => {
      setDiaryText('');
      setSelectedFeeling(null);
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        diaryText={diaryText}
        selectedFeeling={selectedFeeling}
        setDiaryText={setDiaryText}
        setSelectedFeeling={setSelectedFeeling}
        isShowBackButton={isShowBackButton === 'true'}
      />
      <Feeling selectedFeeling={selectedFeeling} setSelectedFeeling={setSelectedFeeling} />
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="今日の出来事を入力してください"
        value={diaryText}
        onChangeText={setDiaryText}
        textAlignVertical="top"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
