import { db } from '../../config'
import { collectionGroup, getDocs, query, where } from 'firebase/firestore'

// 重複しないアカウントIDを生成する関数
export default async function checkUserName(newUserName: string): Promise<string> {
  let isDuplicate = true

  const usersRef = collectionGroup(db, 'userInfo')

  // isDuplicateがtrueである限り（＝IDが重複している間）ループを続ける
  do {
    const q = query(usersRef, where('userName', '==', newUserName))
    const querySnapshot = await getDocs(q)
    isDuplicate = !querySnapshot.empty

    if (isDuplicate) {
      console.log(`ユーザー名 "${newUserName}" は既に存在します。`)
    }
  } while (isDuplicate)

  console.log(`ユーザー名 "${newUserName}" は使用可能です。`)
  return newUserName
}