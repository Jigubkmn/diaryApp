import React, { useState } from 'react';
import { StyleSheet, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, InputAccessoryView, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import Feeling from '../diaryCreation/components/Feeling';
import Header from '../diaryCreation/components/Header';
import ImageIcon from '../components/Icon/ImageIcon';

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

  // 画像選択ボタンの処理
  const handleImageSelect = () => {
    // TODO: 画像選択機能を実装
    console.log('画像選択ボタンが押されました');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          inputAccessoryViewID="imageSelectionBar"
        />
        <InputAccessoryView nativeID="imageSelectionBar">
          <View style={styles.inputAccessoryContainer}>
            <TouchableOpacity style={styles.imageSelectButton} onPress={handleImageSelect}>
              <ImageIcon size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  inputAccessoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginLeft: 8,
  },
  imageSelectButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
