import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

export default function Auth() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>ユーザー新規登録</Text>
        {/* ユーザー名 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            <Text>ユーザー名</Text>
            <Text style={styles.required}> ＊</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="ユーザー名を入力してください"
          />
        </View>
        {/* メールアドレス */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            <Text>メールアドレス</Text>
            <Text style={styles.required}> ＊</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="メールアドレスを入力してください"
          />
        </View>
        {/* パスワード */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            <Text>パスワード</Text>
            <Text style={styles.required}> ＊</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="半角英数字4文字以上で入力してください"
          />
        </View>
        {/* パスワード確認 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            <Text>パスワード確認</Text>
            <Text style={styles.required}> ＊</Text>
          </Text>
          <TextInput
            style={styles.input}
          />
        </View>
        {/* 登録ボタン */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>登録する</Text>
        </TouchableOpacity>
        <Text style={styles.loginLinkText}>ログインはこちら</Text>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 124,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    lineHeight: 34,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputContainer: {
    width: '100%',
    marginTop: 16,
  },
  inputLabel: {
    fontSize: 14,
    lineHeight: 24,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 30,
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  required: {
    color: 'red',
  },
  button: {
    width: '100%',
    height: 30,
    backgroundColor: '#27CBFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loginLinkText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#26B441',
    textDecorationLine: 'underline',
  },
})