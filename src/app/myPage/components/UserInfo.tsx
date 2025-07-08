import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import EditIcon from '../../components/Icon/EditIcon';
import { UserInfoType } from '../../../../type/userInfo';
import UserLogout from '../../actions/handleLogout';
import UserEditContents from './UserEditButtons';

type UserInfoProps = {
  userInfos: UserInfoType | null
}

export default function UserInfo({ userInfos }: UserInfoProps) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const userImage = require('../../../../assets/images/user.png')

  const [isUserIdEdit, setIsUserIdEdit] = useState(false);
  const [accountId, setAccountId] = useState('');

  useEffect(() => {
    setIsUserIdEdit(false)
    setAccountId(userInfos?.accountId || '')
  }, [userInfos?.accountId]);

  // ログアウト
  const handleLogout = () => {
    UserLogout();
  }

  const handleUserInfoUpdate = (userInfo: string | undefined) => {
    if (!userInfo) return;
    console.log("userInfo", userInfo);
  }

  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoWrapper}>
        {/* ユーザー画像 */}
        <View style={styles.userImageContainer}>
          <Image
            source={userImage}
            style={styles.userImage}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
          <TouchableOpacity style={styles.editIconOverlay} onPress={() => {}}>
            <EditIcon size={24} color="#FFA500" />
          </TouchableOpacity>
        </View>
        {/* ユーザーID */}
        <View style={styles.userContentsContainer}>
          <View style={styles.userContentsTitle}>
            <Text style={styles.userTitle}>ユーザーID</Text>
            {!isUserIdEdit && (
              <TouchableOpacity onPress={() => {setIsUserIdEdit(true)}}>
                <EditIcon size={24} color="#FFA500" />
              </TouchableOpacity>
            )}
          </View>
          <UserEditContents
            userContent={userInfos?.accountId}
            isUserContentEdit={isUserIdEdit}
            setIsContentEdit={setIsUserIdEdit}
            userUpdateContent={accountId}
            setUserUpdateContent={setAccountId}
            handleUserInfoUpdate={handleUserInfoUpdate}
          />
        </View>
        {/* ユーザー名 */}
        <View style={styles.userContentsContainer}>
          <View style={styles.userContentsTitle}>
            <Text style={styles.userTitle}>ユーザー名</Text>
            <TouchableOpacity onPress={() => {}}>
              <EditIcon size={24} color="#FFA500" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userText}>{userInfos?.userName}</Text>
        </View>
      </View>
      {/* 区切り線 */}
      <View style={styles.divider} />
      {/* ログアウトボタン */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => {handleLogout()}}>
        <Text style={styles.logoutButtonText}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  userInfoContainer: {
    marginVertical: 16,
    marginHorizontal: 'auto',
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: 250,
  },
  userInfoWrapper: {
    width: '100%',
    paddingHorizontal: 16,
  },
  userImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
    marginBottom: 16,
    alignSelf: 'center',
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
  userContentsContainer: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    width: '100%',
  },
  userContentsTitle: {
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    alignSelf: 'center',
  },
  logoutButtonText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    marginVertical: 8,
    width: '100%',
  },
})