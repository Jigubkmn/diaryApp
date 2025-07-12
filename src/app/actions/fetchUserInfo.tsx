import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../config'
import { UserInfoType } from '../../../type/userInfo'

type FetchUserInfoParams = {
  userId: string | undefined
  setUserInfos: (userInfos: UserInfoType) => void
  setUserInfoId: (userInfoId: string) => void
}

export default function fetchUserInfo({ userId, setUserInfos, setUserInfoId }: FetchUserInfoParams) {
  const ref = collection(db, `users/${userId}/userInfo`)
  const q = query(ref) // ユーザー情報の参照を取得。

  // snapshot：userInfoのデータを取得。
  const unsubscribe = onSnapshot(q, (snapshot) => {
    // データ1つずつの処理
    snapshot.docs.forEach((doc) => {
      const { accountId, userName, userImage } = doc.data();
      setUserInfos({ accountId, userName, userImage })
      setUserInfoId(doc.id) // userInfoのIDを保存
    })
  })

  return unsubscribe;
}
