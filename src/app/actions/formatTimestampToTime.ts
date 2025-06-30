import { DiaryType } from "../../../type/diary";

export default function formatTimestampToTime({diaryList}: {diaryList: DiaryType}) {
  if (diaryList.updatedAt && typeof diaryList.updatedAt === 'object' && 'seconds' in diaryList.updatedAt) {
    // Firestoreのタイムスタンプ形式の場合
    const timestamp = diaryList.updatedAt as unknown as { seconds: number; nanoseconds: number };
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    // 日記更新日時を時間と分に変換
    const hours = date ? date.getHours() : 0;
    const minutes = date ? date.getMinutes() : 0;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    return formattedTime;
  }
}