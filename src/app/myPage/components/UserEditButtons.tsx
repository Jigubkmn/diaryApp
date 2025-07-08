import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

type UserEditContentsProps = {
  userContent?: string;
  isUserContentEdit: boolean;
  setIsContentEdit: (isUserIdEdit: boolean) => void;
  userUpdateContent?: string;
  setUserUpdateContent: (accountId: string) => void;
  handleUserInfoUpdate: (accountId: string | undefined) => void;
}

export default function UserEditContents({ userContent, isUserContentEdit, setIsContentEdit, userUpdateContent, setUserUpdateContent, handleUserInfoUpdate }: UserEditContentsProps) {
  return (
    <>
      {isUserContentEdit ? (
        <View>
          <TextInput
            style={styles.userInputContent}
            value={userUpdateContent}
            onChangeText={(text) => setUserUpdateContent(text)}
            autoCapitalize="none"
          />
          <View style={styles.userIdEditButtonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {setIsContentEdit(false)}}>
              <Text style={styles.userIdEditButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userIdEditButton} onPress={() => {handleUserInfoUpdate(userUpdateContent)}}>
              <Text style={styles.userIdEditButtonText}>更新</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.userText}>{userContent}</Text>
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