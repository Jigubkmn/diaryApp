import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

type Props = {
  buttonText: string
  email: string
  password: string
  userName: string
  handleAuthButton: (email: string, password: string, userName: string) => void
  isFormValid: () => string
}

export default function AuthButton({ buttonText, email, password, userName, handleAuthButton, isFormValid }: Props) {
  return (
    <TouchableOpacity
      onPress={() => {handleAuthButton(email, password, userName)}}
      style={[isFormValid() ? styles.authButton : styles.disabledButton]}
      disabled={!isFormValid()}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  disabledButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#27CBFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 16,
    opacity: 0.5,
  },
  authButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#27CBFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
})