import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

type Props = {
  text: string
  href: string
}

export default function AuthNavigationLink({ text, href }: Props) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity>
        <Text style={styles.loginLinkText}>{text}</Text>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  loginLinkText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#26B441',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
})