import React, { useState } from 'react'
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Link } from 'expo-router'
import { auth } from '../../config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { router } from 'expo-router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("userCredential", userCredential.user.uid);
      router.push("/(tabs)")
    })
    .catch((error) => {
      console.log("error", error)
      Alert.alert("ログイン処理を失敗しました");
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>ログイン</Text>
        {/* メールアドレス */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            <Text>メールアドレス</Text>
            <Text style={styles.required}> ＊</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="メールアドレスを入力してください"
            onChangeText={(text) => setEmail(text)}
            value={email}
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
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        {/* 登録ボタン */}
        <TouchableOpacity style={styles.button} onPress={() => {handleLogin(email, password)}}>
          <Text style={styles.buttonText}>ログインする</Text>
        </TouchableOpacity>
        <Link href="/auth/signUp" style={styles.loginLinkText} asChild>
          <TouchableOpacity>
            <Text  style={styles.loginLinkText}>ユーザー新規登録はこちら</Text>
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