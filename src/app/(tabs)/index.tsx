import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import DiaryList from '../diaryList/components/DiaryList'
import { auth, db } from '../../config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { DiaryType } from '../../../type/diary';
import PlusIcon from '../components/Icon/PlusIcon';
import { useRouter } from 'expo-router';
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';

export default function home() {
  const [diaryLists, setDiaryLists] = useState<DiaryType[]>([]);
  const router = useRouter();

  // モーダルの表示状態を管理するstate
  const [isModalVisible, setModalVisible] = useState(false);

  // 表示用の年月を管理するstate
  const [displayDate, setDisplayDate] = useState(dayjs());

  // 選択された年月を'YYYY-M'形式の文字列で保持するstate
  const [selectedYearMonth, setSelectedYearMonth] = useState(displayDate.format('YYYY-M'));

  // ピッカー用の年月リストを生成する
  const generateYearMonths = () => {
    const list = [];
    // 現在から10年前から10年後まで生成
    const startYear = dayjs().year() - 10;
    const endYear = dayjs().year() + 10;
    for (let year = endYear; year >= startYear; year--) {
      // 新しい月から表示するため、12月から1月へループ
      for (let month = 12; month >= 1; month--) {
        list.push({
          label: `${year}年${month}月`,
          value: `${year}-${month}` // 'YYYY-M'形式
        });
      }
    }
    return list;
  };
  const yearMonths = generateYearMonths();

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId === null) return;
    const ref = collection(db, `users/${userId}/diary`)
    const q = query(ref, orderBy('diaryDate', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteDiaryList: DiaryType[] = []
      snapshot.docs.forEach((doc) => {
        const { diaryText, diaryDate, feeling, updatedAt } = doc.data();
        remoteDiaryList.push({ id: doc.id, diaryText, diaryDate, feeling, updatedAt })
      })
      setDiaryLists(remoteDiaryList)
    })
    return unsubscribe;
  }, [])

  const handleYearMonthPress = () => {
    // モーダルを開くときに、現在の表示年月をピッカーの初期値に設定する
    setSelectedYearMonth(displayDate.format('YYYY-M'));
    setModalVisible(true);
  }

  const handleModalClose = () => {
    setModalVisible(false);
  }

  const handleModalConfirm = () => {
    // OKボタンが押されたら表示年月を更新
    // 'YYYY-M'形式の文字列からdayjsオブジェクトを生成
    setDisplayDate(dayjs(selectedYearMonth));
    setModalVisible(false);
  }

// 「今月」ボタンが押されたときの処理
  const handleSelectThisMonth = () => {
    // 現在の年月を'YYYY-M'形式で取得
    const currentMonth = dayjs().format('YYYY-M');
    // ピッカーの選択値を現在の年月に更新する
    setSelectedYearMonth(currentMonth);
  };

  return (
    <View style={styles.container}>
      {/* 年月 */}
      <View style={styles.yearMonthContainer}>
        <TouchableOpacity onPress={handleYearMonthPress}>
          <Text style={styles.yearMonthText}>{displayDate.format('YYYY年M月')} ↓</Text>
        </TouchableOpacity>
      </View>
      {/* 日記一覧 */}
      <ScrollView style={styles.diaryListContainer}>
        {diaryLists.length > 0 && diaryLists.map((diaryList) => {
          return (
            <DiaryList key={diaryList.id} diaryList={diaryList} />
          )
        })}
      </ScrollView>
      {/* 日記作成ボタン */}
      <TouchableOpacity style={styles.plusButton} onPress={() => router.push('/diaryCreation')}>
        <PlusIcon width={30} height={30} color="white" />
      </TouchableOpacity>
      {/* 年月選択モーダル */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleModalClose} // 背景をタップしたら閉じる
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleModalClose} style={styles.modalHeaderButton}>
              <Text style={styles.modalButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSelectThisMonth} style={styles.modalHeaderButton}>
              <Text style={[styles.modalButtonText, styles.modalConfirmText]}>今月</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleModalConfirm} style={styles.modalHeaderButton}>
              <Text style={[styles.modalButtonText, styles.modalConfirmText]}>OK</Text>
            </TouchableOpacity>
          </View>
          {/* ピッカー */}
          <Picker
            selectedValue={selectedYearMonth}
            onValueChange={(itemValue) => setSelectedYearMonth(itemValue)}
          >
            {yearMonths.map(item => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yearMonthContainer: {
    // View用のスタイル（必要に応じて）
    backgroundColor: '#ffffff',
  },
  yearMonthText: {
    fontSize: 20,
    lineHeight: 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  diaryListContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  plusButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    backgroundColor: '#FFA500',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // ドロップシャドウ
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20, // SafeAreaViewを考慮する場合は調整
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalHeaderButton: { // ★追加: 3つのボタンが均等な幅を持つようにする
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007AFF', // iOSの標準的な青色
    fontWeight: 'bold',
  },
  modalConfirmText: {
    fontWeight: 'bold',
  },
})