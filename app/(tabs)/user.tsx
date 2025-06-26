import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Header from '../user/components/Header'
import DiaryShareInfo from '../user/components/DiaryShareInfo'
import { Image } from 'expo-image'
import EditIcon from '../../components/Icon/EditIcon';


export default function user() {

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const userImage = require('../../assets/images/user.png')
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.userInfoContainer}>
          {/* ユーザー画像 */}
          <View style={styles.userImageContainer}>
            <Image source={userImage} style={styles.userImage} />
            <TouchableOpacity style={styles.editIconOverlay} onPress={() => {}}>
              <EditIcon size={24} color="#FFA500" />
            </TouchableOpacity>
          </View>
          {/* ユーザーID */}
          <View style={styles.userTextContainer}>
            <Text style={styles.userTitle}>ユーザーID</Text>
            <Text style={styles.userText}>AAAABBBBCCCCDDDD</Text>
          </View>
          {/* ニックネーム */}
          <View style={styles.userTextContainer}>
            <View style={styles.userTextWrapper}>
              <Text style={styles.userTitle}>ニックネーム</Text>
              <TouchableOpacity onPress={() => {}}>
                <EditIcon size={24} color="#FFA500" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userText}>塩見太郎</Text>
          </View>
        </View>
        <View style={styles.diaryShareContainer}>
          <Text style={styles.diaryShareTitle}>日記共通相手</Text>
          <View style={styles.diaryShareInfoContainer}>
            <DiaryShareInfo />
            <DiaryShareInfo />
            <DiaryShareInfo />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 48,
  },
  userInfoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    marginHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  userImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  userImage: {
    width: 100,
    height: 100,
  },
  editIconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFA500',
    backgroundColor: '#ffffff',
    padding: 3,
  },
  userTextContainer: {
    marginTop: 16,
    marginRight: 'auto',
  },
  userTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  userText: {
    fontSize: 14,
    lineHeight: 24,
  },
  diaryShareContainer: {
    flex: 1,
    marginTop: 16,
  },
  diaryShareTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
    marginLeft: 8
  },
  diaryShareInfoContainer: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
})