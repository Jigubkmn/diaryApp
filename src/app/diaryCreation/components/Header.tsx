import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';
import { auth, db } from '../../../config';
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import formatDate from '../../actions/formatData';
import HeaderDiaryDateTitle from '../../components/diary/HeaderDiaryDateTitle';
import BackButton from '../../components/button/BackButton';


type Props = {
  diaryText: string;
  selectedFeeling: string | null;
  setDiaryText: (text: string) => void;
  setSelectedFeeling: (feeling: string | null) => void;
  setSelectedImage: (image: string | null) => void;
  isShowBackButton: boolean;
  selectedImage: string | null;
}

export default function Header({
  diaryText,
  selectedFeeling,
  setDiaryText,
  setSelectedFeeling,
  setSelectedImage,
  isShowBackButton,
  selectedImage
}: Props) {
  const today = dayjs(); // "2025-07-06T09:17:23.408Z"
  const router = useRouter();
  const [date, setDate] = useState(today); // "2025-07-06T09:16:59.082Z"
  const [selectedDate, setSelectedDate] = useState(""); // 7月6日(日)

  useEffect(() => {
  // 日付を文字列に変換する関数：◯月◯日(◯)
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
  }, [date])

  // 必須項目が全て入力されているかチェック
  const isFormValid = () => {
    return diaryText && diaryText.trim() !== '' && date && selectedFeeling;
  };

  // 日記を保存
  const handleSave = (diaryText: string, date: dayjs.Dayjs, selectedFeeling: string | null, selectedImage: string | null) => {
    const userId = auth.currentUser?.uid;
    if (userId === null) return;
    if (!selectedFeeling) {
      Alert.alert("現在の感情を選択してください");
      return;
    }
    if (!diaryText || diaryText.trim() === '') {
      Alert.alert("日記内容を入力してください");
      return;
    }
    const ref = collection(db, `users/${userId}/diary`)
    addDoc(ref, {
      diaryText: diaryText,
      diaryDate: Timestamp.fromDate(date.toDate()),
      feeling: selectedFeeling,
      updatedAt: Timestamp.fromDate(new Date()),
      selectedImage: selectedImage
    })
      .then(() => {
        Alert.alert("日記を保存しました");
        setDiaryText("");
        setSelectedFeeling(null);
        setSelectedImage(null);
        router.push("/(tabs)")
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("日記の保存に失敗しました");
      })
  };

  return (
    <View style={styles.header}>
      {/* ヘッダー左側 */}
      {isShowBackButton ? (
        <BackButton />
      ) : (
        <View style={styles.headerLeft}>
          {/* 左側のスペーサー - タブからアクセスした場合は空のスペース */}
        </View>
      )}
      {/* 日付タイトル */}
      <HeaderDiaryDateTitle selectedDate={selectedDate} date={date} setDate={setDate} isArrowIcon={true} />
      {/* ヘッダー右側 */}
      <TouchableOpacity
        onPress={() => {handleSave(diaryText, date, selectedFeeling, selectedImage)}}
        style={[!isFormValid() ? styles.disabledButton : styles.headerSaveButton]}
        disabled={!isFormValid()}
      >
        <Text style={[styles.headerButtonText, !isFormValid() && styles.disabledButtonText]}>保存</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 60,
    backgroundColor: '#ffffff',
  },
  headerLeft: {
    width: 30,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#FFA500',
  },
  headerSaveButton: {
    width: 80,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#999999',
  },
});