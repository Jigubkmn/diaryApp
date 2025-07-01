import dayjs from 'dayjs';

export type DiaryType = {
  diaryText: string;
  diaryDate: dayjs.Dayjs;
  feeling: string;
  updatedAt: Date;
}