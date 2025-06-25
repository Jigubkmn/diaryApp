import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
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
      <View style={styles.bodyContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {/* ユーザー画像 */}
            <Image source={userImage} style={styles.userImage} />
            <TouchableOpacity style={styles.editIconOverlay} onPress={() => {}}>
              <EditIcon size={24} color="#FFA500" />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.userIDContainer}>
            <Text style={styles.userIDTitle}>ユーザーID</Text>
            <Text style={styles.userIDText}>AAAABBBBCCCCDDDD</Text>
          </View> */}
        </View>
        <View style={styles.diaryShareContainer}>
          <Text style={styles.diaryShareTitle}>日記共通相手</Text>
          <View style={styles.diaryShareInfoContainer}>
            <DiaryShareInfo />
            <DiaryShareInfo />
            <DiaryShareInfo />
          </View>
        </View>
      </View>
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
    flex: 1,
    padding: 16,
    marginTop: 16,
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
  // userInfo: {
  //   marginBottom: 16,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#ffffff',
  //   borderRadius: 10,
  // },
  // userImage: {
  //   width: 40,
  //   height: 40,
  //   margin: 16,
  // },
  // userInfoText: {
  //   marginBottom: 16,
  // },
  // userName: {
  //   fontSize: 14,
  //   lineHeight: 24
  // },
  // userInfoIcon: {
  //   marginLeft: 'auto',
  //   justifyContent: 'flex-end',
  //   marginRight: 16,
  // },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
})