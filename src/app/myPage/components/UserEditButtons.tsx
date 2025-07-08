import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { UserInfoType } from '../../../../type/userInfo';

type UserEditContentsProps = {
  userInfos: UserInfoType | null
  isUserIdEdit: boolean;
  setIsUserIdEdit: (isUserIdEdit: boolean) => void;
  accountId?: string;
  setAccountId: (accountId: string) => void;
  handleUserInfoUpdate: (accountId: string | undefined) => void;
}

export default function UserEditContents({ userInfos, isUserIdEdit, setIsUserIdEdit, accountId, setAccountId, handleUserInfoUpdate }: UserEditContentsProps) {
  return (
    <>
      {isUserIdEdit ? (
        <View>
          <TextInput
            style={styles.userInputContent}
            value={accountId}
            onChangeText={(text) => setAccountId(text)}
            autoCapitalize="none"
          />
          <View style={styles.userIdEditButtonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {setIsUserIdEdit(false)}}>
              <Text style={styles.userIdEditButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userIdEditButton} onPress={() => {handleUserInfoUpdate(accountId)}}>
              <Text style={styles.userIdEditButtonText}>更新</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.userText}>{userInfos?.accountId}</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  userInputContent: {
    height: 30,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  userIdEditButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
  },
  cancelButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#8D8D8D',
  },
  userIdEditButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#FFA500',
  },
  userIdEditButtonText: {
    color: '#ffffff',
  },
  userText: {
    fontSize: 14,
    lineHeight: 24,
  },
})