import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import BackButton from '../../components/button/BackButton';
import HeaderDiaryDateTitle from '../../components/diary/HeaderDiaryDateTitle';
import formatDate from '../../actions/formatData';

type Props = {
  diaryId: string;
  diaryDate: dayjs.Dayjs;
}

export default function Header({ diaryDate }: Props) {
  const [date, setDate] = useState(diaryDate);  // diaryDate："2025-07-06T09:21:43.658Z"
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // diaryDateが変更されたらdateも更新
    setDate(diaryDate);
  }, [diaryDate]);

  useEffect(() => {
    // 日付を文字列に変換する関数：◯月◯日(◯)
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
  }, [date]);

  return (
    <View style={styles.header}>
      {/* ヘッダー左側 */}
      <BackButton />
      {/* 日付タイトル */}
      <HeaderDiaryDateTitle selectedDate={selectedDate} date={date} setDate={setDate} isArrowIcon={false} />
      <View style={styles.headerRight}>
        <TouchableOpacity
          // onPress={() => {handleUpdate(diaryText, date, selectedFeeling, selectedImage)}}
          onPress={() => {}}
          // style={[!isFormValid() ? styles.disabledButton : styles.headerSaveButton]}
          // disabled={!isFormValid()}
        >
          {/* <Text style={[styles.headerButtonText, !isFormValid() && styles.disabledButtonText]}>保存</Text> */}
          <Text style={styles.headerButtonText}>更新</Text>
        </TouchableOpacity>
      </View>
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
  headerRight: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerButtonText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#FFA500',
  },
});