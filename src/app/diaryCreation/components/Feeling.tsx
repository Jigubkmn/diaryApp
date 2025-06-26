import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Feeling() {

  const feelings = [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    { name: '絶好調', image: require('../../../../assets/images/excellent_icon.png') },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    { name: '好調', image: require('../../../../assets/images/good_icon.png') },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    { name: '普通', image: require('../../../../assets/images/normal_icon.png') },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    { name: '不調', image: require('../../../../assets/images/bad_icon.png') },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    { name: '絶不調', image: require('../../../../assets/images/terrible_icon.png') },
  ];

  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  return (
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
  )
}

const styles = StyleSheet.create({
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
});
