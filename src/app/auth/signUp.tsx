import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Link } from 'expo-router'
import { router } from 'expo-router'
import { auth, db } from '../../config'
// doc：ドキュメント参照を作成する関数
// setDoc：ドキュメントを作成する関数
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

// ランダムなアカウントIDを生成する関数
const generateAccountId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function SignUp() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // 必須項目が全て入力されているかチェック
  const isFormValid = () => {
    return email && password && userName && confirmPassword;
  };

  // ユーザー新規登録、ユーザー情報登録
  const handleSignUp = (email: string, password: string, userName: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      Alert.alert("パスワードが一致しません");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid
      console.log("userCredential", userId);
      const ref = collection(db, `users/${userId}/userInfo`)
      const accountId = generateAccountId()
      addDoc(ref, {
        userName: userName,
        accountId: accountId,
        createdAt: new Date(),
      })
      Alert.alert("会員登録に成功しました");
      router.push("/(tabs)")
    })
    .catch((error) => {
      console.log("error", error)
      Alert.alert("会員登録に失敗しました");
    })
  }
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
            value={userName}
            onChangeText={(text) => setUserName(text)}
            autoCapitalize="none"
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
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
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
            placeholder="半角英数字6文字以上で入力してください"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={true}
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize="none"
            secureTextEntry={true} // パスワードを非表示にする。
          />
        </View>
        {/* 登録ボタン */}
        <TouchableOpacity
          onPress={() => {handleSignUp(email, password, userName, confirmPassword)}}
          style={[!isFormValid() ? styles.disabledButton : styles.headerSaveButton]}
          disabled={!isFormValid()}>
          <Text style={styles.buttonText}>登録する</Text>
        </TouchableOpacity>

      <Link href="/auth/login" style={styles.loginLinkText} asChild>
          <TouchableOpacity>
            <Text style={styles.loginLinkText}>ログインはこちら</Text>
          </TouchableOpacity>
        </Link>
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
  disabledButton: {
    width: '100%',
    height: 30,
    backgroundColor: '#27CBFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 16,
    opacity: 0.5,
  },
  headerSaveButton: {
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