import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, View, Image, Alert, Text, ScrollView } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Feeling from '../components/diary/Feeling';
import Header from '../diaryCreation/components/Header';
import AddImageIcon from '../components/Icon/AddImageIcon';
import XIcon from '../components/Icon/XIcon';
import DiaryText from '../components/diary/DiaryText';

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
          <View style={styles.imageContainer}>
            <View style={styles.imageTitleContainer}>
              <Text style={styles.textInputTitle}>今日の画像</Text>
              <TouchableOpacity
                onPress={handleImageDelete}
              >
                <XIcon size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            {/* 画像表示部分 */}
            <TouchableOpacity style={styles.selectedImageContainer} onPress={handleImageSelect}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                ) : (
                  <View style={styles.addImageContainer}>
                      <AddImageIcon size={48} color="#000000" />
                    <Text style={styles.addImageText}>今日の写真を選択して下さい</Text>
                  </View>
                )}
            </TouchableOpacity>
          </View>
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
  textInputTitle: {
    fontSize: 16,
    lineHeight: 30,
    color: '#000000',
    marginLeft: 8,
    marginVertical: 8,
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
  addImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageText: {
    fontSize: 16,
    color: '#000000',
  },
});
