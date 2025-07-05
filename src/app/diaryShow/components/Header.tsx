import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';
import formatDate from '../../actions/formatData';
import HeaderDiaryDateTitle from '../../components/diary/HeaderDiaryDateTitle';
import BackButton from '../../components/button/BackButton';
import EditIcon from '../../components/Icon/EditIcon';
import DeleteIcon from '../../components/Icon/DeleteIcon';

type Props = {
  diaryId: string;
  onDelete?: () => void;
}

export default function Header({ diaryId, onDelete }: Props) {
  const router = useRouter();
  const [date, setDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
  // 日付を文字列に変換する関数：◯月◯日(◯)
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
  }, [date])

  const handleEdit = () => {
    router.push({
      pathname: '/diaryEdit/diaryEdit',
      params: { id: diaryId }
    })
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  }

  return (
    <View style={styles.header}>
      {/* ヘッダー左側 */}
      <BackButton />
      {/* 日付タイトル */}
      <HeaderDiaryDateTitle selectedDate={selectedDate} date={date} setDate={setDate} />
      {/* ヘッダー右側 */}
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={handleEdit} style={styles.editIcon}>
          <EditIcon size={24} color="#FFA500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <DeleteIcon size={24} color="#FFA500" />
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
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  editIcon: {
    marginRight: 8,
  },
});