import React, { useState } from 'react';
import { StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
//import { useLocalSearchParams } from 'expo-router';
import Feeling from '../diaryCreation/components/Feeling';
import Header from './components/Header';

export default function DiaryEdit() {
  const [diaryText, setDiaryText] = useState('');
  // const params = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <Header diaryText={diaryText} />
        <Feeling />
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="今日の出来事を入力してください"
          value={diaryText}
          onChangeText={setDiaryText}
          textAlignVertical="top"
        />
      </SafeAreaView>
    </>
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