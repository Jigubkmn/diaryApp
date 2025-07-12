import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

// 画像選択ボタンの処理
export default async function handleImageSelect(setSelectedImage: (image: string) => void) {
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
      aspect: [1, 1],
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
}