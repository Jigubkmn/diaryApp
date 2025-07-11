import { db } from '../../config'
import { collection, getDocs } from 'firebase/firestore'

// 既存のアカウントIDを取得する関数
async function getExistingAccountIds(): Promise<string[]> {
  try {
    const existingAccountIds: string[] = []

    const usersRef = collection(db, 'users')
    const usersSnapshot = await getDocs(usersRef)

    // 全ユーザーのuserInfoコレクションからaccountIdを取得
    for (const userDoc of usersSnapshot.docs) {
      const userInfoRef = collection(db, `users/${userDoc.id}/userInfo`)
      const userInfoSnapshot = await getDocs(userInfoRef)

      userInfoSnapshot.forEach((doc) => {
        const data = doc.data()
        if (data.accountId) {
          existingAccountIds.push(data.accountId)
        }
      })
    }

    return existingAccountIds
  } catch (error) {
    console.error('アカウントIDの取得に失敗しました', error)
    return []
  }
}

// ランダムなアカウントIDを生成する関数
function generateRandomAccountId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 重複しないアカウントIDを生成する関数
export default async function getRandomAccountId(): Promise<string> {
  const existingAccountIds = await getExistingAccountIds()
  let newAccountId: string

  do {
    newAccountId = generateRandomAccountId()
  } while (existingAccountIds.includes(newAccountId))

  return newAccountId
}