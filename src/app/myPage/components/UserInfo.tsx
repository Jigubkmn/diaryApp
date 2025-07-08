import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Image } from 'expo-image'
import EditIcon from '../../components/Icon/EditIcon';
import { auth } from '../../../config';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { UserInfoType } from '../../../../type/userInfo';

type UserInfoProps = {
  userInfos: UserInfoType | null
}

export default function UserInfo({ userInfos }: UserInfoProps) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const userImage = require('../../../../assets/images/user.png')

  // ログアウト
  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      router.replace("/auth/login")
    })
    .catch((error) => {
      console.log("error", error)
      Alert.alert("ログアウト処理を失敗しました")
    })
  }

  return (
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
      <Text style={styles.userText}>{userInfos?.accountId}</Text>
    </View>
    {/* ユーザー名 */}
    <View style={styles.userTextContainer}>
      <View style={styles.userTextWrapper}>
        <Text style={styles.userTitle}>ユーザー名</Text>
        <TouchableOpacity onPress={() => {}}>
          <EditIcon size={24} color="#FFA500" />
        </TouchableOpacity>
      </View>
      <Text style={styles.userText}>{userInfos?.userName}</Text>
    </View>
    <TouchableOpacity style={styles.logoutButton} onPress={() => {handleLogout()}}>
      <Text style={styles.logoutButtonText}>ログアウト</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
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
  logoutButton: {
    height: 24,
    width: 90,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  logoutButtonText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#ffffff',
  },
})