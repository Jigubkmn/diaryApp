import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native'
import { router } from 'expo-router'
import { auth, db } from '../../config'
import { AuthError } from 'firebase/auth'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
import getRandomAccountId from '../actions/getRandomAccountId'
import AuthNavigationLink from '../components/auth/Link'

export default function SignUp() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // 各フォームのエラーメッセージを保持するstate
  const [errors, setErrors] = useState({ userName: '', email: '', password: '', confirmPassword: '' })

  // 必須項目が全て入力されているかチェック
  const isFormValid = () => {
    return email && password && userName && confirmPassword;
  };

  const validateForm = () => {
    const newErrors = { userName: '', email: '', password: '', confirmPassword: '' }
    let isValid = true

    if (userName.length < 2 || userName.length > 10) {
      newErrors.userName = 'ユーザー名は2文字以上10文字以内で入力してください'
      isValid = false
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = 'メールアドレスの形式が正しくありません'
      isValid = false
    }

    if (password.length < 6 || password.length > 20) {
      newErrors.password = 'パスワードは6文字以上20文字以内で入力してください。'
      isValid = false
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // ユーザー新規登録、ユーザー情報登録
  const handleSignUp = async (email: string, password: string, userName: string) => {
    // 1. クライアントサイドバリデーションを実行
    if (!validateForm()) {
      return
    }

    let userCredential: UserCredential | null = null
    try {
      userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const userId = userCredential.user.uid
      const ref = collection(db, `users/${userId}/userInfo`)
      await addDoc(ref, {
        userName,
        accountId: getRandomAccountId(),  // ランダムなアカウントIDを生成する関数
        createdAt: Timestamp.fromDate(new Date())
      })
      // 全て成功した場合
      Alert.alert('会員登録に成功しました')
      router.replace('/(tabs)')
    } catch (error: unknown) {
      console.log("error", error)
      const newErrors = { userName: '', email: '', password: '', confirmPassword: '' }
      switch ((error as AuthError).code) {
        case 'auth/invalid-email': {
          newErrors.email = 'メールアドレスの形式が正しくありません。'
          break
        }
        case 'auth/email-already-in-use': {
          newErrors.email = 'このメールアドレスは既に使用されています。'
          break
        }
        case 'auth/weak-password': {
          newErrors.password = 'パスワードは6文字以上で入力してください。'
          break
        }
        default:
          Alert.alert('登録エラー', '予期せぬエラーが発生しました。時間をおいて再試行してください。')
          break
      }
      setErrors(newErrors)
    }

  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.wrapper}>
          <Text style={styles.title}>ユーザー新規登録</Text>
          <ScrollView style={styles.bodyContainer}>
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
                onBlur={() => validateForm()}
              />
              {errors.userName ? <Text style={styles.errorText}>{errors.userName}</Text> : null}
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
                onBlur={() => validateForm()}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
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
                onBlur={() => validateForm()}
              />
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
              {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
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
                onBlur={() => validateForm()}
              />
              {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            </View>
            {/* 登録ボタン */}
            <TouchableOpacity
              onPress={() => {handleSignUp(email, password, userName)}}
              style={[!isFormValid() ? styles.disabledButton : styles.headerSaveButton]}
              disabled={!isFormValid()}>
              <Text style={styles.buttonText}>登録する</Text>
            </TouchableOpacity>

            <AuthNavigationLink
              text="ログインはこちら"
              href="/auth/login"
            />
            </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 48,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
  title: {
    fontSize: 18,
    lineHeight: 34,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
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
    height: 48,
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
    height: 48,
    backgroundColor: '#27CBFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 24,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loginLinkText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#26B441',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
})