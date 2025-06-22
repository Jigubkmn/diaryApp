import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import getTodayDate from '../../../actions/getTodayDate';
import LeftArrowIcon from '../../../components/Icon/LeftArrowIcon';
import RightArrowIcon from '../../../components/Icon/RightArrowIcon';

type Props = {
  diaryText: string;
}

export default function Header({ diaryText }: Props) {
  const router = useRouter();

  // 本日の日付を取得
  const todayDate = getTodayDate();

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
      <LeftArrowIcon size={24} color="black" />
      <Text style={styles.headerTitle}>{todayDate}</Text>
      <RightArrowIcon size={24} color="black" />
      <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>保存</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});