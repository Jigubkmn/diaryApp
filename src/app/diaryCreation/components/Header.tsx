import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LeftArrowIcon from '../../components/Icon/LeftArrowIcon';
import RightArrowIcon from '../../components/Icon/RightArrowIcon';
import dayjs from 'dayjs';

type Props = {
  diaryText: string;
}

export default function Header({ diaryText }: Props) {
  const today = dayjs();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(today);

  // 日付を文字列に変換する関数
  const formatDate = (date: dayjs.Dayjs) => {
    const month = date.month() + 1; // dayjsは0ベースなので+1
    const day = date.date();
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.day()];
    return `${month}月${day}日(${dayOfWeek})`;
  };

  // 1日前に移動
  const handlePreviousDay = () => {
    const newDate = selectedDate.subtract(1, 'day');
    setSelectedDate(newDate);
  };

  // 1日後に移動
  const handleNextDay = () => {
    const newDate = selectedDate.add(1, 'day');
    setSelectedDate(newDate);
  };

  const handleSave = () => {
    // 保存処理をここに実装
    console.log('保存:', diaryText);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>戻る</Text>
      </TouchableOpacity>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={handlePreviousDay} style={styles.iconButton}>
          <LeftArrowIcon size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{formatDate(selectedDate)}</Text>
        <TouchableOpacity onPress={handleNextDay} style={styles.iconButton}>
          <RightArrowIcon size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSave} style={styles.headerSaveButton}>
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
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});