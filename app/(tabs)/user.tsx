import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Header from '../user/components/Header'

export default function user() {
  return (
    <SafeAreaView>
      <Header />
      <View>
        <Text>UserHome</Text>
      </View>
    </SafeAreaView>
  )
}
