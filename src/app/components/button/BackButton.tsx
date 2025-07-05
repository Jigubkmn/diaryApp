import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import handleBack from '../../actions/handleBack';

export default function BackButton() {
  return (
    <TouchableOpacity onPress={handleBack} style={styles.headerBackButton}>
      <Text style={styles.headerButtonText}>戻る</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerBackButton: {
    width: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerButtonText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#FFA500',
  },
})