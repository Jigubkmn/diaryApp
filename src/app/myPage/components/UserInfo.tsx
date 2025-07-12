import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Image } from 'expo-image'
import { noUserImage } from '../../constants/userImage';
import EditIcon from '../../components/Icon/EditIcon';
import { UserInfoType } from '../../../../type/userInfo';
import UserLogout from '../../actions/handleLogout';
import handleImageSelect from '../../actions/handleImageSelect';
import UserEditContents from './UserEditContents';
import { db } from '../../../config';
import { doc, updateDoc } from 'firebase/firestore'
import { validateAccountId, validateUserName } from '../../../../utils/validation';

type UserInfoProps = {
  userInfos: UserInfoType | null
  userId?: string
  userInfoId: string
}

export default function UserInfo({ userInfos, userId, userInfoId }: UserInfoProps) {
  const [isAccountIdEdit, setIsAccountIdEdit] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [isUserNameEdit, setIsUserNameEdit] = useState(false);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState<string | null>('');
  const [errors, setErrors] = useState({ accountId: '', userName: '' })

  useEffect(() => {
    setAccountId(userInfos?.accountId || '')
  }, [userInfos?.accountId]);

  useEffect(() => {
    setUserName(userInfos?.userName || '')
  }, [userInfos?.userName]);

  useEffect(() => {
    setUserImage(userInfos?.userImage || '')
  }, [userInfos?.userImage]);

  useEffect(() => {
    setIsAccountIdEdit(false)
    setIsUserNameEdit(false)
    setUserImage('')
  }, []);

  // ログアウト
  const handleLogout = () => {
    UserLogout();
  }

  const handleAccountIdUpdate = async (userUpdateInfo: string | undefined) => {
    if (!userUpdateInfo || !userId || !userInfoId) return;
    handleValidateAccountId()
    if (errors.accountId) return;
    try {
      const userRef = doc(db, `users/${userId}/userInfo/${userInfoId}`);
      await updateDoc(userRef, {
        accountId: userUpdateInfo,
      });
      setIsAccountIdEdit(false)
      Alert.alert("ユーザーIDの更新に成功しました");
    } catch (error) {
      console.log("error", error);
      Alert.alert("ユーザーIDの更新に失敗しました");
    }
  }

  // ユーザーIDのバリデーション
  const handleValidateAccountId = async () => {
    const errorMessage = await validateAccountId(accountId)
    setErrors({ ...errors, accountId: errorMessage })
  }

  const handleUserNameUpdate = async (userUpdateInfo: string | undefined) => {
    if (!userUpdateInfo || !userId || !userInfoId) return;
    handleValidateUserName()
    if (errors.userName) return;
    try {
      const userRef = doc(db, `users/${userId}/userInfo/${userInfoId}`);
      await updateDoc(userRef, {
        userName: userUpdateInfo,
      });
      setIsUserNameEdit(false)
      Alert.alert("ユーザー名の更新に成功しました");
    } catch (error) {
      console.log("error", error);
      Alert.alert("ユーザー名の更新に失敗しました");
    }
  }

  // ユーザー名のバリデーション
  const handleValidateUserName = async () => {
    if (!userName) return;
    const errorMessage = await validateUserName(userName)
    setErrors({ ...errors, userName: errorMessage })
  }

  const ImageSelect = async () => {
    await handleImageSelect(setUserImage);
    // ユーザー画像を更新
    try {
      const userRef = doc(db, `users/${userId}/userInfo/${userInfoId}`);
      await updateDoc(userRef, {
        userImage: userImage,
      });
      Alert.alert("ユーザー画像を更新しました");
    } catch (error) {
      console.log("error", error);
      Alert.alert("ユーザー画像の更新に失敗しました");
    }
  };

  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoWrapper}>
        {/* ユーザー画像 */}
        <View style={styles.userImageContainer}>
          <Image
            source={userInfos?.userImage || noUserImage}
            style={styles.userImage}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
          <TouchableOpacity style={styles.editIconOverlay} onPress={() => ImageSelect()}>
            <EditIcon size={24} color="#FFA500" />
          </TouchableOpacity>
        </View>
        {/* ユーザーID */}
        <UserEditContents
          userTitle="ユーザーID"
          userContent={userInfos?.accountId}
          isUserContentEdit={isAccountIdEdit}
          setIsContentEdit={setIsAccountIdEdit}
          userUpdateContent={accountId}
          setUserUpdateContent={setAccountId}
          handleUserInfoUpdate={handleAccountIdUpdate}
          errorText={errors.accountId}
          handleValidateUserContent={handleValidateAccountId}
        />
        {/* ユーザー名 */}
        <UserEditContents
          userTitle="ユーザー名"
          userContent={userInfos?.userName}
          isUserContentEdit={isUserNameEdit}
          setIsContentEdit={setIsUserNameEdit}
          userUpdateContent={userName}
          setUserUpdateContent={setUserName}
          handleUserInfoUpdate={handleUserNameUpdate}
          errorText={errors.userName}
          handleValidateUserContent={handleValidateUserName}
        />
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
    borderRadius: 50,
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