import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import LeftArrowIcon from '../../components/Icon/LeftArrowIcon';
import RightArrowIcon from '../../components/Icon/RightArrowIcon';
import dayjs from 'dayjs';
import { auth, db } from '../../../config';
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import formatDate from '../../actions/formatData';


type Props = {
  diaryText: string;
  selectedFeeling: string | null;
  setDiaryText: (text: string) => void;
  setSelectedFeeling: (feeling: string | null) => void;
}

export default function Header({ diaryText, selectedFeeling, setDiaryText, setSelectedFeeling }: Props) {
  const today = dayjs();
  const router = useRouter();
  const [date, setDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
  // 日付を文字列に変換する関数：◯月◯日(◯)
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
  }, [date])

  // 1日前に移動
  const handlePreviousDay = () => {
    const newDate = date.subtract(1, 'day');
    setDate(newDate);
  };

  // 1日後に移動
  const handleNextDay = () => {
    const newDate = date.add(1, 'day');
    setDate(newDate);
  };

  // 日記を保存
  const handleSave = (diaryText: string, date: dayjs.Dayjs) => {
    const userId = auth.currentUser?.uid;
    if (userId === null) return;
    const ref = collection(db, `users/${userId}/diary`)
    addDoc(ref, {
      diaryText: diaryText,
      diaryDate: Timestamp.fromDate(date.toDate()),
      feeling: selectedFeeling,
      updatedAt: Timestamp.fromDate(new Date())
    })
      .then(() => {
        Alert.alert("日記を保存しました");
        setDiaryText("");
        setSelectedFeeling(null);
        router.push("/(tabs)")
      })
      .catch((error) => {
        console.log("error", error);
        Alert.alert("日記の保存に失敗しました");
      })
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {/* 左側のスペーサー - 右側のアイコンと同じ幅を確保 */}
      </View>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => {handlePreviousDay()}} style={styles.iconButton}>
          <LeftArrowIcon size={24} color="black" />
        </TouchableOpacity>
        {/* 日付表示 */}
        <Text style={styles.headerTitle}>{selectedDate}</Text>
        <TouchableOpacity onPress={() => {handleNextDay()}} style={styles.iconButton}>
          <RightArrowIcon size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {handleSave(diaryText, date)}} style={styles.headerSaveButton}>
        <Text style={styles.headerButtonText}>保存</Text>
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
    width: 80, // 右側のアイコン2つ分の幅（24px + 24px + 8px margin + 余裕）
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#FFA500',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  iconButton: {
    padding: 0,
  },
  headerSaveButton: {
    width: 80, // 左側と同じ幅を確保
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});