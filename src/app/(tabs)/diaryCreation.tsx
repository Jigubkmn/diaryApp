import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, View, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Feeling from '../components/diary/Feeling';
import Header from '../diaryCreation/components/Header';
import DiaryText from '../components/diary/DiaryText';
import DiaryImage from '../components/diary/DiaryImage';

export default function DiaryCreation() {
  const { isShowBackButton } = useLocalSearchParams<{ isShowBackButton?: string }>();
  const [diaryText, setDiaryText] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isTouchFeelingButton } = useLocalSearchParams<{ isTouchFeelingButton?: string }>();

  // 画面がフォーカスされた時に状態をリセット
  useFocusEffect(
    React.useCallback(() => {
      setDiaryText('');
      setSelectedFeeling(null);
      setSelectedImage(null);
    }, [])
  );

  // 画像選択ボタンの処理
  const handleImageSelect = async () => {
    try {
      // カメラロールへのアクセス許可をリクエスト
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('エラー', 'カメラロールへのアクセス許可が必要です');
        return;
      }

      // 画像選択を実行
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        console.log('選択された画像:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('画像選択エラー:', error);
      Alert.alert('エラー', '画像の選択に失敗しました');
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerArea}>
          <Header
            diaryText={diaryText}
            selectedFeeling={selectedFeeling}
            setDiaryText={setDiaryText}
            setSelectedFeeling={setSelectedFeeling}
            isShowBackButton={isShowBackButton === 'true'}
            selectedImage={selectedImage}
          />
          <Feeling selectedFeeling={selectedFeeling} setSelectedFeeling={setSelectedFeeling} isTouchFeelingButton={isTouchFeelingButton === 'true'} />
        </View>
        <ScrollView style={styles.contentArea}>
          {/* 今日の出来事 */}
          <DiaryText diaryText={diaryText} setDiaryText={setDiaryText} />
          {/* 今日の出来事の画像 */}
          <DiaryImage handleImageDelete={handleImageDelete} handleImageSelect={handleImageSelect} selectedImage={selectedImage} />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
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
  }
});
