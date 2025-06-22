import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';

const feelings = [
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  { name: '絶好調', image: require('../../assets/images/excellent_icon.png') },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  { name: '好調', image: require('../../assets/images/good_icon.png') },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  { name: '普通', image: require('../../assets/images/normal_icon.png') },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  { name: '不調', image: require('../../assets/images/bad_icon.png') },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  { name: '絶不調', image: require('../../assets/images/terrible_icon.png') },
];

export default function DiaryCreation() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [diaryText, setDiaryText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.question}>どのような1日でしたか？</Text>
        <View style={styles.feelingsContainer}>
          {feelings.map((feeling) => (
            <TouchableOpacity
              key={feeling.name}
              style={styles.feelingItem}
              onPress={() => setSelectedFeeling(feeling.name)}
            >
              <Image
                source={feeling.image}
                style={[
                  styles.feelingImage,{ opacity: selectedFeeling === feeling.name ? 1 : 0.4 }]}
              />
              <Text style={[styles.feelingText, { opacity: selectedFeeling === feeling.name ? 1 : 0.4 }]}>{feeling.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TextInput
        style={styles.textInput}
        multiline
        placeholder="今日の出来事を入力してください"
        value={diaryText}
        onChangeText={setDiaryText}
        textAlignVertical="top"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerButton: {
    fontSize: 16,
    color: '#FF9800',
  },
  headerDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 16,
    lineHeight: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feelingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 40,
  },
  feelingItem: {
    alignItems: 'center',
  },
  feelingImage: {
    width: 40,
    height: 40,
  },
  feelingText: {
    fontSize: 14,
    lineHeight: 24,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
});
